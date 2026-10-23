import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAlternateUrls, getCanonicalUrl, SITE_URL } from "@/lib/metadata";
import { Slide } from "../../animation/Slide";
import PageHeading from "../../components/shared/PageHeading";
import Circuit from "../../components/decor/Circuit";
import { STATIC_MICRO_CORNER, STATIC_CARD_CORNER } from "../../components/decor/circuitStatics";
import DosseraContactForm from "../../components/sections/DosseraContactForm";
import DosseraLogo from "../../components/sections/DosseraLogo";
import NextPageTeaser from "../../components/sections/NextPageTeaser";
import TestimonialsCarousel from "../../components/sections/TestimonialsCarousel";
import {
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineSearch,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineGlobe,
} from "react-icons/hi";
import { featuredTestimonials } from "../../data/testimonials";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = "/dossera";
  return {
    title: t("dossera.title"),
    description: t("dossera.description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: getCanonicalUrl(locale, path),
      languages: getAlternateUrls(path),
    },
    openGraph: {
      title: t("dossera.title"),
      description: t("dossera.description"),
      url: getCanonicalUrl(locale, path),
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Dossera({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dossera" });
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  const features = [
    {
      icon: HiOutlineDocumentText,
      title: t("features.ocr.title"),
      description: t("features.ocr.description"),
    },
    {
      icon: HiOutlineSearch,
      title: t("features.search.title"),
      description: t("features.search.description"),
    },
    {
      icon: HiOutlineShieldCheck,
      title: t("features.archiving.title"),
      description: t("features.archiving.description"),
    },
    {
      icon: HiOutlineCog,
      title: t("features.rbac.title"),
      description: t("features.rbac.description"),
    },
    {
      icon: HiOutlineDatabase,
      title: t("features.cache.title"),
      description: t("features.cache.description"),
    },
    {
      icon: HiOutlineGlobe,
      title: t("features.onPremise.title"),
      description: t("features.onPremise.description"),
    },
  ];

  const deployments = [
    {
      court: t("deployments.khouribga.court"),
      status: t("deployments.khouribga.status"),
      description: t("deployments.khouribga.description"),
    },
    {
      court: t("deployments.appeal.court"),
      status: t("deployments.appeal.status"),
      description: t("deployments.appeal.description"),
    },
  ];

  const services = [
    {
      title: t("services.courts.title"),
      description: t("services.courts.description"),
    },
    {
      title: t("services.lawFirms.title"),
      description: t("services.lawFirms.description"),
    },
    {
      title: t("services.notary.title"),
      description: t("services.notary.description"),
    },
    {
      title: t("services.government.title"),
      description: t("services.government.description"),
    },
  ];

  const techStack = t.raw("techStack") as Array<{ name: string; category: string }>;
  const testimonials = featuredTestimonials;
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading title={t("title")} description={t("subtitle")} />

      {/* Product identity */}
      <Slide delay={0.1}>
        <div className="relative mb-12">
          <div className="z-chip-zone hidden xl:block absolute right-[-1rem] top-[45%] h-[21rem] w-[21rem] -translate-y-1/2" aria-hidden="true">
            <Circuit
              variant="chip"
              uid="dossera-chip"
              draw
              fade
              className="inset-0 z-drift z-chip-artwork"
              style={{ "--z-draw-delay": "0.55s" } as React.CSSProperties}
            />
          </div>
          <DosseraLogo heightClassName="h-12 md:h-14" />
          <p className="flex items-center gap-2 mt-4 text-sm">
            <span className="h-2 w-2 rounded-full bg-dossera-color" aria-hidden="true" />
             <span className="font-medium dark:text-zinc-200 text-zinc-800">
              {t("status")}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5">
             <a
              href="https://dossera.surge.sh"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-dossera-color bg-dossera-color/20 dark:text-white text-zinc-900 text-sm font-semibold border border-dossera-color hover:bg-dossera-color hover:opacity-90 transition-all"
            >
              {t("liveDemo")}
            </a>
            <a
              href="mailto:zakmirinioui@gmail.com?subject=Dossera%20JAMS%20-%20Demo%20Request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-zinc-800 bg-zinc-200 dark:text-white text-zinc-900 text-sm font-semibold border dark:border-zinc-700 border-zinc-300 hover:dark:border-zinc-500 hover:border-zinc-400 transition-colors"
            >
              {t("cta.requestDemo")}
            </a>
            <a
              href="tel:+212629258876"
              className="inline-flex items-center gap-2 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
            >
              {t("callUs", { phone: "+212 629 258 876" })}
            </a>
          </div>
        </div>
      </Slide>

      {/* About Dossera */}
      <Slide delay={0.15}>
        <section className="mb-20">
           <h2 className="text-3xl font-incognito font-bold tracking-tight mb-6">
            {t("whatIsDossera")}
          </h2>
           <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed space-y-4">
            <p>{t("description.intro")}</p>
            <p>{t("description.role")}</p>
            <p>{t("description.results")}</p>
          </div>
        </section>
      </Slide>

      {/* Key Features */}
      <Slide delay={0.2}>
        <section className="mb-20">
           <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            {t("features.title")}
          </h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              data-cc=""
              className="relative dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors"
            >
              <span
                aria-hidden="true"
                className="z-cc left-0 top-0 h-14 w-14"
                dangerouslySetInnerHTML={{ __html: STATIC_CARD_CORNER }}
              />
              <feature.icon className="text-3xl dark:text-dossera-color text-dossera-color mb-4" />
              <h3 className="text-lg font-incognito font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        </section>
      </Slide>

      {/* Production Deployments */}
      <Slide delay={0.25}>
        <section className="mb-20">
           <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            {t("deployments.title")}
          </h2>
         <div className="grid md:grid-cols-2 gap-5">
          {deployments.map((deployment, index) => (
            <div
              key={index}
              className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-incognito font-semibold">
                  {deployment.court}
                </h3>
                <p className="flex items-center gap-1.5 text-xs shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-dossera-color" aria-hidden="true" />
                  <span className="font-medium dark:text-green-400 text-green-700">
                    {deployment.status}
                  </span>
                </p>
              </div>
              <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {deployment.description}
              </p>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="relative h-10 mt-3 hidden md:block">
          <Circuit
            variant="pipeline"
            uid="dossera-deploy-line"
            draw
            fade
            className="absolute inset-0"
            style={{ "--z-draw-delay": "0.4s" } as React.CSSProperties}
          />
        </div>
        </section>
      </Slide>

      {/* Services We Offer */}
      <Slide delay={0.3}>
        <section className="mb-20">
           <h2 className="text-3xl font-incognito font-bold tracking-tight mb-4">
            {t("services.title")}
          </h2>
           <p className="dark:text-zinc-400 text-zinc-600 mb-8 max-w-3xl">
            {t("services.description")}
          </p>
         <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors"
            >
              <h3 className="text-lg font-incognito font-semibold mb-2 dark:text-primary-color text-secondary-color">
                {service.title}
              </h3>
              <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        </section>
      </Slide>

      {/* Technical Architecture */}
      <Slide delay={0.35}>
        <section className="mb-20">
           <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            {t("architecture.title")}
          </h2>
         <div className="relative dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8 overflow-hidden">
          <Circuit
            variant="routing"
            uid="dossera-arch"
            draw
            fade
            className="hidden lg:block absolute left-6 right-6 bottom-4 h-64"
            style={{ "--z-draw-delay": "0.5s", zIndex: 0 } as React.CSSProperties}
          />
          <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 rounded-md dark:bg-zinc-800/50 bg-zinc-100 border dark:border-zinc-700 border-zinc-200"
              >
                <span className="text-sm font-medium dark:text-white text-zinc-900">
                  {tech.name}
                </span>
                <span className="text-xs dark:text-zinc-500 text-zinc-500">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>

           <div className="relative mt-8 pt-6 border-t dark:border-zinc-700 border-zinc-200">
             <h3 className="text-lg font-incognito font-semibold mb-4">
              {t("architecture.security.title")}
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm dark:text-zinc-400 text-zinc-600">
              <div>{t("architecture.security.network")}</div>
              <div>{t("architecture.security.monitoring")}</div>
              <div>{t("architecture.security.compliance")}</div>
            </div>
          </div>
        </div>
        </section>
      </Slide>

      {/* Deployment Timeline */}
      <Slide delay={0.4}>
        <section className="mb-20">
           <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            {t("timeline.title")}
          </h2>
         <div className="relative dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8 overflow-hidden">
          <Circuit
            variant="pipelineV"
            uid="dossera-tl"
            walls={[64, 480, 6]}
            draw
            className="z-thick hidden lg:block absolute right-0 top-2 h-[280px] w-10"
            style={{ "--z-draw-delay": "0.5s", "--zm-o": "0.6", zIndex: 0 } as React.CSSProperties}
          />
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-dossera-color flex items-center justify-center text-sm font-bold dark:text-zinc-900 text-white">
                  1
                </div>
                <div className="w-0.5 h-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div>
                 <h4 className="font-incognito font-semibold mb-1">
                  {t("timeline.week1.title")}
                </h4>
                 <p className="text-sm dark:text-zinc-400 text-zinc-600">
                  {t("timeline.week1.description")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-dossera-color flex items-center justify-center text-sm font-bold dark:text-zinc-900 text-white">
                  2
                </div>
                <div className="w-0.5 h-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div>
                 <h4 className="font-incognito font-semibold mb-1">
                  {t("timeline.week2.title")}
                </h4>
                 <p className="text-sm dark:text-zinc-400 text-zinc-600">
                  {t("timeline.week2.description")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-dossera-color flex items-center justify-center text-sm font-bold dark:text-zinc-900 text-white">
                  3
                </div>
              </div>
              <div>
                 <h4 className="font-incognito font-semibold mb-1">
                  {t("timeline.week4.title")}
                </h4>
                 <p className="text-sm dark:text-zinc-400 text-zinc-600">
                  {t("timeline.week4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
        </section>
      </Slide>

      {/* Testimonials */}
      <Slide delay={0.5}>
        <section className="mb-20">
           <h2 className="text-2xl font-incognito font-bold tracking-tight mb-8 text-center">
            {t("testimonials.title")}
          </h2>
         <TestimonialsCarousel testimonials={testimonials} />
        </section>
      </Slide>

      {/* Contact Form */}
      <section className="mb-20">
        <DosseraContactForm />
      </section>

      <NextPageTeaser
        href="/"
        title={tNav("home")}
        description={t("nextPageTeaserHomeDescription")}
      />
    </main>
  );
}