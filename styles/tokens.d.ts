export declare function hexToRgb(hex: string): {
  r: number;
  g: number;
  b: number;
};
export declare function hexToRgba(hex: string, alpha: number): string;

export interface RetroColors {
  readonly bg: string;
  readonly paper: string;
  readonly ink: string;
  readonly muted: string;
  readonly pink: string;
  readonly pinkHover: string;
  readonly sage: string;
  readonly sageDark: string;
  readonly sageInk: string;
  readonly dark: string;
  readonly darkBorder: string;
  readonly mutedLight: string;
  readonly body: string;
  readonly bodySubtle: string;
  readonly border: string;
  readonly proseHeading: string;
  readonly proseBody: string;
  readonly proseLinkHover: string;
  readonly proseQuoteBg: string;
  readonly proseQuoteText: string;
}

export interface ThemeColors {
  readonly retro: RetroColors;
  readonly linkedin: string;
}

export declare const themeColors: ThemeColors;

export declare const primitiveColors: Record<
  string,
  { readonly from: string; readonly to: string }
>;

export declare const comingSoonColors: readonly string[];

export declare const scrollbarColors: {
  readonly thumb: string;
  readonly thumbHover: string;
};

export declare const themeShadows: {
  readonly retroXs: string;
  readonly retroSm: string;
  readonly retro: string;
  readonly retroMd: string;
  readonly retro5: string;
  readonly retroLg: string;
  readonly retroXl: string;
};

export declare const themeGradients: {
  readonly retroHaze: string;
};
