"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "@phosphor-icons/react";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import ProjectLogo from "../components/shared/ProjectLogo";
import { Slide } from "../animation/Slide";
import { BiLinkExternal, BiLogoGithub, BiBookOpen } from "react-icons/bi";
import { trackProjectViewed, trackGithubLinkClicked, trackLiveDemoClicked } from "../lib/analytics";

const CATEGORIES = [
  { value: "all", label: "All Projects" },
  { value: "judicial", label: "Judicial / Legal Tech" },
  { value: "healthcare", label: "Healthcare SaaS" },
  { value: "education", label: "Education SaaS" },
  { value: "professional-services", label: "Professional Services SaaS" },
  { value: "wellness", label: "Wellness / Beauty SaaS" },
  { value: "ecommerce", label: "E-commerce / Marketplace" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "enterprise", label: "Enterprise / Internal Tools" },
  { value: "open-source", label: "Open Source" },
  { value: "rd", label: "R&D / Experiment" },
] as const;

const STATUS_LABELS: Record<string, string> = {
  production: "Production",
  active: "Active Development",
  maintenance: "Maintenance",
  archived: "Archived",
  prototype: "Prototype",
};

const STATUS_DOT: Record<string, string> = {
  production: "bg-green-500",
  active: "bg-blue-500",
  maintenance: "bg-amber-500",
  archived: "bg-zinc-500",
  prototype: "bg-purple-500",
};

const CATEGORY_LABELS: Record<string, string> = {
  judicial: "Judicial",
  healthcare: "Healthcare",
  education: "Education",
  "professional-services": "Legal Tech",
  wellness: "Wellness",
  ecommerce: "E-commerce",
  mobile: "Mobile",
  enterprise: "Enterprise",
  "open-source": "Open Source",
  rd: "R&D",
};

export default function ProjectsClient({
  projects,
  featuredProjects,
}: {
  projects: ProjectType[];
  featuredProjects: ProjectType[];
}) {
  return (
    <>
      {featuredProjects.length > 0 && (
        <Slide delay={0.1}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-6">
              Featured Work
            </h2>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project._id} project={project} />
              ))}
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

function FeaturedProjectCard({ project }: { project: ProjectType }) {
  const router = useRouter();
  const hasCaseStudy = !!project.caseStudy;
  const status = project.status || "production";
  const category = project.category || "enterprise";

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
      aria-label={`View details of ${project.name}`}
      className="group cursor-pointer dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl p-6 hover:dark:border-zinc-600 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 transition-colors h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <ProjectLogo
            src={project.logo}
            name={project.name}
            category={category}
            wellClassName="h-14 max-w-[11rem]"
            iconSize={28}
          />
          <div className="min-w-0">
            <h3 className="font-incognito font-semibold text-lg flex items-center gap-1.5">
              {project.featured && (
                <Star size={16} weight="fill" className="text-amber-500 shrink-0" aria-label="Featured project" />
              )}
              {project.name}
            </h3>
            <p className="flex items-center gap-2 mt-1 text-xs">
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${STATUS_DOT[status] || "bg-zinc-500"}`} aria-hidden="true" />
              <span className="font-medium dark:text-zinc-300 text-zinc-700">
                {STATUS_LABELS[status] || status}
              </span>
              <span className="dark:text-zinc-600 text-zinc-400" aria-hidden="true">·</span>
              <span className="uppercase tracking-wider dark:text-zinc-500 text-zinc-500">
                {CATEGORY_LABELS[category] || category}
              </span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4 flex-1">
        {project.tagline}
      </p>

      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 6 && (
            <span className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-500 text-zinc-500">
              +{project.techStack.length - 6}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t dark:border-zinc-700 border-zinc-200">
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackLiveDemoClicked({ project_slug: project.slug });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
          >
            <BiLinkExternal className="text-base" />
            Live
          </a>
        )}
        {project.repository && (
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackGithubLinkClicked({ repo: project.name });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900"
          >
            <BiLogoGithub className="text-base" />
            Code
          </a>
        )}
        {hasCaseStudy && (
          <Link
            href={`/projects/${project.slug}/case-study`}
            onClick={(e) => {
              e.stopPropagation();
              trackProjectViewed({ project_slug: project.slug, source_page: "/projects" });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-blue-400 text-blue-600 hover:underline"
          >
            <BiBookOpen className="text-base" />
            Case Study
          </Link>
        )}
        <button
          onClick={goToDetails}
          className="ml-auto inline-flex items-center gap-1 text-sm font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 hover:underline"
          aria-label={`View details of ${project.name}`}
        >
          Details →
        </button>
      </div>
    </article>
  );
}

function ProjectsList({ projects }: { projects: ProjectType[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    projects.forEach((p) => {
      const cat = p.category || "enterprise";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return CATEGORIES.map((c) => ({ ...c, count: counts[c.value] || 0 })).filter((c) => c.count > 0);
  }, [projects]);

  return (
    <section>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Project categories">
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
            {cat.label} <span className="ml-2 opacity-70">({cat.count})</span>
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState value={`Projects in ${CATEGORIES.find((c) => c.value === activeCategory)?.label || "this category"}`} />
      )}
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectType }) {
  const router = useRouter();
  const hasCaseStudy = !!project.caseStudy;
  const status = project.status || "production";
  const category = project.category || "enterprise";

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
      aria-label={`View details of ${project.name}`}
      className="group cursor-pointer dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-4 hover:dark:border-zinc-600 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 transition-colors flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <ProjectLogo
          src={project.logo}
          name={project.name}
          category={category}
          wellClassName="h-11 max-w-[9rem]"
          iconSize={22}
        />
        <div className="min-w-0">
          <h3 className="font-incognito font-semibold text-base group-hover:underline truncate">{project.name}</h3>
          <p className="flex items-center gap-1.5 text-[11px]">
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${STATUS_DOT[status] || "bg-zinc-500"}`} aria-hidden="true" />
            <span className="font-medium dark:text-zinc-300 text-zinc-700">
              {STATUS_LABELS[status] || status}
            </span>
          </p>
        </div>
      </div>

      <p className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed mb-3 flex-1">{project.tagline}</p>

      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 rounded text-[11px] font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-400 text-zinc-600"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[11px] font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-500 text-zinc-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 pt-3 border-t dark:border-zinc-700 border-zinc-200">
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackLiveDemoClicked({ project_slug: project.slug });
            }}
            className="inline-flex items-center gap-1 text-xs font-medium dark:text-primary-color text-secondary-color hover:underline"
          >
            <BiLinkExternal className="text-sm" />
            Live
          </a>
        )}
        {project.repository && (
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              trackGithubLinkClicked({ repo: project.name });
            }}
            className="inline-flex items-center gap-1 text-xs font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900"
          >
            <BiLogoGithub className="text-sm" />
            Code
          </a>
        )}
        {hasCaseStudy && (
          <Link
            href={`/projects/${project.slug}/case-study`}
            onClick={(e) => {
              e.stopPropagation();
              trackProjectViewed({ project_slug: project.slug, source_page: "/projects" });
            }}
            className="inline-flex items-center gap-1 text-xs font-medium dark:text-blue-400 text-blue-600 hover:underline"
          >
            <BiBookOpen className="text-sm" />
            Case Study
          </Link>
        )}
      </div>
    </article>
  );
}