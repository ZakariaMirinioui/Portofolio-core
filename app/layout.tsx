import "@/app/styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: "Zakaria Mirinioui | Full Stack Developer & Digital Solutions Architect",
  description:
    "Full Stack Developer specializing in enterprise Java solutions, modern web architecture, and digital transformation for judicial and secure logistics sectors.",
  url: "https://zakariamirinioui.surge.sh",
  ogImage: "/og.png",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "Zakaria Mirinioui",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  keywords: [
    "Full Stack Developer",
    "Java Spring Boot",
    "React Next.js",
    "Digital Solutions",
    "Software Architect",
    "Morocco Developer",
    "Enterprise Applications",
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

const LOCALE_DETECT_SCRIPT = `
(function () {
  try {
    var SUPPORTED = ['en', 'fr'];
    var KEY = 'locale';
    var seg = location.pathname.split('/')[1];
    if (SUPPORTED.indexOf(seg) !== -1) {
      document.documentElement.lang = seg;
      return;
    }
    var stored = localStorage.getItem(KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) {
      document.documentElement.lang = stored;
      return;
    }
    var langs = navigator.languages || (navigator.language ? [navigator.language] : []);
    for (var i = 0; i < langs.length; i++) {
      var base = (langs[i] || '').split('-')[0].toLowerCase();
      if (SUPPORTED.indexOf(base) !== -1) {
        document.documentElement.lang = base;
        location.replace('/' + base + (location.pathname === '/' ? '/' : location.pathname) + location.search);
        return;
      }
    }
    location.replace('/en/' + location.search);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="locale-detect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: LOCALE_DETECT_SCRIPT }}
        />
      </head>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 bg-white dark:text-white text-zinc-700`}
      >
        {children}
      </body>
    </html>
  );
}
