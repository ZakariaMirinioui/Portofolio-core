import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function createServices() {
  const services = [
    {
      _type: "service",
      name: "Sovereign Digital Transformation",
      slug: { current: "sovereign-digital-transformation" },
      shortDescription: "End-to-end digitization for government & regulated industries with full data sovereignty",
      icon: "HiOutlineShieldCheck",
      category: "digital-transformation",
      featured: true,
      order: 1,
      fullDescription: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "We help courts, ministries, and regulated institutions transition from paper-based workflows to secure, auditable digital systems — without ever surrendering data control to third-party clouds."
            }
          ]
        }
      ],
      whatWeDeliver: [
        "Requirements analysis & legal compliance mapping",
        "Custom architecture design (on-prem / hybrid / air-gapped)",
        "Full-stack application development",
        "Infrastructure provisioning (Proxmox, pfSense, VLANs)",
        "Security hardening & SIEM deployment (Wazuh, CrowdSec)",
        "Staff training & knowledge transfer",
        "Disaster recovery planning (PRA/PCA)",
        "Ongoing maintenance & SLA support",
      ],
      process: [
        { step: 1, title: "Discovery & Compliance Audit", description: "Map legal requirements (GDPR, Law 09-08, etc.), assess current infrastructure, define sovereignty constraints", duration: "2-3 weeks", deliverables: ["Compliance gap analysis", "Architecture decision records", "Risk assessment"] },
        { step: 2, title: "Architecture & Design", description: "Design decoupled architecture, select tech stack, plan VLAN segmentation, define RBAC model", duration: "2-3 weeks", deliverables: ["C4 architecture diagrams", "Tech stack rationale (ADRs)", "Network topology", "Data flow diagrams"] },
        { step: 3, title: "Infrastructure Deployment", description: "Provision Proxmox cluster, configure pfSense firewall, deploy 5-VLAN architecture, set up monitoring stack", duration: "2-4 weeks", deliverables: ["Running infrastructure", "Network documentation", "Monitoring dashboards"] },
        { step: 4, title: "Application Development", description: "Build frontend, backend, search, OCR pipeline, document management", duration: "8-16 weeks", deliverables: ["Working application", "API documentation", "Test coverage >80%"] },
        { step: 5, title: "Security Hardening & Audit", description: "Deploy Wazuh SIEM, configure audit trails, penetration testing, encryption verification", duration: "2-3 weeks", deliverables: ["Security audit report", "Penetration test results", "Compliance checklist"] },
        { step: 6, title: "Training & Handover", description: "Admin training, user workshops, runbook delivery, disaster recovery drills", duration: "1-2 weeks", deliverables: ["Training materials", "Runbooks", "Disaster recovery plan", "Support escalation matrix"] },
      ],
      engagementModels: [
        { name: "Fixed Scope / Fixed Price", description: "Defined requirements, fixed timeline and budget. Best for well-understood projects with clear compliance boundaries.", bestFor: "Government tenders, regulated industry projects with fixed specs" },
        { name: "Milestone-based", description: "Phase-gated delivery with acceptance criteria per milestone. Reduces risk for large transformations.", bestFor: "Multi-phase judicial/healthcare digitization programs" },
        { name: "Dedicated Team", description: "Long-term embedded team for ongoing development and platform evolution.", bestFor: "Continuous platform development, multi-year contracts" },
      ],
      techStack: ["React", "Node.js", "PostgreSQL", "pgvector", "Meilisearch", "MinIO", "Redis", "Docker", "Proxmox VE", "pfSense", "Wazuh", "Ansible", "Tesseract.js"],
    },
    {
      _type: "service",
      name: "Multi-Tenant SaaS Development",
      slug: { current: "multi-tenant-saas-development" },
      shortDescription: "Build scalable, white-label SaaS platforms from concept to recurring revenue",
      icon: "HiOutlineDatabase",
      category: "custom-dev",
      featured: true,
      order: 2,
      fullDescription: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "We've built and operate 5 live multi-tenant SaaS products (healthcare, education, legal, wellness, hospitality) serving 100+ businesses. We bring that battle-tested experience to your product."
            }
          ]
        }
      ],
      whatWeDeliver: [
        "Product discovery & market validation",
        "Multi-tenant architecture (shared DB / shared schema / isolated)",
        "Subscription billing & usage metering (Stripe/Paddle)",
        "Role-based access control (Super-admin, Tenant-admin, User)",
        "White-label theming & custom domains",
        "Tenant onboarding & self-service provisioning",
        "Analytics & usage dashboards per tenant",
        "API for third-party integrations",
      ],
      process: [
        { step: 1, title: "Product Strategy", description: "Define MVP scope, pricing model, target segments, competitive positioning", duration: "2 weeks", deliverables: ["PRD", "Pricing model", "Go-to-market strategy"] },
        { step: 2, title: "Architecture & Tenancy Model", description: "Choose tenancy pattern, design data isolation, plan scaling strategy", duration: "2 weeks", deliverables: ["Architecture decision records", "Data model", "Scaling plan"] },
        { step: 3, title: "Core Platform Build", description: "Auth, tenancy, billing, admin panel, tenant dashboard", duration: "6-10 weeks", deliverables: ["Working platform", "Admin panel", "Tenant onboarding flow"] },
        { step: 4, title: "Vertical Features", description: "Build domain-specific modules (appointments, cases, grading, bookings)", duration: "4-8 weeks per vertical", deliverables: ["Feature-complete modules", "Integration tests"] },
        { step: 5, title: "Launch & Iterate", description: "Beta program, feedback loops, performance optimization, scale", duration: "Ongoing", deliverables: ["Launch checklist", "Monitoring", "Growth experiments"] },
      ],
      engagementModels: [
        { name: "Fixed Scope / Fixed Price", description: "MVP with defined feature set. Best for validated ideas with clear requirements.", bestFor: "Founders with validated problem-solution fit" },
        { name: "Time & Materials", description: "Flexible scope for exploratory products. Weekly sprints, transparent billing.", bestFor: "Early-stage products discovering product-market fit" },
        { name: "Equity + Cash (Selective)", description: "Reduced rate + equity for high-potential ventures we believe in.", bestFor: "Pre-seed/Seed founders with strong domain expertise" },
      ],
      techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Redis", "Docker", "Stripe", "SendGrid", "Meilisearch", "S3/MinIO"],
    },
    {
      _type: "service",
      name: "Legacy Modernization & Cloud Migration",
      slug: { current: "legacy-modernization" },
      shortDescription: "Strangler fig migration from monoliths to cloud-native architectures",
      icon: "HiOutlineCog",
      category: "legacy-modernization",
      featured: true,
      order: 3,
      fullDescription: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Transform legacy Java/.NET monoliths into maintainable, scalable systems. We specialize in incremental migration — zero big-bang rewrites, zero downtime."
            }
          ]
        }
      ],
      whatWeDeliver: [
        "Legacy system analysis & dependency mapping",
        "Strangler fig migration strategy",
        "Domain-driven design & bounded contexts",
        "API gateway & service mesh implementation",
        "Data migration & synchronization patterns",
        "Observability & distributed tracing",
        "CI/CD pipeline modernization",
        "Team enablement & knowledge transfer",
      ],
      process: [
        { step: 1, title: "System Archaeology", description: "Reverse-engineer domain logic, map data flows, identify seams for extraction", duration: "3-4 weeks", deliverables: ["System context map", "Dependency graph", "Migration risk register"] },
        { step: 2, title: "Target Architecture", description: "Define service boundaries, choose decomposition strategy, design data ownership", duration: "2-3 weeks", deliverables: ["Service catalog", "API contracts", "Data migration plan"] },
        { step: 3, title: "Incremental Extraction", description: "Extract services one-by-one behind API gateway, run in parallel with legacy", duration: "Ongoing (per service)", deliverables: ["Deployed microservice", "Contract tests", "Canary deployment config"] },
        { step: 4, title: "Cutover & Decommission", description: "Traffic shifting, data validation, legacy decommission", duration: "1-2 weeks per service", deliverables: ["Cutover runbook", "Rollback plan", "Post-mortem"] },
      ],
      engagementModels: [
        { name: "Time & Materials", description: "Complexity varies per service. Transparent velocity tracking.", bestFor: "Large-scale migrations with uncertain scope" },
        { name: "Milestone-based", description: "Per-service delivery with clear acceptance criteria.", bestFor: "Organizations wanting predictable checkpoints" },
      ],
      techStack: ["Java/Spring Boot", "Node.js", "Kubernetes", "Istio", "Kafka", "PostgreSQL", "Redis", "Prometheus", "Grafana", "Jaeger", "ArgoCD"],
    },
    {
      _type: "service",
      name: "Technical Advisory & CTO-as-a-Service",
      slug: { current: "technical-advisory" },
      shortDescription: "Strategic technology leadership for founders & executives without full-time CTO cost",
      icon: "HiOutlineChartBar",
      category: "advisory",
      featured: true,
      order: 4,
      fullDescription: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Fractional CTO engagement for startups and SMEs needing senior technical leadership: architecture decisions, team building, vendor evaluation, investor technical due diligence, and crisis management."
            }
          ]
        }
      ],
      whatWeDeliver: [
        "Technology strategy & roadmap",
        "Architecture review & decision support",
        "Hiring plan & technical interview loop",
        "Vendor & tool evaluation (build vs buy)",
        "Investor technical due diligence prep",
        "Incident response & post-mortem facilitation",
        "Engineering culture & process design",
        "Board-ready technical reporting",
      ],
      process: [
        { step: 1, title: "Assessment & Alignment", description: "Business context, technical landscape, team dynamics, immediate risks", duration: "1 week", deliverables: ["Technical health report", "Risk register", "Quick wins"] },
        { step: 2, title: "Strategy & Roadmap", description: "Define 6-18 month technical priorities aligned with business milestones", duration: "2 weeks", deliverables: ["Technical roadmap", "Architecture principles", "Hiring plan"] },
        { step: 3, title: "Ongoing Advisory", description: "Bi-weekly syncs, architecture reviews, hiring support, crisis availability", duration: "Monthly retainer", deliverables: ["Decision logs", "Architecture diagrams", "Board updates"] },
      ],
      engagementModels: [
        { name: "Retainer / Advisory", description: "Fixed monthly hours (10-40h) with priority access. Rolling 3-month commitment.", bestFor: "Series A+ startups, scaling SMEs, non-technical founders" },
        { name: "Project-based", description: "Defined engagement: due diligence, architecture review, hiring loop design.", bestFor: "Specific inflection points (fundraise, acquisition, rewrite decision)" },
      ],
      techStack: ["Architecture", "Leadership", "Strategy", "Team Building", "Due Diligence"],
    },
  ];

  console.log(`Creating ${services.length} services...`);

  for (const service of services) {
    try {
      const existing = await client.fetch(`*[_type == "service" && slug.current == $slug][0]`, { slug: service.slug.current });
      if (existing) {
        console.log(`⏭️  Skipping ${service.name} (already exists)`);
        continue;
      }
      const created = await client.create(service);
      console.log(`✅ Created service: ${service.name} (${created._id})`);
    } catch (error) {
      console.error(`❌ Failed to create ${service.name}:`, error);
    }
  }

  console.log("Services migration complete!");
}

createServices().catch(console.error);