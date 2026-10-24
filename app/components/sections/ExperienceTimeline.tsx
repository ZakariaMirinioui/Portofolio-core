import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Circuit from "../decor/Circuit";

const TIMELINE_RELATED: Record<number, { slug: string; name: string }> = {
  0: { slug: "dossera", name: "Dossera JAMS" },
  1: { slug: "bluevision", name: "BlueVision" },
  3: { slug: "pwadc-marketplace", name: "PWADC Marketplace" },
};

export default async function ExperienceTimeline({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const t = await getTranslations({ locale });
  const experience = t.raw("experienceTimeline") as Array<{
    period: string;
    role: string;
    org: string;
    points: string[];
    chips: string[];
  }>;

  return (
    <section className={className}>
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-incognito font-bold tracking-tight">
          {t("experienceTimelineTitle")}
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          {t("experienceTimelineSubtitle")}
        </p>
      </div>

      {/* Single continuous timeline line via border-l; no per-item connector lines. */}
      <ol className="relative m-0 list-none pl-0 space-y-16 border-l border-zinc-200 dark:border-zinc-800">
        <Circuit
          variant="gapRail"
          uid="about-tl"
          walls={[40, 1100, 90]}
          seed={41}
          draw
          className="hidden lg:block absolute left-[-3px] top-2 h-[1100px] w-10 z-thick"
          style={{ "--z-draw-delay": "0.4s" } as React.CSSProperties}
        />
        {experience.map((job, idx) => {
          const related = TIMELINE_RELATED[idx];

          return (
            <li key={job.role} className="relative pt-0">
              {/* Timeline marker */}
              <span
                className="absolute left-0 top-0 -translate-x-1/2 h-3 w-3 rounded-full dark:bg-primary-color bg-secondary-color border border-white dark:border-zinc-900"
                aria-hidden="true"
              />
              <div className="pl-[2rem]">
                <p className="text-xs leading-none tracking-widest uppercase dark:text-zinc-500 text-zinc-500 mt-0 mb-1">
                  {job.period}
                </p>
                <h3
                  className="text-lg font-incognito font-semibold mt-0 mb-1"
                  dangerouslySetInnerHTML={{ __html: job.role }}
                />
                <p
                  className="text-sm dark:text-zinc-400 text-zinc-600 mb-3"
                  dangerouslySetInnerHTML={{ __html: job.org }}
                />
                <ul className="space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed"
                    >
                      <span dangerouslySetInnerHTML={{ __html: point }} />
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                {related && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs">
                    <span className="dark:text-zinc-500 text-zinc-500">
                      {locale === "fr" ? "Projet associé :" : "Related project:"}
                    </span>
                    <Link
                      locale={locale}
                      href={`/projects/${related.slug}`}
                      className="inline-flex items-center gap-1 font-medium dark:text-primary-color text-secondary-color hover:underline"
                    >
                      {related.name} →
                    </Link>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
