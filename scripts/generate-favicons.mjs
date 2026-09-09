import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT_DIR = process.cwd();
const SOURCE_SVG = process.argv[2]
  ? path.resolve(ROOT_DIR, process.argv[2])
  : path.join(ROOT_DIR, "public", "favicon.svg");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const PNG_TARGETS = [
  { filename: "favicon-16x16.png", size: 16 },
  { filename: "favicon-32x32.png", size: 32 },
  { filename: "favicon-48x48.png", size: 48 },
  { filename: "favicon-96x96.png", size: 96 },
  { filename: "apple-icon-180x180.png", size: 180 },
  { filename: "apple-icon.png", size: 192 },
  { filename: "android-icon-192x192.png", size: 192 },
  { filename: "android-512x512.png", size: 512 },
];

const ICO_SIZES = [16, 32, 48];

function buildIcoBuffer(pngBuffers, sizes) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved, must be 0
  header.writeUInt16LE(1, 2); // 1 = ICO format
  header.writeUInt16LE(sizes.length, 4); // Number of images

  let currentOffset = 6 + sizes.length * 16;
  const directoryEntries = [];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];

    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Palette count
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel (RGBA)
    entry.writeUInt32LE(buf.length, 8); // Size of image data
    entry.writeUInt32LE(currentOffset, 12); // Offset of image data
    directoryEntries.push(entry);

    currentOffset += buf.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...pngBuffers]);
}

async function generateFavicons() {
  if (!fs.existsSync(SOURCE_SVG)) {
    console.error(`Error: Source SVG not found at ${SOURCE_SVG}`);
    process.exit(1);
  }

  console.log(`Reading source SVG: ${path.relative(ROOT_DIR, SOURCE_SVG)}`);

  // 1. Generate standalone PNG targets with alpha transparency
  for (const target of PNG_TARGETS) {
    const outPath = path.join(PUBLIC_DIR, target.filename);
    await sharp(SOURCE_SVG)
      .resize(target.size, target.size)
      .png()
      .toFile(outPath);
    console.log(`  ✓ Generated ${target.filename} (${target.size}x${target.size} transparent PNG)`);
  }

  // 2. Generate multi-resolution favicon.ico (16x16, 32x32, 48x48)
  const icoPngBuffers = await Promise.all(
    ICO_SIZES.map((size) =>
      sharp(SOURCE_SVG).resize(size, size).png().toBuffer()
    )
  );

  const icoBuffer = buildIcoBuffer(icoPngBuffers, ICO_SIZES);
  const icoPath = path.join(PUBLIC_DIR, "favicon.ico");
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`  ✓ Generated favicon.ico (multi-resolution: ${ICO_SIZES.join(", ")}px)`);

  console.log("All favicons generated successfully!");
}

generateFavicons().catch((err) => {
  console.error("Failed to generate favicons:", err);
  process.exit(1);
});
