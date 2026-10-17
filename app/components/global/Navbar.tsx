import Link from "next/link";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import CvDownload from "@/app/components/cv-download/CvDownload";

export default function Navbar() {
  return (
    <UnmountStudio>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-color focus:text-white focus:rounded-md focus:font-medium"
      >
        Skip to main content
      </a>
      <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" aria-label="Zakaria Mirinioui - Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" width={48} height={48} alt="" className="dark:invert" aria-hidden="true" />
          </Link>

          <NavLinks />

          <div className="flex items-center gap-x-4">
            <CvDownload variant="compact" className="hidden md:flex" />
            <Theme />
            <MobileMenu />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
