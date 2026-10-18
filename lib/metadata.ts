import { routing } from "@/i18n/routing";

export const SITE_URL = "https://zakariamirinioui.surge.sh";

export function ensureTrailingSlash(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/** Internal path (no locale prefix) -> absolute canonical URL for a locale. */
export function getCanonicalUrl(locale: string, pathname: string): string {
  return `${SITE_URL}/${locale}${ensureTrailingSlash(pathname)}`;
}

/** hreflang alternates for an internal path across all locales (+ x-default). */
export function getAlternateUrls(
  pathname: string
): Record<string, string> {
  const base = ensureTrailingSlash(pathname);
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${base}`;
  }
  languages["x-default"] = languages[routing.defaultLocale];
  return languages;
}
