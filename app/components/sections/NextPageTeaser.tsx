"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown } from "@phosphor-icons/react";
import { Slide } from "../../animation/Slide";
import { goToPage } from "../transitions/PageTransition";

type NextPageTeaserProps = {
  href: string;
  title: string;
  description: string;
};

export default function NextPageTeaser({ href, title, description }: NextPageTeaserProps) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  return (
    <section className="mt-24 mb-8" aria-label={`Continue to ${title}`}>
      <Slide>
        <button
          type="button"
          onClick={() => goToPage({ href, title })}
          className="group flex w-full items-center justify-between gap-6 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-zinc-50 p-6 md:p-8 text-left transition-colors hover:dark:border-zinc-600 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
        >
          <span className="min-w-0">
            <span className="font-incognito text-xl md:text-2xl font-bold tracking-tight">
              Continue to {title}
            </span>
            <span className="mt-1 block text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {description}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border dark:border-zinc-700 border-zinc-300 transition-all duration-300 group-hover:dark:bg-primary-color group-hover:bg-secondary-color group-hover:dark:text-zinc-900 group-hover:text-white group-hover:dark:border-primary-color group-hover:border-secondary-color"
          >
            <ArrowDown
              size={20}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </span>
        </button>
      </Slide>
    </section>
  );
}
