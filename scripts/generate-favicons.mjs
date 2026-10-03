import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import {
  generateIkIconSvg,
  generateIkMonogramSvg,
  IK_LOGO_PATH,
  IK_MONOGRAM_VIEWBOX,
  IK_TIGHT_VIEWBOX,
} from "../lib/ik-icon-data.mjs";
import { hexToRgb, themeColors } from "../styles/tokens.mjs";

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

// Canonical SVG assets:
// 1. Transparent, FULL-BLEED canvas (viewBox cropped to the artwork): ink rounded-square base,
//    white IkIcon mark, and offset palette-color shadow. Used for brand logos.
const CANONICAL_SVG = generateIkIconSvg();
// 2. Opaque full canvas in themeColors.retro.ink with a large centered IkIcon mark (inside the maskable safe zone)
const OPAQUE_SVG = generateIkIconSvg({ opaque: true });
// 3. Standalone responsive SVG monogram for browser tabs (switches between pink and paper based on prefers-color-scheme)
const MONOGRAM_RESPONSIVE_SVG = generateIkMonogramSvg({ responsive: true });

// Rasterize standalone monogram SVG to an exact size x size PNG buffer.
async function rasterizeMonogram(size, color) {
  const svg = generateIkMonogramSvg({ color });
  return sharp(Buffer.from(svg), { density: 576 })
    .resize(size, size)
    .png()
    .toBuffer();
}

// All public PNG targets with intrinsic dimensions and opacity requirements
export const PNG_TARGETS = [
  // Favicons - Light mode (standalone monogram in retro pink)
  {
    filename: "favicon-16x16.png",
    size: 16,
    opaque: false,
    isFavicon: true,
    dark: false,
  },
  {
    filename: "favicon-32x32.png",
    size: 32,
    opaque: false,
    isFavicon: true,
    dark: false,
  },
  {
    filename: "favicon-48x48.png",
    size: 48,
    opaque: false,
    isFavicon: true,
    dark: false,
  },
  {
    filename: "favicon-96x96.png",
    size: 96,
    opaque: false,
    isFavicon: true,
    dark: false,
  },

  // Favicons - Dark mode (standalone monogram in retro paper / white)
  {
    filename: "favicon-dark-16x16.png",
    size: 16,
    opaque: false,
    isFavicon: true,
    dark: true,
  },
  {
    filename: "favicon-dark-32x32.png",
    size: 32,
    opaque: false,
    isFavicon: true,
    dark: true,
  },
  {
    filename: "favicon-dark-48x48.png",
    size: 48,
    opaque: false,
    isFavicon: true,
    dark: true,
  },
  {
    filename: "favicon-dark-96x96.png",
    size: 96,
    opaque: false,
    isFavicon: true,
    dark: true,
  },

  // Apple Touch Icons (opaque themeColors.retro.ink canvas)
  {
    filename: "apple-icon-57x57.png",
    size: 57,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-60x60.png",
    size: 60,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-72x72.png",
    size: 72,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-76x76.png",
    size: 76,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-114x114.png",
    size: 114,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-120x120.png",
    size: 120,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-144x144.png",
    size: 144,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-152x152.png",
    size: 152,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "apple-icon-180x180.png",
    size: 180,
    opaque: true,
    isFavicon: false,
  },
  { filename: "apple-icon.png", size: 192, opaque: true, isFavicon: false },
  {
    filename: "apple-icon-precomposed.png",
    size: 192,
    opaque: true,
    isFavicon: false,
  },

  // Android Icons (opaque themeColors.retro.ink canvas)
  {
    filename: "android-icon-36x36.png",
    size: 36,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "android-icon-48x48.png",
    size: 48,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "android-icon-72x72.png",
    size: 72,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "android-icon-96x96.png",
    size: 96,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "android-icon-144x144.png",
    size: 144,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "android-icon-192x192.png",
    size: 192,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "android-512x512.png",
    size: 512,
    opaque: true,
    maskable: true,
    isFavicon: false,
  },

  // Microsoft Tile Icons (opaque themeColors.retro.ink canvas)
  { filename: "ms-icon-70x70.png", size: 70, opaque: true, isFavicon: false },
  {
    filename: "ms-icon-144x144.png",
    size: 144,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "ms-icon-150x150.png",
    size: 150,
    opaque: true,
    isFavicon: false,
  },
  {
    filename: "ms-icon-310x310.png",
    size: 310,
    opaque: true,
    isFavicon: false,
  },
];

export const BRAND_SVG_TARGETS = ["logo-light.svg", "logo-dark.svg"];
export const SVG_TARGETS = ["favicon.svg", ...BRAND_SVG_TARGETS];

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
  const pinkRgb = hexToRgb(themeColors.retro.pink);
  const paperRgb = hexToRgb(themeColors.retro.paper);

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
  const faviconSvgPath = path.join(PUBLIC_DIR, "favicon.svg");
  if (!fs.existsSync(faviconSvgPath)) {
    throw new Error("Missing favicon.svg");
  }
  const faviconSvg = fs.readFileSync(faviconSvgPath, "utf-8");
  if (!faviconSvg.includes(IK_LOGO_PATH)) {
    throw new Error("favicon.svg does not contain canonical IK_LOGO_PATH");
  }
  if (!faviconSvg.includes(`viewBox="${IK_MONOGRAM_VIEWBOX}"`)) {
    throw new Error(
      `favicon.svg must use monogram viewBox "${IK_MONOGRAM_VIEWBOX}"`
    );
  }
  if (faviconSvg.includes("<rect")) {
    throw new Error(
      "favicon.svg must be transparent standalone monogram without <rect>"
    );
  }
  if (
    !faviconSvg.includes(themeColors.retro.pink) ||
    !faviconSvg.includes(themeColors.retro.paper) ||
    !faviconSvg.includes("@media (prefers-color-scheme: dark)")
  ) {
    throw new Error(
      "favicon.svg must include light and dark theme tokens and prefers-color-scheme media query"
    );
  }
  console.log(
    "  ✓ favicon.svg: standalone monogram & responsive theme tokens verified"
  );

  for (const svgFile of BRAND_SVG_TARGETS) {
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
    if (!content.includes(`viewBox="${IK_TIGHT_VIEWBOX}"`)) {
      throw new Error(
        `SVG ${svgFile} must use the tight viewBox "${IK_TIGHT_VIEWBOX}"`
      );
    }
    console.log(
      `  ✓ ${svgFile}: canonical tile geometry & theme tokens verified`
    );
  }

  // 3. Verify PNG dimensions, format, opacity, and transparent padding / monogram coverage
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
      // Favicon targets: transparent background, standalone monogram
      if (stats.isOpaque) {
        throw new Error(
          `Favicon asset ${target.filename} must be transparent, but stats.isOpaque is true`
        );
      }

      // All 4 corners must be strictly transparent (no background clipping/fill)
      for (const idx of cornerIndices) {
        const a = data[idx + 3];
        if (a !== 0) {
          throw new Error(
            `Favicon asset ${target.filename} corner at byte index ${idx} should be 0 (got alpha ${a})`
          );
        }
      }

      // Coverage check: calculate bounding box of visible artwork (alpha > 10)
      let minX = target.size;
      let maxX = 0;
      let minY = target.size;
      let maxY = 0;
      for (let y = 0; y < target.size; y++) {
        for (let x = 0; x < target.size; x++) {
          const a = data[(y * target.size + x) * 4 + 3];
          if (a > 10) {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
          }
        }
      }
      const w = maxX - minX + 1;
      const h = maxY - minY + 1;
      const wRatio = w / target.size;
      const hRatio = h / target.size;
      if (wRatio < 0.8 || hRatio < 0.8) {
        throw new Error(
          `Favicon asset ${target.filename} artwork coverage too small: ${w}x${h} in ${target.size}x${target.size} (${(wRatio * 100).toFixed(1)}% / ${(hRatio * 100).toFixed(1)}%)`
        );
      }

      // Color check: peak opaque pixels (alpha === 255) must match expected color with ±2 tolerance
      const expectedRgb = target.dark ? paperRgb : pinkRgb;
      let foundOpaque = false;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 255) {
          foundOpaque = true;
          const dr = Math.abs(data[i] - expectedRgb.r);
          const dg = Math.abs(data[i + 1] - expectedRgb.g);
          const db = Math.abs(data[i + 2] - expectedRgb.b);
          if (dr > 2 || dg > 2 || db > 2) {
            throw new Error(
              `Favicon asset ${target.filename} color mismatch: expected rgb(${expectedRgb.r}, ${expectedRgb.g}, ${expectedRgb.b}), got rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`
            );
          }
        }
      }
      if (!foundOpaque) {
        throw new Error(
          `Favicon asset ${target.filename} has no fully opaque stroke pixels (alpha 255)`
        );
      }

      console.log(
        `  ✓ ${target.filename}: ${meta.width}x${meta.height} PNG verified (standalone ${target.dark ? "dark" : "light"} monogram, ${(wRatio * 100).toFixed(1)}% coverage, transparent corners)`
      );
    }
  }

  console.log(
    `\n[generate-favicons] All ${1 + BRAND_SVG_TARGETS.length + PNG_TARGETS.length + 1} brand assets verified successfully.`
  );
}

export async function generateFavicons() {
  console.log(
    "Generating browser favicon assets from canonical IK monogram..."
  );

  // 1. Write favicon.svg (responsive: pink for light, paper for dark)
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "favicon.svg"),
    MONOGRAM_RESPONSIVE_SVG
  );
  console.log("  ✓ Written favicon.svg");

  // 2. Generate browser favicon PNGs
  for (const target of PNG_TARGETS.filter((t) => t.isFavicon)) {
    const out = path.join(PUBLIC_DIR, target.filename);
    const color = target.dark
      ? themeColors.retro.paper
      : themeColors.retro.pink;
    const buf = await rasterizeMonogram(target.size, color);
    fs.writeFileSync(out, buf);
    console.log(`  ✓ Generated ${target.filename}`);
  }

  // 3. Generate favicon.ico (multi-resolution from light mode monogram)
  const icoPngBuffers = await Promise.all(
    ICO_SIZES.map((size) => rasterizeMonogram(size, themeColors.retro.pink))
  );
  const icoBuffer = buildIcoBuffer(icoPngBuffers, ICO_SIZES);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
  console.log(`  ✓ Generated favicon.ico (${ICO_SIZES.join(", ")}px)`);

  // 4. Ensure non-browser brand assets exist (do NOT overwrite existing files to preserve byte-identity)
  for (const svgFile of BRAND_SVG_TARGETS) {
    const filePath = path.join(PUBLIC_DIR, svgFile);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, CANONICAL_SVG);
      console.log(`  ✓ Created missing ${svgFile}`);
    }
  }
  for (const target of PNG_TARGETS.filter((t) => !t.isFavicon)) {
    const out = path.join(PUBLIC_DIR, target.filename);
    if (!fs.existsSync(out)) {
      await sharp(Buffer.from(OPAQUE_SVG))
        .resize(target.size, target.size)
        .png()
        .toFile(out);
      console.log(`  ✓ Created missing ${target.filename}`);
    }
  }

  // 5. Run automated self-check
  await verifyAssets();
}

// Entrypoint: only execute if invoked directly
const isMainModule =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMainModule) {
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
}
