import Image from "next/image";
import Link from "next/link";
import { Slide } from "../../animation/Slide";
import type { ProjectType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import ProjectLogo from "../shared/ProjectLogo";
import { BiLinkExternal, BiBookOpen } from "react-icons/bi";

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
      techStack,
      metrics,
    }`,
    tags: ["project"],
  });

  if (!featured) return null;

  return (
    <section className="mb-16">
      <Slide delay={0.14}>
        <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium dark:bg-blue-900/30 bg-blue-100 dark:text-blue-400 text-blue-700 border dark:border-blue-800 border-blue-300 mb-4 w-fit">
                <BiBookOpen className="text-sm" />
                Featured Case Study
              </span>
              <h2 className="text-2xl lg:text-3xl font-incognito font-bold tracking-tight mb-3">
                {featured.name}
              </h2>
              <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed mb-6">
                {featured.tagline}
              </p>

              {featured.techStack && featured.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featured.techStack.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {featured.metrics && featured.metrics.length > 0 && (
                <div className="flex flex-wrap gap-6 mb-6">
                  {featured.metrics.slice(0, 3).map((metric, i) => (
                    <div key={i}>
                      <div className="text-xl font-incognito font-bold dark:text-primary-color text-secondary-color">
                        {metric.value}
                      </div>
                      <div className="text-xs dark:text-zinc-500 text-zinc-500">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                <Link
                  href={`/projects/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Read Full Case Study
                </Link>
                {featured.projectUrl && (
                  <a
                    href={featured.projectUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-zinc-800 bg-zinc-200 dark:text-white text-zinc-900 font-semibold border dark:border-zinc-700 border-zinc-300 hover:dark:border-zinc-500 hover:border-zinc-400 transition-colors"
                  >
                    <BiLinkExternal className="text-base" />
                    View Live
                  </a>
                )}
              </div>
            </div>
            <div className="relative min-h-[300px] lg:min-h-[400px]">
              {featured.coverImage && typeof featured.coverImage === "string" && (
                <Image
                  src={featured.coverImage}
                  fill
                  alt={featured.name}
                  className="object-cover"
                  priority
                />
              )}
              {featured.coverImage && typeof featured.coverImage === "object" && featured.coverImage.image && (
                <Image
                  src={featured.coverImage.image}
                  fill
                  alt={featured.name}
                  className="object-cover"
                  priority
                />
              )}
              {!featured.coverImage && (
                <div className="absolute inset-0 dark:bg-zinc-800 bg-zinc-100 flex items-center justify-center p-12">
                  <ProjectLogo
                    src={typeof featured.logo === "string" ? featured.logo : undefined}
                    name={featured.name}
                    category={featured.category}
                    wellClassName="h-24 max-w-[22rem]"
                    iconSize={48}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Slide>
    </section>
  );
}