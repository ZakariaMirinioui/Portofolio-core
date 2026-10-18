import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function FeaturedWork({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const t = await getTranslations({ locale });
  const works = t.raw("featuredWork") as Array<{
    title: string;
    description: string;
    chips: string[];
  }>;

  return (
    <section className={className}>
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-incognito font-bold tracking-tight">
          {t("featuredWorkTitle")}
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          {t("featuredWorkSubtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {works.map((work) => (
          <div
            key={work.title}
            className="dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6"
          >
            <h3 className="font-incognito font-semibold mb-3" dangerouslySetInnerHTML={{ __html: work.title }} />
            <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: work.description }} />
            <div className="flex flex-wrap gap-2 mb-6">
              {work.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                >
                  {chip}
                </span>
              ))}
            </div>
            <Link
              locale={locale}
              href="/projects"
              className="inline-flex items-center gap-x-1.5 font-incognito font-semibold text-primary-color dark:text-secondary-color hover:underline text-sm"
            >
              {t("featuredWorkViewProject")}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
