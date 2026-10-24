import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiVercel } from "react-icons/si";
import UnmountStudio from "./Unmount";

const techStack = [
  {
    name: "Next.js",
    href: "https://nextjs.org",
    icon: SiNextdotjs,
    iconColor: "group-hover:text-black dark:group-hover:text-white",
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org",
    icon: SiTypescript,
    iconColor: "text-[#3178C6]",
  },
  {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com",
    icon: SiTailwindcss,
    iconColor: "text-[#06B6D4]",
  },
  {
    name: "Vercel",
    href: "https://vercel.com",
    icon: SiVercel,
    iconColor: "group-hover:text-black dark:group-hover:text-white",
  },
];

export default async function Footer({ locale }: { locale?: string }) {
  const loc = locale ?? "en";
  const t = await getTranslations({ locale: loc, namespace: "footer" });
  const year = new Date().getFullYear();

  return (
    <UnmountStudio>
      <footer className="border-t dark:border-zinc-800 border-zinc-100 mt-44 lg:min-h-[250px] min-h-full relative">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16">
          <div className="flex md:flex-row flex-col items-center gap-x-3">
            <h3 className="font-inter text-sm dark:text-zinc-400 text-zinc-500 font-medium">
              {t("builtWith")}
            </h3>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm dark:text-zinc-400 text-zinc-600 md:mt-0 mt-3">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <li key={tech.name} className="flex items-center gap-x-3">
                    <a
                      href={tech.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="group flex items-center gap-x-1.5 dark:text-zinc-300 text-zinc-700 hover:dark:text-white hover:text-black transition-colors"
                    >
                      <Icon
                        className={`text-base transition-colors ${tech.iconColor}`}
                        aria-hidden="true"
                      />
                      <span className="group-hover:underline">{tech.name}</span>
                    </a>
                    {index < techStack.length - 1 && (
                      <span className="text-zinc-300 dark:text-zinc-700 select-none">
                        &bull;
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col lg:items-end items-center lg:text-start text-center">
            <small className="text-zinc-500">
              {t("copyright", { year })}
            </small>
          </div>
        </div>
      </footer>
    </UnmountStudio>
  );
}
