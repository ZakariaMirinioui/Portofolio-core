export function formatDate(date: string, locale?: string) {
  const lang = locale === "fr" ? "fr-FR" : "en-US";
  return new Date(date).toLocaleDateString(lang, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
