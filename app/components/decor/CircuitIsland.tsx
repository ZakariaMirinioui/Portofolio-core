"use client";

import { useEffect } from "react";

/**
 * The only client-side circuit code on the site. Toggles reveal state on
 * hosts (via inert data attributes — never React-managed className),
 * pauses on tab-hidden, replays the theme-pulse lap, and keeps working
 * across client-side remounts (Dossera form success state).
 */
export default function CircuitIsland() {
  useEffect(() => {
    const hosts = (): HTMLElement[] =>
      Array.from(document.querySelectorAll<HTMLElement>(".z-io"));

    const goStatic = () =>
      hosts().forEach((n) => {
        n.setAttribute("data-z-live", "");
        n.setAttribute("data-z-drawn", "");
      });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      goStatic();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const n = e.target as HTMLElement;
          if (e.isIntersecting) {
            n.setAttribute("data-z-live", "");
            n.setAttribute("data-z-drawn", "");
          } else {
            n.removeAttribute("data-z-live");
          }
        }
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.01 }
    );

    const attach = () => hosts().forEach((n) => io.observe(n));
    attach();

    const mo = new MutationObserver(attach);
    mo.observe(document.documentElement, { childList: true, subtree: true });

    const onHidden = () =>
      document.documentElement.classList.toggle("z-paused", document.hidden);
    document.addEventListener("visibilitychange", onHidden);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const pulse = () => {
      document.querySelectorAll<HTMLElement>(".z-theme").forEach((n) => {
        n.classList.remove("z-run");
        void n.offsetWidth;
        n.classList.add("z-run");
      });
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>(".z-theme")
          .forEach((n) => n.classList.remove("z-run"));
      }, 1500);
    };
    document.addEventListener("zm:theme-pulse", pulse);

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onHidden);
      document.removeEventListener("zm:theme-pulse", pulse);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
