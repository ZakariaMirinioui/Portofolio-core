"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUp } from "@phosphor-icons/react";

export type TransitionDirection = "up" | "left" | "right";

export type TransitionTarget = {
  href: string;
  title: string;
  direction?: TransitionDirection;
};

export const PAGE_TRANSITION_EVENT = "portfolio:page-transition";

/** Canonical top-level journey order, left to right. */
export const NAV_ORDER = ["/", "/about", "/projects", "/services", "/dossera"];

/** Which side the target page sits on relative to where we stand. */
export function directionFor(fromPathname: string, toHref: string): TransitionDirection {
  const from = NAV_ORDER.indexOf(fromPathname);
  const to = NAV_ORDER.indexOf(toHref);
  if (from === -1 || to === -1 || from === to) return "up";
  return to < from ? "left" : "right";
}

export function goToPage(target: TransitionTarget) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<TransitionTarget>(PAGE_TRANSITION_EVENT, { detail: target }));
}

type Phase = "idle" | "covering" | "revealing";

const COVER_MS = 480;
const REVEAL_MS = 550;

const PARK_CLASS: Record<TransitionDirection, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  up: "translate-y-full",
};

const EXIT_CLASS: Record<TransitionDirection, string> = {
  left: "translate-x-full",
  right: "-translate-x-full",
  up: "-translate-y-full",
};

const DIRECTION_ICON = {
  left: ArrowLeft,
  right: ArrowRight,
  up: ArrowUp,
} as const;

export default function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [target, setTarget] = useState<TransitionTarget | null>(null);
  const [direction, setDirection] = useState<TransitionDirection>("up");
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  useEffect(() => {
    const onStart = (e: Event) => {
      const detail = (e as CustomEvent<TransitionTarget>).detail;
      if (!detail?.href || phaseRef.current !== "idle") return;
      if (detail.href === pathname) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        router.push(detail.href);
        return;
      }
      const dir = detail.direction || "up";
      setTarget(detail);
      setDirection(dir);
      setPhase("covering");
      document.body.style.overflow = "hidden";
      timers.current.push(
        window.setTimeout(() => router.push(detail.href), COVER_MS)
      );
    };
    window.addEventListener(PAGE_TRANSITION_EVENT, onStart);
    return () => window.removeEventListener(PAGE_TRANSITION_EVENT, onStart);
  }, [pathname, router]);

  useEffect(() => {
    if (phase === "covering" && target) {
      setPhase("revealing");
      timers.current.push(
        window.setTimeout(() => {
          setPhase("idle");
          setTarget(null);
          document.body.style.overflow = "";
        }, REVEAL_MS)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = "";
    };
  }, []);

  const DirectionIcon = DIRECTION_ICON[direction];

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-zinc-950 text-white will-change-transform ${
        phase === "idle"
          ? `pointer-events-none transition-none ${PARK_CLASS[direction]}`
          : phase === "covering"
            ? "translate-x-0 translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : `${EXIT_CLASS[direction]} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`
      }`}
    >
      {target && (
        <>
          <span className="flex items-center gap-3">
            <DirectionIcon size={28} aria-hidden="true" />
            <span className="font-incognito text-3xl md:text-5xl font-bold tracking-tight text-center">
              {target.title}
            </span>
          </span>
          <span className="block h-0.5 w-44 overflow-hidden rounded bg-white/15">
            <span className="block h-full w-1/3 animate-transition-bar bg-white/70" />
          </span>
        </>
      )}
    </div>
  );
}
