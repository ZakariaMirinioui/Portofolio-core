import ContributionGraph from "./ContributionGraph";
import GitHubAnalytics from "./GitHubAnalytics";
import { Slide } from "@/app/animation/Slide";
import { getTranslations } from "next-intl/server";

export default async function GithubCalendarComponent({ locale }: { locale?: string }) {
  const loc = locale ?? "en";
  const t = await getTranslations({ locale: loc, namespace: "github" });

  return (
    <section>
      <Slide delay={0.16} className="mb-8">
        <h2 className="font-incognito text-4xl font-bold tracking-tight">
          {t("analyticsTitle")}
        </h2>
      </Slide>

      <Slide delay={0.18}>
        <div className="space-y-4">
          <ContributionGraph />
          <GitHubAnalytics />
        </div>
      </Slide>
    </section>
  );
}
