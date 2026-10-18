"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import duckImage from "@/public/searching-duck.gif";

const COPY = {
  en: {
    title: "Error 404!",
    description:
      "Oopsies! This page does not exist on zakariamirinioui.surge.sh. While you're here, check out my projects or learn more about me.",
    backToHome: "\u2190 Back to Home",
    viewProjects: "View Projects \u2192",
    alt: "Yellow duck searching",
  },
  fr: {
    title: "Erreur 404 !",
    description:
      "Oups ! Cette page n'existe pas sur zakariamirinioui.surge.sh. Pendant que vous êtes là, découvrez mes projets ou apprenez-en plus sur moi.",
    backToHome: "\u2190 Retour à l'accueil",
    viewProjects: "Voir les projets \u2192",
    alt: "Canard jaune en recherche",
  },
} as const;

type Locale = keyof typeof COPY;

function detectLocale(): Locale {
  const seg = window.location.pathname.split("/")[1];
  if (seg === "fr" || seg === "en") return seg;
  try {
    const stored = window.localStorage.getItem("locale");
    if (stored === "fr" || stored === "en") return stored;
  } catch {}
  const langs = window.navigator.languages || [window.navigator.language];
  for (const lang of langs) {
    const base = (lang || "").split("-")[0].toLowerCase();
    if (base === "fr" || base === "en") return base;
  }
  return "en";
}

export default function RootNotFound() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const detected = detectLocale();
    setLocale(detected);
    document.documentElement.lang = detected;
  }, []);

  const c = COPY[locale];

  return (
    <main className="min-h-screen max-w-7xl mx-auto md:px-16 px-6 flex flex-col justify-center py-20">
      <header className="max-w-4xl">
        <Image
          width={80}
          height={80}
          src={duckImage}
          alt={c.alt}
          priority
        />
        <h1 className="font-incognito font-black tracking-tight sm:text-6xl text-3xl lg:leading-[3.7rem] leading-tight mt-6 mb-3 dark:text-white text-zinc-900">
          {c.title}
        </h1>
        <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
          {c.description}
        </p>
      </header>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href={`/${locale}/`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 dark:text-white text-zinc-700 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors font-medium"
        >
          {c.backToHome}
        </Link>
        <Link
          href={`/${locale}/projects/`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 dark:text-white text-zinc-700 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors font-medium"
        >
          {c.viewProjects}
        </Link>
      </div>
    </main>
  );
}
