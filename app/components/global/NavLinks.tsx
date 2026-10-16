"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { directionFor, goToPage } from "../transitions/PageTransition";

export const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Services", href: "/services" },
  { title: "Dossera", href: "/dossera" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="md:block hidden" aria-label="Main navigation">
      <ul className="flex items-center gap-x-8">
        {NAV_LINKS.map((link) => {
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
