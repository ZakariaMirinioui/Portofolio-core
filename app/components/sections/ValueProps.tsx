import { Slide } from "../../animation/Slide";
import {
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

const pillars = [
  {
    icon: HiOutlineShieldCheck,
    title: "Enterprise Systems",
    description:
      "Sovereign, on-premise platforms for courts, government institutions, and regulated industries. Full data sovereignty, military-grade security, and legal compliance.",
    highlights: ["Judicial Archive Systems", "Government Digitization", "Security & Compliance"],
    link: "/projects/dossera-jams",
    linkText: "View Dossera Case Study",
  },
  {
    icon: HiOutlineBuildingOffice2,
    title: "SaaS Products",
    description:
      "Five live multi-tenant platforms serving 100+ businesses across healthcare, education, legal, and wellness. From concept to recurring revenue.",
    highlights: ["Healthcare (25+ clinics)", "Education (15+ schools)", "Legal (30+ firms)", "Wellness (50+ centers)"],
    link: "/projects",
    linkText: "Explore Products",
  },
  {
    icon: HiOutlineCodeBracket,
    title: "Custom Engineering",
    description:
      "End-to-end development for startups and enterprises. React, Node.js, Java, cloud-native, on-prem, and everything in between. Architecture to deployment.",
    highlights: ["Full-Stack Development", "Legacy Modernization", "CTO-as-a-Service"],
    link: "/services",
    linkText: "View Services",
  },
];

export default function ValueProps() {
  return (
    <section className="mt-24 mb-16">
      <Slide delay={0.1}>
        <h2 className="text-2xl font-incognito font-bold tracking-tight mb-8">
          What I Build
        </h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors"
            >
              <pillar.icon className="text-3xl dark:text-primary-color text-secondary-color mb-4" />
              <h3 className="text-lg font-incognito font-semibold mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4">
                {pillar.description}
              </p>
              <ul className="space-y-1.5 mb-5">
                {pillar.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs dark:text-zinc-500 text-zinc-500 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full dark:bg-primary-color bg-secondary-color flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={pillar.link}
                className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-primary-color text-secondary-color hover:underline"
              >
                {pillar.linkText} →
              </a>
            </div>
          ))}
        </div>
      </Slide>
    </section>
  );
}