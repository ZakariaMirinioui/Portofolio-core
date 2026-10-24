"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Star } from "@phosphor-icons/react";
import type { Project } from "@/types";
import EmptyState from "../../components/shared/EmptyState";
import ProjectLogo from "../../components/shared/ProjectLogo";
import { STATIC_CHIP, STATIC_CARD_CORNER, STATIC_RHOMBI } from "../../components/decor/circuitStatics";
import { Slide } from "../../animation/Slide";
import { BiLinkExternal, BiLogoGithub, BiBookOpen } from "react-icons/bi";
import { trackProjectViewed, trackGithubLinkClicked, trackLiveDemoClicked } from "../../lib/analytics";

const CATEGORIES = [
  { value: "all", labelKey: "categories.all" },
  { value: "judicial", labelKey: "categories.judicial" },
  { value: "healthcare", labelKey: "categories.healthcare" },
  { value: "education", labelKey: "categories.education" },
  { value: "professional-services", labelKey: "categories.professional-services" },
  { value: "wellness", labelKey: "categories.wellness" },
  { value: "ecommerce", labelKey: "categories.ecommerce" },
  { value: "mobile", labelKey: "categoriesMobile" },
  { value: "automation", labelKey: "categoriesAutomation" },
  { value: "enterprise", labelKey: "categories.enterprise" },
  { value: "open-source", labelKey: "categories.open-source" },
  { value: "rd", labelKey: "categories.rd" },
] as const;

const STATUS_DOT: Record<string, string> = {
  live: "bg-green-500",
  delivered: "bg-blue-500",
  built: "bg-blue-500",
  production: "bg-green-500",
  active: "bg-blue-500",
  maintenance: "bg-amber-500",
  archived: "bg-zinc-500",
  prototype: "bg-purple-500",
};

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  judicial: "judicial",
  healthcare: "healthcare",
  education: "education",
  "professional-services": "legalTech",
  wellness: "wellness",
  ecommerce: "ecommerce",
  mobile: "mobile",
  automation: "automation",
  enterprise: "enterprise",
  "open-source": "openSource",
  rd: "rd",
};

export default function ProjectsClient({
  projects,
  featuredProjects,
}: {
  projects: Project[];
  featuredProjects: Project[];
}) {
  const t = useTranslations("projects");
  const tDetail = useTranslations("projectDetail");
  return (
    <>
      {featuredProjects.length > 0 && (
        <Slide delay={0.1}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-6">
              {t("featured")}
            </h2>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.slug} project={project} />
              ))}
              {featuredProjects.length < 3 && (
                <div aria-hidden="true" className="relative hidden xl:flex items-center justify-center">
                  <span
                    className="z-host z-io z-draw h-80 w-80"
                    style={{ "--z-draw-delay": "0.5s" } as React.CSSProperties}
                    dangerouslySetInnerHTML={{ __html: STATIC_CHIP }}
                  />
                </div>
              )}
            </div>
          </section>
        </Slide>
      )}

      <Slide delay={0.15}>
        <ProjectsList projects={projects} />
      </Slide>
    </>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const locale = useLocale();
  const loc = locale === "fr" ? "fr" : "en";
  const t = useTranslations("projects");
  const tDetail = useTranslations("projectDetail");
  const statusLabels = t.raw("status") as Record<string, string>;
  const shortCategoryLabels = t.raw("categoryLabels") as Record<string, string>;
  const status = project.status || "production";
  const category = project.category || "enterprise";
  const displayName = project.displayName[loc] || project.displayName.en;
  const summary = project.summary[loc] || project.summary.en;

  const goToDetails = () => {
    trackProjectViewed({ project_slug: project.slug, source_page: "/projects" });
    router.push(`/projects/${project.slug}`);
  };

  return (
    <article
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target === e.currentTarget) goToDetails();
      }}
      tabIndex={0}
      role="link"
      aria-label={t("viewDetails", { name: displayName })}
      className="group relative cursor-pointer dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl p-6 hover:dark:border-zinc-600 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 transition-colors h-full flex flex-col"
    >
      <span
        aria-hidden="true"
        className="z-cc left-0 top-0 h-14 w-14"
        dangerouslySetInnerHTML={{ __html: STATIC_CARD_CORNER }}
      />
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <ProjectLogo
            src={project.assets.logo}
            name={displayName}
            category={category}
            slug={project.slug}
            wellClassName="h-14 max-w-[11rem]"
            iconSize={28}
          />
          <div className="min-w-0">
            <h3 className="font-incognito font-semibold text-lg flex items-center gap-1.5">
              {project.featured && (
                <Star size={16} weight="fill" className="text-amber-500 shrink-0" aria-label={t("featuredAriaLabel")} />
              )}
              {displayName}
            </h3>
            <p className="flex items-center gap-2 mt-1 text-xs">
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${STATUS_DOT[status] || "bg-zinc-500"}`} aria-hidden="true" />
              <span className="font-medium dark:text-zinc-300 text-zinc-700">
                {statusLabels[status] || status}
              </span>
              <span className="dark:text-zinc-600 text-zinc-400" aria-hidden="true">·</span>
              <span className="uppercase tracking-wider dark:text-zinc-500 text-zinc-500">
                {shortCategoryLabels[CATEGORY_LABEL_KEYS[category]] || category}
              </span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4 flex-1">
        {summary}
      </p>

      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack
            .flatMap((layer) => layer.items)
            .slice(0, 6)
            .map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700"
              >
                {tech}
              </span>
            ))}
          {project.stack.flatMap((layer) => layer.items).length > 6 && (
            <span className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-500 text-zinc-500">
              +{project.stack.flatMap((layer) => layer.items).length - 6}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t dark:border-zinc-700 border-zinc-200">
        {project.access === "live" && project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackLiveDemoClicked({ project_slug: project.slug });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
          >
            <BiLinkExternal className="text-base" />
            {tDetail("live")}
          </a>
        )}
        {project.access === "repo" && project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackGithubLinkClicked({ repo: displayName });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900"
          >
            <BiLogoGithub className="text-base" />
            {tDetail("code")}
          </a>
        )}
        <button
          onClick={goToDetails}
          className="ml-auto inline-flex items-center gap-1 text-sm font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 hover:underline"
          aria-label={t("viewDetails", { name: displayName })}
        >
          {t("detailsArrow")}
        </button>
      </div>
    </article>
  );
}

function ProjectsList({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = useTranslations("projects");
  const tNav = useTranslations("navigation");
  const tDetail = useTranslations("projectDetail");

  const publicProjects = projects.filter((p) => p.visibility === "public");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return publicProjects;
    return publicProjects.filter((p) => p.category === activeCategory);
  }, [publicProjects, activeCategory]);

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { all: publicProjects.length };
    publicProjects.forEach((p) => {
      const cat = p.category || "enterprise";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return CATEGORIES.map((c) => ({ ...c, count: counts[c.value] || 0 })).filter((c) => c.count > 0);
  }, [publicProjects]);

  const activeCategoryLabel = t(
    CATEGORIES.find((c) => c.value === activeCategory)?.labelKey ?? "categories.all"
  );

  return (
    <section>
      <div className="z-pills flex flex-wrap gap-2 mb-8" role="tablist" aria-label={t("categoriesAriaLabel")}>
        {categoriesWithCounts.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? "dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-white shadow-lg"
                : "dark:bg-primary-bg bg-zinc-100 dark:text-zinc-400 text-zinc-600 hover:dark:bg-zinc-800 hover:bg-zinc-200 hover:dark:text-white hover:text-zinc-900"
            }`}
          >
            {t(cat.labelKey)} <span className="ml-2 opacity-70">({cat.count})</span>
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        activeCategory === "all" ? (
          <div className="space-y-16">
            {/* Main Products Grid */}
            <div className="z-remount grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              {publicProjects
                .filter(
                  (p) =>
                    !["autodeal", "courier-go", "ride-link", "secudrive-mobile", "evolution-agent", "whatsapp-sales-bot", "n8n-templates-library"].includes(
                      p.slug
                    )
                )
                .map((project, i) => (
                  <ProjectCard key={project.slug} project={project} idx={i} />
                ))}
            </div>

            {/* Also Built Group */}
            {publicProjects.some((p) =>
              ["autodeal", "courier-go", "ride-link", "secudrive-mobile"].includes(p.slug)
            ) && (
              <section className="pt-8 border-t dark:border-zinc-800/80 border-zinc-200">
                <div className="mb-6">
                  <h3 className="text-xl font-incognito font-bold tracking-tight mb-1">
                    {t("alsoBuiltTitle")}
                  </h3>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600">
                    {t("alsoBuiltSubtitle")}
                  </p>
                </div>
                <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                  {publicProjects
                    .filter((p) =>
                      ["autodeal", "courier-go", "ride-link", "secudrive-mobile"].includes(p.slug)
                    )
                    .map((project, i) => (
                      <ProjectCard key={project.slug} project={project} idx={i} />
                    ))}
                </div>
              </section>
            )}

            {/* Automation Group */}
            {publicProjects.some((p) =>
              ["evolution-agent", "whatsapp-sales-bot", "n8n-templates-library"].includes(p.slug)
            ) && (
              <section className="pt-8 border-t dark:border-zinc-800/80 border-zinc-200">
                <div className="mb-6">
                  <h3 className="text-xl font-incognito font-bold tracking-tight mb-1">
                    {t("automationTitle")}
                  </h3>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600">
                    {t("automationSubtitle")}
                  </p>
                </div>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                  {publicProjects
                    .filter((p) =>
                      ["evolution-agent", "whatsapp-sales-bot", "n8n-templates-library"].includes(p.slug)
                    )
                    .map((project, i) => (
                      <ProjectCard key={project.slug} project={project} idx={i} />
                    ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="z-remount grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} idx={i} />
            ))}
            {filteredProjects.length % 3 !== 0 && (
              <div aria-hidden="true" className="relative hidden xl:flex items-center justify-center min-h-56">
                <span
                  className="z-host z-sleep h-64 w-80"
                  dangerouslySetInnerHTML={{ __html: STATIC_RHOMBI }}
                />
              </div>
            )}
          </div>
        )
      ) : (
        <EmptyState
          value={
            activeCategory === "all"
              ? tNav("projects")
              : t("emptyStateMessage", { category: activeCategoryLabel })
          }
        />
      )}
    </section>
  );
}

function ProjectCard({ project, idx = 0 }: { project: Project; idx?: number }) {
  const router = useRouter();
  const locale = useLocale();
  const loc = locale === "fr" ? "fr" : "en";
  const t = useTranslations("projects");
  const tDetail = useTranslations("projectDetail");
  const statusLabels = t.raw("status") as Record<string, string>;
  const status = project.status || "production";
  const category = project.category || "enterprise";
  const displayName = project.displayName[loc] || project.displayName.en;
  const summary = project.summary[loc] || project.summary.en;

  const goToDetails = () => {
    trackProjectViewed({ project_slug: project.slug, source_page: "/projects" });
    router.push(`/projects/${project.slug}`);
  };

  return (
    <article
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target === e.currentTarget) goToDetails();
      }}
      tabIndex={0}
      role="link"
      aria-label={t("viewDetails", { name: displayName })}
      className="group relative cursor-pointer dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-4 hover:dark:border-zinc-600 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 transition-colors flex flex-col h-full"
    >
      <span
        aria-hidden="true"
        className="z-cc left-0 top-0 h-14 w-14"
        style={{ "--z-cc-delay": `${idx * 0.12}s` } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: STATIC_CARD_CORNER }}
      />
      <div className="flex items-center gap-3 mb-3">
        <ProjectLogo
          src={project.assets.logo}
          name={displayName}
          category={category}
          slug={project.slug}
          wellClassName="h-11 max-w-[9rem]"
          iconSize={22}
        />
        <div className="min-w-0">
          <h3 className="font-incognito font-semibold text-base group-hover:underline truncate">{displayName}</h3>
          <p className="flex items-center gap-1.5 text-[11px]">
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${STATUS_DOT[status] || "bg-zinc-500"}`} aria-hidden="true" />
            <span className="font-medium dark:text-zinc-300 text-zinc-700">
              {statusLabels[status] || status}
            </span>
          </p>
        </div>
      </div>

      <p className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed mb-3 flex-1">
        {summary}
      </p>

      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.stack
            .flatMap((layer) => layer.items)
            .slice(0, 4)
            .map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[11px] font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-400 text-zinc-600"
              >
                {tech}
              </span>
            ))}
          {project.stack.flatMap((layer) => layer.items).length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[11px] font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-500 text-zinc-500">
              +{project.stack.flatMap((layer) => layer.items).length - 4}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 pt-3 border-t dark:border-zinc-700 border-zinc-200">
        {project.access === "live" && project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackLiveDemoClicked({ project_slug: project.slug });
            }}
            className="inline-flex items-center gap-1 text-xs font-medium dark:text-primary-color text-secondary-color hover:underline"
          >
            <BiLinkExternal className="text-sm" />
            {tDetail("live")}
          </a>
        )}
        {project.access === "repo" && project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackGithubLinkClicked({ repo: displayName });
            }}
            className="inline-flex items-center gap-1 text-xs font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900"
          >
            <BiLogoGithub className="text-sm" />
            {tDetail("code")}
          </a>
        )}
        <button
          onClick={goToDetails}
          className="ml-auto inline-flex items-center gap-1 text-xs font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 hover:underline"
          aria-label={t("viewDetails", { name: displayName })}
        >
          {t("detailsArrow")}
        </button>
      </div>
    </article>
  );
}
