import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://zakariamirinioui.surge.sh";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/", "/_next/", "/static/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}