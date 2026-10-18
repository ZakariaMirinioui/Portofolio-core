"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Globe, CaretDown, Check } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { goToPage } from "../transitions/PageTransition";

const STORAGE_KEY = "locale";

const LOCALE_META = [
  { locale: "en", label: "English", short: "EN" },
  { locale: "fr", label: "Français", short: "FR" },
] as const;

type LocaleCode = (typeof LOCALE_META)[number]["locale"];

function localizedHref(pathname: string, locale: LocaleCode) {
  return `/${locale}${pathname === "/" ? "/" : `${pathname}/`}`;
}

/**
 * Language switcher that takes the place of the compact "Download CV" button
 * in the navbar. Switching locale reuses the site's page-transition overlay so
 * the change feels like a polished navigation rather than a static reload.
 */
export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const locale = useLocale() as LocaleCode;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    setActiveIndex(-1);
    if (returnFocus && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (open && rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    },
    [open, closeMenu]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [handleDocumentClick]);

  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;

    const menuEl = menuRef.current;
    const triggerEl = triggerRef.current;

    const position = () => {
      const rect = triggerEl.getBoundingClientRect();
      menuEl.style.display = "block";
      menuEl.style.minWidth = `${Math.max(rect.width, 160)}px`;
      menuEl.style.left = `${rect.left}px`;
      menuEl.style.top = `${rect.bottom}px`;
      menuEl.style.bottom = "auto";
    };

    position();
    const firstItem = menuEl.querySelector<HTMLElement>('[role="menuitem"]');
    if (firstItem) firstItem.focus();

    window.addEventListener("scroll", position, true);
    return () => window.removeEventListener("scroll", position, true);
  }, [open]);

  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      } else if (e.key === "ArrowDown" && !open) {
        e.preventDefault();
        toggleMenu();
      }
    },
    [open, toggleMenu]
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]'
      );
      if (!items || items.length === 0) return;

      const current = activeIndex >= 0 ? activeIndex : 0;
      let next = current;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        next = (current + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        next = (current - 1 + items.length) % items.length;
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      } else if (e.key === "Tab") {
        closeMenu();
        return;
      }

      if (next !== current) {
        setActiveIndex(next);
        items[next]?.focus();
      }
    },
    [activeIndex, closeMenu]
  );

  function switchTo(target: LocaleCode) {
    window.localStorage.setItem(STORAGE_KEY, target);
    setOpen(false);
    setActiveIndex(-1);
    router.push(pathname, { locale: target });
  }

  const current = LOCALE_META.find((m) => m.locale === locale)!;

  return (
    <div ref={rootRef} className={className}>
      <button
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t("languageSwitcherLabel")}
        type="button"
        onClick={toggleMenu}
        onKeyDown={handleTriggerKeyDown}
        className="group flex items-center gap-x-2 font-incognito font-semibold rounded-full border border-zinc-200/70 bg-white/70 px-3 py-2 text-sm text-zinc-900 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary-color/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:border-primary-color/40"
      >
        <Globe size={16} aria-hidden="true" />
        <span aria-hidden="true">{current.short}</span>
        <span className="sr-only">
          {t("currentLanguage", { language: current.label })}
        </span>
        <CaretDown size={14} aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          id={menuId}
          aria-label={t("selectLanguage")}
          className="fixed z-50 min-w-[200px] rounded-2xl border border-zinc-200/80 bg-white/90 p-2 shadow-xl backdrop-blur-xl dark:border-zinc-700/80 dark:bg-zinc-900/90"
          onKeyDown={handleMenuKeyDown}
        >
          {LOCALE_META.map((item, index) => {
            const isCurrent = item.locale === locale;
            return (
              <a
                key={item.locale}
                role="menuitem"
                tabIndex={-1}
                href={localizedHref(pathname, item.locale)}
                hrefLang={item.locale}
                aria-current={isCurrent ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  switchTo(item.locale);
                }}
                className={`focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 flex items-center gap-x-3 px-4 py-3 text-sm ${
                  activeIndex === index
                    ? "dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-zinc-900"
                    : "dark:text-zinc-200 text-zinc-800 hover:dark:bg-zinc-800 hover:bg-zinc-100"
                } min-h-11`}
              >
                <span aria-hidden="true" className="font-semibold w-6">
                  {item.short}
                </span>
                <span>{item.label}</span>
                {isCurrent && (
                  <Check size={14} aria-hidden="true" className="ml-auto" />
                )}
                {isCurrent && <span className="sr-only">(current)</span>}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
