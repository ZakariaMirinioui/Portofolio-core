import { Metadata } from "next";
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

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Zakaria Mirinioui",
  metadataBase: new URL("https://zakariamirinioui.surge.sh"),
  description:
    "Full Stack Developer & Digital Solutions Architect based in Casablanca & El Jadida, Morocco. Building secure, enterprise-grade systems with Java/Spring Boot and React/Next.js. Experience, stack, certifications and CV download.",
  openGraph: {
    title: "About | Zakaria Mirinioui",
    url: "/about",
    description:
      "Full Stack Developer & Digital Solutions Architect based in Casablanca & El Jadida, Morocco.",
    images: "/og.png",
  },
  alternates: {
    canonical: "/about",
  },
};

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

export default async function About() {
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
              className="mb-12 lg:mb-16"
            />
            <KpiStrip className="mb-12 lg:mb-16" />
            <ExperienceTimeline className="mb-12 lg:mb-16" />
            <FeaturedWork className="mb-12 lg:mb-16" />
            <StackGrid className="mb-12 lg:mb-16" />
            <ClosingBand className="mb-12 lg:mb-16" />
          </div>
          <aside
            className="top-24 lg:sticky lg:top-24"
            aria-label="About sidebar"
          >
            <AboutSidebar profile={profile ?? fallbackProfile} />
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
