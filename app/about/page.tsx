import Image from "next/image";
import { Metadata } from "next";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
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
                {profile?.profileImage?.image ? (
                  <Image
                    className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                    src={profile.profileImage.image}
                    width={400}
                    height={400}
                    quality={100}
                    alt={profile.profileImage.alt || profile.fullName}
                    placeholder="blur"
                    blurDataURL={profile.profileImage.lqip}
                    priority
                  />
                ) : (
                  <div className="h-96 w-[400px] dark:bg-zinc-800 bg-zinc-200 mb-4 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl font-bold dark:text-primary-color text-secondary-color">
                      {profile?.fullName?.charAt(0) || "Z"}
                    </span>
                  </div>
                )}

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

                  <a
                    href={`mailto:${profile?.email}`}
                    className="flex items-center gap-x-2 hover:text-primary-color"
                  >
                    <BiEnvelope className="text-lg" />
                    {profile?.email ?? "Email address no available"}
                  </a>
                </div>
              </div>
            </Slide>
          </aside>
        </section>
        <Slide delay={0.14}>
          <Usage />
        </Slide>
        <Heroes />
      </div>
    </main>
  );
}
