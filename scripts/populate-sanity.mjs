// Sanity content population script
// Run with: node scripts/populate-sanity.mjs

const SANITY_PROJECT_ID = "jon73wkt";
const SANITY_DATASET = "production";
const SANITY_TOKEN = "skKD8YWW1hoJIClHsD5nTyfolN1eF148NcnUXyOcHjR5n5Ik9h4PQaF55stvCg9iHIEtEsjQZRt2maP6kjnKJ0Xf6VFn0yUpIgQRbY3vIZ1f3boDK2WI5Mwdgpwj6uJohKaByOPaO7UNq4Da4RAgtIMbr4kmG7epesyJ3xSDbAjTI0Dkj084";

const API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-07-21/data/mutate/${SANITY_DATASET}`;

async function sanityMutate(mutations) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const data = await res.json();
  if (data.error) {
    console.error("Sanity error:", data.error);
    throw new Error(data.error.message);
  }
  return data;
}

async function main() {
  console.log("🚀 Populating Sanity content...");

  // 1. Delete existing documents
  console.log("🗑️  Clearing existing content...");
  await sanityMutate([
    { delete: { query: '*[_type == "profile"]' } },
    { delete: { query: '*[_type == "job"]' } },
    { delete: { query: '*[_type == "project"]' } },
    { delete: { query: '*[_type == "heroe"]' } },
  ]);

  // 2. Create Profile
  console.log("👤 Creating profile...");
  const profileResult = await sanityMutate([
    {
      create: {
        _type: "profile",
        fullName: "Zakaria Mirinioui",
        headline:
          "Full Stack Developer & Digital Solutions Architect — Building enterprise-grade applications for judicial and secure logistics sectors",
        shortBio:
          "Certified Full Stack Developer blending technical expertise (Java, PHP, JavaScript) with advanced Business Analysis skills. Proven track record in digitizing critical processes within the Justice and Secure Logistics sectors. Architecting high-performance software solutions that align with core business objectives.",
        email: "zakmirinioui@gmail.com",
        location: "Khouribga, Morocco",
        fullBio: [
          {
            _type: "block",
            _key: "bio1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "bio1a",
                text: "I'm Zakaria Mirinioui, a Full Stack Developer and Digital Solutions Architect based in Morocco. With over five years of experience spanning freelance work, industrial IT, and public sector digitization, I specialize in building enterprise-grade software that solves real business problems.",
              },
            ],
          },
          {
            _type: "block",
            _key: "bio2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "bio2a",
                text: "My most significant achievement is leading the technical digitization of the Court of First Instance of Khouribga — translating complex legal requirements into a secure, production-ready judicial archive management system (JAMS). This initiative reduced administrative processing time by 30% while ensuring total data confidentiality.",
              },
            ],
          },
          {
            _type: "block",
            _key: "bio3",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "bio3a",
                text: "At Brink's Security, I optimized API architectures and secured critical data exchange flows. At OCP Group, I developed intuitive web interfaces and automated IT processes in demanding industrial environments.",
              },
            ],
          },
          {
            _type: "block",
            _key: "bio4",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "bio4a",
                text: "On the technical side, I build robust backends with Java Spring Boot, reactive frontends with React and Next.js, and design RESTful and GraphQL APIs optimized for performance and security. My certifications in Business Analysis and Project Management (PMI, NASBA) allow me to intervene from requirements definition through production deployment.",
              },
            ],
          },
          {
            _type: "block",
            _key: "bio5",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "bio5a",
                text: "This dual competency — technical and methodological — enables me to deliver complex projects with a precise, holistic vision, from specification to production.",
              },
            ],
          },
        ],
        usage: [
          {
            _type: "block",
            _key: "usage1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "usage1a",
                text: "My core stack includes Java (Spring Boot), PHP (Laravel), Node.js for backend; React, Next.js, TypeScript for frontend; PostgreSQL, MySQL, MongoDB for databases; Docker, Kubernetes, Jenkins for DevOps; and AWS, Oracle Cloud for cloud infrastructure.",
              },
            ],
          },
        ],
      },
    },
  ]);
  const profileId = profileResult.results[0].id;
  console.log("  ✅ Profile created:", profileId);

  // 3. Create Jobs
  console.log("💼 Creating jobs...");
  const jobResults = await sanityMutate([
    {
      create: {
        _type: "job",
        _key: "job1",
        name: "Palais de Justice Khouribga",
        jobTitle: "Technical Project Lead & Full Stack Developer",
        url: "https://www.google.com/maps/place/Khouribga",
        description:
          "Led the technical digitization of judicial procedures for the Court of First Instance. Translated complex legal requirements into technical specifications, developed secure backend infrastructure using Java, PHP, and SQL, and achieved a 30% reduction in administrative processing time.",
        startDate: "2025-07-01",
        endDate: "2025-10-31",
      },
    },
    {
      create: {
        _type: "job",
        _key: "job2",
        name: "Brink's Security Casablanca",
        jobTitle: "Full Stack Developer",
        url: "https://brinks.com",
        description:
          "Designed and implemented a secure logistics tracking solution. Developed responsive UIs using React.js with real-time REST APIs, optimized database architecture for enhanced tracking, and deployed the final module to maximize operational efficiency of field teams.",
        startDate: "2025-04-01",
        endDate: "2025-06-30",
      },
    },
    {
      create: {
        _type: "job",
        _key: "job3",
        name: "OCP Group Khouribga",
        jobTitle: "IT Support & Automation Associate",
        url: "https://www.ocpgroup.ma",
        description:
          "Ensured operational maintenance of vital IT assets in a demanding industrial environment. Developed automation scripts using Python and Bash for report generation, significantly improving reliability of maintenance data and optimizing IT department workflows.",
        startDate: "2024-08-01",
        endDate: "2024-09-30",
      },
    },
  ]);
  console.log(
    "  ✅ Jobs created:",
    jobResults.results.map((r) => r.id)
  );

  // 4. Create Projects
  console.log("📦 Creating projects...");
  const projectResults = await sanityMutate([
    {
      create: {
        _type: "project",
        _key: "proj1",
        name: "Dossera JAMS",
        tagline: "Sovereign Judicial Archive Management System",
        slug: { _type: "slug", current: "dossera" },
        projectUrl: "https://dossera.surge.sh",
        repository: "https://github.com/ZakariaMirinioui/Dossera",
        description: [
          {
            _type: "block",
            _key: "proj1desc1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj1desc1a",
                text: "Dossera JAMS is a sovereign, on-premise judicial archive management platform designed for the Kingdom of Morocco. Built with a decoupled client-server architecture (React frontend + modular containerized backend), it transforms how judicial institutions manage, search, and secure their critical documents.",
              },
            ],
          },
          {
            _type: "block",
            _key: "proj1desc2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj1desc2a",
                text: "Key features: Intelligent OCR (Arabic/French, 98%+ accuracy), hybrid semantic search (Meilisearch + pgvector), 3-tier cache architecture (99.9% hit rate), RBAC, immutable audit trail, MinIO S3 storage with AES-256 encryption, and 100% on-premise deployment with zero cloud dependency.",
              },
            ],
          },
          {
            _type: "block",
            _key: "proj1desc3",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj1desc3a",
                text: "Successfully deployed in production at the Court of First Instance of Khouribga and validated at the Court of Appeal. Achieved 30% reduction in administrative processing time.",
              },
            ],
          },
          {
            _type: "block",
            _key: "proj1desc4",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj1desc4a",
                text: "Tech stack: React, Node.js, PostgreSQL, pgvector, Meilisearch, MinIO, Redis, Docker, Proxmox VE, pfSense, Wazuh SIEM, Grafana, Ansible.",
              },
            ],
          },
        ],
      },
    },
    {
      create: {
        _type: "project",
        _key: "proj2",
        name: "JudicialArchive",
        tagline: "Secure document management for judicial administration",
        slug: { _type: "slug", current: "judicial-archive" },
        repository: "https://github.com/ZakariaMirinioui/JudicialArchive",
        description: [
          {
            _type: "block",
            _key: "proj2desc1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj2desc1a",
                text: "Secure document management system developed for judicial administration. Implements role-based access control, audit logging, and end-to-end encryption for sensitive legal documentation.",
              },
            ],
          },
          {
            _type: "block",
            _key: "proj2desc2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj2desc2a",
                text: "Architecture: TypeScript, Node.js, PostgreSQL, Redis. Deployment: Docker containers with Nginx reverse proxy.",
              },
            ],
          },
        ],
      },
    },
    {
      create: {
        _type: "project",
        _key: "proj3",
        name: "Project-ARCUS",
        tagline: "Modern Android application with clean architecture",
        slug: { _type: "slug", current: "project-arcus" },
        repository: "https://github.com/ZakariaMirinioui/Project-ARCUS",
        description: [
          {
            _type: "block",
            _key: "proj3desc1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj3desc1a",
                text: "Mobile application built with modern Android development practices. Clean architecture with MVVM pattern, dependency injection, and comprehensive testing suite.",
              },
            ],
          },
          {
            _type: "block",
            _key: "proj3desc2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj3desc2a",
                text: "Stack: Kotlin, Jetpack Compose, Retrofit, Room. Pattern: Clean Architecture, SOLID principles.",
              },
            ],
          },
        ],
      },
    },
    {
      create: {
        _type: "project",
        _key: "proj4",
        name: "Cura",
        tagline: "Healthcare management platform with real-time notifications",
        slug: { _type: "slug", current: "cura" },
        repository: "https://github.com/ZakariaMirinioui/Cura",
        description: [
          {
            _type: "block",
            _key: "proj4desc1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj4desc1a",
                text: "Healthcare management platform with appointment scheduling, patient records, and real-time notifications. Built with privacy and data security as primary concerns.",
              },
            ],
          },
          {
            _type: "block",
            _key: "proj4desc2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj4desc2a",
                text: "Technology: React, Node.js, PostgreSQL, Socket.io. Security: HTTPS, JWT authentication, data encryption.",
              },
            ],
          },
        ],
      },
    },
    {
      create: {
        _type: "project",
        _key: "proj5",
        name: "AdminDash Core",
        tagline: "Enterprise dashboard with custom business logic",
        slug: { _type: "slug", current: "admindash-core" },
        repository: "https://github.com/ZakariaMirinioui/AdminDash-Core",
        description: [
          {
            _type: "block",
            _key: "proj5desc1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj5desc1a",
                text: "Enhanced fork of Tremor dashboard components. Added custom business logic, improved performance, and extended component library for enterprise applications.",
              },
            ],
          },
          {
            _type: "block",
            _key: "proj5desc2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj5desc2a",
                text: "Contribution: Custom components, Performance optimization, TypeScript refactoring.",
              },
            ],
          },
        ],
      },
    },
    {
      create: {
        _type: "project",
        _key: "proj6",
        name: "Portfolio Core",
        tagline: "Modular portfolio framework with SSR and dynamic content",
        slug: { _type: "slug", current: "portfolio-core" },
        repository: "https://github.com/ZakariaMirinioui/Portofolio-core",
        projectUrl: "https://zakaria-mirinioui.dev",
        description: [
          {
            _type: "block",
            _key: "proj6desc1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "proj6desc1a",
                text: "Modular portfolio framework with server-side rendering and dynamic content management. Built with Next.js 14, Sanity CMS, and TailwindCSS. Features: SSR, Dynamic routing, Content management, Dark/Light theme, Framer Motion animations.",
              },
            ],
          },
        ],
      },
    },
  ]);
  console.log(
    "  ✅ Projects created:",
    projectResults.results.map((r) => r.id)
  );

  // 5. Create Heroes
  console.log("🦸 Creating heroes...");
  const heroesResults = await sanityMutate([
    {
      create: {
        _type: "heroe",
        _key: "hero1",
        name: "Dan Abramov",
        url: "https://twitter.com/dan_abramov2",
        met: false,
      },
    },
    {
      create: {
        _type: "heroe",
        _key: "hero2",
        name: "Kent C. Dodds",
        url: "https://twitter.com/kentcdodds",
        met: false,
      },
    },
    {
      create: {
        _type: "heroe",
        _key: "hero3",
        name: "Sarah Drasner",
        url: "https://twitter.com/sarah_edo",
        met: false,
      },
    },
    {
      create: {
        _type: "heroe",
        _key: "hero4",
        name: "Guillermo Rauch",
        url: "https://twitter.com/raaborern",
        met: false,
      },
    },
    {
      create: {
        _type: "heroe",
        _key: "hero5",
        name: "Cassidy Williams",
        url: "https://twitter.com/cassidoo",
        met: false,
      },
    },
    {
      create: {
        _type: "heroe",
        _key: "hero6",
        name: "Wes Bos",
        url: "https://twitter.com/wesbos",
        met: false,
      },
    },
    {
      create: {
        _type: "heroe",
        _key: "hero7",
        name: " fireship",
        url: "https://twitter.com/fireship-io",
        met: false,
      },
    },
    {
      create: {
        _type: "heroe",
        _key: "hero8",
        name: "Theo Browne",
        url: "https://twitter.com/theo",
        met: false,
      },
    },
  ]);
  console.log(
    "  ✅ Heroes created:",
    heroesResults.results.map((r) => r.id)
  );

  console.log("\n🎉 All Sanity content populated successfully!");
  console.log("🌐 Visit http://localhost:3000 to see your portfolio");
  console.log("🛠️  Visit http://localhost:3000/studio to manage content");
}

main().catch(console.error);
