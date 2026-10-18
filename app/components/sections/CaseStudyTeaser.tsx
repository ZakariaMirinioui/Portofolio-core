import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Slide } from "../../animation/Slide";
import type { ProjectType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import ProjectLogo from "../shared/ProjectLogo";
import { BiLinkExternal } from "react-icons/bi";

export default async function CaseStudyTeaser({ locale }: { locale: string }) {
  const featured: ProjectType = await sanityFetch({
    query: `*[_type == "project" && slug.current == "dossera-jams"][0]{
      _id,
      name,
      "slug": slug.current,
      tagline,
      projectUrl,
      category,
      "logo": logo.asset->url,
      metrics,
    }`,
    tags: ["project"],
  });

  if (!featured) return null;

  const t = await getTranslations({ locale, namespace: "home.caseStudyTeaser" });
  const tCase = await getTranslations({ locale, namespace: "caseStudy" });

  return (
    <section className="mb-20">
      <Slide delay={0.14}>
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,180 Q600,20 1200,180 L1200,400 L0,400 Z"
              fill="currentColor"
            />
          </svg>
          <div className="relative z-10 pt-12 pb-10 px-6 md:p-8 lg:px-10 lg:flex lg:items-start lg:gap-12">
            <div className="lg:w-[30%]">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium dark:bg-zinc-900 bg-zinc-100 dark:text-zinc-400 text-zinc-700 border dark:border-zinc-800 border-zinc-200 mb-6">
                {tCase("caseStudyLabel")}
              </span>
              <h2 className="font-incognito text-3xl lg:text-4xl font-bold tracking-tight dark:text-white text-zinc-950 mb-3">
                {featured.name}
              </h2>
              <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed mb-8">
                {featured.tagline}
              </p>
              {featured.metrics && featured.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {featured.metrics.slice(0, 4).map((metric) => (
                    <div key={metric.label} className="rounded-md bg-zinc-50 dark:bg-zinc-800 p-3">
                      <div className="text-xs font-medium dark:text-zinc-500 text-zinc-700 uppercase tracking-wider">
                        {metric.label}
                      </div>
                      <div className="text-sm font-semibold dark:text-zinc-900 text-zinc-950">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  locale={locale}
                  href={`/projects/${featured.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary-color text-zinc-900 dark:text-zinc-950 font-semibold hover:opacity-90 transition-opacity"
                >
                  {t("readCaseStudy")}
                </Link>
                {featured.projectUrl && (
                  <a
                    href={featured.projectUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border dark:border-zinc-800 border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 text-zinc-900 font-semibold hover:opacity-90 transition-colors"
                  >
                    <BiLinkExternal className="text-base" aria-hidden="true" />
                    {t("viewLive")}
                  </a>
                )}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:flex-1 lg:flex lg:items-center lg:justify-center">
              <ProjectLogo
                src={
                  featured.slug === "dossera-jams"
                    ? "/dossera-darkmode.png"
                    : typeof featured.logo === "string"
                      ? featured.logo
                      : undefined
                }
                name={featured.name}
                category={featured.category}
                slug={featured.slug}
                wellClassName="h-14 w-fit max-w-[22rem] drop-shadow-lg dark:drop-shadow-xl"
                iconSize={32}
              />
            </div>
          </div>
        </div>
      </Slide>
    </section>
  );
}
