import Link from "next/link";
import CvDownload from "@/app/components/cv-download/CvDownload";

export default function ClosingBand() {
  return (
    <section className="dark:bg-primary-bg bg-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8">
      <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed mb-6 max-w-lg">
        Ready to discuss a project? Grab my CV, drop me a line, or browse the
        work.
      </p>
      <div className="flex flex-wrap gap-3">
        <CvDownload variant="full" className="shrink-0" />
        <a
          href="mailto:zakmirinioui@gmail.com"
          className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
        >
          Contact
        </a>
        <Link
          href="/projects"
          className="shrink-0 flex items-center gap-x-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-primary-bg px-5 py-3 text-sm font-incognito font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
        >
          Projects
        </Link>
      </div>
    </section>
  );
}
