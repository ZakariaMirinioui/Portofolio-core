import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CvDownload from "@/app/components/cv-download/CvDownload";
import { STATIC_MICRO_CORNER } from "../decor/circuitStatics";

export default async function ClosingBand({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  return (
    <section
      data-cc
      className={`dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 relative ${className ?? ""}`}
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
      <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed mb-6 max-w-lg">
        {t("closingBand.text")}
      </p>
      <div className="flex flex-wrap gap-3">
        <CvDownload variant="full" className="shrink-0" />
        <a
          href="mailto:zakmirinioui@gmail.com"
          className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
        >
          {tCommon("contact")}
        </a>
        <Link
          locale={locale}
          href="/projects"
          className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
        >
          {tNav("projects")}
        </Link>
      </div>
    </section>
  );
}
