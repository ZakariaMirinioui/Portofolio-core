import "@/app/styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: "Zakaria Mirinioui | Full Stack Developer & Digital Solutions Architect",
  description:
    "Full Stack Developer specializing in enterprise Java solutions, modern web architecture, and digital transformation for judicial and secure logistics sectors.",
  url: "https://zakaria-mirinioui.dev",
  ogImage: "/og.png",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Zakaria Mirinioui",
      url: "https://zakaria-mirinioui.dev",
      image: "/og.png",
      sameAs: [
        "https://github.com/ZakariaMirinioui",
        "https://linkedin.com/in/zakaria-mirinioui",
      ],
      jobTitle: "Solutions Architect & Agency Founder",
      worksFor: {
        "@type": "Organization",
        name: "PWADCTeam",
        url: "https://pwadcteam.com",
      },
      knowsAbout: [
        "Full Stack Development",
        "React",
        "Next.js",
        "Node.js",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "System Architecture",
        "Digital Transformation",
        "SaaS Development",
        "Legacy Modernization",
      ],
    },
    {
      "@type": "Organization",
      name: "PWADCTeam",
      url: "https://pwadcteam.com",
      logo: "https://zakaria-mirinioui.dev/logo.svg",
      sameAs: [
        "https://github.com/ZakariaMirinioui",
      ],
      description: "Digital solutions agency building sovereign systems for government, healthcare, legal, and wellness sectors.",
      foundingDate: "2022",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressLocality: "Casablanca",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "zakaria-mirinioui.dev",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 bg-white dark:text-white text-zinc-700`}
      >
        <Providers>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>

    </html>
  );
}