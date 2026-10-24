import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BiEnvelope, BiLogoLinkedinSquare } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import type { ProfileType } from "@/types";
import CvDownload from "@/app/components/cv-download/CvDownload";
import Circuit from "../decor/Circuit";

export default async function AboutSidebar({
  profile,
  locale,
}: {
  profile: ProfileType;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const languages = t.raw("languages") as string[];
  const credentials = t.raw("credentials") as string[];

  return (
    <>
      <section className="mb-8">
        <div className="relative w-fit mx-auto mb-4">
          <Circuit
            variant="cornerMicro"
            uid="about-portrait"
            draw
            className="absolute -right-4 -top-4 h-24 w-24 rotate-90"
          />
          <Image
            src="/personal-img-formal.webp"
            width={400}
            height={400}
            alt={t("portraitAlt", {
              name: profile.fullName ?? "Zakaria Mirinioui",
            })}
            className="rounded-xl object-cover w-full max-w-[260px]"
            sizes="(max-width: 768px) 100vw, 260px"
            priority
          />
        </div>
        <div className="text-center space-y-2">
          <h2 className="font-incognito font-semibold text-zinc-900 dark:text-zinc-100">
            {profile.fullName ?? "Zakaria Mirinioui"}
          </h2>
          <p className="text-primary-color dark:text-secondary-color font-incognito font-semibold text-sm">
            {t("jobTitleSubtitle")}
          </p>
          <span className="inline-block rounded-full border border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-xs font-incognito font-semibold uppercase tracking-wider">
            {t("openToOpportunities")}
          </span>
          <p className="dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed">
            {t("location")}
          </p>
          <p className="dark:text-zinc-400 text-zinc-600 text-xs leading-relaxed mt-1">
            {t("mobility")}
          </p>
        </div>
      </section>

      <section className="mb-8 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-4 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t("cvSectionTitle")}
        </h3>
        <CvDownload variant="full" className="w-full" />
      </section>

      <section className="mb-8 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-4 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {tCommon("contact")}
        </h3>
        <ul className="space-y-3">
          <li>
            <a
              href="mailto:zakmirinioui@gmail.com"
              className="flex items-center gap-x-3 hover:underline"
            >
              <BiEnvelope className="text-lg shrink-0" aria-hidden="true" />
              <span className="dark:text-zinc-200 text-zinc-800">zakmirinioui@gmail.com</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/zakaria-mirinioui/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-x-3 hover:underline"
            >
              <BiLogoLinkedinSquare className="text-lg shrink-0" aria-hidden="true" />
              <span className="dark:text-zinc-200 text-zinc-800">linkedin.com/in/zakaria-mirinioui</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ZakariaMirinioui"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-x-3 hover:underline"
            >
              <FiGithub className="text-lg shrink-0" aria-hidden="true" />
              <span className="dark:text-zinc-200 text-zinc-800">github.com/ZakariaMirinioui</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.malt.fr/profile/zakariamirinioui"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-x-3 hover:underline"
            >
              <Image
                src="/malt-logo.svg"
                width={20}
                height={20}
                alt=""
                aria-hidden="true"
                className="shrink-0"
              />
              <span className="dark:text-zinc-200 text-zinc-800">malt.fr/profile/zakariamirinioui</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-3 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t("languagesTitle")}
        </h3>
        <ul className="space-y-1">
          {languages.map((lang) => (
            <li
              key={lang}
              className="flex items-start gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 last:border-0 last:pb-0"
            >
              <span
                className="dark:text-zinc-200 text-zinc-800 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: lang }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-3 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t("certificationsTitle")}
        </h3>
        <ul className="space-y-1">
          {credentials.map((credential) => (
            <li
              key={credential}
              className="flex items-start gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 last:border-0 last:pb-0"
            >
              <span
                className="dark:text-zinc-200 text-zinc-800 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: credential }}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
