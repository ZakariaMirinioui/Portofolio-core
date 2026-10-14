import { Metadata } from "next";
import { projectsQuery, featuredProjectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";
import ProjectsClient from "./ProjectsClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects | Zakaria Mirinioui",
  metadataBase: new URL("https://zakaria-mirinioui.dev/projects"),
  description:
    "Explore enterprise-grade projects: sovereign judicial systems, multi-tenant SaaS platforms, live e-commerce, and open-source tools.",
  openGraph: {
    title: "Projects | Zakaria Mirinioui",
    url: "https://zakaria-mirinioui.dev/projects",
    description:
      "Explore enterprise-grade projects: sovereign judicial systems, multi-tenant SaaS platforms, live e-commerce, and open-source tools.",
    images: "/og.png",
  },
};

export default async function ProjectsPage() {
  const [projects, featuredProjects] = await Promise.all([
    sanityFetch({ query: projectsQuery, tags: ["project"] }) as Promise<ProjectType[]>,
    sanityFetch({ query: featuredProjectsQuery, tags: ["project"] }) as Promise<ProjectType[]>,
  ]);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Projects"
        description="Enterprise-grade systems, multi-tenant SaaS platforms, and open-source tools. Each project represents a real-world challenge solved with modern architecture and measurable impact."
      />

      <ProjectsClient projects={projects} featuredProjects={featuredProjects} />
    </main>
  );
}