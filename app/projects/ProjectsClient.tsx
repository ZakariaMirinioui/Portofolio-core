"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
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

const STATUS_COLORS: Record<string, string> = {
  production: "dark:bg-green-900/30 bg-green-100 dark:text-green-400 text-green-700 border-green-300 dark:border-green-800",
  active: "dark:bg-blue-900/30 bg-blue-100 dark:text-blue-400 text-blue-700 border-blue-300 dark:border-blue-800",
  maintenance: "dark:bg-amber-900/30 bg-amber-100 dark:text-amber-400 text-amber-700 border-amber-300 dark:border-amber-800",
  archived: "dark:bg-zinc-900/30 bg-zinc-100 dark:text-zinc-400 text-zinc-700 border-zinc-300 dark:border-zinc-800",
  prototype: "dark:bg-purple-900/30 bg-purple-100 dark:text-purple-400 text-purple-700 border-purple-300 dark:border-purple-800",
};

const CATEGORY_LABELS: Record<string, string> = {
  judicial: "Judicial",
  healthcare: "Healthcare",
  education: "Education",
  "professional-services": "Legal Tech",
  wellness: "Wellness",
  ecommerce: "E-commerce",
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
  const hasCaseStudy = !!project.caseStudy;
  const status = project.status || "production";
  const category = project.category || "enterprise";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {project.logo ? (
            <Image
              src={project.logo}
              width={48}
              height={48}
              alt={project.name}
              className="dark:bg-zinc-800 bg-zinc-100 rounded-lg p-2"
            />
          ) : (
            <div className="dark:bg-zinc-800 bg-zinc-100 rounded-lg p-2 text-2xl">🚀</div>
          )}
          <div>
            <h3 className="font-incognito font-semibold text-lg">{project.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[status]}`}>
                {STATUS_LABELS[status] || status}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-400 text-zinc-600 border dark:border-zinc-700 border-zinc-200">
                {CATEGORY_LABELS[category] || category}
              </span>
            </div>
          </div>
        </div>
        {project.featured && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium dark:bg-amber-900/30 bg-amber-100 dark:text-amber-400 text-amber-700 border dark:border-amber-800 border-amber-300">
            ⭐ Featured
          </span>
        )}
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
            onClick={() => trackLiveDemoClicked({ project_slug: project.slug })}
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
            onClick={() => trackGithubLinkClicked({ repo: project.name })}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900"
          >
            <BiLogoGithub className="text-base" />
            Code
          </a>
        )}
        {hasCaseStudy && (
          <Link
            href={`/projects/${project.slug}/case-study`}
            onClick={() => trackProjectViewed({ project_slug: project.slug, source_page: window.location.pathname })}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-blue-400 text-blue-600 hover:underline"
          >
            <BiBookOpen className="text-base" />
            Case Study
          </Link>
        )}
      </div>
    </Link>
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
  const hasCaseStudy = !!project.caseStudy;
  const status = project.status || "production";
  const category = project.category || "enterprise";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-4 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-3">
        {project.logo ? (
          <Image
            src={project.logo}
            width={40}
            height={40}
            alt={project.name}
            className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-1.5 flex-shrink-0"
          />
        ) : (
          <div className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-1.5 text-xl flex-shrink-0">📦</div>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[status]}`}>
            {STATUS_LABELS[status] || status}
          </span>
        </div>
      </div>

      <h3 className="font-incognito font-semibold text-base mb-1 group-hover:underline">{project.name}</h3>
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
            onClick={() => trackLiveDemoClicked({ project_slug: project.slug })}
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
            onClick={() => trackGithubLinkClicked({ repo: project.name })}
            className="inline-flex items-center gap-1 text-xs font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900"
          >
            <BiLogoGithub className="text-sm" />
            Code
          </a>
        )}
        {hasCaseStudy && (
          <Link
            href={`/projects/${project.slug}/case-study`}
            onClick={() => trackProjectViewed({ project_slug: project.slug, source_page: window.location.pathname })}
            className="inline-flex items-center gap-1 text-xs font-medium dark:text-blue-400 text-blue-600 hover:underline"
          >
            <BiBookOpen className="text-sm" />
            Case Study
          </Link>
        )}
      </div>
    </Link>
  );
}