import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternateUrls, getCanonicalUrl, SITE_URL } from "@/lib/metadata";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import CvDownload from "@/app/components/cv-download/CvDownload";
import AboutHero from "@/app/components/sections/AboutHero";
import KpiStrip from "@/app/components/sections/KpiStrip";
import ExperienceTimeline from "@/app/components/sections/ExperienceTimeline";
import FeaturedWork from "@/app/components/sections/FeaturedWork";
import StackGrid from "@/app/components/sections/StackGrid";
import ClosingBand from "@/app/components/sections/ClosingBand";
import AboutSidebar from "@/app/components/sections/AboutSidebar";
import { Slide } from "@/app/animation/Slide";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = "/about";
  return {
    title: t("about.title"),
    description: t("about.description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: getCanonicalUrl(locale, path),
      languages: getAlternateUrls(path),
    },
    openGraph: {
      title: t("about.title"),
      description: t("about.description"),
      url: getCanonicalUrl(locale, path),
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

const fallbackProfile: ProfileType = {
  _id: "fallback",
  fullName: "Zakaria Mirinioui",
  headline: "Full Stack Developer & Digital Solutions Architect",
  profileImage: {
    image: "/personal-img-formal.webp",
    lqip: "",
    alt: "Portrait of Zakaria Mirinioui",
  },
  shortBio: "",
  location: "Casablanca & El Jadida, Morocco",
  fullBio: [],
  email: "zakmirinioui@gmail.com",
  resumeURL: "",
  og: "",
  usage: [],
};

export default async function About({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });
  let profile: ProfileType | null = null;
  try {
    profile = await sanityFetch({ query: profileQuery, tags: ["profile"] });
  } catch {
    profile = null;
  }

  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6 lg:mt-20 mt-12">
      <Slide>
        <div className="grid gap-y-12 lg:gap-x-10 lg:grid-cols-[1.55fr_1fr]">
          <div className="lg:col-start-1">
            <AboutHero
              profile={profile ?? fallbackProfile}
              locale={locale}
              className="mb-12 lg:mb-16"
            />
            <KpiStrip locale={locale} className="mb-12 lg:mb-16" />
            <ExperienceTimeline locale={locale} className="mb-12 lg:mb-16" />
            <FeaturedWork locale={locale} className="mb-12 lg:mb-16" />
            <StackGrid className="mb-12 lg:mb-16" />
            <ClosingBand locale={locale} className="mb-12 lg:mb-16" />
          </div>
          <aside
            className="top-24 lg:sticky lg:top-24"
            aria-label={t("sidebarLabel")}
          >
            <AboutSidebar
              profile={profile ?? fallbackProfile}
              locale={locale}
            />
          </aside>
        </div>
      </Slide>

      <div className="mt-8">
        <CvDownload
          variant="sticky"
          className="fixed bottom-6 left-6 right-6 md:hidden z-40 w-full"
        />
      </div>
    </main>
  );
}
