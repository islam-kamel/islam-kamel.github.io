export declare const IK_LOGO_PATH: string;
export declare const IK_LOGO_VIEWBOX: string;
export declare const IK_LOGO_STROKE_WIDTH: number;
export declare const IK_ICON_SIZE: number;
export declare const IK_ICON_RX: number;
export declare const IK_SHADOW_OFFSET: number;
export declare const IK_LOGO_SIZE: number;
export declare const IK_LOGO_OFFSET: number;

export interface IkIconSvgOptions {
  shadowColor?: string;
  bgSquareColor?: string;
  markColor?: string;
  opaque?: boolean;
  canvasBgColor?: string;
  maskable?: boolean;
}

export declare function generateIkIconSvg(options?: IkIconSvgOptions): string;
