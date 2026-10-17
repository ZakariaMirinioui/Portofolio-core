import Image from "next/image";
import { Metadata } from "next";
import { projectsQuery, singleProjectQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";
import { BiLinkExternal, BiLogoGithub, BiLock } from "react-icons/bi";
import ProjectLogo from "@/app/components/shared/ProjectLogo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await sanityFetch<Array<{ slug: string }>>({
    query: projectsQuery,
    tags: ["project"],
  });

  return projects.map((project) => ({ project: project.slug }));
}

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string = "/project.png";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  if (!project?.name) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | Project`,
    metadataBase: new URL(`https://zakariamirinioui.surge.sh/projects/${project.slug || slug}`),
    description: project.tagline,
    openGraph: {
      images: project.coverImage?.image
        ? urlFor(project.coverImage.image).width(1200).height(630).url()
        : fallbackImage,
      url: `https://zakariamirinioui.surge.sh/projects/${project.slug || slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  const meta: Array<{ label: string; value: string }> = [];
  if (project.role) meta.push({ label: "Role", value: project.role });
  if (project.clientType) meta.push({ label: "Client", value: project.clientType });
  if (project.teamSize) meta.push({ label: "Team", value: `${project.teamSize} engineers` });
  if (project.duration) meta.push({ label: "Duration", value: project.duration });
  if (project.status) meta.push({ label: "Status", value: project.status });
  if (project.category) meta.push({ label: "Category", value: project.category });

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <Slide>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between flex-wrap mb-4">
            <div className="mb-4">
              <div className="mb-4 w-fit">
                <ProjectLogo
                  src={project.logo}
                  name={project.name}
                  category={project.category}
                  slug={project.slug}
                  wellClassName="h-16 w-fit max-w-[15rem]"
                  iconSize={32}
                />
              </div>
              <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl max-w-md">
                {project.name}
              </h1>
              {project.tagline && (
                <p className="mt-2 text-base dark:text-zinc-400 text-zinc-600">
                  {project.tagline}
                </p>
              )}
            </div>

            <div className="flex items-center gap-x-2 flex-wrap">
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 dark:bg-primary-color bg-secondary-color dark:text-zinc-900 text-white font-semibold rounded-md px-4 py-2 duration-200 hover:opacity-90"
                >
                  <BiLinkExternal aria-hidden="true" />
                  Live Preview
                </a>
              ) : (
                <span className="flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 opacity-80">
                  <BiLinkExternal aria-hidden="true" />
                  Coming Soon
                </span>
              )}

              {project.repository ? (
                <a
                  href={project.repository}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                >
                  <BiLogoGithub aria-hidden="true" />
                  GitHub
                </a>
              ) : (
                <span
                  className="group/private relative flex cursor-help items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2"
                  title="Private repository — source code cannot be exposed under client confidentiality"
                >
                  <BiLock aria-hidden="true" />
                  Private
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-md border dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-white px-3 py-2 text-xs font-normal leading-relaxed dark:text-zinc-300 text-zinc-600 opacity-0 shadow-lg transition-opacity duration-200 group-hover/private:opacity-100 group-focus-within/private:opacity-100"
                  >
                    Source code is private and cannot be exposed under client
                    confidentiality. A live walkthrough is available on request.
                  </span>
                </span>
              )}

              {project.caseStudy && (
                <a
                  href={`/projects/${project.slug}/case-study`}
                  className="flex items-center gap-x-2 dark:bg-zinc-800 bg-zinc-200 dark:text-white text-zinc-900 font-semibold rounded-md px-4 py-2 duration-200 border dark:border-zinc-700 border-zinc-300 hover:dark:border-zinc-500 hover:border-zinc-400"
                >
                  Case Study →
                </a>
              )}
            </div>
          </div>

          {meta.length > 0 && (
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg px-4 py-3"
                >
                  <dt className="text-xs uppercase tracking-wider dark:text-zinc-500 text-zinc-500">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-medium dark:text-white text-zinc-900 capitalize">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="relative w-full h-40 pt-[52.5%]">
            <Image
              className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
              fill
              src={project.coverImage?.image ?? fallbackImage}
              alt={project.coverImage?.alt ?? project.name}
              quality={100}
              placeholder={project.coverImage?.lqip ? `blur` : "empty"}
              blurDataURL={project.coverImage?.lqip || ""}
            />
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
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

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                Key Metrics
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-4"
                  >
                    <div className="text-xl font-incognito font-bold dark:text-primary-color text-secondary-color">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium dark:text-white text-zinc-900">
                      {metric.label}
                    </div>
                    {metric.description && (
                      <div className="text-xs dark:text-zinc-500 text-zinc-500 mt-1">
                        {metric.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                Screenshots
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.gallery.map((shot, i) => (
                  <figure key={i}>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-200">
                      <Image
                        src={shot.image}
                        fill
                        alt={shot.alt || `${project.name} screenshot ${i + 1}`}
                        className="object-cover"
                      />
                    </div>
                    {shot.caption && (
                      <figcaption className="text-xs dark:text-zinc-500 text-zinc-500 mt-1 text-center">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          {project.architectureDiagram?.image && (
            <div className="mt-8">
              <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-3">
                Architecture
              </h2>
              <div className="relative w-full h-64 rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-200">
                <Image
                  src={project.architectureDiagram.image}
                  fill
                  alt={project.architectureDiagram.alt || `${project.name} architecture diagram`}
                  className="object-contain dark:bg-zinc-900 bg-zinc-50"
                />
              </div>
              {project.architectureDiagram.caption && (
                <p className="text-xs dark:text-zinc-500 text-zinc-500 mt-1 text-center">
                  {project.architectureDiagram.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </Slide>
    </main>
  );
}
