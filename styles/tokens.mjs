export function hexToRgb(hex) {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const themeColors = {
  retro: {
    bg: "#FAF8F5",
    paper: "#FFFFFF",
    ink: "#111111",
    muted: "#5A606B",
    pink: "#EE7C98",
    pinkHover: "#E56382",
    sage: "#DCE5DB",
    sageDark: "#C3D1C2",
    sageInk: "#2A342B",
    dark: "#0E1013",
    darkBorder: "#23272F",
    mutedLight: "#8E939E",
    body: "#333333",
    bodySubtle: "#444444",
    border: "#111111",
    proseHeading: "#222222",
    proseBody: "#282828",
    proseLinkHover: "#ff5c8a",
    proseQuoteBg: "#efece6",
    proseQuoteText: "#2c2c2c",
  },
  linkedin: "#0077B5",
};

export const primitiveColors = {
  violet: {
    from: "#FF1CF7",
    to: "#b249f8",
  },
  yellow: {
    from: "#FF705B",
    to: "#FFB457",
  },
  blue: {
    from: "#5EA2EF",
    to: "#0072F5",
  },
  cyan: {
    from: "#00b7fa",
    to: "#01cfea",
  },
  green: {
    from: "#6FEE8D",
    to: "#17c964",
  },
  pink: {
    from: "#FF72E1",
    to: "#F54C7A",
  },
  foreground: {
    from: "#FFFFFF",
    to: "#4B4B4B",
  },
};

export const comingSoonColors = ["#F34F29", "#F3B700", "#77878B"];

export const scrollbarColors = {
  thumb: "#888888",
  thumbHover: "#555555",
};

export const themeShadows = {
  retroXs: `1px 1px 0px 0px ${themeColors.retro.ink}`,
  retroSm: `2px 2px 0px 0px ${themeColors.retro.ink}`,
  retro: `3px 3px 0px 0px ${themeColors.retro.ink}`,
  retroMd: `4px 4px 0px 0px ${themeColors.retro.ink}`,
  retro5: `5px 5px 0px 0px ${themeColors.retro.ink}`,
  retroLg: `6px 6px 0px 0px ${themeColors.retro.ink}`,
  retroXl: `8px 8px 0px 0px ${themeColors.retro.ink}`,
};

export const themeGradients = {
  retroHaze: `radial-gradient(ellipse at top, ${hexToRgba(themeColors.retro.pink, 0.15)} 0%, transparent 70%)`,
};
