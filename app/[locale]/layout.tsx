import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getAlternateUrls, getCanonicalUrl, SITE_URL } from "@/lib/metadata";
import { Providers } from "@/app/providers";
import Navbar from "@/app/components/global/Navbar";
import Footer from "@/app/components/global/Footer";
import HtmlLang from "@/app/components/global/HtmlLang";
import JsonLd from "@/app/components/global/JsonLd";
import SideCircuits from "@/app/components/decor/SideCircuits";
import CircuitIsland from "@/app/components/decor/CircuitIsland";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("siteTitle"),
    description: t("siteDescription"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: getCanonicalUrl(locale, "/"),
      languages: getAlternateUrls("/"),
    },
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: getCanonicalUrl(locale, "/"),
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required in Next.js 14 for static rendering of translated server components.
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          <SideCircuits />
          <CircuitIsland />
          <HtmlLang />
        <JsonLd locale={locale} />
        <Navbar locale={locale} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </Providers>
    </NextIntlClientProvider>
  );
}
