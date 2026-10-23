"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowDown } from "@phosphor-icons/react";
import { Slide } from "../../animation/Slide";
import { goToPage } from "../transitions/PageTransition";
import { STATIC_MICRO_CORNER } from "../decor/circuitStatics";

type NextPageTeaserProps = {
  href: string;
  title: string;
  description: string;
};

export default function NextPageTeaser({ href, title, description }: NextPageTeaserProps) {
  const router = useRouter();
  const t = useTranslations("nextPageTeaser");

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  return (
    <section className="mt-24 mb-8" aria-label={t("continueTo", { title })}>
      <Slide>
        <button
          type="button"
          data-cc
          onClick={() => goToPage({ href, title })}
          className="group relative flex w-full items-center justify-between gap-6 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-zinc-50 p-6 md:p-8 text-left transition-colors hover:dark:border-zinc-600 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
        >
          <span
            aria-hidden="true"
            className="z-host z-cc left-1 top-1 h-14 w-14 hidden md:block"
            dangerouslySetInnerHTML={{ __html: STATIC_MICRO_CORNER }}
          />
          <span
            aria-hidden="true"
            className="z-host z-cc right-1 bottom-1 h-14 w-14 hidden md:block"
            style={{ transform: "rotate(180deg)" } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: STATIC_MICRO_CORNER }}
          />
          <span className="min-w-0">
            <span className="font-incognito text-xl md:text-2xl font-bold tracking-tight">
              {t("continueTo", { title })}
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
