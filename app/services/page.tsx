import { Metadata } from "next";
import { servicesQuery, testimonialsQuery } from "@/lib/sanity.query";
import type { ServiceType, TestimonialType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";
import { Slide } from "../animation/Slide";
import {
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from "react-icons/hi";
import Link from "next/link";
import TestimonialsCarousel from "../components/sections/TestimonialsCarousel";
import ClientLogos from "../components/sections/ClientLogos";
import NextPageTeaser from "../components/sections/NextPageTeaser";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services | Zakaria Mirinioui",
  metadataBase: new URL("https://zakaria-mirinioui.dev/services"),
  description:
    "Enterprise digital transformation, multi-tenant SaaS development, legacy modernization, and technical advisory services for institutions and businesses.",
  openGraph: {
    title: "Services | Zakaria Mirinioui",
    url: "https://zakaria-mirinioui.dev/services",
    description:
      "Enterprise digital transformation, multi-tenant SaaS development, legacy modernization, and technical advisory services for institutions and businesses.",
    images: "/og.png",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineChartBar,
};

const categoryLabels: Record<string, string> = {
  "digital-transformation": "Digital Transformation",
  "custom-dev": "Custom Software Development",
  "legacy-modernization": "Legacy Modernization",
  "infra-devops": "Infrastructure & DevOps",
  "security-compliance": "Security & Compliance",
  "product-strategy": "Product Strategy & Discovery",
  advisory: "Technical Advisory",
};

export default async function ServicesPage() {
  const [services, testimonials] = await Promise.all([
    sanityFetch({ query: servicesQuery, tags: ["service"] }) as Promise<ServiceType[]>,
    sanityFetch({ query: testimonialsQuery, tags: ["testimonial"] }) as Promise<TestimonialType[]>,
  ]);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Services"
        description="From sovereign digital transformation for government institutions to multi-tenant SaaS platforms and fractional CTO engagements — I bring battle-tested experience from production systems serving real users."
      />

      {/* Service Cards */}
      <div className="space-y-8">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon || ""] || HiOutlineCog;
          return (
            <Slide key={service._id} delay={0.1 + index * 0.05}>
              <ServiceCard service={service} IconComponent={IconComponent} />
            </Slide>
          );
        })}
      </div>

      {/* Testimonials */}
      <Slide delay={0.35}>
        <section className="mt-16 mb-16">
          <h2 className="text-2xl font-incognito font-bold tracking-tight mb-8 text-center">
            Client Feedback
          </h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </section>
      </Slide>

      {/* Client Logos */}
      <ClientLogos featuredOnly={false} title="Our Clients" />

      {/* CTA Section */}
      <Slide delay={0.4}>
        <section className="mt-16 mb-20">
          <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="dark:text-zinc-400 text-zinc-600 mb-6 max-w-2xl mx-auto">
              Whether you need a complete digital transformation, a new SaaS product, or senior technical leadership — let&apos;s discuss how I can help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:zakmirinioui@gmail.com?subject=Project%20Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Start a Conversation
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md dark:bg-zinc-800 bg-zinc-200 dark:text-white text-zinc-900 font-semibold border dark:border-zinc-700 border-zinc-300 hover:dark:border-zinc-500 hover:border-zinc-400 transition-colors"
              >
                View Past Work
              </Link>
            </div>
          </div>
        </section>
      </Slide>

      <NextPageTeaser
        href="/dossera"
        title="Dossera"
        description="The sovereign judicial platform running in production."
      />
    </main>
  );
}

function ServiceCard({
  service,
  IconComponent,
}: {
  service: ServiceType;
  IconComponent: React.ComponentType<{ className?: string }>;
}) {
  return (
    <article className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b dark:border-zinc-800 border-zinc-200">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg dark:bg-zinc-800 bg-zinc-100 flex-shrink-0">
            <IconComponent className="text-2xl dark:text-primary-color text-secondary-color" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl lg:text-2xl font-incognito font-bold tracking-tight">
                {service.name}
              </h2>
              {service.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium dark:bg-amber-900/30 bg-amber-100 dark:text-amber-400 text-amber-700 border dark:border-amber-800 border-amber-300">
                  Featured
                </span>
              )}
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-400 text-zinc-600 border dark:border-zinc-700 border-zinc-200 mb-3">
              {categoryLabels[service.category] || service.category}
            </span>
            <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* What We Deliver */}
      {service.whatWeDeliver && service.whatWeDeliver.length > 0 && (
        <div className="p-6 lg:p-8 border-b dark:border-zinc-800 border-zinc-200">
          <h3 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-4">
            What We Deliver
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            {service.whatWeDeliver.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <HiOutlineCheckCircle className="text-lg dark:text-green-400 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm dark:text-zinc-400 text-zinc-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <div className="p-6 lg:p-8 border-b dark:border-zinc-800 border-zinc-200">
          <h3 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-6">
            Our Process
          </h3>
          <div className="space-y-4">
            {service.process.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full dark:bg-primary-color bg-secondary-color flex items-center justify-center text-sm font-bold dark:text-zinc-900 text-white flex-shrink-0">
                    {step.step}
                  </div>
                  {step.step < service.process!.length && (
                    <div className="w-0.5 h-full bg-zinc-300 dark:bg-zinc-700 mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-incognito font-semibold">{step.title}</h4>
                    {step.duration && (
                      <span className="text-xs dark:text-zinc-500 text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                  {step.deliverables && step.deliverables.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {step.deliverables.map((d, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-400 text-zinc-600 border dark:border-zinc-700 border-zinc-200"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Models */}
      {service.engagementModels && service.engagementModels.length > 0 && (
        <div className="p-6 lg:p-8 border-b dark:border-zinc-800 border-zinc-200">
          <h3 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-4">
            Engagement Models
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.engagementModels.map((model, i) => (
              <div
                key={i}
                className="dark:bg-zinc-800/50 bg-zinc-100 border dark:border-zinc-700 border-zinc-200 rounded-lg p-4"
              >
                <h4 className="font-incognito font-semibold text-sm mb-1 flex items-center gap-2">
                  <HiOutlineArrowRight className="text-xs dark:text-primary-color text-secondary-color" />
                  {model.name}
                </h4>
                <p className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed mb-2">
                  {model.description}
                </p>
                <p className="text-xs dark:text-zinc-500 text-zinc-500 italic">
                  Best for: {model.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {service.techStack && service.techStack.length > 0 && (
        <div className="p-6 lg:p-8">
          <h3 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-4">
            Typical Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md text-sm font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700 border-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}