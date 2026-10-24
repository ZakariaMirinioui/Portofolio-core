"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  List,
  X,
  House,
  User,
  SquaresFour,
  Briefcase,
  Scales,
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  Globe,
} from "@phosphor-icons/react";
import { directionFor, goToPage } from "../transitions/PageTransition";

export default function MobileMenu() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");
  const [navShow, setNavShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { title: t("home"), href: "/", icon: House, exact: true },
    { title: t("about"), href: "/about", icon: User, exact: false },
    { title: t("projects"), href: "/projects", icon: SquaresFour, exact: false },
    { title: t("services"), href: "/services", icon: Briefcase, exact: false },
    { title: t("dossera"), href: "/dossera", icon: Scales, exact: false },
  ];

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  const closeNav = () => {
    document.body.style.overflow = "auto";
    setNavShow(false);
  };

  const switchLocale = (target: "en" | "fr") => {
    if (target === locale) return;
    window.localStorage.setItem("locale", target);
    closeNav();
    router.push(pathname, { locale: target });
  };

  useEffect(() => {
    if (navShow) {
      const trigger = triggerRef.current;
      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => {
        document.removeEventListener("keydown", handleTab);
        trigger?.focus();
      };
    }
  }, [navShow]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navShow) {
        closeNav();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [navShow]);

  const isLinkActive = (href: string, exact: boolean) => {
    if (exact) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <button
        ref={triggerRef}
        aria-label={navShow ? t("closeMenu") : t("openMenu")}
        aria-expanded={navShow}
        aria-controls="mobile-menu"
        onClick={onToggleNav}
        type="button"
        className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl dark:bg-zinc-800/80 bg-zinc-100 border dark:border-zinc-700/80 border-zinc-200 text-zinc-700 dark:text-zinc-200 hover:dark:border-primary-color/50 hover:border-secondary-color/50 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-color shadow-sm"
      >
        <List size={22} weight="bold" aria-hidden="true" />
      </button>

      <div
        className={
          "md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 " +
          (navShow ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        onClick={closeNav}
        aria-hidden="true"
      />

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("menuAriaLabel")}
        aria-hidden={!navShow}
        className={
          "md:hidden fixed top-0 right-0 bottom-0 w-[84vw] max-w-[340px] z-50 flex flex-col justify-between dark:bg-zinc-950/95 bg-white/95 backdrop-blur-2xl border-l dark:border-zinc-800/90 border-zinc-200 shadow-2xl transition-transform duration-300 ease-out " +
          (navShow ? "translate-x-0" : "translate-x-full")
        }
      >
        <div>
          <div className="flex items-center justify-between p-5 border-b dark:border-zinc-800/80 border-zinc-200">
            <Link
              href="/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                closeNav();
                goToPage({ href: "/", title: t("home"), direction: directionFor(pathname, "/") });
              }}
              className="flex items-center gap-3 min-w-0 group"
              aria-label={tCommon("homeAriaLabel")}
            >
              <div className="h-9 w-9 rounded-xl dark:bg-zinc-800/90 bg-zinc-100 border dark:border-zinc-700/80 border-zinc-200 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <Image src="/logo.svg" width={24} height={24} alt="" className="dark:invert h-full w-auto" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block font-incognito font-bold text-sm tracking-tight truncate dark:text-zinc-100 text-zinc-900">
                  Zakaria Mirinioui
                </span>
                <span className="block text-[11px] font-medium text-secondary-color dark:text-primary-color truncate">
                  Full Stack Engineer
                </span>
              </div>
            </Link>

            <button
              aria-label={t("closeMenu")}
              onClick={closeNav}
              type="button"
              className="flex items-center justify-center h-8 w-8 rounded-lg dark:bg-zinc-800/80 bg-zinc-100 border dark:border-zinc-700/80 border-zinc-200 text-zinc-500 hover:dark:text-white hover:text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color"
            >
              <X size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>

          <nav className="p-4 space-y-1.5" aria-label={t("menuAriaLabel")}>
            {navLinks.map((link) => {
              const active = isLinkActive(link.href, link.exact);
              const IconComponent = link.icon;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-incognito font-semibold text-sm transition-all duration-200 group " +
                    (active
                      ? "dark:bg-emerald-500/10 bg-emerald-50 text-secondary-color dark:text-primary-color border dark:border-emerald-500/30 border-emerald-200 shadow-sm"
                      : "dark:text-zinc-300 text-zinc-700 hover:dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:text-white hover:text-zinc-950 border border-transparent")
                  }
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                    e.preventDefault();
                    closeNav();
                    goToPage({ href: link.href, title: link.title, direction: directionFor(pathname, link.href) });
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors " +
                        (active
                          ? "dark:bg-primary-color/20 bg-secondary-color/10 text-secondary-color dark:text-primary-color"
                          : "dark:bg-zinc-800/70 bg-zinc-100 text-zinc-500 dark:text-zinc-400 group-hover:text-secondary-color dark:group-hover:text-primary-color")
                      }
                    >
                      <IconComponent size={18} weight="duotone" aria-hidden="true" />
                    </span>
                    <span className="truncate">{link.title}</span>
                  </div>

                  {active && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-secondary-color dark:bg-primary-color shadow-[0_0_8px_rgba(47,224,144,0.6)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t dark:border-zinc-800/80 border-zinc-200 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              <Globe size={14} aria-hidden="true" />
              <span>{tCommon("languageLabel")}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl dark:bg-zinc-900 bg-zinc-100 border dark:border-zinc-800 border-zinc-200">
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={
                  "py-1.5 px-3 rounded-lg text-xs font-semibold transition-all " +
                  (locale === "en"
                    ? "dark:bg-zinc-800 bg-white text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white")
                }
              >
                English
              </button>
              <button
                type="button"
                onClick={() => switchLocale("fr")}
                className={
                  "py-1.5 px-3 rounded-lg text-xs font-semibold transition-all " +
                  (locale === "fr"
                    ? "dark:bg-zinc-800 bg-white text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white")
                }
              >
                Français
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl dark:bg-zinc-900/60 bg-zinc-100/60 border dark:border-zinc-800/60 border-zinc-200 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="truncate">{locale === "fr" ? "Disponible pour missions & postes" : "Available for missions & roles"}</span>
          </div>

          <div className="flex items-center justify-between pt-1 text-zinc-500 dark:text-zinc-400">
            <a
              href="mailto:zakmirinioui@gmail.com"
              aria-label="Email"
              className="p-2 rounded-lg hover:dark:bg-zinc-900 hover:bg-zinc-100 hover:dark:text-white hover:text-zinc-900 transition-colors"
            >
              <EnvelopeSimple size={18} />
            </a>
            <a
              href="https://github.com/ZakariaMirinioui"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="p-2 rounded-lg hover:dark:bg-zinc-900 hover:bg-zinc-100 hover:dark:text-white hover:text-zinc-900 transition-colors"
            >
              <GithubLogo size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/zakaria-mirinioui/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="p-2 rounded-lg hover:dark:bg-zinc-900 hover:bg-zinc-100 hover:dark:text-white hover:text-zinc-900 transition-colors"
            >
              <LinkedinLogo size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
