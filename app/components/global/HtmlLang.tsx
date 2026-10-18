"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/**
 * Keeps <html lang> in sync with the active locale. The inline <head> script in
 * the root layout sets the correct language before first paint on full page
 * loads; this component covers client-side navigations (e.g. switching locale
 * in-app), where the document is not reloaded.
 */
export default function HtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
