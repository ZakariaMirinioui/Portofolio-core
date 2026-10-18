"use client";
import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";
import { github } from "@/app/data/contribution-graph-theme";
import { useState, useEffect } from "react";
import EmptyState from "../shared/EmptyState";
import { IoIosAnalytics } from "react-icons/io";
import { useTranslations } from "next-intl";

export default function ContributionGraph() {
  const t = useTranslations("github");
  const { theme, systemTheme } = useTheme();
  const [serverTheme, setServerTheme] = useState<"light" | "dark" | undefined>(
    undefined
  );
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  // Set theme only after rendering to avoid mismatch between client and server
  // https://github.com/vercel/next.js/issues/10608#issuecomment-589073831
  useEffect(() => {
    setServerTheme(scheme);
  }, [scheme]);

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  if (!username)
    return (
      <EmptyState
        icon={<IoIosAnalytics />}
        title={t("contributionGraphErrorTitle")}
        message={t("contributionGraphErrorMessage")}
      />
    );

  return (
    <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit">
      <GitHubCalendar
        username={username}
        theme={github}
        colorScheme={serverTheme}
        blockSize={13}
      />
    </div>
  );
}
