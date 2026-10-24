import Image from "next/image";
import { Metadata } from "next";
import type { Project } from "@/types";
import { Slide } from "../../../animation/Slide";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAlternateUrls, getCanonicalUrl, SITE_URL } from "@/lib/metadata";
import { BiLinkExternal, BiLogoGithub, BiLock } from "react-icons/bi";
import ProjectLogo from "@/app/components/shared/ProjectLogo";
import SetupSteps from "./SetupSteps";
import { Link } from "@/i18n/navigation";
import { projects } from "../../../data/projects";

const HERO_IMAGE = "/project.png";

function tOr(label: string | undefined, t: (key: string) => string): string {
  return label ?? t("noClient");
}

function pluralTeam(count: number | undefined, t: (key: string, opts?: any) => string): string {
  if (!count) return t("noTeam");
  return t("metaTeamSize", { count });
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.filter((p) => p.visibility === "public").map((project) => ({ locale, project: project.slug }))
  );
}

type Props = {
  params: {
    locale: string;
    project: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, project: slug } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const project = projects.find((p) => p.slug === slug && p.visibility === "public");

  const path = `/projects/${project?.slug || slug}`;

  if (!project) {
    return { title: t("projectNotFound") };
  }

  const title = `${project.displayName.en} | ${t("project")}`;
  const description = project.summary.en;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: getCanonicalUrl(locale, path),
      languages: getAlternateUrls(path),
    },
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, path),
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: [{ url: `${SITE_URL}${HERO_IMAGE}`, width: 1200, height: 630 }],
    },
  };
}

export default async function Project({ params }: Props) {
  const { locale, project: slug } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectDetail" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const project = projects.find((p) => p.slug === slug && p.visibility === "public");

  if (!project) {
    return (
      <main className="max-w-6xl mx-auto lg:px-16 px-8">
        <div className="text-center py-20">
          <h1 className="font-incognito font-bold text-3xl mb-4">{t("notFound")}</h1>
          <p className="dark:text-zinc-400 text-zinc-600 mb-8">{t("error")}</p>
          <Link locale={locale} href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary-color text-zinc-900 dark:text-zinc-950 font-semibold hover:opacity-90 transition-opacity">
            {tCommon("back")}
          </Link>
        </div>
      </main>
    );
  }

  const categoryLabel = (tProjects.raw("categoryLabels") as Record<string, string> | undefined)?.[
    project.category
  ] ?? project.category;
  const statusLabel = (tProjects.raw("status") as Record<string, string> | undefined)?.[
    project.status.toLowerCase()
  ] ?? project.status;

  const prevIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = prevIndex > 0 ? projects[prevIndex - 1] : null;
  const nextProject = prevIndex >= 0 && prevIndex < projects.length - 1 ? projects[prevIndex + 1] : null;

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <Slide>
        <div className="max-w-3xl mx-auto">
          {/* === 1. Header === */}
          <div className="flex items-start justify-between flex-wrap mb-6">
            <div className="mb-4">
              <div className="mb-4 w-fit">
                <ProjectLogo
                  src={project.assets.logo}
                  name={project.displayName.en}
                  category={project.category}
                  slug={project.slug}
                  wellClassName="h-16 w-fit max-w-[15rem]"
                  iconSize={32}
                />
              </div>
              <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl max-w-md">
                {project.displayName[locale === "fr" ? "fr" : "en"]}
              </h1>
              {project.summary && (
                <p className="mt-2 text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {project.summary[locale === "fr" ? "fr" : "en"]}
                </p>
              )}
              {project.context && (
                <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider dark:text-zinc-500 text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1">
                  {project.context[locale === "fr" ? "fr" : "en"]}
                </p>
              )}
            </div>

            <div className="flex items-center gap-x-2 flex-wrap">
              <AccessControl project={project} t={t} tCommon={tCommon} locale={locale} />
            </div>
          </div>

          {/* === 2. Metadata grid === */}
          <MetadataGrid project={project} t={t} tCommon={tCommon} categoryLabel={categoryLabel} statusLabel={statusLabel} locale={locale} />

          {/* === 3. Banner (HERO IMAGE) === */}
          <div className="mt-8 relative w-full overflow-hidden rounded-xl border dark:border-zinc-800 border-zinc-100">
            <Image
              src={HERO_IMAGE}
              alt=""
              width={1200}
              height={675}
              className="block w-full h-auto object-cover"
              priority
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-zinc-900/60 pointer-events-none" aria-hidden="true" />
          </div>

          {/* === 4. Overview === */}
          {(() => {
            const raw = project.overview?.[locale === "fr" ? "fr" : "en"];
            const paragraphs = Array.isArray(raw) ? raw : raw ? [raw] : [];
            if (paragraphs.length === 0) return null;
            return (
              <section className="mt-10">
                <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                  {t("sectionOverview")}
                </h2>
                <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed space-y-3">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {project.context && (
                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider dark:text-zinc-500 text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1">
                    {project.context[locale === "fr" ? "fr" : "en"]}
                  </p>
                )}
              </section>
            );
          })()}

          {/* === 5. What it does === */}
          {project.capabilities && project.capabilities.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionWhatItDoes")}
              </h2>
              <div className="space-y-6">
                {project.capabilities.map((group, gi) => (
                  <div key={gi}>
                    <h3 className="text-xs font-incognito font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-500 mb-2">
                      {group.label[locale === "fr" ? "fr" : "en"]}
                    </h3>
                    <ul className="list-disc list-inside space-y-1.5 dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed">
                      {group.items.map((item, ii) => (
                        <li key={ii}>{item[locale === "fr" ? "fr" : "en"]}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* === 6. Who uses it === */}
          {project.roles && project.roles.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionWhoUsesIt")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.roles.map((role, i) => (
                  <div
                    key={i}
                    className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-3 text-center"
                  >
                    <span className="text-xs font-medium dark:text-zinc-300 text-zinc-700">
                      {role.label[locale === "fr" ? "fr" : "en"]}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* === 7. Key metrics === */}
          {project.keyMetrics && project.keyMetrics.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionKeyMetrics")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.keyMetrics.map((metric, i) => (
                  <div key={i} className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-4">
                    <div className="text-xl font-incognito font-bold dark:text-primary-color text-secondary-color">
                      {metric.value[locale === "fr" ? "fr" : "en"]}
                    </div>
                    <div className="text-sm font-medium dark:text-white text-zinc-900">
                      {metric.label[locale === "fr" ? "fr" : "en"]}
                    </div>
                    {metric.description && (
                      <div className="text-xs dark:text-zinc-500 text-zinc-500 mt-1">
                        {metric.description[locale === "fr" ? "fr" : "en"]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* === 8. How it is built === */}
          {project.stack && project.stack.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionHowBuilt")}
              </h2>
              <div className="space-y-4">
                {project.stack.map((layer, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-incognito font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-500 mb-2">
                      {layer.layer[locale === "fr" ? "fr" : "en"]}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((tech, ii) => (
                        <span
                          key={ii}
                          className="px-3 py-1 rounded-md text-sm font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700 border-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {project.stack.length >= 3 && project.architectureNotes && (
                  <ArchitectureDiagram notes={project.architectureNotes} t={t} locale={locale} />
                )}
              </div>
            </section>
          )}

          {/* === 9. Integrations === */}
          {project.integrations && project.integrations.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionIntegrations")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.integrations.map((integration, i) => (
                  <div
                    key={i}
                    className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="font-medium dark:text-zinc-300 text-zinc-700">
                      {integration.name[locale === "fr" ? "fr" : "en"]}
                    </span>
                    <span className="ml-2 text-xs font-medium dark:text-zinc-500 text-zinc-500 uppercase tracking-wider">
                      {integration.state === "configured-and-verified" ? t("integrationConfiguredVerified") : t("integrationDependencyPresent")}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* === 10. What is verified === */}
          {project.evidenceNotes && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionVerified")}
              </h2>
              <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-4 dark:text-zinc-300 text-zinc-600 leading-relaxed">
                {project.evidenceNotes[locale === "fr" ? "fr" : "en"]}
              </div>
            </section>
          )}

          {/* === 11. My role === */}
          {project.myRole && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionMyRole")}
              </h2>
              <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {project.myRole[locale === "fr" ? "fr" : "en"]}
              </p>
            </section>
          )}

          {/* === 12. Links === */}
          {(project.links.live || project.links.repo || project.links.demo) && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionLinks")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-color text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    <BiLinkExternal aria-hidden="true" />
                    {t("accessLive")}
                  </a>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-700 border dark:border-zinc-700 border-zinc-200 font-semibold hover:opacity-90 transition-opacity"
                  >
                    <BiLogoGithub aria-hidden="true" />
                    {t("accessRepo")}
                  </a>
                )}
              </div>
              <div className="mt-4 text-xs dark:text-zinc-500 text-zinc-500 break-all">
                {project.links.repo}
              </div>
            </section>
          )}

          {/* === 13. Related === */}
          {(project.relatedSlugs && project.relatedSlugs.length > 0) || (project.relatedExperience && project.relatedExperience.length > 0) || project.variantNote && (
            <section className="mt-10">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                {t("sectionRelated")}
              </h2>
              <div className="space-y-3">
                {project.variantNote && (
                  <div className="dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed">
                    {project.variantNote[locale === "fr" ? "fr" : "en"]}
                  </div>
                )}
                {project.relatedSlugs && project.relatedSlugs.length > 0 && (
                  <div>
                    {project.relatedSlugs.map((rs) => {
                      const related = projects.find((p) => p.slug === rs);
                      if (!related) return null;
                      return (
                        <Link
                          key={rs}
                          locale={locale}
                          href={`/projects/${rs}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
                        >
                          {related.displayName[locale === "fr" ? "fr" : "en"]}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* === 14. Run it locally === */}
          {((project.setup && project.setup.steps && project.setup.steps.length > 0) || project.slug === "dossera") && (
            <SetupSteps
              slug={project.slug}
              steps={project.setup?.steps}
              locale={locale}
              labels={{
                runLocally: t("sectionRunLocally"),
                collapse: t("sectionRunLocallyCollapse"),
                expand: t("sectionRunLocallyExpand"),
                availableTooltip: t("setupAvailableTooltip"),
                dosseraCta: t("setupDosseraCta"),
                dosseraHover: t("setupDosseraHover"),
              }}
            />
          )}

          {/* === 15. Previous / next + CTA === */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t dark:border-zinc-800 border-zinc-200 pt-8">
            {prevProject && (
              <Link
                locale={locale}
                href={`/projects/${prevProject.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
              >
                            ← {t("sectionPrevious")}: {prevProject.displayName[locale === "fr" ? "fr" : "en"]}
              </Link>
            )}
            {nextProject && (
              <Link
                locale={locale}
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
              >
                {t("sectionNext")}: {nextProject.displayName[locale === "fr" ? "fr" : "en"]} →
              </Link>
            )}
            <Link
              locale={locale}
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary-color text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {t("ctaContinue", { title: tProjects("title") })}
            </Link>
          </div>
        </div>
      </Slide>
    </main>
  );
}

function AccessControl({ project, t, tCommon, locale }: { project: Project; t: any; tCommon: any; locale: string }) {
  const access = project.access;
  const liveUrl = project.links.live;
  const repoUrl = project.links.repo;

  if (access === "live" && liveUrl) {
    return (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-x-2 dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-white font-semibold rounded-md px-4 py-2 duration-200 hover:opacity-90"
      >
        <BiLinkExternal aria-hidden="true" />
        {t("accessLive")}
      </a>
    );
  }
  if (access === "repo" && repoUrl) {
    return (
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-700 border dark:border-zinc-700 border-zinc-200 font-semibold rounded-md px-4 py-2 duration-200 hover:opacity-90"
      >
        <BiLogoGithub aria-hidden="true" />
        {t("accessRepo")}
      </a>
    );
  }
  if (access === "private") {
    return (
      <span className="group/private relative flex cursor-help items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2" title={t("accessPrivateTooltip")}>
        <BiLock aria-hidden="true" />
        {t("accessPrivate")}
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-md border dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-white px-3 py-2 text-xs font-normal leading-relaxed dark:text-zinc-300 text-zinc-600 opacity-0 shadow-lg transition-opacity duration-200 group-hover/private:opacity-100 group-focus-within/private:opacity-100"
        >
          {t("accessPrivateTooltip")}
        </span>
      </span>
    );
  }
  if (access === "demo-on-request") {
    return (
      <span className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 font-semibold" title={t("privateTooltipContent")}>
        <BiLock aria-hidden="true" />
        {t("accessDemoOnRequest")}
      </span>
    );
  }
  // coming-soon: no link icon
  return (
    <span className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 font-semibold">
      {t("accessComingSoon")}
    </span>
  );
}

function MetadataGrid({
  project,
  t,
  tCommon,
  categoryLabel,
  statusLabel,
  locale,
}: {
  project: Project;
  t: any;
  tCommon: any;
  categoryLabel: string;
  statusLabel: string;
  locale: string;
}) {
  const rows: Array<{ label: string; value: string }> = [];
  if (project.glance?.role) rows.push({ label: tCommon("role"), value: project.glance.role[locale === "fr" ? "fr" : "en"] });
  if (project.glance?.client) rows.push({ label: t("metaClient"), value: project.glance.client[locale === "fr" ? "fr" : "en"] });
  if (project.glance?.team) rows.push({ label: t("metaTeam"), value: pluralTeam(project.glance.team, t) });
  if (project.glance?.duration) rows.push({ label: t("metaDuration"), value: project.glance.duration });
  rows.push({ label: t("metaStatus"), value: statusLabel });
  rows.push({ label: t("metaCategory"), value: categoryLabel });
  rows.push({ label: t("metaPlatform"), value: project.platform });

  if (rows.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
      {rows.map((item, i) => (
        <div key={i} className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg px-4 py-3">
          <dt className="text-xs uppercase tracking-wider dark:text-zinc-500 text-zinc-500">{item.label}</dt>
          <dd className="text-sm font-medium dark:text-white text-zinc-900 capitalize">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ArchitectureDiagram({ notes, t, locale }: { notes: { en: string; fr: string }; t: any; locale: string }) {
  return (
    <div className="mt-4">
      <div className="relative w-full h-64 rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-200 bg-zinc-50 dark:bg-primary-bg">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 640 320"
          role="img"
          aria-labelledby="arch-title arch-desc"
        >
          <title id="arch-title">Architecture diagram</title>
          <desc id="arch-desc">{notes[locale === "fr" ? "fr" : "en"]}</desc>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill="currentColor" />
            </marker>
          </defs>
          {/* Clients */}
          <rect x="40" y="40" width="180" height="100" rx="8" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
          <text x="130" y="80" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111827">Clients</text>
          <text x="130" y="105" textAnchor="middle" fontSize="10" fill="#6b7280">Web · Android · Cross-platform</text>
          {/* Application */}
          <rect x="260" y="40" width="180" height="100" rx="8" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
          <text x="350" y="80" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111827">Application</text>
          <text x="350" y="105" textAnchor="middle" fontSize="10" fill="#6b7280">UI · logic · state</text>
          {/* Data & services */}
          <rect x="40" y="180" width="180" height="100" rx="8" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
          <text x="130" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111827">Data &amp; services</text>
          <text x="130" y="245" textAnchor="middle" fontSize="10" fill="#6b7280">Database · storage · auth</text>
          {/* Integrations */}
          <rect x="260" y="180" width="180" height="100" rx="8" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
          <text x="350" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111827">Integrations</text>
          <text x="350" y="245" textAnchor="middle" fontSize="10" fill="#6b7280">External services</text>
          {/* Arrows */}
          <path d="M220,90 L255,90" stroke="#4b5563" strokeWidth="1.5" marker-end="url(#arrow)" fill="none" />
          <path d="M350,140 L350,175" stroke="#4b5563" strokeWidth="1.5" marker-end="url(#arrow)" fill="none" />
          <path d="M130,140 L130,175" stroke="#4b5563" strokeWidth="1.5" marker-end="url(#arrow)" fill="none" />
        </svg>
        <p className="absolute bottom-1 left-1 right-1 text-[10px] text-center dark:text-zinc-500 text-zinc-500 pointer-events-none">
          {notes[locale === "fr" ? "fr" : "en"]}
        </p>
      </div>
    </div>
  );
}
