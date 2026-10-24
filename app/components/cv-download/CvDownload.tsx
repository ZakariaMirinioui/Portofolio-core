"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowDown, Check } from "@phosphor-icons/react";
import { useTranslations, useLocale } from "next-intl";

import cvSizes from "@/app/data/cv-sizes.json";

const CV_FILES = [
  {
    lang: "English",
    key: "en",
    href: "https://raw.githubusercontent.com/ZakariaMirinioui/Portofolio-core/main/public/downloads/MiriniouiZakaria-CV-EN.pdf",
  },
  {
    lang: "Français",
    key: "fr",
    href: "https://raw.githubusercontent.com/ZakariaMirinioui/Portofolio-core/main/public/downloads/MiriniouiZakaria-CV-FR.pdf",
  },
] as const;

type CvDownloadVariant = "full" | "compact" | "sticky";

interface CvDownloadProps {
  variant?: CvDownloadVariant;
  className?: string;
}

function formatSize(bytes?: number, locale?: string): string {
  if (!bytes) return "";
  const fr = locale === "fr";
  if (bytes < 1024) return `${bytes} ${fr ? "o" : "B"}`;
  return `${(bytes / 1024).toFixed(1)} ${fr ? "Ko" : "KB"}`;
}

export default function CvDownload({
  variant = "full",
  className,
}: CvDownloadProps) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const t = useTranslations("cv");
  const locale = useLocale();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const menuId = useId();

  const sizeByKey: Record<string, string> = {};
  for (const file of CV_FILES) {
    const bytes = (cvSizes as Record<string, number> | undefined)?.[file.key];
    sizeByKey[file.key] = formatSize(bytes, locale);
  }

  useEffect(() => {
    if (!checked) return;
    const timer = setTimeout(() => setChecked(false), 1500);
    return () => clearTimeout(timer);
  }, [checked]);

  const closeMenu = useCallback(
    (returnFocus = true) => {
      setOpen(false);
      setActiveIndex(-1);
      if (returnFocus && triggerRef.current) {
        triggerRef.current.focus();
      }
    },
    []
  );

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (
        open &&
        rootRef.current &&
        !rootRef.current.contains(e.target as Node)
      ) {
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
    const placement = variant === "sticky" ? "top" : "bottom";

    const position = () => {
      const rect = triggerEl.getBoundingClientRect();
      menuEl.style.display = "block";
      menuEl.style.minWidth = `${Math.max(rect.width, 220)}px`;
      menuEl.style.left = `${rect.left}px`;
      if (placement === "top") {
        menuEl.style.bottom = `${window.innerHeight - rect.top}px`;
        menuEl.style.top = "auto";
      } else {
        menuEl.style.top = `${rect.bottom}px`;
        menuEl.style.bottom = "auto";
      }
    };

    position();
    const firstItem = menuEl.querySelector<HTMLElement>('[role="menuitem"]');
    if (firstItem) firstItem.focus();

    window.addEventListener("scroll", position, true);
    return () => window.removeEventListener("scroll", position, true);
  }, [open, variant]);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => {
      if (!prev) {
        lastFocusedRef.current = document.activeElement as HTMLElement;
      }
      return !prev;
    });
  }, []);

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

  function handleItemClick(file: (typeof CV_FILES)[number]) {
    setOpen(false);
    setActiveIndex(-1);
    setChecked(true);
    if (triggerRef.current) triggerRef.current.focus();
  }

  const baseButtonClasses =
    "flex items-center gap-x-2 font-incognito font-semibold rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2";

  const variantClasses = {
    full:
      "dark:bg-primary-bg bg-zinc-100 dark:text-zinc-100 text-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 min-h-11 min-w-[180px] px-4",
    compact:
      "dark:bg-primary-bg bg-zinc-100 dark:text-zinc-100 text-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 min-h-11 min-w-[150px] px-3 text-sm",
    sticky:
      "dark:bg-primary-bg bg-zinc-100 dark:text-zinc-100 text-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 min-h-11 min-w-[200px] px-4",
  };

  const menuClasses =
    "fixed z-50 rounded-md border dark:border-zinc-800 border-zinc-200 bg-white dark:bg-zinc-900 shadow-line-light dark:shadow-line-dark p-1 min-w-[220px]";

  return (
    <div ref={rootRef} className={className}>
      <button
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        type="button"
        onClick={toggleMenu}
        onKeyDown={handleTriggerKeyDown}
        className={`${baseButtonClasses} ${variantClasses[variant]} ${
          variant === "sticky" ? "w-full" : ""
        }`}
      >
        {checked ? (
          <>
            <Check size={16} aria-hidden="true" />
            <span className="dark:text-primary-color text-secondary-color">{t("saved")}</span>
          </>
        ) : (
          <>
            {t("download")}
            <ArrowDown size={16} aria-hidden="true" />
          </>
        )}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          id={menuId}
          aria-label={t("menuAriaLabel")}
          className={menuClasses}
          onKeyDown={handleMenuKeyDown}
        >
          {CV_FILES.map((file, index) => {
            return (
              <a
                key={file.key}
                role="menuitem"
                tabIndex={-1}
                href={file.href}
                download
                onClick={() => handleItemClick(file)}
                className={`focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
                  activeIndex === index
                    ? "dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-zinc-900"
                    : "dark:text-zinc-200 text-zinc-800 hover:dark:bg-zinc-800 hover:bg-zinc-100"
                } min-h-11`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {file.key.toUpperCase()}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-medium">
                    {file.key === "en" ? "English version" : "Version française"}
                  </span>
                  <span className="text-xs dark:text-zinc-500 text-zinc-500">PDF</span>
                </span>
                <ArrowDown size={14} aria-hidden="true" className="ml-auto opacity-60" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
