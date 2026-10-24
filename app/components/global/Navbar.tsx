import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Navbar({ locale }: { locale?: string }) {
  const loc = locale ?? "en";
  const t = await getTranslations({ locale: loc, namespace: "common" });
  const tNav = await getTranslations({ locale: loc, namespace: "navigation" });

  return (
    <UnmountStudio>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-color focus:text-white focus:rounded-md focus:font-medium"
      >
        {t("skipToContent")}
      </a>
      <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10 relative">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="z-theme absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-0.5" aria-hidden="true">
            <svg viewBox="0 0 1280 4" preserveAspectRatio="none" className="w-full h-full">
              <path className="z-root z-lap" d="M0,2 L1280,2" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <Link href="/" locale={loc} aria-label={t("homeAriaLabel")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" width={48} height={48} alt="" className="dark:invert" aria-hidden="true" />
          </Link>

          <NavLinks />

          <div className="flex items-center gap-x-4">
            <LanguageSwitcher className="hidden md:flex" />
            <Theme />
            <MobileMenu />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
