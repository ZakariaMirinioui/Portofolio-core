const experience = [
  {
    period: "Jul &ndash; Oct 2025",
    role: "Full Stack Developer &mdash; Key Technical Contributor (Internship)",
    org:
      "Palais de Justice de Khouribga &mdash; Public Sector / Justice | Khouribga, Morocco",
    points: [
      "Key technical contributor to the digitization of judicial procedures, translating legal requirements into functional specifications.",
      "Designed and developed the backend (Java/PHP, SQL) of the case-management platform, with access controls for sensitive data.",
      "Result: estimated 30% reduction in administrative case-processing time.",
    ],
    chips: ["Java", "PHP", "SQL"],
  },
  {
    period: "Apr &ndash; Jun 2025",
    role: "Back-End Developer &amp; API Specialist (Final-Year Internship)",
    org: "Brink&rsquo;s Morocco &mdash; Logistics &amp; Security | Casablanca, Morocco",
    points: [
      "Designed and developed REST and GraphQL APIs with Spring Boot to interconnect heterogeneous internal services.",
      "Built React interfaces connected in real time to APIs for logistics operations tracking.",
      "Analyzed and refactored SQL queries to reduce processing latency.",
    ],
    chips: ["Java/Spring Boot", "REST APIs", "GraphQL", "React", "PostgreSQL"],
  },
  {
    period: "Aug 2024",
    role: "IT Support &amp; Automation Associate (Introductory Internship)",
    org: "OCP Group &mdash; Industry | Khouribga, Morocco",
    points: [
      "Maintained operational readiness of the IT estate in a high-availability industrial environment.",
      "Developed automation scripts (Python/Bash) to generate maintenance reports.",
    ],
    chips: ["Python", "Bash"],
  },
  {
    period: "2021 &ndash; Present",
    role: "Freelance Full Stack Developer",
    org: "Independent &mdash; web and mobile apps for B2B and B2C clients",
    points: [
      "Designed and developed complete web and mobile applications (Java/Spring Boot, Node.js, React, Next.js) from requirements to production.",
      "JAMS (Judicial Archive Management System): physical and digital archives compliant with the Ministry of Justice archiving charter, featuring hybrid search (Meilisearch + pgvector), OCR and a document-processing pipeline.",
      "Core member of PWADCteam &mdash; ERP, POS and restaurant/B2B systems sold as ready-made products or custom engagements via pwadcteam.com.",
      "Business automation workflows with n8n (tool integrations, data processing).",
      "Managed client relationships independently, from needs estimation to delivery and post-launch support.",
    ],
    chips: ["Java/Spring Boot", "Node.js", "React", "Next.js", "n8n"],
  },
];

export default function ExperienceTimeline() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-incognito font-bold tracking-tight">
          Experience
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Newest first. Freelance work and PWADCteam included.
        </p>
      </div>

      <ol className="relative border-l border-zinc-200 dark:border-zinc-800 pl-8 space-y-12">
        {experience.map((job, index) => (
          <li key={job.role} className="relative">
            {/* timeline dot */}
            <span
              className="absolute -left-[10px] top-[8px] h-3 w-3 rounded-full dark:bg-primary-color bg-secondary-color border border-white dark:border-zinc-900"
              aria-hidden="true"
            />
            <p className="text-xs tracking-widest uppercase dark:text-zinc-500 text-zinc-500 mb-1">
              {job.period}
            </p>
            <h3 className="text-lg font-incognito font-semibold mt-0 mb-1" dangerouslySetInnerHTML={{ __html: job.role }} />
            <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-3" dangerouslySetInnerHTML={{ __html: job.org }} />
            <ul className="space-y-2">
              {job.points.map((point) => (
                <li
                  key={point}
                  className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed pl-6"
                >
                  <span dangerouslySetInnerHTML={{ __html: point }} />
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {job.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                >
                  {chip}
                </span>
              ))}
            </div>
            {/* connector line between items */}
            {index < experience.length - 1 && (
              <span
                className="absolute -left-[9px] top-[14px] bottom-[-6px] w-[1px] bg-zinc-200 dark:bg-zinc-800"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
