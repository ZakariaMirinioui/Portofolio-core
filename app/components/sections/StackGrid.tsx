"use client";

import { useTranslations } from "next-intl";
import {
  Cpu,
  Monitor,
  Database,
  Toolbox,
  Share,
  Gear,
  List,
} from "@phosphor-icons/react";

const iconMap: Record<string, typeof Cpu> = {
  Backend: Cpu,
  Frontend: Monitor,
  "APIs & Data": Database,
  "DevOps & Tools": Toolbox,
  "Management & Analysis": List,
};

export default function StackGrid({ className }: { className?: string }) {
  const t = useTranslations();
  const groups = t.raw("stackGrid") as Array<{
    title: string;
    items: string[];
  }>;

  return (
    <section className={className}>
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-incognito font-bold tracking-tight">
          {t("stackGridTitle")}
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          {t("stackGridSubtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => {
          const Icon = iconMap[group.title] ?? Cpu;
          return (
            <div
              key={group.title}
              className="dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Icon
                  size={20}
                  weight="duotone"
                  className="dark:text-primary-color text-secondary-color shrink-0"
                  aria-hidden="true"
                />
                <h3 className="font-incognito font-semibold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
