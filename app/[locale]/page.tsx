import { getTranslations } from "next-intl/server";
import type { ProfileType, TestimonialType } from "@/types";
import Job from "../components/pages/Job";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import ContributionGraph from "../components/pages/GithubCalendarComponent";
import ValueProps from "../components/sections/ValueProps";
import StatsBar from "../components/sections/StatsBar";
import CaseStudyTeaser from "../components/sections/CaseStudyTeaser";
import ServicesOverview from "../components/sections/ServicesOverview";
import TestimonialsCarousel from "../components/sections/TestimonialsCarousel";
import ClientLogos from "../components/sections/ClientLogos";
import NextPageTeaser from "../components/sections/NextPageTeaser";
import HeroAnimation from "../components/hero/HeroAnimation";
import Circuit from "../components/decor/Circuit";
import { profile } from "../data/profile";
import { featuredTestimonials } from "../data/testimonials";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="relative flex xl:flex-row flex-col xl:items-center items-start xl:justify-between justify-between gap-x-12 mb-16">
        <div className="z-chip-zone hidden xl:block absolute right-2 top-1/2 h-[300px] w-[300px] -translate-y-1/2" aria-hidden="true">
          <Circuit
            variant="chip"
            uid="home-chip"
            draw
            fade
            className="inset-0 z-drift"
            style={{ "--z-draw-delay": "0.6s" } as React.CSSProperties}
          />
        </div>
        <div key={profile._id} className="lg:max-w-2xl max-w-2xl">
          <Slide>
            <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full animate-[fadeSlideUp_700ms_ease_out_forwards]" style={{animationDelay:"0ms"}}>
              Full Stack Developer & Digital Solutions Architect — Building enterprise-grade applications for judicial and secure logistics sectors
            </h1>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {profile.shortBio ?? t("hero.subheadline")}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <Social type="social" />
          </Slide>
        </div>
        <Slide delay={0.14}>
          <HeroAnimation />
        </Slide>
      </section>

      <StatsBar locale={locale} />
      <ValueProps locale={locale} />
      <CaseStudyTeaser locale={locale} />
      <ServicesOverview locale={locale} />
      <div className="hidden lg:block relative py-2" aria-hidden="true">
        <Circuit
          variant="crown"
          uid="home-crown"
          draw
          fade
          className="left-0 right-0 top-0 h-40"
          style={{ "--z-draw-delay": "0.2s" } as React.CSSProperties}
        />
      </div>
      <ClientLogos locale={locale} />
      <section className="mt-24 mb-16">
        <Slide delay={0.18}>
          <h2 className="text-2xl font-incognito font-bold tracking-tight mb-8 text-center">
            {t("testimonials.title")}
          </h2>
          <TestimonialsCarousel testimonials={featuredTestimonials} />
        </Slide>
      </section>
      <ContributionGraph locale={locale} />
      <Job />
      <NextPageTeaser
        href="/about"
        title={tNav("about")}
        description={t("nextPageTeaserAbout")}
      />
    </main>
  );
}