"use client";

import {
  Cpu,
  Browsers,
  Database,
  Toolbox,
  SealCheck,
  Translate,
  GraduationCap,
} from "@phosphor-icons/react";
import { Slide } from "../../animation/Slide";

const experience = [
  {
    period: "Jul — Oct 2025",
    role: "Technical Project Lead & Full Stack Developer",
    org: "Palais de Justice, Khouribga — Public Sector",
    points: [
      "Led digitization of judicial procedures: translated legal requirements into technical specifications.",
      "Built secure Java / PHP / SQL backend with strict access control — 30% less admin processing time.",
    ],
  },
  {
    period: "Apr — Jun 2025",
    role: "Full Stack Developer (Final Year Intern)",
    org: "Brink's Security, Casablanca — Logistics & Security",
    points: [
      "Secure logistics tracking: React interfaces on realtime REST APIs.",
      "Optimized database architecture for field-team tracking at scale.",
    ],
  },
  {
    period: "Aug 2024",
    role: "IT Support & Automation Associate",
    org: "OCP Group, Khouribga — Industry",
    points: [
      "Kept critical IT assets running in a high-availability industrial environment.",
      "Automated maintenance reporting with Python / Bash scripts.",
    ],
  },
];

const arsenal = [
  {
    icon: Cpu,
    title: "Backend & Logic",
    skills: ["Java (Spring Boot)", "PHP (Laravel)", "Node.js", "Enterprise design patterns"],
  },
  {
    icon: Browsers,
    title: "Frontend & UI",
    skills: ["React & Next.js", "State management", "Client-side optimization", "UX / UI strategy"],
  },
  {
    icon: Database,
    title: "API & Data",
    skills: ["RESTful & GraphQL design", "Relational schema (SQL)", "Data encryption & security"],
  },
  {
    icon: Toolbox,
    title: "Tools & Method",
    skills: ["Git, Docker & Kubernetes", "Agile / Scrum", "Business Analysis"],
  },
];

const credentials = [
  { name: "Business Analysis", issuer: "PMI" },
  { name: "Project Management", issuer: "PMI" },
  { name: "Project Management", issuer: "NASBA" },
  { name: "SQL Advanced", issuer: "HackerRank" },
  { name: "JavaScript Intermediate", issuer: "HackerRank" },
  { name: "Frontend Development", issuer: "HackerRank" },
  { name: "Cybersecurity Fundamentals", issuer: "Fortinet" },
  { name: "Oracle Cloud AI Foundations", issuer: "Oracle" },
];

const languages = [
  { name: "Arabic", level: "Native", dots: 5 },
  { name: "French", level: "Fluent", dots: 4 },
  { name: "English", level: "C1 · EF SET certified", dots: 4 },
];

export default function AboutCV() {
  return (
    <>
      <Slide delay={0.15}>
        <section className="max-w-2xl mt-16">
          <div className="mb-8">
            <h2 className="text-4xl mb-4 font-bold tracking-tight">Experience</h2>
            <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
              Freelance since 2021, with internships across justice, secure
              logistics and heavy industry.
            </p>
          </div>
          <ol className="relative border-l dark:border-zinc-800 border-zinc-200 ml-1.5 space-y-10">
            {experience.map((job) => (
              <li key={job.role} className="pl-8 relative">
                <span
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full dark:bg-primary-color bg-secondary-color"
                  aria-hidden="true"
                />
                <p className="text-xs tracking-widest uppercase dark:text-zinc-500 text-zinc-500">
                  {job.period}
                </p>
                <h3 className="text-lg font-incognito font-semibold mt-1">
                  {job.role}
                </h3>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-3">
                  {job.org}
                </p>
                <ul className="space-y-1.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      </Slide>

      <Slide delay={0.16}>
        <section className="max-w-2xl mt-16">
          <div className="mb-8">
            <h2 className="text-4xl mb-4 font-bold tracking-tight">Technical Arsenal</h2>
            <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
              The stack behind the shipped systems — picked per project, not per trend.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {arsenal.map((group) => (
              <div
                key={group.title}
                className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-5"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <group.icon
                    size={22}
                    weight="duotone"
                    className="dark:text-primary-color text-secondary-color"
                    aria-hidden="true"
                  />
                  <h3 className="font-incognito font-semibold">{group.title}</h3>
                </div>
                <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="py-1.5 text-sm dark:text-zinc-400 text-zinc-600"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Slide>

      <Slide delay={0.17}>
        <section className="max-w-2xl mt-16">
          <div className="mb-8">
            <h2 className="text-4xl mb-4 font-bold tracking-tight">Credentials</h2>
            <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
              Third-party proof for the analysis, data and security claims.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8">
            {credentials.map((cred) => (
              <li
                key={`${cred.name}-${cred.issuer}`}
                className="flex items-center gap-2.5 py-2.5 border-b dark:border-zinc-800 border-zinc-200"
              >
                <SealCheck
                  size={18}
                  weight="duotone"
                  className="dark:text-primary-color text-secondary-color shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium dark:text-zinc-200 text-zinc-800">
                  {cred.name}
                </span>
                <span className="ml-auto text-xs uppercase tracking-wider dark:text-zinc-500 text-zinc-500 shrink-0">
                  {cred.issuer}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Slide>

      <Slide delay={0.18}>
        <section className="max-w-2xl mt-16">
          <div className="mb-8">
            <h2 className="text-4xl mb-4 font-bold tracking-tight">Languages & Education</h2>
          </div>
          <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-5 mb-4">
            <div className="flex items-center gap-2.5 mb-4">
              <Translate
                size={22}
                weight="duotone"
                className="dark:text-primary-color text-secondary-color"
                aria-hidden="true"
              />
              <h3 className="font-incognito font-semibold">Languages</h3>
            </div>
            <ul className="space-y-3">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-center gap-3">
                  <span className="text-sm font-medium dark:text-zinc-200 text-zinc-800 w-16">
                    {lang.name}
                  </span>
                  <span className="flex gap-1" aria-label={`${lang.dots} out of 5`}>
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        aria-hidden="true"
                        className={`h-1.5 w-6 rounded-sm ${
                          dot <= lang.dots
                            ? "dark:bg-primary-color bg-secondary-color"
                            : "dark:bg-zinc-700 bg-zinc-300"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="ml-auto text-xs dark:text-zinc-500 text-zinc-500">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-5">
            <div className="flex items-center gap-2.5 mb-2">
              <GraduationCap
                size={22}
                weight="duotone"
                className="dark:text-primary-color text-secondary-color"
                aria-hidden="true"
              />
              <h3 className="font-incognito font-semibold">
                DUT — Génie Informatique
              </h3>
              <span className="ml-auto text-xs tracking-widest uppercase dark:text-zinc-500 text-zinc-500 shrink-0">
                2023 – 2025
              </span>
            </div>
            <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
              École Supérieure de Technologie de Béni Mellal. Software
              engineering and system administration: n-tier architectures
              (Java EE), modern web frameworks, Oracle / MySQL administration —
              through real-world team projects under tight deadlines.
            </p>
          </div>
        </section>
      </Slide>
    </>
  );
}
