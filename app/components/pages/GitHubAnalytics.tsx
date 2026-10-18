"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useFormatter, useLocale } from "next-intl";
import { GithubLogo, Cube, Clock, Buildings, Flame } from "@phosphor-icons/react";

type Day = { date: string; count: number };
type LangStat = { name: string; bytes: number; pct: number; color: string };

type AnalyticsData = {
  login: string;
  name: string | null;
  publicRepos: number;
  joinedYears: number;
  company: string | null;
  totalLastYear: number;
  rangeLabel: string;
  currentStreak: number;
  currentRange: string;
  longestStreak: number;
  longestRange: string;
  weekly: { label: string; value: number }[];
  weekMax: number;
  languages: LangStat[];
};

const CACHE_KEY = "gh-analytics:v1";
const CACHE_TTL = 1000 * 60 * 30;

const LINGUIST_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Kotlin: "#A97BFF",
  CSS: "#563d7c",
  Java: "#b07219",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  Python: "#3572A5",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Shell: "#89e051",
};

const FALLBACK_COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444", "#14b8c6"];

async function fetchJSON(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub request failed (${res.status})`);
  return res.json();
}

function makeFmtDay(locale: string) {
  const fmt = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });
  return (d: Date) => fmt.format(d);
}

function fmtDayNum(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

function computeStreaks(days: Day[], fmt: (d: Date) => string) {
  let longest = 0;
  let longestStart = "";
  let longestEnd = "";
  let run = 0;
  let runStart = "";
  days.forEach((d) => {
    if (d.count > 0) {
      if (run === 0) runStart = d.date;
      run += 1;
      if (run > longest) {
        longest = run;
        longestStart = runStart;
        longestEnd = d.date;
      }
    } else {
      run = 0;
    }
  });

  let current = 0;
  let currentStart = "";
  for (let i = days.length - 1; i >= 0; i -= 1) {
    const d = days[i];
    if (d.count > 0) {
      current += 1;
      currentStart = d.date;
    } else if (i === days.length - 1) {
      continue;
    } else {
      break;
    }
  }

  const rangeOf = (a: string, b: string) => {
    if (!a) return "—";
    const d1 = new Date(`${a}T00:00:00`);
    const d2 = new Date(`${b}T00:00:00`);
    return a === b ? fmt(d1) : `${fmt(d1)} - ${fmt(d2)}`;
  };

  return {
    longest,
    longestRange: rangeOf(longestStart, longestEnd),
    current,
    currentRange: rangeOf(currentStart, days.length ? days[days.length - 1].date : ""),
  };
}

function toWeekly(days: Day[]) {
  const weeks: { label: string; value: number }[] = [];
  for (let i = 0; i < days.length; i += 7) {
    const chunk = days.slice(i, i + 7);
    const value = chunk.reduce((a, d) => a + d.count, 0);
    weeks.push({ label: fmtDayNum(new Date(`${chunk[0].date}T00:00:00`)), value });
  }
  return weeks;
}

function smoothPath(values: number[], w: number, h: number, padL: number, padB: number) {
  const max = Math.max(...values, 1);
  const iw = w - padL - 8;
  const ih = h - padB - 8;
  const pts = values.map((v, i) => [
    padL + (values.length === 1 ? iw / 2 : (i / (values.length - 1)) * iw),
    4 + ih - (v / max) * ih,
  ]);
  if (pts.length === 1) return { line: "", area: "", max };
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  const base = h - padB;
  const area = `${d} L ${pts[pts.length - 1][0]},${base} L ${pts[0][0]},${base} Z`;
  return { line: d, area, max };
}

export default function GitHubAnalytics() {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("github");
  const intl = useFormatter();
  const locale = useLocale();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    if (!username) {
      setError(t("usernameNotConfigured"));
      return;
    }
    let cancelled = false;

    async function load() {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.ts && Date.now() - parsed.ts < CACHE_TTL && parsed.data) {
            if (!cancelled) setData(parsed.data);
            return;
          }
        }

        const [user, contrib] = await Promise.all([
          fetchJSON(`https://api.github.com/users/${username}`),
          fetchJSON(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
        ]);

        const days: Day[] = Array.isArray(contrib?.contributions)
          ? contrib.contributions
              .filter((d: any) => d && d.date)
              .map((d: any) => ({ date: d.date, count: Number(d.count) || 0 }))
              .sort((a: Day, b: Day) => (a.date < b.date ? -1 : 1))
          : [];
        if (days.length === 0) throw new Error(t("noContributionData"));

        const total =
          typeof contrib?.total?.lastYear === "number"
            ? contrib.total.lastYear
            : days.reduce((a, d) => a + d.count, 0);

        const fmt = makeFmtDay(locale);
        const streaks = computeStreaks(days, fmt);
        const weekly = toWeekly(days);
        const first = new Date(`${days[0].date}T00:00:00`);
        const last = new Date(`${days[days.length - 1].date}T00:00:00`);

        let languages: LangStat[] = [];
        try {
          const repos = await fetchJSON(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`
          );
          const top = (Array.isArray(repos) ? repos : [])
            .filter((r: any) => !r.fork && r.languages_url)
            .sort((a: any, b: any) => (b.size || 0) - (a.size || 0))
            .slice(0, 12);
          const results = await Promise.allSettled(top.map((r: any) => fetchJSON(r.languages_url)));
          const bytes: Record<string, number> = {};
          results.forEach((r) => {
            if (r.status !== "fulfilled") return;
            Object.entries(r.value || {}).forEach(([lang, b]) => {
              bytes[lang] = (bytes[lang] || 0) + (Number(b) || 0);
            });
          });
          const totalBytes = Object.values(bytes).reduce((a, b) => a + b, 0) || 1;
          languages = Object.entries(bytes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([name, b], i) => ({
              name,
              bytes: b,
              pct: Math.round((b / totalBytes) * 100),
              color: LINGUIST_COLORS[name] || FALLBACK_COLORS[i % FALLBACK_COLORS.length],
            }));
        } catch {
          languages = [];
        }

        const joined = new Date(user.created_at);
        const yearsAgo = Math.max(0, new Date().getFullYear() - joined.getFullYear());

        const computed: AnalyticsData = {
          login: user.login,
          name: user.name || user.login,
          publicRepos: user.public_repos ?? 0,
          joinedYears: yearsAgo,
          company: user.company || t("freelance"),
          totalLastYear: total,
          rangeLabel: `${fmt(first)} - ${fmt(last)}`,
          currentStreak: streaks.current,
          currentRange: streaks.currentRange,
          longestStreak: streaks.longest,
          longestRange: streaks.longestRange,
          weekly,
          weekMax: Math.max(...weekly.map((w) => w.value), 1),
          languages,
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: computed }));
        if (!cancelled) setData(computed);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : t("loadFailed"));
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 text-center">
        <p className="text-sm dark:text-zinc-400 text-zinc-600">
          {t("temporarilyUnavailable", { error })}
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(CACHE_KEY);
            window.location.reload();
          }}
          className="mt-3 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 animate-pulse" aria-busy="true" aria-label={t("loadingAriaLabel")}>
        <div className="h-5 w-40 rounded dark:bg-zinc-800 bg-zinc-200 mb-4" />
        <div className="h-36 rounded dark:bg-zinc-800 bg-zinc-200 mb-6" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded dark:bg-zinc-800 bg-zinc-200" />
          ))}
        </div>
      </div>
    );
  }

  const W = 640;
  const H = 180;
  const PAD_L = 30;
  const PAD_B = 20;
  const { line, area, max } = smoothPath(
    data.weekly.map((w) => w.value),
    W,
    H,
    PAD_L,
    PAD_B
  );
  const ticks = [0, 1, 2, 3].map((i) => Math.round((max / 3) * i));
  const xLabels = data.weekly.filter((_, i) => i % Math.ceil(data.weekly.length / 6) === 0);
  const axisColor = resolvedTheme === "dark" ? "#52525b" : "#a1a1aa";
  const gridColor = resolvedTheme === "dark" ? "#27272a" : "#e4e4e7";
  const ringProgress = data.longestStreak > 0 ? Math.min(1, data.currentStreak / data.longestStreak) : 0;
  const R = 34;
  const CIRC = 2 * Math.PI * R;

  return (
    <div className="space-y-4">
      <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-center">
          <div>
            <a
              href={`https://github.com/${data.login}`}
              target="_blank"
              rel="noreferrer noopener"
              className="font-incognito text-xl font-semibold dark:text-blue-400 text-blue-600 hover:underline"
            >
              {data.name}
            </a>
            <ul className="mt-4 space-y-2.5 text-sm dark:text-zinc-400 text-zinc-600">
              <li className="flex items-center gap-2.5">
                <GithubLogo size={18} aria-hidden="true" />
                {t("contributionsOnGitHub", { count: intl.number(data.totalLastYear) })}
              </li>
              <li className="flex items-center gap-2.5">
                <Cube size={18} aria-hidden="true" />
                {t("publicRepos", { count: intl.number(data.publicRepos) })}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={18} aria-hidden="true" />
                {t("joinedGitHubYears", { count: data.joinedYears })}
              </li>
              <li className="flex items-center gap-2.5">
                <Buildings size={18} aria-hidden="true" />
                {data.company}
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs dark:text-zinc-500 text-zinc-500 text-right mb-2">
              {t("contributionsLastYear")}
            </p>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={t("weeklyChartAriaLabel", { max })}>
              <defs>
                <linearGradient id="gh-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              {ticks.map((tk) => {
                const y = 4 + (H - PAD_B - 8) - (tk / Math.max(max, 1)) * (H - PAD_B - 8);
                return (
                  <g key={tk}>
                    <line x1={PAD_L} y1={y} x2={W - 4} y2={y} stroke={gridColor} strokeWidth="1" />
                    <text x={PAD_L - 6} y={y + 3.5} textAnchor="end" fontSize="10" fill={axisColor}>
                      {tk}
                    </text>
                  </g>
                );
              })}
              {xLabels.map((w) => {
                const i = data.weekly.indexOf(w);
                const x =
                  PAD_L + (data.weekly.length === 1 ? (W - PAD_L - 8) / 2 : (i / (data.weekly.length - 1)) * (W - PAD_L - 8));
                return (
                  <text key={w.label} x={x} y={H - 5} textAnchor="middle" fontSize="10" fill={axisColor}>
                    {w.label}
                  </text>
                );
              })}
              {area && <path d={area} fill="url(#gh-area)" />}
              {line && <path d={line} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />}
            </svg>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg lg:divide-x divide-zinc-200 dark:divide-zinc-800">
        <div className="p-6 text-center">
          <p className="font-incognito text-4xl font-bold tracking-tight">
            {intl.number(data.totalLastYear)}
          </p>
          <p className="mt-2 text-sm dark:text-zinc-300 text-zinc-700">{t("totalContributions")}</p>
          <p className="mt-1 text-xs dark:text-green-400 text-green-700">{data.rangeLabel}</p>
        </div>
        <div className="p-6 text-center">
          <div className="relative mx-auto w-fit">
            <Flame size={20} weight="fill" className="absolute -top-2 left-1/2 -translate-x-1/2 text-blue-500" aria-hidden="true" />
            <svg width="96" height="96" viewBox="0 0 96 96" role="img" aria-label={t("currentStreakDays", { count: data.currentStreak })}>
              <circle cx="48" cy="48" r={R} fill="none" stroke={gridColor} strokeWidth="7" />
              <circle
                cx="48"
                cy="48"
                r={R}
                fill="none"
                stroke="#22c55e"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC * (1 - ringProgress)}
                transform="rotate(-90 48 48)"
              />
              <text x="48" y="56" textAnchor="middle" fontSize="24" fontWeight="700" fill="currentColor">
                {data.currentStreak}
              </text>
            </svg>
          </div>
          <p className="mt-2 text-sm font-semibold dark:text-zinc-100 text-zinc-900">{t("currentStreak")}</p>
          <p className="mt-1 text-xs dark:text-green-400 text-green-700">{data.currentRange}</p>
        </div>
        <div className="p-6 text-center">
          <p className="font-incognito text-4xl font-bold dark:text-zinc-900 text-zinc-950">
            {data.longestStreak}
          </p>
          <p className="mt-2 text-sm dark:text-zinc-300 text-zinc-700">{t("longestStreak")}</p>
          <p className="mt-1 text-xs dark:text-green-400 text-green-700">{data.longestRange}</p>
        </div>
        <div className="p-6">
          <p className="font-incognito font-semibold dark:text-blue-400 text-blue-600 mb-3">{t("mostUsedLanguages")}</p>
          {data.languages.length > 0 ? (
            <>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full" role="img" aria-label={t("languageBreakdown")}>
                {data.languages.map((l) => (
                  <span key={l.name} style={{ width: `${l.pct}%`, backgroundColor: l.color }} title={`${l.name} ${l.pct.toFixed(2)}%`} />
                ))}
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs dark:text-zinc-400 text-zinc-600">
                {data.languages.map((l) => (
                  <li key={l.name} className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: l.color }} aria-hidden="true" />
                    <span className="truncate">{l.name} {l.pct.toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-xs dark:text-zinc-500 text-zinc-500">{t("languageDataUnavailable")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
