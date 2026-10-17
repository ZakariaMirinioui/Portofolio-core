const kpis = [
  {
    value: "5+ years",
    label: "Building software, freelance since 2021",
  },
  {
    value: "30%",
    label: "estimated less admin processing time &mdash; Palais de Justice, Khouribga",
  },
  {
    value: "3",
    label: "sectors &mdash; Justice, Logistics &amp; Security, Industry",
  },
];

export default function KpiStrip() {
  return (
    <section>
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
