import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BiLinkExternal } from "react-icons/bi";
import type { ProjectType } from "@/types";
import { projects } from "../../data/projects";

const emeraldGlow = `
  radial-gradient(600px circle at 25% 25%,
    rgba(47, 224, 144, 0.25), transparent 40%),
  radial-gradient(600px circle at 75% 75%,
    rgba(47, 224, 144, 0.2), transparent 40%)
`;

const gridPattern = `
  radial-gradient(circle at 0% 0%, rgba(255,255,255,0.03) 1px, transparent 1px),
  radial-gradient(circle at 100% 0%, rgba(255,255,255,0.03) 1px, transparent 1px),
  radial-gradient(circle at 0% 100%, rgba(255,255,255,0.03) 1px, transparent 1px),
  radial-gradient(circle at 100% 100%, rgba(255,255,255,0.03) 1px, transparent 1px)
`;

export default async function CaseStudyTeaser({ locale }: { locale: string }) {
  const featured: ProjectType | undefined = projects.find((p) => p.slug === "dossera");
  const t = await getTranslations({ locale, namespace: "home.caseStudyTeaser" });

  if (!featured) return null;

  return (
    <section className="mb-20">
      <div
        className={`relative rounded-[24px] overflow-hidden border border-white/20 dark:border-white/12 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 dark:from-[#021A14] dark:via-[#053826] dark:to-[#08603F] min-h-[420px] lg:min-h-[560px] transition-all duration-300 animate-[fadeSlideUp_500ms_ease-out_forwards] opacity-0`}
        style={{ animationDelay: "140ms" }}
      >
        <div className="absolute inset-0" style={{ background: emeraldGlow }} />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: gridPattern }}
        />
        <div className="absolute inset-0 opacity-4 bg-[url('/noise.png')] pointer-events-none" />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-600 ease-in-out group-hover:opacity-100"
          style={{
            background: `linear-gradient(
              120deg,
              transparent 0%,
              rgba(255,255,255,0.15) 50%,
              transparent 100%
            )`,
            backgroundSize: "200% 200%",
            animation: "sweep 6s linear infinite",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row gap-0 lg:gap-6 p-6 lg:p-10 h-full">
          <div className="flex-1 flex flex-col justify-between lg:justify-center min-h-[360px] lg:min-h-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-[6px] bg-white/8 border border-white/20 text-[11px] uppercase tracking-[0.12em] text-white/90 font-medium backdrop-blur-sm font-montserrat">
              {t("label")}
            </span>

            <h2 className="font-sans font-bold text-3xl lg:text-5xl tracking-tight text-white mb-4 leading-tight">
              {featured.name}
            </h2>

            <p className="text-base text-white/75 leading-relaxed mb-10 max-w-[420px]">
              {featured.tagline}
            </p>

            {featured.metrics && featured.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-10">
                {featured.metrics.slice(0, 4).map((metric) => (
                  <div
                    key={metric.label}
                    className="group relative p-3 rounded-lg transition-all duration-300 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-dossera-color/50 hover:shadow-[0_0_20px_rgba(5,109,78,0.3)]"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-white/70 font-medium leading-none font-montserrat">
                      {metric.label}
                    </span>
                    <span className="text-sm font-bold text-white mt-0.5 leading-none animate-[countUp_1500ms_ease-out_forwards]">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link
                locale={locale}
                href={`/projects/${featured.slug}`}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[#064430] bg-[#E8FFF4] font-bold text-sm tracking-tight transition-all duration-300 hover:bg-white hover:scale-[1.02]"
              >
                {t("readCaseStudy")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              {featured.projectUrl && (
                <a
                  href={featured.projectUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/40 text-white/90 font-bold text-sm tracking-tight bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  {t("viewLive")}
                  <BiLinkExternal className="text-sm transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 min-h-[280px] lg:min-h-auto relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center">
              {featured.slug === "dossera" ? (
                <>
                  <img
                    src="/dossera-lightmode.png"
                    alt="Dossera JAMS"
                    className="w-[220px] h-auto opacity-100 transition-opacity duration-300 dark:opacity-0 mx-auto"
                    aria-hidden="true"
                    width={220}
                    height={60}
                    decoding="async"
                    loading="lazy"
                  />
                  <img
                    src="/dossera-darkmode.png"
                    alt="Dossera JAMS"
                    className="w-[220px] h-auto opacity-0 transition-opacity duration-300 dark:opacity-100 mx-auto"
                    aria-hidden="true"
                    width={220}
                    height={60}
                    decoding="async"
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="w-[220px] h-[60px] flex items-center justify-center rounded-lg bg-white/10 border border-white/20 mx-auto">
                  {featured.name}
                </div>
              )}
              <span className="mt-6 text-sm font-bold text-white tracking-wide font-montserrat">
                JAMS v2.4
              </span>
              <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-wider text-white font-medium font-montserrat">
                  OPERATIONAL SYSTEM
                </span>
              </div>
              <p className="mt-5 text-xs text-white/70 leading-relaxed text-center max-w-[200px] font-montserrat">
                Deployed in Moroccan courts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}