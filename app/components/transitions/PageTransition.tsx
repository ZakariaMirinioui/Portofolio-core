"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type TransitionTarget = {
  href: string;
  title: string;
};

export const PAGE_TRANSITION_EVENT = "portfolio:page-transition";

export function goToPage(target: TransitionTarget) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<TransitionTarget>(PAGE_TRANSITION_EVENT, { detail: target }));
}

type Phase = "idle" | "covering" | "revealing";

const COVER_MS = 480;
const REVEAL_MS = 550;

export default function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [target, setTarget] = useState<TransitionTarget | null>(null);
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
      setTarget(detail);
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

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-zinc-950 text-white will-change-transform ${
        phase === "idle"
          ? "pointer-events-none translate-y-full transition-none"
          : phase === "covering"
            ? "translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      }`}
    >
      {target && (
        <>
          <p className="font-incognito text-3xl md:text-5xl font-bold tracking-tight text-center px-6">
            {target.title}
          </p>
          <div className="h-0.5 w-44 overflow-hidden rounded bg-white/15">
            <div className="h-full w-1/3 animate-transition-bar bg-white/70" />
          </div>
        </>
      )}
    </div>
  );
}
