import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternateUrls, getCanonicalUrl, SITE_URL } from "@/lib/metadata";
import type { Project } from "@/types";
import PageHeading from "../../components/shared/PageHeading";
import Circuit from "../../components/decor/Circuit";
import NextPageTeaser from "../../components/sections/NextPageTeaser";
import ProjectsClient from "./ProjectsClient";
import { projects, featuredProjects } from "../../data/projects";

export async function generateMetadata({
  params,
}: {
    params: { locale: string };
  }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = "/projects";
  return {
    title: t("projects.title"),
    description: t("projects.description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: getCanonicalUrl(locale, path),
      languages: getAlternateUrls(path),
    },
    openGraph: {
      title: t("projects.title"),
      description: t("projects.description"),
      url: getCanonicalUrl(locale, path),
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <div className="relative">
        <Circuit
          variant="headerRoots"
          uid="projects-head"
          draw
          fade
          className="hidden lg:block left-1 right-1 -top-[104px] h-44"
          style={{ "--zm-o": "0.24", "--z-draw-delay": "0.4s" } as React.CSSProperties}
        />
        <PageHeading
          title={t("title")}
          description={t("description")}
        />
      </div>

      <ProjectsClient projects={projects} featuredProjects={featuredProjects} />
      <NextPageTeaser
        href="/services"
        title={tNav("services")}
        description={t("nextPageTeaserServicesDescription")}
      />
    </main>
  );
}