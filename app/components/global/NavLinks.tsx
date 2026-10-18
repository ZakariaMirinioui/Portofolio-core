"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { directionFor, goToPage } from "../transitions/PageTransition";

export default function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const links = [
    { title: t("home"), href: "/" },
    { title: t("about"), href: "/about" },
    { title: t("projects"), href: "/projects" },
    { title: t("services"), href: "/services" },
    { title: t("dossera"), href: "/dossera" },
  ];

  return (
    <nav className="md:block hidden" aria-label={t("menuAriaLabel")}>
      <ul className="flex items-center gap-x-8">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  goToPage({
                    href: link.href,
                    title: link.title,
                    direction: directionFor(pathname, link.href),
                  });
                }}
                className="flex items-center gap-1.5 font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 rounded-md px-2 py-1"
              >
                {active && (
                  <span
                    className="h-1.5 w-1.5 rounded-full dark:bg-primary-color bg-secondary-color"
                    aria-hidden="true"
                  />
                )}
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
