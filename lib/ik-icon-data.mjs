import { themeColors } from "../styles/tokens.mjs";

export const IK_LOGO_PATH =
  "M29 18V136M67 18V76.75M67 136V76.75M125 27.5L67 76.75M67 76.75C84.3333 74.3333 122.1 78.8 120.5 116V136";
export const IK_LOGO_VIEWBOX = "0 0 154 154";
export const IK_LOGO_STROKE_WIDTH = 25;
export const IK_ICON_SIZE = 36;
export const IK_ICON_RX = 8;
export const IK_SHADOW_OFFSET = 2;
export const IK_LOGO_SIZE = 22;
export const IK_LOGO_OFFSET = 7;

// Tight (full-bleed) bounds of the transparent artwork:
// base square spans 3..39, offset shadow spans 5..41 => content box is x/y 3..41 (38x38).
// Using this as the viewBox removes ALL outer padding so the icon fills the whole canvas.
export const IK_TIGHT_VIEWBOX = "3 3 38 38";
export const IK_TIGHT_SIZE = 38;

// Opaque (apple / android / ms tiles) artwork: full-bleed ink canvas, big centered mark.
// IK_OPAQUE_MARK_SIZE=44 of 70 keeps the mark inside the maskable safe zone (~80% circle).
export const IK_OPAQUE_CANVAS = 70;
export const IK_OPAQUE_MARK_SIZE = 44;

// Standalone IK monogram (browser favicon) bounds:
// The IK mark in 154x154 canvas with stroke 25 spans x: 16.5..137.5, y: 5.5..148.5.
// Centered symmetrically in a 138x138 box with viewBox "8 8 138 138" (canvas center 77, 77).
// Yields ~87.5% coverage on 16/32/48/96px grids with completely transparent corners (no clipping).
export const IK_MONOGRAM_VIEWBOX = "8 8 138 138";
export const IK_MONOGRAM_SIZE = 138;

export function generateIkIconSvg({
  shadowColor = themeColors.retro.pink,
  bgSquareColor = themeColors.retro.ink,
  markColor = themeColors.retro.paper,
  opaque = false,
  canvasBgColor = themeColors.retro.ink,
  maskable = false,
} = {}) {
  if (opaque || maskable) {
    // Fully opaque, full-bleed canvas (no inner "box on a box"): the whole 70x70 canvas is
    // themeColors.retro.ink and the IkIcon mark is scaled up and centered, with the pink
    // offset shadow applied to the mark itself. Mark box is 44/70 (63%), inside the maskable safe zone.
    const c = IK_OPAQUE_CANVAS;
    const m = IK_OPAQUE_MARK_SIZE;
    const pos = (c - m) / 2;
    const mark = (
      color,
      dx,
      dy
    ) => `  <svg x="${pos + dx}" y="${pos + dy}" width="${m}" height="${m}" viewBox="${IK_LOGO_VIEWBOX}" fill="none">
    <path d="${IK_LOGO_PATH}" stroke="${color}" stroke-width="${IK_LOGO_STROKE_WIDTH}" stroke-linejoin="round"/>
  </svg>`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${c} ${c}" width="${c}" height="${c}" fill="none">
  <rect width="${c}" height="${c}" fill="${canvasBgColor}"/>
${mark(shadowColor, IK_SHADOW_OFFSET, IK_SHADOW_OFFSET)}
${mark(markColor, 0, 0)}
</svg>
`;
  }

  // Transparent, full-bleed artwork: viewBox is cropped to the exact artwork bounds
  // (base square + 2px offset pink shadow), so there is zero outer padding and the icon
  // uses 100% of the canvas. Only the rounded corners / shadow notches stay transparent.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${IK_TIGHT_VIEWBOX}" width="${IK_TIGHT_SIZE}" height="${IK_TIGHT_SIZE}" fill="none">
  <rect x="5" y="5" width="${IK_ICON_SIZE}" height="${IK_ICON_SIZE}" rx="${IK_ICON_RX}" fill="${shadowColor}"/>
  <rect x="3" y="3" width="${IK_ICON_SIZE}" height="${IK_ICON_SIZE}" rx="${IK_ICON_RX}" fill="${bgSquareColor}"/>
  <g transform="translate(10 10)">
    <svg width="${IK_LOGO_SIZE}" height="${IK_LOGO_SIZE}" viewBox="${IK_LOGO_VIEWBOX}" fill="none">
      <path d="${IK_LOGO_PATH}" stroke="${markColor}" stroke-width="${IK_LOGO_STROKE_WIDTH}" stroke-linejoin="round"/>
    </svg>
  </g>
</svg>
`;
}

export function generateIkMonogramSvg({
  color = themeColors.retro.pink,
  responsive = false,
  darkColor = themeColors.retro.paper,
} = {}) {
  if (responsive) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${IK_MONOGRAM_VIEWBOX}" width="${IK_MONOGRAM_SIZE}" height="${IK_MONOGRAM_SIZE}" fill="none">
  <style>
    path { stroke: ${color}; }
    @media (prefers-color-scheme: dark) {
      path { stroke: ${darkColor}; }
    }
  </style>
  <path d="${IK_LOGO_PATH}" stroke="${color}" stroke-width="${IK_LOGO_STROKE_WIDTH}" stroke-linejoin="round"/>
</svg>
`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${IK_MONOGRAM_VIEWBOX}" width="${IK_MONOGRAM_SIZE}" height="${IK_MONOGRAM_SIZE}" fill="none">
  <path d="${IK_LOGO_PATH}" stroke="${color}" stroke-width="${IK_LOGO_STROKE_WIDTH}" stroke-linejoin="round"/>
</svg>
`;
}
