import { Slide } from "../../animation/Slide";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

export default async function ValueProps({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.valueProps" });

  const pillars = [
    {
      icon: HiOutlineShieldCheck,
      title: t("enterpriseSystems.title"),
      description: t("enterpriseSystems.description"),
      highlights: t.raw("enterpriseSystems.highlights") as string[],
      link: "/projects/dossera-jams",
      linkText: t("enterpriseSystems.cta"),
    },
    {
      icon: HiOutlineBuildingOffice2,
      title: t("saasProducts.title"),
      description: t("saasProducts.description"),
      highlights: t.raw("saasProducts.highlights") as string[],
      link: "/projects",
      linkText: t("saasProducts.cta"),
    },
    {
      icon: HiOutlineCodeBracket,
      title: t("customEngineering.title"),
      description: t("customEngineering.description"),
      highlights: t.raw("customEngineering.highlights") as string[],
      link: "/services",
      linkText: t("customEngineering.cta"),
    },
  ];

  return (
    <section className="mt-24 mb-16">
      <Slide delay={0.1}>
        <h2 className="text-2xl font-incognito font-bold tracking-tight mb-8">
          {t("title")}
        </h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors"
            >
              <pillar.icon className="text-3xl dark:text-primary-color text-secondary-color mb-4" />
              <h3 className="text-lg font-incognito font-semibold mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4">
                {pillar.description}
              </p>
              <ul className="space-y-1.5 mb-5">
                {pillar.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs dark:text-zinc-500 text-zinc-500 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                locale={locale}
                href={pillar.link}
                className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
              >
                {pillar.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </Slide>
    </section>
  );
}
