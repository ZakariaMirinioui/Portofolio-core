"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Terminal, CaretDown, CaretUp, ArrowRight } from "@phosphor-icons/react";

export type SetupStepsProps = {
  slug: string;
  steps?: string[];
  locale: string;
  labels: {
    runLocally: string;
    collapse: string;
    expand: string;
    availableTooltip: string;
    dosseraCta: string;
    dosseraHover: string;
  };
};

export default function SetupSteps({
  slug,
  steps,
  locale,
  labels,
}: SetupStepsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDossera = slug === "dossera";

  return (
    <section className="mt-10 pt-6 border-t dark:border-zinc-800/80 border-zinc-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 flex items-center gap-2">
          <Terminal size={16} className="text-secondary-color dark:text-primary-color" />
          {labels.runLocally}
        </h2>

        {isDossera ? (
          <div className="relative group">
            <Link
              locale={locale}
              href="/dossera"
              className="inline-flex items-center gap-1.5 text-xs font-semibold dark:text-primary-color text-secondary-color dark:bg-primary-color/10 bg-secondary-color/10 border border-secondary-color/20 dark:border-primary-color/20 hover:scale-[1.02] px-3 py-1.5 rounded-lg transition-all"
              title={labels.dosseraHover}
            >
              <span>{labels.dosseraCta}</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden group-hover:block z-30 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-zinc-100 shadow-xl dark:bg-zinc-100 dark:text-zinc-900 border dark:border-zinc-200 border-zinc-800">
              {labels.dosseraHover}
            </div>
          </div>
        ) : (
          <div className="relative group">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="setup-steps-content"
              className="inline-flex items-center gap-1.5 text-xs font-medium dark:text-zinc-300 text-zinc-600 hover:dark:text-white hover:text-zinc-900 dark:bg-zinc-800/60 bg-zinc-100 px-3 py-1.5 rounded-lg border dark:border-zinc-700/80 border-zinc-200 transition-colors"
              title={labels.availableTooltip}
            >
              <span>{isOpen ? labels.collapse : labels.expand}</span>
              {isOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
            </button>
            <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden group-hover:block z-30 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-zinc-100 shadow-xl dark:bg-zinc-100 dark:text-zinc-900 border dark:border-zinc-200 border-zinc-800">
              {labels.availableTooltip}
            </div>
          </div>
        )}
      </div>

      {!isDossera && isOpen && steps && steps.length > 0 && (
        <div
          id="setup-steps-content"
          className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl p-5 dark:text-zinc-300 text-zinc-700 leading-relaxed mt-3 shadow-inner"
        >
          <ol className="list-decimal list-inside space-y-2.5 text-sm font-mono">
            {steps.map((step, i) => (
              <li key={i} className="pl-1 text-xs sm:text-sm">
                <span className="font-sans ml-1.5 text-zinc-700 dark:text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
