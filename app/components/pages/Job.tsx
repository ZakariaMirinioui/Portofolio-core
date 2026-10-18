import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { jobQuery } from "@/lib/sanity.query";
import type { JobType } from "@/types";
import { formatDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../shared/RefLink";
import EmptyState from "../shared/EmptyState";
import { RiBriefcase3Fill } from "react-icons/ri";

export default async function Job({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "job" });
  const jobs: JobType[] = await sanityFetch({
    query: jobQuery,
    tags: ["job"],
  });

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            {t("workExperienceTitle")}
          </h2>
        </div>
      </Slide>

      {jobs.length > 0 ? (
        <Slide delay={0.18}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
              >
                <RefLink
                  href={job.url}
                  className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative"
                >
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      className="object-cover duration-300"
                      alt={t("logoAlt", { name: job.name })}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <span className="text-2xl font-bold dark:text-primary-color text-secondary-color">
                      {job.name?.charAt(0) || "J"}
                    </span>
                  )}
                </RefLink>
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-semibold">{job.name}</h3>
                  <p>{job.jobTitle}</p>
                  <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                    {formatDate(job.startDate, locale)} -{" "}
                    {job.endDate ? (
                      formatDate(job.endDate, locale)
                    ) : (
                      <span className="dark:text-primary-color text-tertiary-color">
                        {t("present")}
                      </span>
                    )}
                  </time>
                  <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Slide>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title={t("notProvidedTitle")}
          message={t("notProvidedMessage")}
        />
      )}
    </section>
  );
}
