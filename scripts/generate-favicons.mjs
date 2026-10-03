import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

import {
  generateIkIconSvg,
  IK_LOGO_PATH,
  IK_TIGHT_VIEWBOX,
} from "../lib/ik-icon-data.mjs";
import { hexToRgb, themeColors } from "../styles/tokens.mjs";

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

// Canonical SVG assets:
// 1. Transparent, FULL-BLEED canvas (viewBox cropped to the artwork): ink rounded-square base,
//    white IkIcon mark, and offset palette-color shadow. No outer padding at all.
const CANONICAL_SVG = generateIkIconSvg();
// 2. Opaque full canvas in themeColors.retro.ink with a large centered IkIcon mark (inside the maskable safe zone)
const OPAQUE_SVG = generateIkIconSvg({ opaque: true });

// Rasterize an SVG to an exact size x size PNG buffer.
// High density first (crisp vector render), then downscale. The SVG is already full-bleed,
// so "fill" is exact (the artwork is square) and nothing gets letterboxed.
async function rasterize(svgBuffer, size) {
  return sharp(svgBuffer, { density: 72 * 8 })
    .resize(size, size, { fit: "fill" })
    .png()
    .toBuffer();
}

// All public PNG targets with intrinsic dimensions and opacity requirements
export const PNG_TARGETS = [
  // Favicons - Light mode (transparent, full-bleed: no outer padding)
  { filename: "favicon-16x16.png", size: 16, opaque: false },
  { filename: "favicon-32x32.png", size: 32, opaque: false },
  { filename: "favicon-48x48.png", size: 48, opaque: false },
  { filename: "favicon-96x96.png", size: 96, opaque: false },

  // Favicons - Dark mode (transparent, full-bleed: no outer padding)
  { filename: "favicon-dark-16x16.png", size: 16, opaque: false },
  { filename: "favicon-dark-32x32.png", size: 32, opaque: false },
  { filename: "favicon-dark-48x48.png", size: 48, opaque: false },
  { filename: "favicon-dark-96x96.png", size: 96, opaque: false },

  // Apple Touch Icons (opaque themeColors.retro.ink canvas)
  { filename: "apple-icon-57x57.png", size: 57, opaque: true },
  { filename: "apple-icon-60x60.png", size: 60, opaque: true },
  { filename: "apple-icon-72x72.png", size: 72, opaque: true },
  { filename: "apple-icon-76x76.png", size: 76, opaque: true },
  { filename: "apple-icon-114x114.png", size: 114, opaque: true },
  { filename: "apple-icon-120x120.png", size: 120, opaque: true },
  { filename: "apple-icon-144x144.png", size: 144, opaque: true },
  { filename: "apple-icon-152x152.png", size: 152, opaque: true },
  { filename: "apple-icon-180x180.png", size: 180, opaque: true },
  { filename: "apple-icon.png", size: 192, opaque: true },
  { filename: "apple-icon-precomposed.png", size: 192, opaque: true },

  // Android Icons (opaque themeColors.retro.ink canvas)
  { filename: "android-icon-36x36.png", size: 36, opaque: true },
  { filename: "android-icon-48x48.png", size: 48, opaque: true },
  { filename: "android-icon-72x72.png", size: 72, opaque: true },
  { filename: "android-icon-96x96.png", size: 96, opaque: true },
  { filename: "android-icon-144x144.png", size: 144, opaque: true },
  { filename: "android-icon-192x192.png", size: 192, opaque: true },
  { filename: "android-512x512.png", size: 512, opaque: true, maskable: true },

  // Microsoft Tile Icons (opaque themeColors.retro.ink canvas)
  { filename: "ms-icon-70x70.png", size: 70, opaque: true },
  { filename: "ms-icon-144x144.png", size: 144, opaque: true },
  { filename: "ms-icon-150x150.png", size: 150, opaque: true },
  { filename: "ms-icon-310x310.png", size: 310, opaque: true },
];

export const SVG_TARGETS = ["favicon.svg", "logo-light.svg", "logo-dark.svg"];

export const ICO_SIZES = [16, 32, 48];

// Multi-resolution ICO builder
export function buildIcoBuffer(pngBuffers, sizes) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(sizes.length, 4); // Count

  let currentOffset = 6 + sizes.length * 16;
  const directoryEntries = [];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];

    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    directoryEntries.push(entry);

    currentOffset += buf.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...pngBuffers]);
}

export function verifyIcoBuffer(buffer, expectedSizes = ICO_SIZES) {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error("ICO verification failed: output is not a Buffer");
  }
  const minLength = 6 + expectedSizes.length * 16;
  if (buffer.length < minLength) {
    throw new Error(
      `ICO verification failed: buffer too small (${buffer.length} bytes)`
    );
  }
  const reserved = buffer.readUInt16LE(0);
  const type = buffer.readUInt16LE(2);
  const count = buffer.readUInt16LE(4);

  if (reserved !== 0)
    throw new Error(`ICO reserved field is ${reserved}, expected 0`);
  if (type !== 1) throw new Error(`ICO type field is ${type}, expected 1`);
  if (count !== expectedSizes.length) {
    throw new Error(
      `ICO image count is ${count}, expected ${expectedSizes.length}`
    );
  }

  const pngMagic = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);

  for (let i = 0; i < count; i++) {
    const entryOffset = 6 + i * 16;
    const width = buffer.readUInt8(entryOffset) || 256;
    const height = buffer.readUInt8(entryOffset + 1) || 256;
    const planes = buffer.readUInt16LE(entryOffset + 4);
    const bpp = buffer.readUInt16LE(entryOffset + 6);
    const size = buffer.readUInt32LE(entryOffset + 8);
    const offset = buffer.readUInt32LE(entryOffset + 12);

    const expectedSize = expectedSizes[i];
    if (width !== expectedSize || height !== expectedSize) {
      throw new Error(
        `ICO entry ${i} dimensions ${width}x${height} mismatch expected ${expectedSize}x${expectedSize}`
      );
    }
    if (planes !== 1)
      throw new Error(`ICO entry ${i} planes is ${planes}, expected 1`);
    if (bpp !== 32)
      throw new Error(`ICO entry ${i} bits-per-pixel is ${bpp}, expected 32`);
    if (offset + size > buffer.length) {
      throw new Error(
        `ICO entry ${i} out of bounds: offset ${offset} + size ${size} > buffer length ${buffer.length}`
      );
    }
    if (!buffer.subarray(offset, offset + 8).equals(pngMagic)) {
      throw new Error(`ICO entry ${i} does not start with valid PNG signature`);
    }
  }

  return true;
}

export async function verifyAssets() {
  console.log("Running runnable asset consistency check...");

  const inkRgb = hexToRgb(themeColors.retro.ink);

  // 1. Verify ICO
  const icoPath = path.join(PUBLIC_DIR, "favicon.ico");
  if (!fs.existsSync(icoPath)) {
    throw new Error(`Missing favicon.ico at ${icoPath}`);
  }
  const icoBuffer = fs.readFileSync(icoPath);
  verifyIcoBuffer(icoBuffer);
  console.log(
    `  ✓ favicon.ico: valid directory entries for ${ICO_SIZES.join(", ")}px frames (${icoBuffer.length} bytes)`
  );

  // 2. Verify SVGs
  for (const svgFile of SVG_TARGETS) {
    const filePath = path.join(PUBLIC_DIR, svgFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing SVG asset: ${svgFile}`);
    }
    const content = fs.readFileSync(filePath, "utf-8");
    if (!content.includes(IK_LOGO_PATH)) {
      throw new Error(`SVG ${svgFile} does not contain canonical IK_LOGO_PATH`);
    }
    if (
      !content.includes(themeColors.retro.pink) ||
      !content.includes(themeColors.retro.ink) ||
      !content.includes(themeColors.retro.paper)
    ) {
      throw new Error(`SVG ${svgFile} does not contain canonical theme tokens`);
    }
    // Verify full-bleed viewBox (no padding around the artwork)
    if (!content.includes(`viewBox="${IK_TIGHT_VIEWBOX}"`)) {
      throw new Error(
        `SVG ${svgFile} must use the tight viewBox "${IK_TIGHT_VIEWBOX}" (full-bleed, no padding)`
      );
    }
    // Verify transparent canvas padding (no full-canvas background rect)
    if (
      content.includes('<rect width="44"') ||
      content.includes('<rect width="70"') ||
      content.includes('<rect width="38"')
    ) {
      throw new Error(
        `SVG ${svgFile} must have transparent outer padding without full canvas rect`
      );
    }
    console.log(`  ✓ ${svgFile}: canonical geometry & theme tokens verified`);
  }

  // 3. Verify PNG dimensions, format, opacity, and transparent padding
  for (const target of PNG_TARGETS) {
    const filePath = path.join(PUBLIC_DIR, target.filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing PNG asset: ${target.filename}`);
    }
    const meta = await sharp(filePath).metadata();
    if (meta.width !== target.size || meta.height !== target.size) {
      throw new Error(
        `Asset ${target.filename} dimensions ${meta.width}x${meta.height} do not match expected ${target.size}x${target.size}`
      );
    }
    if (meta.format !== "png") {
      throw new Error(
        `Asset ${target.filename} format is ${meta.format}, expected png`
      );
    }

    const stats = await sharp(filePath).stats();
    const { data } = await sharp(filePath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const cornerIndices = [
      0, // top-left
      (target.size - 1) * 4, // top-right
      (target.size - 1) * target.size * 4, // bottom-left
      (target.size * target.size - 1) * 4, // bottom-right
    ];

    if (target.opaque) {
      // Must be opaque across the whole canvas
      if (!stats.isOpaque) {
        throw new Error(
          `Asset ${target.filename} must be opaque across the whole canvas, but stats.isOpaque is false`
        );
      }

      // Check all 4 corners are opaque canonical retro.ink
      for (const idx of cornerIndices) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        if (a !== 255 || r !== inkRgb.r || g !== inkRgb.g || b !== inkRgb.b) {
          throw new Error(
            `Opaque asset ${target.filename} corner mismatch at index ${idx}: expected rgba(${inkRgb.r}, ${inkRgb.g}, ${inkRgb.b}, 255), got rgba(${r}, ${g}, ${b}, ${a})`
          );
        }
      }

      // Check every pixel has alpha === 255
      for (let p = 3; p < data.length; p += 4) {
        if (data[p] !== 255) {
          throw new Error(
            `Opaque asset ${target.filename} has non-opaque pixel (alpha ${data[p]}) at byte index ${p}`
          );
        }
      }

      console.log(
        `  ✓ ${target.filename}: ${meta.width}x${meta.height} PNG verified (opaque ${themeColors.retro.ink} canvas)`
      );
    } else {
      // Favicon targets are transparent but FULL-BLEED: the artwork must touch all four edges
      if (stats.isOpaque) {
        throw new Error(
          `Favicon asset ${target.filename} must keep transparent rounded corners, but stats.isOpaque is true`
        );
      }

      const alphaAt = (x, y) => data[(y * target.size + x) * 4 + 3];
      const mid = Math.floor(target.size / 2);

      // Full-bleed check: midpoint of every edge must be (almost) fully opaque => no padding
      const edges = {
        top: alphaAt(mid, 0),
        bottom: alphaAt(mid, target.size - 1),
        left: alphaAt(0, mid),
        right: alphaAt(target.size - 1, mid),
      };
      for (const [edge, a] of Object.entries(edges)) {
        if (a < 200) {
          throw new Error(
            `Favicon asset ${target.filename} is not full-bleed: ${edge} edge midpoint alpha is ${a} (expected >= 200)`
          );
        }
      }

      // Rounded corners / shadow notches stay transparent (tolerate tiny anti-aliasing at small sizes)
      for (const idx of cornerIndices) {
        const a = data[idx + 3];
        if (a > 32) {
          throw new Error(
            `Favicon asset ${target.filename} corner at byte index ${idx} should be transparent (got alpha ${a})`
          );
        }
      }

      console.log(
        `  ✓ ${target.filename}: ${meta.width}x${meta.height} PNG verified (transparent, full-bleed)`
      );
    }
  }

  console.log(
    `\n[generate-favicons] All ${SVG_TARGETS.length + PNG_TARGETS.length + 1} brand assets verified successfully.`
  );
}

// helper: render big, trim transparent padding, then fit to exact size
async function renderTight(svgBuffer, size) {
  const trimmed = await sharp(svgBuffer, { density: 1024 })
    .trim() // removes the transparent outer padding
    .png()
    .toBuffer();

  return sharp(trimmed)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

export async function generateFavicons() {
  console.log("Generating brand assets from canonical IkIcon mark...");

  const canonicalSvgBuffer = Buffer.from(CANONICAL_SVG);
  const opaqueSvgBuffer = Buffer.from(OPAQUE_SVG);

  // 1. Write SVG assets
  for (const svgFile of SVG_TARGETS) {
    fs.writeFileSync(path.join(PUBLIC_DIR, svgFile), CANONICAL_SVG);
    console.log(`  ✓ Written ${svgFile}`);
  }

  // 2. Generate PNG assets
  for (const target of PNG_TARGETS) {
    const out = path.join(PUBLIC_DIR, target.filename);
    if (target.opaque) {
      await sharp(opaqueSvgBuffer)
        .resize(target.size, target.size)
        .png()
        .toFile(out);
    } else {
      fs.writeFileSync(out, await renderTight(canonicalSvgBuffer, target.size));
    }
    console.log(`  ✓ Generated ${target.filename}`);
  }

  // 3. favicon.ico (also tight)
  const icoPngBuffers = await Promise.all(
    ICO_SIZES.map((size) => renderTight(canonicalSvgBuffer, size))
  );

  const icoBuffer = buildIcoBuffer(icoPngBuffers, ICO_SIZES);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
  console.log(`  ✓ Generated favicon.ico (${ICO_SIZES.join(", ")}px)`);

  // 4. Run automated self-check
  await verifyAssets();
}

// Entrypoint
if (process.argv.includes("--check") || process.argv.includes("-c")) {
  verifyAssets().catch((err) => {
    console.error("[generate-favicons] Verification failed:", err.message);
    process.exit(1);
  });
} else {
  generateFavicons().catch((err) => {
    console.error("[generate-favicons] Generation failed:", err);
    process.exit(1);
  });
}
