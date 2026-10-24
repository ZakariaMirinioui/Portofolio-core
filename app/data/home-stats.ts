export const homeStats = [
  { value: "25+", labelKey: "projectsDelivered" },
  { value: "30+", labelKey: "clients" },
  { value: "10", labelKey: "readyToDeployProducts" },
  { value: "8+", labelKey: "n8nAutomations" },
  { value: "4+", labelKey: "yearsFreelance" },
] as const;

export type HomeStat = (typeof homeStats)[number];