import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { caseStudyQuery } from "@/lib/sanity.query";
import type { CaseStudyType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "../../../components/shared/CustomPortableText";
import { Slide } from "../../../animation/Slide";
import { BiLinkExternal, BiLogoGithub, BiBookOpen } from "react-icons/bi";
import Link from "next/link";
import CaseStudyTracker from "../../../components/sections/CaseStudyTracker";

export const revalidate = 3600;

type Props = {
  params: {
    project: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy: CaseStudyType = await sanityFetch({
    query: caseStudyQuery,
    tags: ["caseStudy"],
    qParams: { slug: params.project },
  });

  if (!caseStudy?.title) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: caseStudy.seoTitle || `${caseStudy.title} | Case Study`,
    metadataBase: new URL(`https://zakaria-mirinioui.dev/projects/${params.project}/case-study`),
    description: caseStudy.seoDescription || caseStudy.tagline || caseStudy.title,
    openGraph: {
      title: caseStudy.seoTitle || `${caseStudy.title} | Case Study`,
      url: `https://zakaria-mirinioui.dev/projects/${params.project}/case-study`,
      description: caseStudy.seoDescription || caseStudy.tagline || caseStudy.title,
      images: caseStudy.ogImage?.image || "/og.png",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const caseStudy: CaseStudyType = await sanityFetch({
    query: caseStudyQuery,
    tags: ["caseStudy"],
    qParams: { slug: params.project },
  });

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto md:px-16 px-6">
      <CaseStudyTracker projectSlug={params.project} />
      {/* Hero */}
      <Slide>
        <div className="mb-12">
          <Link
            href={`/projects/${params.project}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 mb-6"
          >
            ← Back to Project
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium dark:bg-blue-900/30 bg-blue-100 dark:text-blue-400 text-blue-700 border dark:border-blue-800 border-blue-300">
              <BiBookOpen className="text-sm" />
              Case Study
            </span>
            {caseStudy.publishedAt && (
              <span className="text-sm dark:text-zinc-500 text-zinc-500">
                {new Date(caseStudy.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
          </div>
          <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl mb-4">
            {caseStudy.title}
          </h1>
          {caseStudy.tagline && (
            <p className="text-lg dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {caseStudy.tagline}
            </p>
          )}
        </div>
      </Slide>

      {/* Cover Image */}
      {caseStudy.coverImage?.image && (
        <Slide delay={0.05}>
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-xl overflow-hidden border dark:border-zinc-800 border-zinc-200">
            <Image
              src={caseStudy.coverImage.image}
              fill
              alt={caseStudy.coverImage.alt || caseStudy.title}
              className="object-cover"
              priority
            />
          </div>
        </Slide>
      )}

      {/* Client Context */}
      {caseStudy.clientContext && (
        <Slide delay={0.1}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              Client Context
            </h2>
            <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
              <PortableText
                value={caseStudy.clientContext}
                components={CustomPortableText}
              />
            </div>
          </section>
        </Slide>
      )}

      {/* The Challenge */}
      {caseStudy.challenge && (
        <Slide delay={0.15}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              The Challenge
            </h2>
            <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
              <PortableText
                value={caseStudy.challenge}
                components={CustomPortableText}
              />
            </div>
            {caseStudy.constraints && caseStudy.constraints.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                  Key Constraints
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.constraints.map((constraint, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md text-sm dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700 border-zinc-200"
                    >
                      {constraint}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </Slide>
      )}

      {/* Our Approach */}
      {caseStudy.approach && (
        <Slide delay={0.2}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              Our Approach
            </h2>
            <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
              <PortableText
                value={caseStudy.approach}
                components={CustomPortableText}
              />
            </div>
          </section>
        </Slide>
      )}

      {/* Architecture Overview */}
      {caseStudy.architecture && (
        <Slide delay={0.25}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              Architecture Overview
            </h2>
            <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
              <PortableText
                value={caseStudy.architecture}
                components={CustomPortableText}
              />
            </div>
          </section>
        </Slide>
      )}

      {/* Architecture Diagrams */}
      {caseStudy.architectureDiagrams && caseStudy.architectureDiagrams.length > 0 && (
        <Slide delay={0.3}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-6">
              Architecture Diagrams
            </h2>
            <div className="space-y-6">
              {caseStudy.architectureDiagrams.map((diagram, i) => (
                <div key={i}>
                  {diagram.image && (
                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-200 mb-2">
                      <Image
                        src={diagram.image}
                        fill
                        alt={diagram.alt || `Architecture diagram ${i + 1}`}
                        className="object-contain dark:bg-zinc-900 bg-zinc-50"
                      />
                    </div>
                  )}
                  {(diagram.caption || diagram.type) && (
                    <p className="text-sm dark:text-zinc-500 text-zinc-500 text-center">
                      {diagram.type && <strong>{diagram.type}: </strong>}
                      {diagram.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Slide>
      )}

      {/* Key Technologies */}
      {caseStudy.keyTechnologies && caseStudy.keyTechnologies.length > 0 && (
        <Slide delay={0.35}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-6">
              Key Technologies
            </h2>
            <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-zinc-800 border-zinc-200">
                      <th className="text-left p-4 font-incognito font-semibold">Technology</th>
                      <th className="text-left p-4 font-incognito font-semibold">Category</th>
                      <th className="text-left p-4 font-incognito font-semibold">Why This Choice?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseStudy.keyTechnologies.map((tech, i) => (
                      <tr key={i} className="border-b dark:border-zinc-800 border-zinc-200 last:border-0">
                        <td className="p-4 font-medium dark:text-white text-zinc-900">{tech.name}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-400 text-zinc-600">
                            {tech.category}
                          </span>
                        </td>
                        <td className="p-4 dark:text-zinc-400 text-zinc-600">{tech.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Slide>
      )}

      {/* Architecture Decision Records */}
      {caseStudy.adrs && caseStudy.adrs.length > 0 && (
        <Slide delay={0.4}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-6">
              Architecture Decision Records
            </h2>
            <div className="space-y-4">
              {caseStudy.adrs.map((adr, i) => (
                <div
                  key={i}
                  className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-incognito font-semibold">{adr.title}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-400 text-zinc-600">
                      {adr.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-incognito font-semibold text-xs uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-1">Context</h4>
                      <p className="dark:text-zinc-400 text-zinc-600">{adr.context}</p>
                    </div>
                    <div>
                      <h4 className="font-incognito font-semibold text-xs uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-1">Decision</h4>
                      <p className="dark:text-zinc-400 text-zinc-600">{adr.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-incognito font-semibold text-xs uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-1">Consequences</h4>
                      <p className="dark:text-zinc-400 text-zinc-600">{adr.consequences}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Slide>
      )}

      {/* Outcomes & Metrics */}
      {caseStudy.outcomes && (
        <Slide delay={0.45}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              Outcomes & Impact
            </h2>
            <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
              <PortableText
                value={caseStudy.outcomes}
                components={CustomPortableText}
              />
            </div>
          </section>
        </Slide>
      )}

      {/* Metrics */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <Slide delay={0.5}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-6">
              Key Metrics
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-5"
                >
                  <div className="text-2xl font-incognito font-bold dark:text-primary-color text-secondary-color mb-1">
                    {metric.value}
                    {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
                  </div>
                  <div className="text-sm font-medium dark:text-white text-zinc-900 mb-1">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-xs dark:text-zinc-500 text-zinc-500">
                      {metric.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Slide>
      )}

      {/* Testimonials */}
      {caseStudy.testimonials && caseStudy.testimonials.length > 0 && (
        <Slide delay={0.55}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-6">
              Client Feedback
            </h2>
            <div className="space-y-4">
              {caseStudy.testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6"
                >
                  <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    {testimonial.authorImage?.image ? (
                      <Image
                        src={testimonial.authorImage.image}
                        width={40}
                        height={40}
                        alt={testimonial.authorName || "Client"}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full dark:bg-zinc-800 bg-zinc-200 flex items-center justify-center">
                        <span className="text-sm font-bold dark:text-primary-color text-secondary-color">
                          {testimonial.authorName?.charAt(0) || "C"}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-incognito font-semibold">
                        {testimonial.isAnonymous ? "Anonymous Client" : testimonial.authorName}
                      </div>
                      <div className="text-xs dark:text-zinc-500 text-zinc-500">
                        {testimonial.authorRole}
                        {testimonial.authorOrganization && ` — ${testimonial.authorOrganization}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Slide>
      )}

      {/* Lessons Learned */}
      {caseStudy.lessonsLearned && caseStudy.lessonsLearned.length > 0 && (
        <Slide delay={0.6}>
          <section className="mb-12">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              Lessons Learned
            </h2>
            <ul className="space-y-2">
              {caseStudy.lessonsLearned.map((lesson, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0 mt-2" />
                  <span className="dark:text-zinc-400 text-zinc-600">{lesson}</span>
                </li>
              ))}
            </ul>
          </section>
        </Slide>
      )}

      {/* CTA */}
      <Slide delay={0.65}>
        <section className="mb-20">
          <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-incognito font-bold tracking-tight mb-4">
              Have a Similar Challenge?
            </h2>
            <p className="dark:text-zinc-400 text-zinc-600 mb-6 max-w-2xl mx-auto">
              If you&apos;re facing a complex digital transformation, need a sovereign system, or want to discuss architecture decisions — I&apos;d love to hear about it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:zakmirinioui@gmail.com?subject=Project%20Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Start a Conversation
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md dark:bg-zinc-800 bg-zinc-200 dark:text-white text-zinc-900 font-semibold border dark:border-zinc-700 border-zinc-300 hover:dark:border-zinc-500 hover:border-zinc-400 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </Slide>
    </main>
  );
}