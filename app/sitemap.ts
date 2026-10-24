import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAlternateUrls, SITE_URL } from "@/lib/metadata";
import { projects } from "./data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const projectUrls: MetadataRoute.Sitemap = projects
    .filter((project) => project.visibility === "public")
    .flatMap((project) =>
    routing.locales.map((locale) => {
      const path = `/projects/${project.slug}`;
      return {
        url: `${SITE_URL}/${locale}${path}/`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: getAlternateUrls(path) },
      };
    })
  );

  return [...staticUrls, ...projectUrls];
}