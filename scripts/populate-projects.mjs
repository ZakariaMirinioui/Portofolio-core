import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function createProjects() {
  const projects = [
    // ============================================
    // DOSSERA JAMS - Flagship Enterprise Project
    // ============================================
    {
      _type: "project",
      name: "Dossera JAMS",
      slug: { current: "dossera-jams" },
      tagline: "Sovereign Judicial Archive Management System deployed in Moroccan courts",
      category: "judicial",
      status: "production",
      featured: true,
      clientType: "government",
      role: "tech-lead",
      teamSize: 4,
      duration: "18 months (2023-2024)",
      techStack: [
        "React", "Node.js", "TypeScript", "PostgreSQL", "pgvector",
        "Meilisearch", "MinIO", "Redis", "Docker", "Proxmox VE",
        "pfSense", "Wazuh SIEM", "Grafana", "Ansible", "Tesseract.js"
      ],
      metrics: [
        { label: "Courts Deployed", value: "2", description: "Court of First Instance Khouribga + Court of Appeal" },
        { label: "Daily Active Users", value: "50+", description: "Magistrates, clerks, administrators" },
        { label: "Admin Time Reduction", value: "30%", description: "Measured vs paper-based workflow" },
        { label: "Document Accuracy (OCR)", value: "98%+", description: "Arabic/French multilingual" },
        { label: "Cache Hit Rate", value: "99.9%", description: "3-tier: L1 LRU, L2 Redis, L3 PostgreSQL/MinIO" },
        { label: "Data Sovereignty", value: "100%", description: "Zero mandatory cloud, fully on-premise" },
      ],
      projectUrl: "https://dossera.surge.sh",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Dossera JAMS (Judicial Archive Management System) is a sovereign, on-premise platform digitizing judicial archives for courts, law firms, notary offices, and government institutions across Morocco. Built with a decoupled client-server architecture, it transforms how judicial institutions manage, search, and secure their critical documents."
            }
          ]
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "As Technical Project Lead & Full Stack Developer, I architected and delivered the entire system — from translating complex legal requirements into technical specifications to deploying a production-ready platform serving real users daily."
            }
          ]
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "The system is successfully deployed in production at the Court of First Instance of Khouribga, with a second deployment validated at the Court of Appeal. It delivers measurable results: a 30% reduction in administrative processing time and complete data confidentiality for sensitive judicial documents."
            }
          ]
        }
      ],
    },

    // ============================================
    // PWADCTEAM SUITE - 5 SaaS Products
    // ============================================
    {
      _type: "project",
      name: "Doctor.pwadcteam.com",
      slug: { current: "doctor-pwadcteam" },
      tagline: "Multi-tenant clinic management SaaS for healthcare providers",
      category: "healthcare",
      status: "production",
      featured: true,
      clientType: "own-product",
      role: "founder",
      teamSize: 3,
      duration: "Ongoing (2022-Present)",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker", "Redis", "Stripe", "SendGrid"],
      metrics: [
        { label: "Active Clinics", value: "25+", description: "Multi-tenant deployments" },
        { label: "Monthly Appointments", value: "10K+", description: "Processed through platform" },
        { label: "Uptime", value: "99.9%", description: "SLA commitment" },
        { label: "Revenue Model", value: "SaaS", description: "Monthly subscriptions per clinic" },
      ],
      projectUrl: "https://doctor.pwadcteam.com",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Comprehensive clinic management platform enabling healthcare providers to manage appointments, patient records, prescriptions, billing, and teleconsultations. Built as a multi-tenant SaaS with role-based access (Admin, Doctor, Nurse, Receptionist, Patient)."
            }
          ]
        }
      ],
    },
    {
      _type: "project",
      name: "School.pwadcteam.com",
      slug: { current: "school-pwadcteam" },
      tagline: "School management system for educational institutions",
      category: "education",
      status: "production",
      featured: true,
      clientType: "own-product",
      role: "founder",
      teamSize: 3,
      duration: "Ongoing (2022-Present)",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker", "Redis", "Stripe"],
      metrics: [
        { label: "Schools Onboarded", value: "15+", description: "Primary & secondary institutions" },
        { label: "Students Managed", value: "5K+", description: "Active student records" },
        { label: "Modules", value: "8", description: "Admissions, grades, attendance, finance, communication, library, transport, HR" },
      ],
      projectUrl: "https://school.pwadcteam.com",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "End-to-end school management platform covering admissions, academic tracking, attendance, fee management, parent-teacher communication, library, transport, and HR. Multi-tenant architecture with customizable workflows per institution."
            }
          ]
        }
      ],
    },
    {
      _type: "project",
      name: "Avocat.pwadcteam.com",
      slug: { current: "avocat-pwadcteam" },
      tagline: "Law firm case management and legal practice automation",
      category: "professional-services",
      status: "production",
      featured: true,
      clientType: "own-product",
      role: "founder",
      teamSize: 3,
      duration: "Ongoing (2022-Present)",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker", "Redis", "MinIO", "Meilisearch"],
      metrics: [
        { label: "Law Firms", value: "30+", description: "Active legal practices" },
        { label: "Cases Managed", value: "2K+", description: "Active legal matters" },
        { label: "Document Search", value: "<200ms", description: "Meilisearch-powered full-text search" },
      ],
      projectUrl: "https://avocat.pwadcteam.com",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Legal practice management SaaS for law firms and legal departments. Features case tracking, document management with OCR, calendar & deadlines, billing & trust accounting, client portal, and secure document sharing. Built with Moroccan legal workflow compliance in mind."
            }
          ]
        }
      ],
    },
    {
      _type: "project",
      name: "Salon.pwadcteam.com",
      slug: { current: "salon-pwadcteam" },
      tagline: "Salon & spa booking and business management platform",
      category: "wellness",
      status: "production",
      featured: false,
      clientType: "own-product",
      role: "founder",
      teamSize: 2,
      duration: "Ongoing (2023-Present)",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker", "Redis", "Stripe", "Twilio"],
      metrics: [
        { label: "Salons Active", value: "40+", description: "Beauty & wellness businesses" },
        { label: "Monthly Bookings", value: "8K+", description: "Appointments processed" },
        { label: "No-show Reduction", value: "45%", description: "Via automated SMS reminders" },
      ],
      projectUrl: "https://salon.pwadcteam.com",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Booking and business management platform for salons, spas, and wellness centers. Online booking, staff scheduling, inventory & POS, client CRM, loyalty programs, automated marketing (SMS/Email), and multi-location support."
            }
          ]
        }
      ],
    },
    {
      _type: "project",
      name: "Spa.pwadcteam.com",
      slug: { current: "spa-pwadcteam" },
      tagline: "Premium spa & wellness center management suite",
      category: "wellness",
      status: "production",
      featured: false,
      clientType: "own-product",
      role: "founder",
      teamSize: 2,
      duration: "Ongoing (2023-Present)",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker", "Redis", "Stripe"],
      metrics: [
        { label: "Spa Centers", value: "12+", description: "Premium wellness destinations" },
        { label: "Treatment Types", value: "100+", description: "Configurable service catalog" },
        { label: "Retention Rate", value: "78%", description: "Via loyalty & membership programs" },
      ],
      projectUrl: "https://spa.pwadcteam.com",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Specialized management suite for premium spas and wellness centers. Advanced treatment scheduling, therapist management, room/resource allocation, package & membership sales, retail POS, and detailed analytics for revenue optimization."
            }
          ]
        }
      ],
    },

    // ============================================
    // KOMBAT SUSHI - Live E-commerce
    // ============================================
    {
      _type: "project",
      name: "KombatSushi",
      slug: { current: "kombatsushi" },
      tagline: "Live e-commerce platform for Japanese cuisine delivery & pickup",
      category: "ecommerce",
      status: "production",
      featured: true,
      clientType: "own-product",
      role: "founder",
      teamSize: 2,
      duration: "Ongoing (2023-Present)",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker", "Redis", "Stripe", "Mapbox", "Twilio"],
      metrics: [
        { label: "Monthly Orders", value: "2K+", description: "Delivery & pickup" },
        { label: "Active Customers", value: "1.5K+", description: "Registered users" },
        { label: "Avg Order Value", value: "180 MAD", description: "~$18 USD" },
        { label: "Delivery Radius", value: "15km", description: "Real-time driver tracking" },
        { label: "Uptime", value: "99.5%", description: "Peak hours resilience" },
      ],
      projectUrl: "https://kombatsushi.com",
      repository: "",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Full-stack e-commerce platform for a Japanese restaurant chain. Real-time menu management, order processing, kitchen display system, driver dispatch with live tracking, loyalty program, promotional engine, and multi-location inventory sync."
            }
          ]
        }
      ],
    },

    // ============================================
    // GITHUB HIGHLIGHTS - Open Source
    // ============================================
    {
      _type: "project",
      name: "Sanity-Portfolio-Starter",
      slug: { current: "sanity-portfolio-starter" },
      tagline: "Open-source portfolio template with Next.js 14, Sanity, Tailwind",
      category: "open-source",
      status: "active",
      featured: false,
      clientType: "open-source",
      role: "fullstack",
      teamSize: 1,
      duration: "2024",
      techStack: ["Next.js 14", "Sanity", "Tailwind CSS", "TypeScript", "Framer Motion"],
      metrics: [
        { label: "GitHub Stars", value: "120+", description: "Community adoption" },
        { label: "Forks", value: "35+", description: "Used as starter by developers" },
      ],
      projectUrl: "https://github.com/ZakariaMirinioui/sanity-portfolio-starter",
      repository: "https://github.com/ZakariaMirinioui/sanity-portfolio-starter",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Production-ready portfolio starter featuring: Sanity CMS integration, dark mode, GitHub contribution graph, project showcase, blog-ready, SEO optimized, Vercel deployment configured. Used as foundation for this portfolio."
            }
          ]
        }
      ],
    },
    {
      _type: "project",
      name: "Meilisearch-Arabic-OCR-Pipeline",
      slug: { current: "meilisearch-arabic-ocr-pipeline" },
      tagline: "Arabic/French OCR + semantic search pipeline for legal docs",
      category: "open-source",
      status: "active",
      featured: false,
      clientType: "open-source",
      role: "backend",
      teamSize: 1,
      duration: "2024",
      techStack: ["Python", "Tesseract.js", "Meilisearch", "pgvector", "FastAPI", "Docker"],
      metrics: [
        { label: "OCR Accuracy", value: "98%+", description: "Arabic/French legal documents" },
        { label: "Search Latency", value: "<50ms", description: "p99 hybrid search" },
      ],
      projectUrl: "",
      repository: "https://github.com/ZakariaMirinioui/meilisearch-arabic-ocr-pipeline",
      description: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Extracted from Dossera JAMS: A reusable pipeline for multilingual OCR (Tesseract.js with custom Arabic/French models) feeding into Meilisearch for full-text search and pgvector for semantic search. Includes document preprocessing, layout analysis, and confidence scoring."
            }
          ]
        }
      ],
    },
  ];

  console.log(`Creating ${projects.length} projects...`);

  for (const project of projects) {
    try {
      const existing = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug: project.slug.current });
      if (existing) {
        console.log(`⏭️  Skipping ${project.name} (already exists)`);
        continue;
      }
      const created = await client.create(project);
      console.log(`✅ Created: ${project.name} (${created._id})`);
    } catch (error) {
      console.error(`❌ Failed to create ${project.name}:`, error);
    }
  }

  console.log("Migration complete!");
}

createProjects().catch(console.error);