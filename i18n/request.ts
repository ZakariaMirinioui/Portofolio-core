import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Under static export there is no middleware to set the `X-NEXT-INTL-LOCALE`
  // header, so the active locale is surfaced through `requestLocale`, which
  // falls back to the value provided by `setRequestLocale` in the [locale] layout.
  const resolved = locale;
  const validLocale = hasLocale(routing.locales, resolved)
    ? resolved
    : routing.defaultLocale;

  const base = (await import(`../messages/${validLocale}.json`)).default;
  const fallback = (await import("../messages/en.json")).default;

  return {
    locale: validLocale,
    messages: { ...fallback, ...base },
  };
});
