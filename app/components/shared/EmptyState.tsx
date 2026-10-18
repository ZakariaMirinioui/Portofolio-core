"use client";

import Image from "next/image";
import duckImage from "@/public/searching-duck.gif";
import { useTranslations } from "next-intl";

type stateType = {
  value?: string;
  icon?: React.ReactNode;
  title?: string;
  message?: string;
};

export default function EmptyState({ value, title, icon, message }: stateType) {
  const t = useTranslations("emptyState");

  return (
    <div className="w-full flex flex-col items-center text-center dark:bg-primary-bg bg-zinc-100 border border-dashed dark:border-zinc-700 border-zinc-200 rounded-md px-6 py-8">
      <div className="mb-6 text-4xl text-zinc-500">
        {icon || (
          <Image
            width={80}
            height={80}
            src={duckImage}
            alt={t("duckAlt")}
          />
        )}
      </div>
      <h3 className="   font-bold tracking-tight text-xl mb-3">
        {title ?? t("noItemsFound", { value: value ?? "" })}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 ml-4 max-w-sm">
        {message ??
          t("noItemsMessage", { value: (value ?? "").toLowerCase() })}
      </p>
    </div>
  );
}
