import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/app/data/projects";

export default async function FeaturedWork({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const t = await getTranslations({ locale });
  const loc = locale === "fr" ? "fr" : "en";

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
        {featuredProjects.map((project) => {
          const title = project.displayName[loc] || project.displayName.en;
          const description = project.summary[loc] || project.summary.en;
          const chips = project.stack.flatMap((s) => s.items).slice(0, 4);

          return (
            <div
              key={project.slug}
              className="dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-incognito font-semibold mb-3 text-lg">
                  {title}
                </h3>
                <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4 text-sm">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                locale={locale}
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-x-1.5 font-incognito font-semibold text-primary-color dark:text-secondary-color hover:underline text-sm"
              >
                {t("featuredWorkViewProject")}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
