import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BiEnvelope } from "react-icons/bi";
import type { ProfileType } from "@/types";
import CvDownload from "@/app/components/cv-download/CvDownload";
import { Slide } from "@/app/animation/Slide";

export default async function AboutHero({
  profile,
  locale,
  className,
}: {
  profile: ProfileType;
  locale: string;
  className?: string;
}) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <section className={className}>
      <Slide>
        <h1 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight mb-6">
          {t("subtitle", {
            name: profile.fullName ?? "Zakaria Mirinioui",
            location: "Casablanca & El Jadida, Morocco",
          })}
        </h1>

        <p className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-incognito font-semibold mb-4">
          {t("specialties")}
        </p>

        <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed mb-8 max-w-lg">
          {t("bioExtended")}
        </p>

        <div className="flex flex-wrap gap-3">
          <CvDownload variant="full" className="shrink-0" />
          <Link
            locale={locale}
            href="/projects"
            className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
          >
            {t("viewProjects")}
          </Link>
          <a
            href="mailto:zakmirinioui@gmail.com"
            className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
          >
            {tCommon("contact")} <BiEnvelope className="text-base" aria-hidden="true" />
          </a>
        </div>
      </Slide>
    </section>
  );
}
