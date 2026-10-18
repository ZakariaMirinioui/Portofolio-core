"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("loading");

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6" aria-busy="true" aria-label={t("servicesAriaLabel")}>
      <div className="animate-pulse">
        <div className="h-12 w-48 rounded-lg dark:bg-zinc-800 bg-zinc-200 mb-4" />
        <div className="h-4 w-full max-w-2xl rounded dark:bg-zinc-800 bg-zinc-200 mb-8" />
        <div className="space-y-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl p-6 lg:p-8"
            >
              <div className="h-7 w-1/3 rounded dark:bg-zinc-800 bg-zinc-200 mb-3" />
              <div className="h-4 w-full rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
              <div className="h-4 w-5/6 rounded dark:bg-zinc-800 bg-zinc-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
