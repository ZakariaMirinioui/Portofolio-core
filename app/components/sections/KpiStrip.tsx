import { getTranslations } from "next-intl/server";
import Circuit from "../decor/Circuit";

export default async function KpiStrip({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const t = await getTranslations({ locale });
  const kpis = t.raw("kpiStrip") as Array<{ value: string; label: string }>;

  return (
    <section className={`relative ${className}`}>
      <Circuit
        variant="pipeline"
        uid="about-kpi"
        draw
        fade
        preserve="xMidYMid meet"
        className="hidden lg:block absolute left-1 right-1 top-[-5rem] h-24"
        style={{ "--z-draw-delay": "0.2s" } as React.CSSProperties}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5"
          >
            <div className="text-3xl md:text-4xl font-incognito font-bold dark:text-primary-color text-secondary-color mb-1" dangerouslySetInnerHTML={{ __html: kpi.value }} />
            <div className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: kpi.label }} />
          </div>
        ))}
      </div>
    </section>
  );
}
