import { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity.client";
import { projectsQuery } from "@/lib/sanity.query";
import { routing } from "@/i18n/routing";
import { getAlternateUrls, SITE_URL } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  })) as Array<{ slug: string; _updatedAt: string }>;

  const staticPaths = ["/", "/about", "/projects", "/services", "/dossera"];

  const staticUrls: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path === "/" ? "/" : `${path}/`}`,
      lastModified: new Date(),
      changeFrequency: (path === "/" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: path === "/" ? 1.0 : 0.8,
      alternates: { languages: getAlternateUrls(path) },
    }))
  );

  const projectUrls: MetadataRoute.Sitemap = projects.flatMap((project) =>
    routing.locales.map((locale) => {
      const path = `/projects/${project.slug}`;
      return {
        url: `${SITE_URL}/${locale}${path}/`,
        lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: getAlternateUrls(path) },
      };
    })
  );

  return [...staticUrls, ...projectUrls];
}
