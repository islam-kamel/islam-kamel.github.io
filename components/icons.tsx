import * as React from "react";
import {
  Activity,
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Server,
  X,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

import { IconSvgProps } from "@/types";
import {
  IK_ICON_RX,
  IK_ICON_SIZE,
  IK_LOGO_OFFSET,
  IK_LOGO_PATH,
  IK_LOGO_SIZE,
  IK_LOGO_STROKE_WIDTH,
  IK_LOGO_VIEWBOX,
  IK_SHADOW_OFFSET,
} from "@/lib/ik-icon-data.mjs";

export type { LucideIcon, LucideProps };

export const LayersIcon = Layers;
export const BotIcon = Bot;
export const ActivityIcon = Activity;
export const BarChart3Icon = BarChart3;
export const Code2Icon = Code2;
export const ServerIcon = Server;
export const CpuIcon = Cpu;
export const GraduationCapIcon = GraduationCap;
export const AwardIcon = Award;
export const CheckCircle2Icon = CheckCircle2;
export const GithubIcon = Github;
export const CalendarIcon = Calendar;
export const BookOpenIcon = BookOpen;
export const ArrowLeftIcon = ArrowLeft;
export const LinkedinIcon = Linkedin;
export const CloseIcon = X;

export const Logo: React.FC<IconSvgProps> = (props) => {
  const { size = "40", width } = props;

  return (
    <svg
      className={"logo"}
      fill="none"
      height={size ?? width}
      viewBox={IK_LOGO_VIEWBOX}
      width={size ?? width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={"draw"}
        d={IK_LOGO_PATH}
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={IK_LOGO_STROKE_WIDTH}
      />
    </svg>
  );
};

export const IkIcon = () => (
  <svg
    className="group overflow-visible"
    fill="none"
    height={IK_ICON_SIZE}
    viewBox={`0 0 ${IK_ICON_SIZE} ${IK_ICON_SIZE}`}
    width={IK_ICON_SIZE}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <rect
      className="fill-retro-pink group-hover:fill-retro-ink transition-colors"
      height={IK_ICON_SIZE}
      rx={IK_ICON_RX}
      width={IK_ICON_SIZE}
      x={IK_SHADOW_OFFSET}
      y={IK_SHADOW_OFFSET}
    />

    {/* Background */}
    <rect
      className="fill-retro-ink group-hover:fill-retro-pink transition-colors"
      height={IK_ICON_SIZE}
      rx={IK_ICON_RX}
      width={IK_ICON_SIZE}
    />

    <g
      className="text-retro-bg group-hover:text-retro-ink"
      transform={`translate(${IK_LOGO_OFFSET} ${IK_LOGO_OFFSET})`}
    >
      <Logo
        className="group-hover:scale-105 transition-transform origin-center"
        size={IK_LOGO_SIZE}
      />
    </g>
  </svg>
);

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const PixelsEmail = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <title>{"chat-email"}</title>
    <g>
      <path
        d="M30.47 1.53H32v15.24h-1.53Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="m28.95 19.81 -1.52 0 0 1.53 3.04 0 0 -4.57 -1.52 0 0 3.04z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M25.9 18.29h1.53v1.52H25.9Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M24.38 12.19h4.57v1.53h-4.57Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M24.38 9.15h4.57v1.52h-4.57Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path d="M25.9 6.1h3.05v1.52H25.9Z" fill="currentColor" strokeWidth={1} />
      <path
        d="M21.33 3.05h7.62v1.53h-7.62Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M24.38 16.77h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="m22.86 15.24 0 -4.57 -1.53 0 0 15.24 1.53 0 0 -9.14 1.52 0 0 -1.53 -1.52 0z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M12.19 6.1h12.19v1.52H12.19Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M15.24 25.91h6.09v1.52h-6.09Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M15.24 3.05h4.57v1.53h-4.57Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M4.57 13.72v9.14h13.71v-9.14Zm12.19 3.05h-1.52v1.52h-1.53v1.52H9.14v-1.52H7.62v-1.52H6.09v-1.53h1.53v1.53h1.52v1.52h4.57v-1.52h1.53v-1.53h1.52Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="m13.71 30.48 -1.52 0 0 1.52 3.05 0 0 -4.57 -1.53 0 0 3.05z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M12.19 3.05h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M10.66 0h19.81v1.53H10.66Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M10.66 28.96h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M9.14 27.43h1.52v1.53H9.14Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M1.52 25.91h7.62v1.52H1.52Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="m21.33 10.67 0 -1.52 -10.67 0 0 -7.62 -1.52 0 0 7.62 -7.62 0 0 1.52 19.81 0z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path d="M0 10.67h1.52v15.24H0Z" fill="currentColor" strokeWidth={1} />
    </g>
  </svg>
);

export const PixelsSendEmail = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <title>{"email-mailbox-close"}</title>
    <g>
      <path
        d="M28.185 9.14h1.53v12.19h-1.53Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M26.665 7.62h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M3.805 22.86h9.14V32h1.53v-9.14h4.57V32h1.52v-9.14h7.62v-1.53h-13.71V9.14h-1.53V7.62h6.1v4.57h1.52V7.62h6.1V6.09h-6.1V4.57h4.57V0h-6.09v6.09H5.325v1.53h-1.52v1.52h-1.52v12.19h1.52Zm16.76 -21.34h3.05v1.53h-3.05Zm-16.76 9.14h1.52V9.14h3.05v1.52h-3.05v7.62h-1.52Z"
        fill="currentColor"
        strokeWidth={1}
      />
    </g>
  </svg>
);

export const PixelsArrowUpRight = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      d="M28.121 3.88782H11.9538V6.57352H22.7319V9.2769H25.4176V20.0374H28.121V3.88782Z"
      fill="currentColor"
    />
    <path
      d="M22.7319 9.27692H20.0286V11.9626H22.7319V9.27692Z"
      fill="currentColor"
    />
    <path
      d="M20.0285 11.9626H17.3428V14.6484H20.0285V11.9626Z"
      fill="currentColor"
    />
    <path
      d="M17.3428 14.6484H14.6571V17.3517H17.3428V14.6484Z"
      fill="currentColor"
    />
    <path
      d="M14.6571 17.3517H11.9538V20.0374H14.6571V17.3517Z"
      fill="currentColor"
    />
    <path
      d="M11.9537 20.0374H9.26804V22.7408H11.9537V20.0374Z"
      fill="currentColor"
    />
    <path
      d="M9.26804 22.7407H6.56467V25.4264H9.26804V22.7407Z"
      fill="currentColor"
    />
    <path
      d="M6.56467 25.4265H3.87897V28.1122H6.56467V25.4265Z"
      fill="currentColor"
    />
  </svg>
);

export const PixelsMenu = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path d="M31.24 3.81001H29.71V28.19H31.24V3.81001Z" fill="currentColor" />
    <path d="M29.71 28.19H28.19V29.71H29.71V28.19Z" fill="currentColor" />
    <path d="M29.71 2.28H28.19V3.81H29.71V2.28Z" fill="currentColor" />
    <path d="M28.19 29.71H3.81V31.24H28.19V29.71Z" fill="currentColor" />
    <path
      d="M25.14 20.57H6.86V22.09H5.33V25.14H6.86V23.62H25.14V25.14H26.67V22.09H25.14V20.57Z"
      fill="currentColor"
    />
    <path
      d="M25.14 12.95H6.86V14.47H5.33V17.52H6.86V16H25.14V17.52H26.67V14.47H25.14V12.95Z"
      fill="currentColor"
    />
    <path
      d="M25.14 5.33H6.86V6.85H5.33V9.9H6.86V8.38H25.14V9.9H26.67V6.85H25.14V5.33Z"
      fill="currentColor"
    />
    <path d="M25.14 25.14H6.86V26.66H25.14V25.14Z" fill="currentColor" />
    <path d="M25.14 17.52H6.86V19.04H25.14V17.52Z" fill="currentColor" />
    <path d="M25.14 9.9H6.86V11.43H25.14V9.9Z" fill="currentColor" />
    <path d="M28.19 0.760002H3.81V2.28H28.19V0.760002Z" fill="currentColor" />
    <path d="M3.81 28.19H2.29V29.71H3.81V28.19Z" fill="currentColor" />
    <path d="M3.81 2.28H2.29V3.81H3.81V2.28Z" fill="currentColor" />
    <path d="M2.29 3.81001H0.76V28.19H2.29V3.81001Z" fill="currentColor" />
  </svg>
);

export const PixelsPencil = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <g>
      <path
        d="M21.335 9.14h1.52v9.15h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12.2 3.05V1.52h-1.53v1.53H9.145v21.33h1.52V12.19h7.62v12.19h1.52V9.14h1.53V7.62h-1.53V3.05h-1.52V1.52h-1.52v1.53Zm6.09 1.52V6.1h-7.62V4.57Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m10.665 24.38 0 3.05 1.53 0 0 -1.52 4.57 0 0 1.52 1.52 0 0 -3.05 -7.62 0z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M15.235 27.43h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12.195 0h4.57v1.52h-4.57Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M13.715 28.95h1.52V32h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12.195 27.43h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
    </g>
  </svg>
);

export const PixelsCursorClick = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <g>
      <path
        d="m22.85 24.38 0 3.05 1.53 0 0 -1.53 3.05 0 0 -3.04 -1.53 0 0 1.52 -3.05 0z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M24.38 27.43h1.52v3.05h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M24.38 21.33h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M22.85 19.81h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M21.33 30.48h3.05V32h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M21.33 18.29h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M21.33 4.57h1.52v9.14h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.81 27.43h1.52v3.05h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.81 16.76h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.81 3.05h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18.28 25.9h1.53v1.53h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18.28 15.24h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18.28 6.1h1.53v6.09h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18.28 1.52h1.53v1.53h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M16.76 4.57h1.52V6.1h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m16.76 15.24 1.52 0 0 -1.53 -1.52 0 0 -1.52 -1.52 0 0 18.29 1.52 0 0 -1.53 1.52 0 0 -1.52 -1.52 0 0 -12.19z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m13.71 12.19 0 -1.52 3.05 0 0 -3.05 -1.52 0 0 -1.52 -3.05 0 0 1.52 -1.53 0 0 3.05 1.53 0 0 1.52 1.52 0z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M10.66 3.05h6.1v1.52h-6.1Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M9.14 16.76h4.57v1.53H9.14Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M10.66 13.71h3.05v1.53h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path d="M9.14 0h9.14v1.52H9.14Z" fill="currentColor" strokeWidth="1" />
      <path
        d="M9.14 12.19h1.52v1.52H9.14Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path d="M9.14 4.57h1.52V6.1H9.14Z" fill="currentColor" strokeWidth="1" />
      <path
        d="M7.62 15.24h1.52v1.52H7.62Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path d="M7.62 6.1h1.52v6.09H7.62Z" fill="currentColor" strokeWidth="1" />
      <path
        d="M7.62 1.52h1.52v1.53H7.62Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6.09 13.71h1.53v1.53H6.09Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6.09 3.05h1.53v1.52H6.09Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M4.57 4.57h1.52v9.14H4.57Z"
        fill="currentColor"
        strokeWidth="1"
      />
    </g>
  </svg>
);

export const PixelsEduction = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <g>
      <path
        d="M19.81 22.855v-1.52h-1.52v1.52h-7.62v-1.52H9.15v-4.57h1.52v-1.53h7.62v1.53h1.52v-1.53h10.67v1.53H32v-3.05h-6.09V12.2h-1.52v1.52h-9.15V12.2h-1.52v-1.53h1.52V9.145h9.15v1.52h1.52V6.1h-1.52v1.52h-9.15V6.1h-1.52v1.52H1.53v1.53H0v4.57h1.53v1.52h1.52v1.53h1.53v-1.53h3.04v1.53H6.1v4.57h1.52v1.52H4.58v-1.52H3.05v1.52H1.53v1.53H0v4.57h1.53v1.52H32v-3.05h-1.52v1.53H18.29v-1.53h-1.52v-1.52h1.52v-1.52h12.19v1.52H32v-4.57h-1.52v1.52ZM6.1 12.2H3.05v-1.53H6.1Zm7.62 13.71H12.2v1.52h1.52v1.53H12.2v-1.53h-1.53v-1.52h1.53v-1.52h1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M28.96 16.765h1.52v4.57h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.81 25.905h10.67v1.52H19.81Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M21.34 19.805h6.09v1.53h-6.09Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M21.34 16.765h6.09v1.52h-6.09Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M16.77 10.665h7.62v1.53h-7.62Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M16.77 4.575h7.62v1.52h-7.62Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M16.77 16.765h1.52v4.57h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12.2 4.575h1.52v1.52H12.2Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M3.05 4.575H6.1v1.52H3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m13.72 3.045 0 1.53 1.52 0 0 -1.53 9.15 0 0 1.53 1.52 0 0 -3.05 -24.38 0 0 1.52 12.19 0z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M1.53 16.765h1.52v4.57H1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path d="M0 3.045h1.53v4.57H0Z" fill="currentColor" strokeWidth="1" />
    </g>
  </svg>
);

export const PixelsFactory = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <g>
      <path
        d="M30.47 9.145H32v21.33h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m30.47 1.525 -4.57 0 0 7.62 1.53 0 0 -6.1 1.52 0 0 6.1 1.52 0 0 -7.62z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M27.43 24.385h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M27.43 18.285h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M27.43 12.195h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m24.38 12.195 -3.05 0 0 1.52 3.05 0 0 16.76 1.52 0 0 -21.33 -1.52 0 0 3.05z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M21.33 3.045h1.53v1.53h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.81 18.285h3.05v3.05h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18.28 1.525h3.05v1.52h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18.28 13.715h3.05v1.52h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M15.24 24.385h3.04v3.04h-3.04Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M15.24 15.235h3.04v1.53h-3.04Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M15.24 3.045h3.04v1.53h-3.04Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M13.71 1.525h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m13.71 12.195 -3.05 0 0 1.52 1.53 0 0 16.76 1.52 0 0 -12.19 1.53 0 0 -1.52 -1.53 0 0 -4.57z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M9.14 6.095h1.52v1.52H9.14Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M7.62 18.285h3.04v3.05H7.62Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M7.62 13.715h3.04v1.52H7.62Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6.09 4.575h3.05v1.52H6.09Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M4.57 15.235h3.05v1.53H4.57Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M3.05 24.385h3.04v3.04H3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M3.05 6.095h3.04v1.52H3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M1.52 16.765h3.05v1.52H1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M1.52 4.575h1.53v1.52H1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path d="M0 18.285h1.52v12.19H0Z" fill="currentColor" strokeWidth="1" />
    </g>
  </svg>
);

export const PixelsComputer = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <g>
      <path
        d="M29.71 1.53h1.53v18.28h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m2.28 30.48 0 -1.52 -1.52 0 0 3.04 30.48 0 0 -3.04 -1.53 0 0 1.52 -27.43 0z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M28.19 27.43h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M26.67 25.91h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6.86 22.86v1.52h18.28v-1.52h-4.57v-1.52h9.14v-1.53H2.28v1.53h9.15v1.52Zm6.09 -1.52h6.1v1.52h-6.1Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M25.14 24.38h1.53v1.53h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M28.19 3.05H3.81v15.24h24.38Zm-1.52 13.71H5.33V4.57h21.34Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M23.62 27.43h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M22.09 25.91h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m19.05 10.67 1.52 0 0 1.52 1.52 0 0 -1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 -1.52 0 0 -1.52 -1.53 0 0 1.52 -1.52 0 0 -1.52 -1.52 0 0 1.52 -1.53 0 0 1.53 1.53 0 0 1.52z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.05 27.43h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M17.52 25.91h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14.47 27.43H16v1.53h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12.95 25.91h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M11.43 27.43h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M8.38 25.91H9.9v1.52H8.38Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6.86 27.43h1.52v1.53H6.86Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M5.33 24.38h1.53v1.53H5.33Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M3.81 25.91h1.52v1.52H3.81Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path d="M2.28 0h27.43v1.53H2.28Z" fill="currentColor" strokeWidth="1" />
      <path
        d="M2.28 27.43h1.53v1.53H2.28Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0.76 1.53h1.52v18.28H0.76Z"
        fill="currentColor"
        strokeWidth="1"
      />
    </g>
  </svg>
);

export const PixelsWebsite = ({
  size = 32,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height ?? size}
    role="presentation"
    viewBox="0 0 32 32"
    width={width ?? size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M30.48 7.625H1.53v-4.57H0v25.9h1.53V9.145h28.95v19.81H32v-25.9h-1.52zM1.53 28.955h28.95v1.52H1.53Z"
      fill="currentColor"
    />
    <path
      d="M25.91 19.815h1.52v4.57h-1.52Zm-1.53 4.57h1.53v1.52h-1.53Zm0-6.1h1.53v1.53h-1.53Zm-4.57 7.62h4.57v1.53h-4.57Zm4.57-7.62v-1.52h-1.52v-6.09H4.57v9.14h3.05v-1.53H6.1v-6.09h15.24v4.57h-1.53v1.52zm-6.09 6.1h1.52v1.52h-1.52Z"
      fill="currentColor"
    />
    <path
      d="M18.29 18.285h1.52v1.53h-1.52Zm-1.53 1.53h1.53v4.57h-1.53ZM9.14 4.575h1.53v1.52H9.14ZM6.1 21.335v1.53H4.57v1.52h10.67v-4.57h-1.52v-1.53h-1.53v-1.52h-1.52v1.52H9.14v1.53H7.62v1.52zm0-16.76h1.52v1.52H6.1Zm-3.05 0h1.52v1.52H3.05Zm-1.52-3.05h28.95v1.53H1.53Z"
      fill="currentColor"
    />
  </svg>
);

export const PixelsDatabase = ({
  size = 32,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height ?? size}
    role="presentation"
    viewBox="0 0 32 32"
    width={width ?? size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1128_25102)">
      <path
        d="M28.19 27.43H29.72V25.91H31.24V6.1H29.72V7.62H28.19V9.14H23.62V10.67H8.38V12.19H22.1V19.81H23.62V18.29H28.19V16.76H29.72V18.29H28.19V19.81H23.62V21.33H22.1V28.95H8.38V30.48H23.62V28.95H28.19V27.43Z"
        fill="currentColor"
      />
      <path d="M29.72 4.57H26.67V6.1H29.72V4.57Z" fill="currentColor" />
      <path d="M26.67 3.05H22.1V4.57H26.67V3.05Z" fill="currentColor" />
      <path d="M22.1 19.81H8.38V21.33H22.1V19.81Z" fill="currentColor" />
      <path d="M14.48 24.38H9.91V25.91H14.48V24.38Z" fill="currentColor" />
      <path d="M14.48 15.24H9.91V16.76H14.48V15.24Z" fill="currentColor" />
      <path d="M22.1 1.52H9.91V3.05H22.1V1.52Z" fill="currentColor" />
      <path d="M8.38 27.43H3.81V28.95H8.38V27.43Z" fill="currentColor" />
      <path d="M8.38 18.29H3.81V19.81H8.38V18.29Z" fill="currentColor" />
      <path d="M8.38 9.14H3.81V10.67H8.38V9.14Z" fill="currentColor" />
      <path d="M9.91 3.05H5.33V4.57H9.91V3.05Z" fill="currentColor" />
      <path d="M6.86 21.33H3.81V24.38H6.86V21.33Z" fill="currentColor" />
      <path d="M6.86 12.19H3.81V15.24H6.86V12.19Z" fill="currentColor" />
      <path d="M5.33 4.57H2.29V6.1H5.33V4.57Z" fill="currentColor" />
      <path d="M3.81 25.91H2.29V27.43H3.81V25.91Z" fill="currentColor" />
      <path
        d="M2.29 18.29H3.81V16.76H2.29V9.14H3.81V7.62H2.29V6.1H0.76V25.91H2.29V18.29Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1128_25102">
        <rect fill="white" height="32" width="32" />
      </clipPath>
    </defs>
  </svg>
);

export const PixelsRobot = ({
  size = 32,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height ?? size}
    role="presentation"
    viewBox="0 0 32 32"
    width={width ?? size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M28.955 16.76h1.52v7.62h-1.52Zm-1.53-15.24h1.53v6.1h-1.53Z"
      fill="currentColor"
    />
    <path
      d="M27.425 16.76h1.53v-1.52h-1.53v-1.53h-1.52v15.24h1.52V25.9h1.53v-1.52h-1.53zm-1.52-9.14h1.52v1.52h-1.52Zm0-7.62h1.52v1.52h-1.52Zm-1.53 28.95h1.53v1.53h-1.53Zm0-16.76h1.53v1.52h-1.53Zm-1.52 4.57h1.52v3.05h-1.52Zm0-13.71h1.52v3.04h-1.52ZM7.615 30.48h16.76V32H7.615Zm12.19-15.24h3.05v1.52h-3.05Zm1.53-9.15h1.52v1.53h-1.52Zm0-4.57h1.52v1.53h-1.52Zm-1.53 18.29h3.05v1.52h-3.05Zm-9.14 4.57v1.52h1.52v1.53h1.53v1.52h4.57v-1.52h1.52V25.9h1.53v-1.52zm7.62-7.62h1.52v3.05h-1.52Zm-4.57 6.1h4.57v-1.53h-1.53v-1.52h-1.52v1.52h-1.52zm-1.53-6.1h1.53v3.05h-1.53Zm-3.04 3.05h3.04v1.52h-3.04Zm0-4.57h3.04v1.52h-3.04Z"
      fill="currentColor"
    />
    <path
      d="M24.375 12.19v-1.52h-7.62V7.62h1.53V6.09h1.52V1.52h-1.52V0h-4.57v1.52h-1.53v4.57h1.53v1.53h1.52v3.05h-7.62v1.52z"
      fill="currentColor"
    />
    <path
      d="M9.145 6.09h1.52v1.53h-1.52Zm0-4.57h1.52v1.53h-1.52Zm-1.53 15.24h1.53v3.05h-1.53Zm0-13.71h1.53v3.04h-1.53Zm-1.52 25.9h1.52v1.53h-1.52Zm0-16.76h1.52v1.52h-1.52Zm0 1.52h-1.53v1.53h-1.52v1.52h1.52v7.62h-1.52v1.52h1.52v3.05h1.53zm-1.53-6.09h1.53v1.52h-1.53Zm0-7.62h1.53v1.52h-1.53Zm-1.52 1.52h1.52v6.1h-1.52Z"
      fill="currentColor"
    />
    <path d="M1.525 16.76h1.52v7.62h-1.52Z" fill="currentColor" />
  </svg>
);

export const PixelsBroadcast = ({
  size = 32,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height ?? size}
    role="presentation"
    viewBox="0 0 32 32"
    width={width ?? size}
    {...props}
  >
    <path
      d="M1.52 30.475h28.96v-1.52H32v-10.67h-1.52v-1.52H1.52v1.52H0v10.67h1.52Zm24.38-10.66h3.05v3.05H25.9Zm-7.61 0h4.57v1.52h-3.05v1.53h3.05v1.52h-3.05v1.52h3.05v1.53h-4.57Zm-6.1 0h1.52v6.09h1.53v-6.09h1.52v6.09h-1.52v1.53h-1.53v-1.53h-1.52Zm-3.05 0h1.53v7.62H9.14Zm-6.09 0h1.52v6.09h3.05v1.53H3.05ZM25.9 7.625h1.53v1.52H25.9Zm-1.52-1.53h1.52v1.53h-1.52Zm-1.52 4.57h1.52v1.53h-1.52Zm-1.53-1.52h1.53v1.52h-1.53Zm0-4.57h3.05v1.52h-3.05Zm-3.04 3.05h3.04v1.52h-3.04Zm0 4.57h1.52v1.52h-1.52Zm0-9.14h3.04v1.52h-3.04Zm-4.58 7.61h4.58v1.53h-4.58Zm0-4.57h4.58v1.53h-4.58Zm0-4.57h4.58v1.53h-4.58Zm-1.52 10.67h1.52v1.52h-1.52Zm-1.52-9.14h3.04v1.52h-3.04Zm0 4.57h3.04v1.52h-3.04Zm-1.53 1.52h1.53v1.52H9.14Zm-1.52-4.57h3.05v1.52H7.62Zm0 6.09h1.52v1.53H7.62ZM6.1 6.095h1.52v1.53H6.1Zm-1.53 1.53H6.1v1.52H4.57Z"
      fill="currentColor"
    />
  </svg>
);

export const PixelsKing = ({
  size = 32,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height ?? size}
    role="presentation"
    viewBox="0 0 32 32"
    width={width ?? size}
    {...props}
  >
    <g>
      <path
        d="M29.715 9.145h1.52v3.04h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M26.665 7.615h3.05v1.53h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m26.665 18.285 1.53 0 0 -4.57 1.52 0 0 -1.53 -3.05 0 0 -3.04 -1.52 0 0 4.57 1.52 0 0 4.57z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m25.145 19.805 -1.53 0 0 1.53 1.53 0 0 1.52 -18.29 0 0 -1.52 1.53 0 0 -1.53 -1.53 0 0 -1.52 -1.52 0 0 7.62 1.52 0 0 1.52 18.29 0 0 -1.52 1.52 0 0 -7.62 -1.52 0 0 1.52z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M23.615 13.715h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M22.095 15.235h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M20.575 16.765h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.045 19.805h3.05v1.53h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M19.045 13.715h1.53v3.05h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M17.525 10.665h1.52v3.05h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M17.525 6.095h1.52v3.05h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14.475 9.145h3.05v1.52h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14.475 4.575h3.05v1.52h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14.475 18.285h3.05v3.05h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12.955 10.665h1.52v3.05h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M12.955 6.095h1.52v3.05h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M11.425 13.715h1.53v3.05h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M9.905 19.805h3.05v1.53h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M9.905 16.765h1.52v1.52h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M8.385 15.235h1.52v1.53h-1.52Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6.855 13.715h1.53v1.52h-1.53Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="m2.285 12.185 0 1.53 1.53 0 0 4.57 1.52 0 0 -4.57 1.52 0 0 -4.57 -1.52 0 0 3.04 -3.05 0z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M2.285 7.615h3.05v1.53h-3.05Z"
        fill="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0.765 9.145h1.52v3.04H0.765Z"
        fill="currentColor"
        strokeWidth="1"
      />
    </g>
  </svg>
);

export const King = PixelsKing;
export const Broadcast = PixelsBroadcast;
export const Robot = PixelsRobot;
export const Database = PixelsDatabase;
export const Website = PixelsWebsite;
export const Computer = PixelsComputer;
export const MenuIcon = PixelsMenu; //Menu;
export const MailIcon = PixelsEmail; //Mail;
export const SendIcon = PixelsSendEmail; //Send;
export const ArrowUpRightIcon = PixelsArrowUpRight; //ArrowUpRight;
export const Pencil = PixelsPencil;
export const CursorClick = PixelsCursorClick;
export const Eduction = PixelsEduction;
export const Factory = PixelsFactory;
