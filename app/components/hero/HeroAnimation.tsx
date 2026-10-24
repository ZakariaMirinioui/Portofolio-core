"use client";

import { useEffect, useState } from "react";
import HeroSvg from "../../assets/icons/HeroSvg";

export default function HeroAnimation() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!mounted) {
    return (
      <svg
        viewBox="0 0 1273 906"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="lg:w-[450px] w-full h-full opacity-0"
        aria-hidden="true"
      />
    );
  }

  return (
    <HeroSvg
      className={prefersReducedMotion ? "prefers-reduced-motion:animate-none" : ""}
      aria-hidden={prefersReducedMotion}
    />
  );
}