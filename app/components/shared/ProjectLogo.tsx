"use client";

import Image from "next/image";
import {
  Scales,
  Heartbeat,
  GraduationCap,
  Briefcase,
  Scissors,
  ShoppingBag,
  DeviceMobile,
  Buildings,
  Code,
  Flask,
  Cube,
  Car,
  Package,
  Taxi,
  Monitor,
  WhatsappLogo,
  ChatCircleDots,
  TreeStructure,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

const CATEGORY_ICONS: Record<string, PhosphorIcon> = {
  judicial: Scales,
  healthcare: Heartbeat,
  education: GraduationCap,
  "professional-services": Briefcase,
  wellness: Scissors,
  ecommerce: ShoppingBag,
  mobile: DeviceMobile,
  enterprise: Buildings,
  automation: TreeStructure,
  "open-source": Code,
  rd: Flask,
};

const PROJECT_ICONS: Record<string, PhosphorIcon> = {
  autodeal: Car,
  "courier-go": Package,
  "ride-link": Taxi,
  bluevision: Monitor,
  "evolution-agent": WhatsappLogo,
  "whatsapp-sales-bot": ChatCircleDots,
  "n8n-templates-library": TreeStructure,
};

// Slugs whose marks carry white/light text and need a mid-tone well
const MID_TONE_SLUGS: string[] = [];

type ProjectLogoProps = {
  src?: string | null;
  name: string;
  category?: string;
  slug?: string;
  /** well height + max width, e.g. "h-11 max-w-[9rem]" */
  wellClassName?: string;
  iconSize?: number;
  /** Force white background on the logo well in both light and dark themes */
  forceWhiteBg?: boolean;
};

export default function ProjectLogo({
  src,
  name,
  category,
  slug,
  wellClassName = "h-14 max-w-[11rem]",
  iconSize = 28,
  forceWhiteBg = false,
}: ProjectLogoProps) {
  const SpecificIcon = slug ? PROJECT_ICONS[slug] : undefined;
  const FallbackIcon = SpecificIcon || (category && CATEGORY_ICONS[category]) || Cube;
  // If src is explicitly /project.png or not provided, or if this project has a specific Phosphor icon, use the icon!
  const useIcon = SpecificIcon !== undefined || !src || src === "/project.png";
  const midTone = slug ? MID_TONE_SLUGS.includes(slug) : false;

  return (
    <span
      className={`flex min-w-[3.25rem] items-center justify-center rounded-xl p-2 transition-all duration-300 ring-1 ${
        forceWhiteBg
          ? "bg-white ring-zinc-200 dark:bg-white dark:ring-zinc-200"
          : midTone
            ? "bg-zinc-400 ring-zinc-500 dark:bg-zinc-500 dark:ring-zinc-400"
            : useIcon
              ? "dark:bg-zinc-800/90 bg-zinc-100 ring-zinc-200/90 dark:ring-zinc-700/80 shadow-sm"
              : "bg-white ring-zinc-200 dark:ring-zinc-700"
      } ${wellClassName}`}
      role="img"
      aria-label={`${name} logo`}
    >
      {!useIcon && src ? (
        <Image
          src={src}
          width={320}
          height={96}
          alt=""
          aria-hidden="true"
          className="h-full w-auto max-w-full object-contain"
        />
      ) : (
        <FallbackIcon
          size={iconSize}
          weight="duotone"
          className="text-secondary-color dark:text-primary-color drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
