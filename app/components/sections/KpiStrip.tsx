import { getTranslations } from "next-intl/server";

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
    <section className={className}>
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
