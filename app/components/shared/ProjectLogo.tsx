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
  "open-source": Code,
  rd: Flask,
};

// Slugs whose marks carry white/light text and need a mid-tone well
// instead of the default white one. Keep empty unless such a mark ships.
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
  const FallbackIcon = (category && CATEGORY_ICONS[category]) || Cube;
  const midTone = slug ? MID_TONE_SLUGS.includes(slug) : false;

  return (
    <span
      className={`flex min-w-[3.5rem] items-center justify-center rounded-lg p-2 ring-1 ${
        forceWhiteBg
          ? "bg-white ring-zinc-200 dark:bg-white dark:ring-zinc-200"
          : midTone
            ? "bg-zinc-400 ring-zinc-500 dark:bg-zinc-500 dark:ring-zinc-400"
            : "bg-white ring-zinc-200 dark:ring-zinc-700"
      } ${wellClassName}`}
      role="img"
      aria-label={`${name} logo`}
    >
      {src ? (
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
          className="text-secondary-color dark:text-primary-color"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
