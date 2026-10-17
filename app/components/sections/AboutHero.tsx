import Link from "next/link";
import Image from "next/image";
import { BiEnvelope } from "react-icons/bi";
import type { ProfileType } from "@/types";
import CvDownload from "@/app/components/cv-download/CvDownload";
import { Slide } from "@/app/animation/Slide";

export default function AboutHero({
  profile,
  className,
}: {
  profile: ProfileType;
  className?: string;
}) {
  return (
    <section className={className}>
      <Slide>
        <h1 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight mb-6">
          I&apos;m {profile.fullName ?? "Zakaria Mirinioui"}. I live in Casablanca & El Jadida, Morocco, where I build the future.
        </h1>

        <p className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-incognito font-semibold mb-4">
          Java/Spring Boot &middot; React/Next.js &middot; Secure, enterprise-grade systems
        </p>

        <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed mb-8 max-w-lg">
          Full Stack Developer (Java/Spring Boot, React/Next.js), freelance
          since 2021, delivering B2B and B2C projects from requirements to
          production, and core member of PWADCteam, which builds ERP, POS and
          restaurant management systems for businesses. My PMI Business Analysis
          certification shapes how I turn business needs into functional
          specifications &mdash; as I did during my internship at the Palais de
          Justice of Khouribga on a judicial case-management platform. My
          flagship project, JAMS, deepened my expertise in hybrid search
          (Meilisearch/pgvector), OCR and document-process automation.
        </p>

        <div className="flex flex-wrap gap-3">
          <CvDownload variant="full" className="shrink-0" />
          <Link
            href="/projects"
            className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
          >
            View Projects
          </Link>
          <a
            href="mailto:zakmirinioui@gmail.com"
            className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
          >
            Contact <BiEnvelope className="text-base" aria-hidden="true" />
          </a>
        </div>
      </Slide>
    </section>
  );
}
