import Image from "next/image";
import Link from "next/link";
import { Slide } from "../../animation/Slide";
import type { ProjectType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import ProjectLogo from "../shared/ProjectLogo";
import { BiLinkExternal } from "react-icons/bi";

export default async function CaseStudyTeaser() {
  const featured: ProjectType = await sanityFetch({
    query: `*[_type == "project" && slug.current == "dossera-jams"][0]{
      _id,
      name,
      "slug": slug.current,
      tagline,
      projectUrl,
      category,
      "logo": logo.asset->url,
      "coverImage": coverImage.asset->url,
    }`,
    tags: ["project"],
  });

  if (!featured) return null;

  return (
    <section className="mb-20">
      <Slide delay={0.14}>
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={featured.coverImage && typeof featured.coverImage === "object" ? featured.coverImage.image : "/project.png"}
              fill
              alt=""
              className="object-cover -z-10"
              priority
              placeholder="empty"
            />
          </div>
          <div className="relative z-10 pt-16 pb-12 px-6 md:p-10 lg:px-16 lg:py-16 md:flex md:items-center md:gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="lg:max-w-[28rem]">
              <h2 className="font-incognito text-3xl lg:text-4xl font-bold tracking-tight dark:text-zinc-900 text-zinc-950 mb-3">
                {featured.name}
              </h2>
              <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed mb-8">
                {featured.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/projects/${featured.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary-color text-zinc-900 dark:text-zinc-950 font-semibold hover:opacity-90 transition-opacity"
                >
                  Read Full Case Study
                </Link>
                {featured.projectUrl && (
                  <a
                    href={featured.projectUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border dark:border-zinc-800 border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 text-zinc-900 font-semibold hover:opacity-90 transition-colors"
                  >
                    <BiLinkExternal className="text-base" aria-hidden="true" />
                    View Live
                  </a>
                )}
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex lg:items-center lg:justify-center">
              <ProjectLogo
                src={typeof featured.logo === "string" ? featured.logo : undefined}
                name={featured.name}
                category={featured.category}
                slug={featured.slug}
                wellClassName="h-16 w-fit max-w-[20rem]"
                iconSize={32}
              />
            </div>
          </div>
        </div>
      </Slide>
    </section>
  );
}
