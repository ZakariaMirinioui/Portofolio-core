"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  HiBeaker,
  HiOutlineX,
  HiUser,
  HiHome,
  HiDocumentText,
} from "react-icons/hi";

export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const data = [
    {
      title: "Home",
      href: "/",
      icon: HiHome,
    },
    {
      title: "About",
      href: "/about",
      icon: HiUser,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: HiBeaker,
    },
    {
      title: "Services",
      href: "/services",
      icon: HiDocumentText,
    },
    {
      title: "Dossera",
      href: "/dossera",
      icon: HiDocumentText,
    },
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
      // Trap focus in mobile menu
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
        triggerRef.current?.focus();
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
        aria-label={navShow ? "Close navigation menu" : "Open navigation menu"}
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
        aria-label="Navigation menu"
        aria-hidden={!navShow}
        className={`md:hidden fixed left-0 top-0 z-10 h-full w-full transform duration-[600ms] ease-[cubic-bezier(0.7,0,0,1)] dark:bg-zinc-900 bg-white ${navShow ? "translate-x-0 rounded-none visible pointer-events-auto" : "translate-x-full invisible pointer-events-none"
          }`}
      >
        <div className="flex items-center justify-between mt-6 px-8">
          <Link href="/" onClick={onToggleNav} aria-label="Zakaria Mirinioui - Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" width={85} height={85} alt="" className="dark:invert" aria-hidden="true" />
          </Link>

          <button
            aria-label="Close navigation menu"
            onClick={onToggleNav}
            className={`md:hidden dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 rounded-full p-2 duration-500 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 ${!navShow ? "-rotate-[360deg]" : null
              }`}
          >
            <HiOutlineX className="text-xl" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-col mt-6" aria-label="Main navigation">
          {data.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-x-2 font-incognito font-semibold text-lg dark:shadow-line-dark shadow-line-light p-6 group focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 rounded-lg"
              onClick={onToggleNav}
            >
              <link.icon
                className="text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                aria-hidden="true"
              />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
