"use client";

import {
  Cpu,
  Monitor,
  Database,
  Toolbox,
  Share,
  Gear,
  List,
} from "@phosphor-icons/react";

const groups = [
  {
    title: "Backend",
    icon: Cpu,
    items: [
      "Java (Spring Boot)",
      "Node.js",
      "PHP (Laravel)",
      "n-tier architecture",
      "Design patterns",
    ],
  },
  {
    title: "Frontend",
    icon: Monitor,
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "State management",
      "Client-side optimization",
    ],
  },
  {
    title: "APIs & Data",
    icon: Database,
    items: [
      "REST",
      "GraphQL",
      "PostgreSQL",
      "MySQL",
      "Oracle",
      "Meilisearch",
      "pgvector",
      "Relational modeling",
      "Data security",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Toolbox,
    items: [
      "Docker",
      "Kubernetes",
      "Git",
      "CI/CD",
      "Nginx",
      "n8n (automation)",
      "Agile / Scrum",
    ],
  },
  {
    title: "Management & Analysis",
    icon: List,
    items: [
      "Business Analysis",
      "Project management (PMI / NASBA)",
      "Functional specification writing",
    ],
  },
];

export default function StackGrid({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-incognito font-bold tracking-tight">
          Stack
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Picked per project, not per trend. No skill bars — just what I ship
          with.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group.title}
            className="dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <group.icon
                size={20}
                weight="duotone"
                className="dark:text-primary-color text-secondary-color shrink-0"
                aria-hidden="true"
              />
              <h3 className="font-incognito font-semibold">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
