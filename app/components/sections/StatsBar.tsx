import { Slide } from "../../animation/Slide";

const stats = [
  { value: "9+", label: "Projects Delivered" },
  { value: "100+", label: "Businesses Served" },
  { value: "50K+", label: "End Users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "30%", label: "Avg. Efficiency Gain" },
  { value: "2", label: "Countries Deployed" },
];

export default function StatsBar() {
  return (
    <section className="mb-16">
      <Slide delay={0.12}>
        <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-incognito font-bold dark:text-primary-color text-secondary-color mb-1">
                  {stat.value}
                </div>
                <div className="text-xs dark:text-zinc-400 text-zinc-600 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>
    </section>
  );
}