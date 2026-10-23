import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BiLinkExternal } from "react-icons/bi";
import type { ProjectType } from "@/types";
import { projects } from "../../data/projects";
import Circuit from "../decor/Circuit";
import { STATIC_MICRO_CORNER } from "../decor/circuitStatics";

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
        className="relative overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 transition-all duration-300 animate-[fadeSlideUp_500ms_ease-out_forwards] opacity-0 dark:border-white/12 dark:from-[#021A14] dark:via-[#053826] dark:to-[#08603F]"
        style={{ animationDelay: "140ms" }}
      >
        <div className="absolute inset-0" style={{ background: emeraldGlow }} />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: gridPattern }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-4" />

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

        <Circuit
          variant="corner"
          uid="doss-tl"
          draw
          className="z-mint left-3 top-3 h-44 w-44"
          style={{ "--z-draw-delay": "0.7s" } as React.CSSProperties}
        />
        <Circuit
          variant="corner"
          uid="doss-br"
          draw
          className="z-mint right-3 bottom-3 h-44 w-44 rotate-180"
          style={{ "--z-draw-delay": "0.85s" } as React.CSSProperties}
        />

        <div className="relative z-10 grid gap-8 p-6 lg:grid-cols-2 lg:gap-10 lg:p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-[6px] border border-white/20 bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm font-montserrat">
              {t("label")}
            </div>

            <h2 className="mb-3 font-sans text-3xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
              {featured.name}
            </h2>

            <p className="mx-auto mb-5 max-w-[420px] text-base leading-relaxed text-white/75">
              {featured.tagline}
            </p>

            <p className="mx-auto mb-8 max-w-[420px] text-[13px] leading-relaxed text-white/80 font-montserrat">
              {t("deploymentText")}
            </p>

            {featured.metrics && featured.metrics.length > 0 && (
              <div className="mb-8 grid w-full max-w-[440px] grid-cols-2 gap-3">
                {featured.metrics.slice(0, 4).map((metric) => (
                  <div
                    key={metric.label}
                    className="group relative rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-dossera-color/50 hover:shadow-[0_0_20px_rgba(5,109,78,0.3)]"
                  >
                    <span className="text-[10px] font-medium uppercase leading-none tracking-wider text-white/70 font-montserrat">
                      {metric.label}
                    </span>
                    <span className="mt-1.5 block text-lg font-bold leading-none text-white">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                locale={locale}
                href={`/projects/${featured.slug}`}
                className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8FFF4] px-6 py-3 text-sm font-bold tracking-tight text-[#064430] transition-all duration-300 hover:scale-[1.02] hover:bg-white"
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
                  className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/5 px-6 py-3 text-sm font-bold tracking-tight text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  {t("viewLive")}
                  <BiLinkExternal className="text-sm transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>

          <div className="z-mint relative flex flex-col items-center justify-center" data-cc>
            <Circuit
              variant="cornerMicro"
              uid="doss-logo-tl"
              className="z-cc left-1/2 top-1/2 h-20 w-20"
              style={{ transform: "translate(-70%, -70%)" } as React.CSSProperties}
            />
            <Circuit
              variant="cornerMicro"
              uid="doss-logo-br"
              className="z-cc left-1/2 top-1/2 h-20 w-20"
              style={{ transform: "translate(70%, 70%) rotate(180deg)" } as React.CSSProperties}
            />
            <img
              src="/dossera-darkmode.png"
              alt="Dossera JAMS"
              className="h-auto w-full max-w-[320px]"
              width={320}
              height={120}
              decoding="async"
              loading="lazy"
            />
            <div className="mt-8 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-white font-montserrat">
                {t("status")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}