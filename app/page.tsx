import { profileQuery, testimonialsQuery, featuredTestimonialsQuery } from "@/lib/sanity.query";
import type { ProfileType, TestimonialType } from "@/types";
import HeroSvg from "./assets/icons/HeroSvg";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import ValueProps from "./components/sections/ValueProps";
import StatsBar from "./components/sections/StatsBar";
import CaseStudyTeaser from "./components/sections/CaseStudyTeaser";
import ServicesOverview from "./components/sections/ServicesOverview";
import TestimonialsCarousel from "./components/sections/TestimonialsCarousel";
import ClientLogos from "./components/sections/ClientLogos";

export const revalidate = 3600;

export default async function Home() {
  const [profile, featuredTestimonials, allTestimonials] = await Promise.all([
    sanityFetch({ query: profileQuery, tags: ["profile"] }) as Promise<ProfileType | null>,
    sanityFetch({ query: featuredTestimonialsQuery, tags: ["testimonial"] }) as Promise<TestimonialType[]>,
    sanityFetch({ query: testimonialsQuery, tags: ["testimonial"] }) as Promise<TestimonialType[]>,
  ]);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
        <div key={profile?._id} className="lg:max-w-2xl max-w-2xl">
          <Slide>
            <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
              {profile?.headline ?? "Solutions Architect & Agency Founder"}
            </h1>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {profile?.shortBio ?? "I help institutions and businesses digitize with sovereign, secure systems — from judicial archives to multi-tenant SaaS platforms."}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <Social type="social" />
          </Slide>
        </div>
        <Slide delay={0.14}>
          <HeroSvg />
        </Slide>
      </section>

      <StatsBar />
      <ValueProps />
      <CaseStudyTeaser />
      <ServicesOverview />
      <ClientLogos />
      <section className="mt-24 mb-16">
        <Slide delay={0.18}>
          <h2 className="text-2xl font-incognito font-bold tracking-tight mb-8 text-center">
            Trusted by Clients
          </h2>
          <TestimonialsCarousel testimonials={featuredTestimonials} />
        </Slide>
      </section>
      <ContributionGraph />
      <Job />
    </main>
  );
}