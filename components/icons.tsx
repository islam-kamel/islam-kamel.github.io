import * as React from "react";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
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
  Mail,
  Menu,
  Send,
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
export const SendIcon = Send;
export const MailIcon = Mail;
export const GithubIcon = Github;
export const CalendarIcon = Calendar;
export const BookOpenIcon = BookOpen;
export const ArrowLeftIcon = ArrowLeft;
export const LinkedinIcon = Linkedin;
export const ArrowUpRightIcon = ArrowUpRight;
export const MenuIcon = Menu;
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
