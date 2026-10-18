"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  HiBeaker,
  HiOutlineX,
  HiUser,
  HiHome,
  HiDocumentText,
} from "react-icons/hi";
import { directionFor, goToPage } from "../transitions/PageTransition";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileMenu() {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");
  const [navShow, setNavShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const data = [
    { title: t("home"), href: "/", icon: HiHome },
    { title: t("about"), href: "/about", icon: HiUser },
    { title: t("projects"), href: "/projects", icon: HiBeaker },
    { title: t("services"), href: "/services", icon: HiDocumentText },
    { title: t("dossera"), href: "/dossera", icon: HiDocumentText },
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

  // Focus management
  useEffect(() => {
    if (navShow) {
      const trigger = triggerRef.current;
      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
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

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navShow) {
        onToggleNav();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [navShow]);

  return (
    <>
      <button
        ref={triggerRef}
        aria-label={navShow ? t("closeMenu") : t("openMenu")}
        aria-expanded={navShow}
        aria-controls="mobile-menu"
        onClick={onToggleNav}
        className="md:hidden dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
      >
        <RxHamburgerMenu className="text-xl" aria-hidden="true" />
      </button>
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("menuAriaLabel")}
        aria-hidden={!navShow}
        className={`md:hidden fixed left-0 top-0 z-10 h-full w-full transform duration-[600ms] ease-[cubic-bezier(0.7,0,0,1)] dark:bg-zinc-900 bg-white ${navShow ? "translate-x-0 rounded-none visible pointer-events-auto" : "translate-x-full invisible pointer-events-none"
          }`}
      >
        <div className="flex items-center justify-between mt-6 px-8">
          <Link
            href="/"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              onToggleNav();
              goToPage({ href: "/", title: t("home"), direction: directionFor(pathname, "/") });
            }}
            aria-label={tCommon("homeAriaLabel")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" width={85} height={85} alt="" className="dark:invert" aria-hidden="true" />
          </Link>

          <button
            aria-label={t("closeMenu")}
            onClick={onToggleNav}
            className={`md:hidden dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-full p-2 duration-500 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 ${!navShow ? "-rotate-[360deg]" : null
              }`}
          >
            <HiOutlineX className="text-xl" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-col mt-6" aria-label={t("menuAriaLabel")}>
          {data.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-x-2 font-incognito font-semibold text-lg dark:shadow-line-dark shadow-line-light p-6 group focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 rounded-lg"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                const target = { href: link.href, title: link.title };
                onToggleNav();
                goToPage({ ...target, direction: directionFor(pathname, link.href) });
              }}
            >
              <link.icon
                className="text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                aria-hidden="true"
              />
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="px-8 mt-8">
          <p className="text-xs font-incognito uppercase tracking-wider text-zinc-500 mb-3">
            {tCommon("languageLabel")}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
