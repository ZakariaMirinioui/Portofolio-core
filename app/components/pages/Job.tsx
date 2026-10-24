import type { JobType } from "@/types";
import { formatDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import RefLink from "../shared/RefLink";
import EmptyState from "../shared/EmptyState";
import { RiBriefcase3Fill } from "react-icons/ri";
import { jobs } from "../../data/jobs";
import { Link } from "@/i18n/navigation";

const RELATED_PROJECTS: Record<string, { slug: string; name: string }> = {
  "job-1": { slug: "dossera", name: "Dossera JAMS" },
  "job-2": { slug: "bluevision", name: "BlueVision" },
  "job-4": { slug: "pwadc-marketplace", name: "PWADC Marketplace" },
};

export default async function Job({ locale }: { locale?: string }) {
  const jobsData: JobType[] = jobs;

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Work Experience
          </h2>
        </div>
      </Slide>

      {jobsData.length > 0 ? (
        <Slide delay={0.18}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
            {jobsData.map((job) => {
              const initial = job.name.charAt(0).toUpperCase();
              const related = RELATED_PROJECTS[job._id];

              return (
                <div
                  key={job._id}
                  className="relative flex items-start lg:gap-x-6 gap-x-4 max-w-2xl before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
                >
                  <RefLink
                    href={job.url}
                    className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative font-incognito font-bold text-xl"
                  >
                    {initial}
                  </RefLink>
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-semibold">{job.name}</h3>
                    <p>{job.jobTitle}</p>
                    <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                      {formatDate(job.startDate)} -{" "}
                      {job.endDate ? (
                        <span className="dark:text-primary-color text-tertiary-color">
                          {formatDate(job.endDate)}
                        </span>
                      ) : (
                        <span className="dark:text-primary-color text-tertiary-color">
                          Present
                        </span>
                      )}
                    </time>
                    <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
                      {job.description}
                    </p>
                    {related && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs">
                        <span className="dark:text-zinc-500 text-zinc-500">
                          {locale === "fr" ? "Projet associé :" : "Related project:"}
                        </span>
                        <Link
                          locale={locale}
                          href={`/projects/${related.slug}`}
                          className="inline-flex items-center gap-1 font-medium dark:text-primary-color text-secondary-color hover:underline"
                        >
                          {related.name} →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Slide>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title="Work Experience Not Provided"
          message="We could not find any work experience at the moment."
        />
      )}
    </section>
  );
}
