import Image from "next/image";
import { BiEnvelope, BiLogoLinkedinSquare } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import type { ProfileType } from "@/types";
import CvDownload from "@/app/components/cv-download/CvDownload";

const languages = ["Arabic &middot; Native", "French &middot; Fluent", "English &middot; C1 Advanced (EF SET Certified)"];

const credentials = [
  "Business Analysis (PMI)",
  "Project Management (PMI / NASBA)",
  "SQL Advanced (HackerRank)",
  "JavaScript Intermediate (HackerRank)",
  "Frontend Development (HackerRank)",
  "Cybersecurity Fundamentals (Fortinet)",
  "Oracle Cloud Infrastructure AI Foundations",
  "Digital Skills: AI (Accenture)",
  "Certified Web Analyst (CWA)",
];

export default function AboutSidebar({ profile }: { profile: ProfileType }) {
  return (
    <>
      <section className="mb-8">
        <Image
          src="/personal-img-formal.webp"
          width={400}
          height={400}
          alt={`Portrait of ${profile.fullName ?? "Zakaria Mirinioui"}`}
          className="rounded-xl mb-4 object-cover w-full max-w-[260px] mx-auto"
          sizes="(max-width: 768px) 100vw, 260px"
          priority
        />
        <div className="text-center space-y-2">
          <h2 className="font-incognito font-semibold text-zinc-900 dark:text-zinc-100">
            {profile.fullName ?? "Zakaria Mirinioui"}
          </h2>
          <p className="text-primary-color dark:text-secondary-color font-incognito font-semibold text-sm">
            Full Stack Developer &amp; Digital Solutions Architect
          </p>
          <span className="inline-block rounded-full border border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-xs font-incognito font-semibold uppercase tracking-wider">
            Open to opportunities
          </span>
          <p className="dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed">
            Casablanca &amp; El Jadida, Morocco
          </p>
          <p className="dark:text-zinc-400 text-zinc-600 text-xs leading-relaxed mt-1">
            Open to mobility across Morocco, Rabat included
          </p>
        </div>
      </section>

      <section className="mb-8 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-4 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Curriculum vit&aelig;
        </h3>
        <CvDownload variant="full" className="w-full" />
      </section>

      <section className="mb-8 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-4 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Contact
        </h3>
        <ul className="space-y-3">
          <li>
            <a
              href="mailto:zakmirinioui@gmail.com"
              className="flex items-center gap-x-3 hover:underline"
            >
              <BiEnvelope className="text-lg shrink-0" aria-hidden="true" />
              <span className="dark:text-zinc-200 text-zinc-800">zakmirinioui@gmail.com</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/zakaria-mirinioui/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-x-3 hover:underline"
            >
              <BiLogoLinkedinSquare className="text-lg shrink-0" aria-hidden="true" />
              <span className="dark:text-zinc-200 text-zinc-800">linkedin.com/in/zakaria-mirinioui</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ZakariaMirinioui"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-x-3 hover:underline"
            >
              <FiGithub className="text-lg shrink-0" aria-hidden="true" />
              <span className="dark:text-zinc-200 text-zinc-800">github.com/ZakariaMirinioui</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-3 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Languages
        </h3>
        <ul className="space-y-1">
          {languages.map((lang) => (
            <li
              key={lang}
              className="flex items-start gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 last:border-0 last:pb-0"
            >
              <span
                className="dark:text-zinc-200 text-zinc-800 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: lang }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-3 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Education
        </h3>
        <div className="space-y-1">
          <h4 className="font-incognito font-semibold text-zinc-900 dark:text-zinc-100">
            University Diploma of Technology (DUT) &mdash; Computer Engineering
          </h4>
          <p className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed">
            EST B&eacute;ni Mellal &middot; B&eacute;ni Mellal, Morocco &middot; 2023&ndash;2025
          </p>
          <p className="text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed mt-1">
            Intensive program covering software engineering, system administration
            and n-tier architectures (Java EE). Hands-on projects in modern web
            development and database administration (Oracle/MySQL/PL-SQL).
          </p>
        </div>
      </section>

      <section className="mb-4 dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <h3 className="font-incognito font-semibold mb-3 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Certifications
        </h3>
        <ul className="space-y-1">
          {credentials.map((credential) => (
            <li
              key={credential}
              className="flex items-start gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 last:border-0 last:pb-0"
            >
              <span
                className="dark:text-zinc-200 text-zinc-800 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: credential }}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
