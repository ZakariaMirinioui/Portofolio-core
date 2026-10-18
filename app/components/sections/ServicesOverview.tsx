import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Slide } from "../../animation/Slide";
import { featuredServicesQuery } from "@/lib/sanity.query";
import type { ServiceType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import {
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineChartBar,
} from "react-icons/hi";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineChartBar,
};

export default async function ServicesOverview({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.servicesOverview" });
  const services: ServiceType[] = await sanityFetch({
    query: featuredServicesQuery,
    tags: ["service"],
  });

  if (!services || services.length === 0) return null;

  return (
    <section className="mb-16">
      <Slide delay={0.16}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-incognito font-bold tracking-tight">
            {t("title")}
          </h2>
              <Link
                locale={locale}
                href="/services"
            className="text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon || ""] || HiOutlineCog;
            return (
          <Link
            locale={locale}

                key={service._id}
                href="/services"
                className="group dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors"
              >
                <IconComponent className="text-2xl dark:text-primary-color text-secondary-color mb-3" />
                <h3 className="text-lg font-incognito font-semibold mb-2 group-hover:underline">
                  {service.name}
                </h3>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {service.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </Slide>
    </section>
  );
}