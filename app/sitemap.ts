import { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity.client";
import { projectsQuery, caseStudiesQuery, servicesQuery } from "@/lib/sanity.query";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zakaria-mirinioui.dev";

  const [projects, caseStudies, services] = await Promise.all([
    sanityFetch({ query: projectsQuery, tags: ["project"] }) as Promise<Array<{ slug: string; _updatedAt: string }>>,
    sanityFetch({ query: caseStudiesQuery, tags: ["caseStudy"] }) as Promise<Array<{ slug: string; _updatedAt: string }>>,
    sanityFetch({ query: servicesQuery, tags: ["service"] }) as Promise<Array<{ slug: string; _updatedAt: string }>>,
  ]);

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyUrls = caseStudies.map((cs) => ({
    url: `${baseUrl}/projects/${cs.slug}/case-study`,
    lastModified: cs._updatedAt ? new Date(cs._updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service._updatedAt ? new Date(service._updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dossera`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ];

  return [...staticUrls, ...projectUrls, ...caseStudyUrls, ...serviceUrls];
}