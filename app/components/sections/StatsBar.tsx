import { Slide } from "../../animation/Slide";
import { getTranslations } from "next-intl/server";
import { homeStats } from "@/data/home-stats";

export default async function StatsBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.stats" });

  const stats = homeStats.map((s) => ({ value: s.value, label: t(s.labelKey) }));

  return (
    <section className="mb-16">
      <Slide delay={0.12}>
        <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-incognito font-bold dark:text-primary-color text-secondary-color mb-1">
                  {stat.value}
                </div>
                <div className="text-xs dark:text-zinc-400 text-zinc-600 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>
    </section>
  );
}