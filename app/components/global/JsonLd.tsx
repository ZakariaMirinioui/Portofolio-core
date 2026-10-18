import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/metadata";

const KNOWS_ABOUT = [
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
];

export default async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "jsonLd" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Zakaria Mirinioui",
        url: `${SITE_URL}/${locale}/`,
        image: `${SITE_URL}/og.png`,
        sameAs: [
          "https://github.com/ZakariaMirinioui",
          "https://linkedin.com/in/zakaria-mirinioui",
        ],
        jobTitle: t("person.jobTitle"),
        worksFor: {
          "@type": "Organization",
          name: "PWADCTeam",
          url: "https://pwadcteam.com",
        },
        knowsAbout: KNOWS_ABOUT,
      },
      {
        "@type": "Organization",
        name: "PWADCTeam",
        url: "https://pwadcteam.com",
        logo: `${SITE_URL}/logo.svg`,
        sameAs: ["https://github.com/ZakariaMirinioui"],
        description: t("org.description"),
        foundingDate: "2022",
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
          addressLocality: "Casablanca & El Jadida",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
