import Image from "next/image";
import { Metadata } from "next";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../components/shared/RefLink";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Zakaria Mirinioui",
  metadataBase: new URL("https://zakaria-mirinioui.dev/about"),
  description:
    "Learn more about Zakaria Mirinioui's skills, experience and technical background in full stack development and digital solutions",
  openGraph: {
    title: "About | Zakaria Mirinioui",
    url: "https://zakaria-mirinioui.dev/about",
    description:
      "Learn more about Zakaria Mirinioui's skills, experience and technical background in full stack development and digital solutions",
    images: "/og.png",
  },
};

export default async function About() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      <div key={profile?._id}>
        <section className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center">
          <div className="order-2 lg:order-none">
            <Slide>
              <h1 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                I&apos;m {profile?.fullName ?? "John Doe"}. I live in{" "}
                {profile?.location ?? "'X'"}, where I build the future.
              </h1>

              <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {profile?.fullBio ? (
                  <PortableText
                    value={profile?.fullBio}
                    components={CustomPortableText}
                  />
                ) : (
                  "Your bio information will show up here"
                )}
              </div>
            </Slide>
          </div>

          <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
            <Slide delay={0.1}>
              <div className="sticky top-10">
                <Image
                  className="rounded-xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                  src="/personal-img-formal.png"
                  width={400}
                  height={400}
                  quality={100}
                  alt={profile?.fullName ?? "Zakaria Mirinioui"}
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />

                <div className="flex flex-col text-center gap-y-4">
                  <div className="flex items-center gap-x-3">
                    <RefLink
                      href="https://linkedin.com/in/zakaria-mirinioui"
                      className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                    >
                      View LinkedIn <BiLinkExternal className="text-base" />
                    </RefLink>
                    {profile?.resumeURL && (
                      <a
                        href={`${profile.resumeURL}?dl=${profile.fullName}-resume.pdf`}
                        className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-3 text-lg"
                        title="Download Resume"
                      >
                        <BiSolidDownload
                          className="text-lg"
                          aria-label="Download Resume"
                        />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-x-3">
                    <a
                      href="https://github.com/ZakariaMirinioui"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center text-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                    >
                      <FiGithub className="text-base" />
                      View GitHub
                    </a>
                    <a
                      href="https://www.instagram.com/zakaria_mirinioui/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center text-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                    >
                      <FiInstagram className="text-base" />
                      View Instagram
                    </a>
                  </div>

                  <a
                    href={`mailto:${profile?.email}`}
                    className="flex items-center justify-center gap-x-2 hover:text-primary-color"
                  >
                    <BiEnvelope className="text-lg" />
                    {profile?.email ?? "Email address not available"}
                  </a>
                </div>
              </div>
            </Slide>
          </aside>
        </section>
        <Slide delay={0.14}>
          <Usage />
        </Slide>
        <Slide delay={0.15}>
          <section className="max-w-2xl mt-16">
            <div className="mb-8">
              <h2 className="text-4xl mb-4 font-bold tracking-tight">Highlights</h2>
              <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
                Freelance Full Stack Developer since 2021 — from requirements to production,
                with enterprise experience in justice, secure logistics, and industry.
              </p>
            </div>
            <ul className="space-y-3 text-sm dark:text-zinc-400 text-zinc-600">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0 mt-2" />
                Technical Project Lead — Judicial archive platform deployed in Moroccan courts (30% admin time reduction)
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0 mt-2" />
                Founder of PWADC Team — 5 live multi-tenant SaaS products + digital marketplace (pwadcteam.com)
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0 mt-2" />
                Backend & API specialist (Brink&apos;s Morocco) — REST/GraphQL Spring Boot, realtime React, SQL optimization
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0 mt-2" />
                IT Support & Automation (OCP Group) — Python/Bash reporting in high-availability industrial environment
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0 mt-2" />
                DUT Génie Informatique — EST Béni Mellal (2023–2025) · Java EE n-tier, Oracle/MySQL
              </li>
            </ul>
          </section>
        </Slide>
        <Slide delay={0.16}>
          <section className="max-w-2xl mt-16">
            <div className="mb-8">
              <h2 className="text-4xl mb-4 font-bold tracking-tight">Certifications</h2>
              <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
                Business analysis, project management, and hands-on technical credentials.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Business Analysis (PMI)",
                "Project Management (PMI/NASBA)",
                "SQL Advanced (HackerRank)",
                "JavaScript Intermediate (HackerRank)",
                "Frontend Development (HackerRank)",
                "Cybersecurity Fundamentals (Fortinet)",
                "Oracle Cloud AI Foundations",
                "Digital Skills: AI (Accenture)",
                "Certified Web Analyst (CWA)",
                "English C1 Advanced (EF SET)",
              ].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 rounded-md text-sm font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700 border-zinc-200"
                >
                  {cert}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm dark:text-zinc-400 text-zinc-600">
              Languages — Arabic (native) · French (fluent) · English (C1 advanced)
            </p>
          </section>
        </Slide>
        <Heroes />
      </div>
    </main>
  );
}
