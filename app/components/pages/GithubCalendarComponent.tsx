import ContributionGraph from "./ContributionGraph";
import GitHubAnalytics from "./GitHubAnalytics";
import { Slide } from "@/app/animation/Slide";

export default function GithubCalendarComponent() {
  return (
    <section>
      <Slide delay={0.16} className="mb-8">
        <h2 className="font-incognito text-4xl font-bold tracking-tight">
          GitHub Analytics
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
