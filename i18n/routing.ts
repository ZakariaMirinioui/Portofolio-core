import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  // Static export (output: "export") cannot run middleware, so the locale must
  // always be present in the URL. Every generated href therefore maps to a real
  // pre-rendered file.
  localePrefix: "always",
});
