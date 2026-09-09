import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

// SVG definitions
const IK_PATH =
  "M71.7598 0.0810547V338.789H0V0.0810547H71.7598ZM334.663 54.7002L233.437 140.654C241.614 143.17 249.733 146.269 257.619 150.047C278.654 160.123 299.062 175.536 313.695 198.434C328.341 221.351 335.664 249.379 334.402 282.074V338.789H262.643V281.381C262.643 280.867 262.654 280.353 262.676 279.84C263.55 259.51 259.045 246.178 253.228 237.075C247.271 227.755 238.33 220.375 226.619 214.766C212.577 208.04 196.127 204.648 180.836 203.503V338.789H109.075V0.0810547H180.836V91.1787L288.215 0L334.663 54.7002Z";

// 1. Dynamic SVG: transparent background, #F34F29 in light mode, #FFFFFF in dark mode
const DYNAMIC_SVG = `<svg width="450" height="450" viewBox="-58 -56 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    path {
      fill: #F34F29;
    }
    @media (prefers-color-scheme: dark) {
      path {
        fill: #FFFFFF;
      }
    }
  </style>
  <path d="${IK_PATH}"/>
</svg>
`;

// Helper to make SVGs for rasterization
function createSvg({ fillColor = "#F34F29", bgColor = null } = {}) {
  const bgRect = bgColor ? `<rect x="-58" y="-56" width="450" height="450" fill="${bgColor}"/>` : "";
  return `<svg width="450" height="450" viewBox="-58 -56 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${bgRect}
  <path d="${IK_PATH}" fill="${fillColor}"/>
</svg>`;
}

// Multi-resolution ICO builder
function buildIcoBuffer(pngBuffers, sizes) {
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

async function generateFavicons() {
  console.log("Generating favicons and touch icons...");

  // 1. Write updated favicon.svg
  const svgPath = path.join(PUBLIC_DIR, "favicon.svg");
  fs.writeFileSync(svgPath, DYNAMIC_SVG.trim() + "\n");
  console.log("  ✓ Updated favicon.svg (dynamic CSS: #F34F29 light / #FFFFFF dark, transparent)");

  const lightSvgBuffer = Buffer.from(createSvg({ fillColor: "#F34F29" }));
  const darkSvgBuffer = Buffer.from(createSvg({ fillColor: "#FFFFFF" }));
  const touchSvgBuffer = Buffer.from(createSvg({ fillColor: "#FFFFFF", bgColor: "#000000" }));

  // 2. Generate Light-Mode Transparent PNGs (#F34F29)
  const lightTargets = [
    { filename: "favicon-16x16.png", size: 16 },
    { filename: "favicon-32x32.png", size: 32 },
    { filename: "favicon-48x48.png", size: 48 },
    { filename: "favicon-96x96.png", size: 96 },
  ];
  for (const t of lightTargets) {
    await sharp(lightSvgBuffer).resize(t.size, t.size).png().toFile(path.join(PUBLIC_DIR, t.filename));
    console.log(`  ✓ Generated ${t.filename} (transparent, #F34F29)`);
  }

  // 3. Generate Dark-Mode Transparent PNGs (#FFFFFF)
  const darkTargets = [
    { filename: "favicon-dark-16x16.png", size: 16 },
    { filename: "favicon-dark-32x32.png", size: 32 },
    { filename: "favicon-dark-48x48.png", size: 48 },
    { filename: "favicon-dark-96x96.png", size: 96 },
  ];
  for (const t of darkTargets) {
    await sharp(darkSvgBuffer).resize(t.size, t.size).png().toFile(path.join(PUBLIC_DIR, t.filename));
    console.log(`  ✓ Generated ${t.filename} (transparent, #FFFFFF)`);
  }

  // 4. Generate Multi-Resolution favicon.ico (16, 32, 48 transparent)
  const icoSizes = [16, 32, 48];
  const icoPngBuffers = await Promise.all(
    icoSizes.map((size) => sharp(lightSvgBuffer).resize(size, size).png().toBuffer())
  );
  const icoBuffer = buildIcoBuffer(icoPngBuffers, icoSizes);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
  console.log(`  ✓ Generated favicon.ico (multi-res: ${icoSizes.join(", ")}px transparent)`);

  // 5. Generate Apple Touch & Mobile Icons (Solid #000000 background, White #FFFFFF mark)
  const touchTargets = [
    { filename: "apple-icon-180x180.png", size: 180 },
    { filename: "apple-icon.png", size: 192 },
    { filename: "apple-icon-precomposed.png", size: 192 },
    { filename: "android-icon-192x192.png", size: 192 },
    { filename: "android-512x512.png", size: 512 },
  ];
  for (const t of touchTargets) {
    await sharp(touchSvgBuffer).resize(t.size, t.size).png().toFile(path.join(PUBLIC_DIR, t.filename));
    console.log(`  ✓ Generated ${t.filename} (solid #000000, white IK mark)`);
  }

  console.log("All assets generated successfully!");
}

generateFavicons().catch((err) => {
  console.error("Failed to generate favicons:", err);
  process.exit(1);
});
