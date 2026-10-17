import Link from "next/link";

const works = [
  {
    title: "JAMS &mdash; Judicial Archive Management System",
    description:
      "Physical and digital archives aligned with the Ministry of Justice archiving charter. Hybrid search (Meilisearch + pgvector), OCR and a document processing pipeline. Built for the Court of First Instance of Khouribga.",
    chips: ["Meilisearch", "pgvector", "OCR"],
  },
  {
    title: "PWADCteam Marketplace",
    description:
      "Ready-made ERP and POS systems with live demos, sold as boxed products or custom projects.",
    chips: ["ERP", "POS", "Marketplace"],
  },
];

export default function FeaturedWork() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-incognito font-bold tracking-tight">
          Featured work
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Case studies live on the Projects page.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {works.map((work) => (
          <div
            key={work.title}
            className="dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6"
          >
            <h3 className="font-incognito font-semibold mb-3" dangerouslySetInnerHTML={{ __html: work.title }} />
            <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: work.description }} />
            <div className="flex flex-wrap gap-2 mb-6">
              {work.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                >
                  {chip}
                </span>
              ))}
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-x-1.5 font-incognito font-semibold text-primary-color dark:text-secondary-color hover:underline text-sm"
            >
              View project &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
