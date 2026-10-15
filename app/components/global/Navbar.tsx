import Link from "next/link";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Dossera",
      href: "/dossera",
    },
  ];

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
            <img src="/logo.svg" width={42} height={42} alt="" className="dark:invert" aria-hidden="true" />
          </Link>

          <nav className="md:block hidden" aria-label="Main navigation">
            <ul className="flex items-center gap-x-8">
              {data.map((link, id) => (
                <li key={id}>
                  <Link
                    href={link.href}
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 rounded-md px-2 py-1"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-x-4">
            <Theme />
            <MobileMenu />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
