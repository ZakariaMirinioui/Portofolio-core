import Image from "next/image";
import { Metadata } from "next";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiPhone, BiSolidDownload } from "react-icons/bi";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import Usage from "../components/pages/Usage";
import AboutCV from "../components/sections/AboutCV";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../components/shared/RefLink";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Zakaria Mirinioui",
  metadataBase: new URL("https://zakaria-mirinioui.dev/about"),
  description:
    "Full Stack Developer & IT Analyst (Java, PHP, JS) — experience across justice, secure logistics and industry, plus freelance SaaS products. Certifications, stack and background.",
  openGraph: {
    title: "About | Zakaria Mirinioui",
    url: "https://zakaria-mirinioui.dev/about",
    description:
      "Full Stack Developer & IT Analyst (Java, PHP, JS) — experience across justice, secure logistics and industry, plus freelance SaaS products. Certifications, stack and background.",
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
                I&apos;m {profile?.fullName ?? "Zakaria Mirinioui"}. I live in{" "}
                {profile?.location ?? "Khouribga, Morocco"}, where I build the future.
              </h1>

              <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {profile?.fullBio ? (
                  <PortableText
                    value={profile?.fullBio}
                    components={CustomPortableText}
                  />
                ) : (
                  "Certified Full Stack Developer blending technical expertise (Java, JS, SQL) with advanced Business Analysis skills. Proven track record digitalizing critical processes in the Justice and Secure Logistics sectors — high-performance software aligned with core business objectives."
                )}
              </div>
            </Slide>
          </div>

          <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
            <Slide delay={0.1}>
              <div className="sticky top-10">
                <Image
                  className="rounded-xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                  src="/personal-img-formal.webp"
                  width={400}
                  height={400}
                  quality={85}
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
                    href={`mailto:${profile?.email ?? "zakmirinioui@gmail.com"}`}
                    className="flex items-center justify-center gap-x-2 hover:text-primary-color"
                  >
                    <BiEnvelope className="text-lg" />
                    {profile?.email ?? "zakmirinioui@gmail.com"}
                  </a>

                  <a
                    href="tel:+212629258876"
                    className="flex items-center justify-center gap-x-2 hover:text-primary-color"
                  >
                    <BiPhone className="text-lg" />
                    +212 629 258 876
                  </a>
                </div>
              </div>
            </Slide>
          </aside>
        </section>

        <Slide delay={0.14}>
          <Usage />
        </Slide>

        <AboutCV />
      </div>
    </main>
  );
}
