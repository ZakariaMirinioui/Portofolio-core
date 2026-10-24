import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "dossera",
    displayName: { en: "Dossera JAMS", fr: "Dossera JAMS" },
    category: "judicial",
    platform: "Web",
    access: "private",
    status: "Production",
    statusConfirmed: true,
    visibility: "public",
    featured: true,
    summary: {
      en: "A sovereign, on-premise judicial archive management system for courts and legal institutions.",
      fr: "Un système souverain de gestion d'archives judiciaires, sur site, destiné aux tribunaux et institutions juridiques.",
    },
    overview: {
      en: [
        "Dossera JAMS digitizes judicial archives for courts, law firms, notary offices, and government institutions. It runs on-premise with full data sovereignty and zero mandatory cloud dependency.",
        "The system is deployed in production at the Court of First Instance of Khouribga, with a second deployment validated at the Court of Appeal.",
      ],
      fr: [
        "Dossera JAMS numérise les archives judiciaires pour les tribunaux, cabinets d'avocats, offices notariaux et institutions gouvernementales. Il fonctionne sur site avec pleine souveraineté des données et aucune dépendance cloud obligatoire.",
        "Le système est déployé en production au Tribunal de première instance de Khouribga, avec un second déploiement validé à la Cour d'appel.",
      ],
    },
    glance: {
      role: { en: "Technical Project Lead & Full Stack Developer", fr: "Chef de projet technique & Développeur Full Stack" },
      client: { en: "Government", fr: "Secteur public" },
      team: 3,
      duration: "6 months",
    },
    keyMetrics: [
      { label: { en: "Courts Deployed", fr: "Tribunaux équipés" }, value: { en: "2", fr: "2" }, description: { en: "Court of First Instance Khouribga & Court of Appeal", fr: "Tribunal de première instance de Khouribga & Cour d'appel" } },
      { label: { en: "Admin Time Reduction", fr: "Réduction du temps administratif" }, value: { en: "30%", fr: "30%" }, description: { en: "Judicial case processing", fr: "Traitement des dossiers judiciaires" } },
      { label: { en: "Data Sovereignty", fr: "Souveraineté des données" }, value: { en: "100%", fr: "100%" }, description: { en: "On-premise, zero cloud dependency", fr: "Sur site, zéro dépendance cloud" } },
      { label: { en: "OCR Accuracy", fr: "Précision OCR" }, value: { en: "98%+", fr: "98%+" }, description: { en: "Arabic/French multilingual", fr: "Multilingue arabe/français" } },
    ],
    myRole: {
      en: "As Technical Project Lead & Full Stack Developer, I architected and delivered the system — translating legal requirements into technical specifications and deploying a production-ready platform.",
      fr: "En tant que Chef de projet technique & Développeur Full Stack, j'ai architecturé et livré le système — traduisant les exigences légales en spécifications techniques et déployant une plateforme prête pour la production.",
    },
    capabilities: [
      {
        label: { en: "Document handling", fr: "Gestion des documents" },
        items: [
          { en: "Multilingual OCR scanning (Arabic/French) powered by Tesseract.js", fr: "Numérisation OCR multilingue (arabe/français) via Tesseract.js" },
          { en: "Hybrid semantic search (Meilisearch + pgvector)", fr: "Recherche hybride sémantique (Meilisearch + pgvector)" },
          { en: "Immutable archiving with AES-256 encryption and SHA-256 signatures", fr: "Archivage immuable avec chiffrement AES-256 et signatures SHA-256" },
        ],
      },
      {
        label: { en: "Access & audit", fr: "Accès et audit" },
        items: [
          { en: "Role-based access control (Magistrate, Clerk, Administrator, Auditor)", fr: "Contrôle d'accès basé sur les rôles (Magistrat, Greffier, Administrateur, Auditeur)" },
          { en: "Immutable timestamped audit trail of every action", fr: "Piste d'audit immuable horodatée de chaque action" },
        ],
      },
    ],
    roles: [
      { label: { en: "Magistrate / Judge", fr: "Magistrat / Juge" } },
      { label: { en: "Clerk / Registrar", fr: "Greffier / Registraire" } },
      { label: { en: "Administrator", fr: "Administrateur" } },
      { label: { en: "Auditor", fr: "Auditeur" } },
    ],
    stack: [
      { layer: { en: "Frontend", fr: "Frontend" }, items: ["React", "Node.js"] },
      { layer: { en: "Database", fr: "Base de données" }, items: ["PostgreSQL", "pgvector", "Meilisearch", "MinIO", "Redis"] },
      { layer: { en: "DevOps & Infrastructure", fr: "DevOps & Infrastructure" }, items: ["Docker", "Proxmox VE", "pfSense", "Wazuh SIEM", "Grafana", "Ansible"] },
      { layer: { en: "OCR & Search", fr: "OCR & Recherche" }, items: ["Tesseract.js"] },
    ],
    integrations: [
      { name: { en: "Tesseract.js OCR", fr: "Tesseract.js OCR" }, state: "dependency-present" },
      { name: { en: "Meilisearch", fr: "Meilisearch" }, state: "dependency-present" },
      { name: { en: "MinIO object storage", fr: "Stockage d'objets MinIO" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Verified from the existing Dossera page and home page content already on the site: production deployment at two courts, role stack, team size, duration, metrics, and tech stack. No new claims added.",
      fr: "Vérifié à partir du contenu déjà publié sur le site (page Dossera et page d'accueil) : déploiement en production dans deux tribunaux, rôle, taille de l'équipe, durée, métriques et stack technique. Aucune nouvelle réclamation ajoutée.",
    },
    architectureNotes: {
      en: "Decoupled client-server architecture with 3-tier cache (L1 LRU in-memory, L2 Redis Cluster, L3 PostgreSQL/MinIO) and 5 isolated VLANs.",
      fr: "Architecture client-serveur découplée avec cache 3 niveaux (L1 LRU en mémoire, L2 Redis Cluster, L3 PostgreSQL/MinIO) et 5 VLANs isolés.",
    },
    setup: { steps: ["Provision on-premise infrastructure (Proxmox VE, pfSense, VLANs)", "Deploy the application stack and initialize the database", "Configure OCR, search indexing, and security hardening", "Train the team and hand over with a disaster recovery plan"] },
    links: {},
    relatedSlugs: [],
    relatedExperience: ["palais-de-justice"],
    variantNote: undefined,
    assets: { logo: "/dossera-lightmode.png", hero: "/project.png" },
    unconfirmed: [],
  },
  {
    slug: "pwadc-marketplace",
    displayName: { en: "PWADC Marketplace", fr: "PWADC Marketplace" },
    category: "ecommerce",
    platform: "Web",
    access: "private",
    status: "Production",
    statusConfirmed: false,
    visibility: "public",
    featured: true,
    summary: {
      en: "Ready-made ERP and POS systems sold as boxed products or custom projects, with live demos.",
      fr: "Systèmes ERP et POS prêts à l'emploi, vendus en produits packagés ou projets sur mesure, avec démos en direct.",
    },
    overview: {
      en: "PWADC Marketplace bundles ready-made ERP and POS systems — School ERP, Legal Practice Management, Hospital Booking, and Salon & Spa — with bilingual French/Arabic listings and live demos.",
      fr: "PWADC Marketplace regroupe des systèmes ERP et POS prêts à l'emploi — School ERP, Legal Practice Management, Hospital Booking et Salon & Spa — avec annonces bilingues français/arabe et démos en direct.",
    },
    glance: {
      role: { en: "Core Member & Full Stack Developer", fr: "Membre principal & Développeur Full Stack" },
      client: { en: "SME", fr: "PME" },
      team: 4,
      duration: "Ongoing",
    },
    keyMetrics: [
      { label: { en: "Products", fr: "Produits" }, value: { en: "4", fr: "4" }, description: { en: "School ERP, Legal Practice, Hospital Booking, Salon & Spa", fr: "School ERP, Gestion juridique, Réservation hôpital, Salon & Spa" } },
      { label: { en: "Clients", fr: "Clients" }, value: { en: "10+", fr: "10+" }, description: { en: "Across Morocco", fr: "À travers le Maroc" } },
      { label: { en: "Deployment", fr: "Déploiement" }, value: { en: "Surge/Static", fr: "Surge/Statique" }, description: { en: "Static export, zero server cost", fr: "Export statique, coût serveur nul" } },
    ],
    myRole: {
      en: "Core member of PWADCteam, building ERP, POS and restaurant/B2B systems, ready-made or custom, via pwadcteam.com.",
      fr: "Membre clé de PWADCteam, construisant des systèmes ERP, POS et de restauration/B2B, prêts à l'emploi ou sur mesure, via pwadcteam.com.",
    },
    capabilities: [
      {
        label: { en: "Products", fr: "Produits" },
        items: [
          { en: "School ERP", fr: "School ERP" },
          { en: "Legal Practice Management", fr: "Gestion de cabinet juridique" },
          { en: "Hospital Booking", fr: "Réservation hospitalière" },
          { en: "Salon & Spa", fr: "Salon & Spa" },
        ],
      },
    ],
    roles: [
      { label: { en: "Business owner", fr: "Propriétaire d'entreprise" } },
      { label: { en: "Staff", fr: "Personnel" } },
    ],
    stack: [
      { layer: { en: "Full stack", fr: "Full stack" }, items: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "n8n"] },
    ],
    integrations: [
      { name: { en: "n8n", fr: "n8n" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Owner-provided from the existing site content. Production status is owner-provided and not independently confirmed.",
      fr: "Contenu propriétaire provenant du contenu existant du site. Le statut Production est fourni par le propriétaire et non confirmé indépendamment.",
    },
    setup: undefined,
    links: { live: "https://pwadcteam.com" },
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/logos/PwadcTeamStore-logo.webp", hero: "/project.png" },
    unconfirmed: ["status"],
  },
  {
    slug: "clinicflow",
    displayName: { en: "ClinicFlow", fr: "ClinicFlow" },
    category: "healthcare",
    platform: "Web",
    access: "private",
    status: "Production",
    statusConfirmed: false,
    visibility: "public",
    summary: {
      en: "Clinic and doctor-practice management platform with appointments, patients, visits, prescriptions, and pharmacy inventory.",
      fr: "Plateforme de gestion de clinique et de cabinet médical : rendez-vous, patients, visites, prescriptions et stock de pharmacie.",
    },
    overview: {
      en: "ClinicFlow provides public clinic information and appointment requests, with dedicated administrator, doctor, and patient areas. It covers appointments, patients, visits, prescriptions, appointment and payment tracking, and pharmacy inventory, plus API routes for integrations.",
      fr: "ClinicFlow propose des informations publiques sur la clinique et des demandes de rendez-vous, avec des espaces dédiés administrateur, médecin et patient. Il couvre les rendez-vous, les patients, les visites, les prescriptions, le suivi des rendez-vous et des paiements, le stock de pharmacie, ainsi que des routes d'API pour les intégrations.",
    },
    glance: {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      client: { en: "Healthcare", fr: "Santé" },
      team: 1,
      duration: "3 months",
    },
    keyMetrics: [],
    myRole: {
      en: "Full Stack Developer on the clinic management platform.",
      fr: "Développeur Full Stack sur la plateforme de gestion de clinique.",
    },
    capabilities: [
      {
        label: { en: "Clinic operations", fr: "Opérations de la clinique" },
        items: [
          { en: "Public clinic information and appointment requests", fr: "Informations publiques sur la clinique et demandes de rendez-vous" },
          { en: "Administrator, doctor, and patient areas", fr: "Espaces administrateur, médecin et patient" },
          { en: "Appointments, patients, visits, and prescriptions", fr: "Rendez-vous, patients, visites et prescriptions" },
          { en: "Appointment and payment tracking; pharmacy inventory", fr: "Suivi des rendez-vous et des paiements ; stock de pharmacie" },
        ],
      },
    ],
    roles: [
      { label: { en: "Administrator", fr: "Administrateur" } },
      { label: { en: "Doctor", fr: "Médecin" } },
      { label: { en: "Patient", fr: "Patient" } },
    ],
    stack: [
      { layer: { en: "Backend", fr: "Backend" }, items: ["PHP 8.1+", "Laravel 10", "Sanctum"] },
      { layer: { en: "Frontend", fr: "Frontend" }, items: ["Blade", "Livewire", "JavaScript", "Sass", "Laravel Mix 6"] },
      { layer: { en: "Data", fr: "Données" }, items: ["PostgreSQL", "Spatie permission and media-library", "PDF and spreadsheet tooling"] },
    ],
    integrations: [
      { name: { en: "Sanctum API auth", fr: "Authentification API Sanctum" }, state: "dependency-present" },
      { name: { en: "Calendar and consultation integrations", fr: "Intégrations calendrier et consultation" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Mapped to clinic & doctor practice management fact sheet — proposed mapping, not yet confirmed. Stack and capabilities reflect the fact sheet. Payment, Google Calendar, and Zoom workflows need external configuration.",
      fr: "Mappé sur la fiche de gestion clinique & cabinet médical — cartographie proposée, non encore confirmée. Le stack et les capacités reflètent la fiche. Les workflows de paiement, Google Calendar et Zoom nécessitent une configuration externe.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/logos/clinic-logo.webp", hero: "/project.png" },
    unconfirmed: ["mapping", "status"],
  },
  {
    slug: "edumanage",
    displayName: { en: "EduManage", fr: "EduManage" },
    category: "education",
    platform: "Web",
    access: "private",
    status: "Production",
    statusConfirmed: false,
    visibility: "public",
    summary: {
      en: "School and education management covering students, parents, staff, admissions, classes, timetables, exams, fees, and more.",
      fr: "Gestion scolaire et éducative couvrant élèves, parents, personnel, admissions, classes, emplois du temps, examens, frais de scolarité, et bien plus.",
    },
    overview: {
      en: "EduManage handles student, parent, staff, admission, academic-year, class, section, subject, and classroom records; teacher and subject assignment, promotions, documents, ID cards, certificates; timetables, attendance, homework, lesson plans, study materials, exams, marks, results; fees, discounts, payments, invoices, dues, accounts, income, expenses, bank accounts; leave and payroll; library, inventory, transport, dormitories; notices, events, public school pages; student and parent panels; roles and permissions, localization, themes, system settings.",
      fr: "EduManage gère les dossiers d'élèves, de parents, de personnel, d'admission, d'année scolaire, de classe, de section, de matière et de salle ; l'attribution des enseignants et des matières, les promotions, les documents, les cartes d'identité, les certificats ; les emplois du temps, l'assiduité, les devoirs, les plans de cours, les supports d'étude, les examens, les notes, les résultats ; les frais, les rabais, les paiements, les factures, les dettes, les comptes, les revenus, les dépenses, les comptes bancaires ; les congés et la paie ; la bibliothèque, l'inventaire, le transport, les internats ; les avis, les événements et les pages publiques de l'école ; les panneaux élèves et parents ; les rôles et permissions, la localisation, les thèmes, les paramètres système.",
    },
    glance: {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      client: { en: "Education", fr: "Éducation" },
      team: 1,
      duration: "2 months",
    },
    keyMetrics: [],
    myRole: {
      en: "Full Stack Developer on the school management system.",
      fr: "Développeur Full Stack sur le système de gestion scolaire.",
    },
    capabilities: [
      {
        label: { en: "Academic management", fr: "Gestion académique" },
        items: [
          { en: "Student, parent, staff, admission, class, section, subject, and classroom records", fr: "Dossiers d'élèves, parents, personnel, admission, classe, section, matière et salle" },
          { en: "Timetables, attendance, homework, exams, marks, and results", fr: "Emplois du temps, assiduité, devoirs, examens, notes et résultats" },
          { en: "Fees, payments, invoices, accounts, income, and expenses", fr: "Frais, paiements, factures, comptes, revenus et dépenses" },
        ],
      },
    ],
    roles: [
      { label: { en: "Student", fr: "Élève" } },
      { label: { en: "Parent", fr: "Parent" } },
      { label: { en: "Staff", fr: "Personnel" } },
      { label: { en: "Teacher", fr: "Enseignant" } },
    ],
    stack: [
      { layer: { en: "Backend", fr: "Backend" }, items: ["PHP 8.2+", "Laravel 12"] },
      { layer: { en: "Frontend", fr: "Frontend" }, items: ["Blade", "Bootstrap 4", "Vue 2", "Sass", "Laravel Mix/Webpack"] },
      { layer: { en: "Data", fr: "Données" }, items: ["MySQL (default)", "SQLite", "PostgreSQL", "SQL Server"] },
    ],
    integrations: [
      { name: { en: "nwidart/laravel-modules", fr: "nwidart/laravel-modules" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Mapped to school management fact sheet — proposed mapping, not yet confirmed. The project's own composer test runs Pint and Rector checks, not PHPUnit; no test coverage claimed. Enabled modules may differ at runtime.",
      fr: "Mappé sur la fiche de gestion scolaire — cartographie proposée, non encore confirmée. Le test composer du projet exécute Pint et Rector, pas PHPUnit ; aucune couverture de tests n'est revendiquée. Les modules activés peuvent différer à l'exécution.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/logos/school-logo.webp", hero: "/project.png" },
    unconfirmed: ["mapping", "status"],
  },
  {
    slug: "legalflow",
    displayName: { en: "LegalFlow", fr: "LegalFlow" },
    category: "professional-services",
    platform: "Web",
    access: "private",
    status: "Production",
    statusConfirmed: false,
    visibility: "public",
    summary: {
      en: "Legal-practice and law-firm management with clients, cases, hearings, documents, time tracking, billing, and SaaS plans.",
      fr: "Gestion de cabinet juridique et d'étude d'avocat : clients, dossiers, audiences, documents, suivi du temps, facturation et abonnements SaaS.",
    },
    overview: {
      en: "LegalFlow manages clients, cases, hearings, and case documents; legal research, compliance activities, and tasks; time tracking and billing; firm members, teams, and admin data; and SaaS plans, subscriptions, and payments.",
      fr: "LegalFlow gère les clients, les dossiers, les audiences et les documents de dossier ; la recherche juridique, les activités de conformité et les tâches ; le suivi du temps et la facturation ; les membres, équipes et données administratives du cabinet ; ainsi que les abonnements, souscriptions et paiements SaaS.",
    },
    glance: {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      client: { en: "Legal", fr: "Juridique" },
      team: 1,
      duration: "3 months",
    },
    keyMetrics: [],
    myRole: {
      en: "Full Stack Developer on the legal practice management platform.",
      fr: "Développeur Full Stack sur la plateforme de gestion de cabinet juridique.",
    },
    capabilities: [
      {
        label: { en: "Practice management", fr: "Gestion de cabinet" },
        items: [
          { en: "Clients, cases, hearings, and case documents", fr: "Clients, dossiers, audiences et documents de dossier" },
          { en: "Time tracking and billing", fr: "Suivi du temps et facturation" },
          { en: "SaaS plans, subscriptions, and payments", fr: "Abonnements, souscriptions et paiements SaaS" },
        ],
      },
    ],
    roles: [
      { label: { en: "Lawyer", fr: "Avocat" } },
      { label: { en: "Client", fr: "Client" } },
      { label: { en: "Administrator", fr: "Administrateur" } },
    ],
    stack: [
      { layer: { en: "Backend", fr: "Backend" }, items: ["PHP 8.2+", "Laravel 12"] },
      { layer: { en: "Frontend", fr: "Frontend" }, items: ["React 19", "TypeScript", "Inertia 2", "Tailwind CSS 4", "Vite 6"] },
      { layer: { en: "Data", fr: "Données" }, items: ["Spatie permission and media-library packages"] },
    ],
    integrations: [
      { name: { en: "Multiple payment integrations", fr: "Plusieurs intégrations de paiement" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Mapped to Advocate SaaS (avocat) fact sheet — high confidence mapping. Payment and external integrations need provider credentials.",
      fr: "Mappé sur la fiche Advocate SaaS (avocat) — cartographie à haute confiance. Les paiements et intégrations externes nécessitent des identifiants de prestataire.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/logos/advocate-logo.webp", hero: "/project.png" },
    unconfirmed: ["status"],
  },
  {
    slug: "stylebook",
    displayName: { en: "StyleBook", fr: "StyleBook" },
    category: "wellness",
    platform: "Web",
    access: "private",
    status: "Production",
    statusConfirmed: false,
    visibility: "public",
    summary: {
      en: "Salon discovery and appointment booking for customers, with role-specific areas for salons, vendors, managers, and administrators.",
      fr: "Découverte de salons et prise de rendez-vous pour les clients, avec des espaces spécifiques aux rôles pour salons, vendeurs, responsables et administrateurs.",
    },
    overview: {
      en: "StyleBook lets customers browse salons, services, and staff, register and manage accounts, and request and manage appointments. Salons and services are administered in role-specific areas. It supports payment-related workflows, a versioned API, authentication, and account management.",
      fr: "StyleBook permet aux clients de parcourir les salons, les services et le personnel, de créer et gérer un compte, et de demander et gérer des rendez-vous. Les salons et les services sont administrés dans des espaces réservés aux rôles. Il prend en charge les workflows de paiement, une API versionée, l'authentification et la gestion de compte.",
    },
    glance: {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      client: { en: "Wellness", fr: "Bien-être" },
      team: 1,
      duration: "2 months",
    },
    keyMetrics: [],
    myRole: {
      en: "Full Stack Developer on the salon and spa management system.",
      fr: "Développeur Full Stack sur le système de gestion de salon et spa.",
    },
    capabilities: [
      {
        label: { en: "Customer workflows", fr: "Workflows client" },
        items: [
          { en: "Browse salons, services, and staff", fr: "Parcourir les salons, services et personnel" },
          { en: "Customer registration and account management", fr: "Inscription client et gestion de compte" },
          { en: "Request and manage salon appointments", fr: "Demander et gérer des rendez-vous en salon" },
        ],
      },
      {
        label: { en: "Salon administration", fr: "Administration salon" },
        items: [
          { en: "Salon and service administration in role-specific areas", fr: "Administration des salons et services dans des espaces réservés aux rôles" },
          { en: "Payment-related workflows", fr: "Workflows liés au paiement" },
          { en: "Authentication and account management", fr: "Authentification et gestion de compte" },
        ],
      },
    ],
    roles: [
      { label: { en: "Customer", fr: "Client" } },
      { label: { en: "Salon / vendor", fr: "Salon / vendeur" } },
      { label: { en: "Manager", fr: "Responsable" } },
      { label: { en: "Administrator", fr: "Administrateur" } },
    ],
    stack: [
      { layer: { en: "Backend", fr: "Backend" }, items: ["PHP 8.1+", "Laravel 10", "Laravel Passport"] },
      { layer: { en: "Frontend", fr: "Frontend" }, items: ["Blade", "Bootstrap 5", "Sass", "Vite 3"] },
      { layer: { en: "Data", fr: "Données" }, items: ["MySQL", "Excel/PDF tooling"] },
    ],
    integrations: [
      { name: { en: "Payment-provider SDKs", fr: "SDKs de prestataires de paiement" }, state: "dependency-present" },
      { name: { en: "Google 2FA", fr: "Google 2FA" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Mapped to salon discovery & booking fact sheet — medium confidence mapping. Payment and realtime features depend on provider configuration.",
      fr: "Mappé sur la fiche de réservation salon & spa — cartographie à confiance moyenne. Les fonctionnalités de paiement et temps réel dépendent de la configuration du prestataire.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/logos/salon-logo.png", hero: "/project.png" },
    unconfirmed: ["mapping", "status"],
  },
  {
    slug: "kombatsushi",
    displayName: { en: "KombatSushi", fr: "KombatSushi" },
    category: "professional-services",
    platform: "Cross-platform",
    access: "live",
    status: "Live",
    statusConfirmed: true,
    visibility: "public",
    context: { en: "Freelance mission", fr: "Mission freelance" },
    summary: {
      en: "Customer ordering apps for a sushi restaurant: menu, cart, delivery and takeaway, checkout, order tracking, and payment.",
      fr: "Applications de commande client pour un restaurant de sushi : menu, panier, livraison et vente à emporter, paiement, suivi des commandes.",
    },
    overview: {
      en: "KombatSushi is a set of customer-facing ordering apps for a sushi restaurant. Customers browse the menu, manage a cart, place delivery and takeaway orders, check out with delivery addresses, view order history, and track orders. Payment flows include WebView-based payment, and the apps support localization. The Flutter variant is built with Flutter, Dart, GetX, an HTTP service layer, GetStorage, Google Maps, geolocation, and WebView. An older React Native variant (Expo SDK 55, TypeScript, Expo Router) covers products, cart, checkout, order history, favorites, profile, saved addresses, and account settings, backed by WooCommerce/WordPress with JWT authentication.",
      fr: "KombatSushi est un ensemble d'applications de commande destinées aux clients d'un restaurant de sushi. Les clients parcourent le menu, gèrent un panier, passent des commandes de livraison et à emporter, paient avec adresses de livraison, consultent l'historique des commandes et suivent les commandes. Les flux de paiement incluent un paiement via WebView, et les applications prennent en charge la localisation. La variante Flutter est construite avec Flutter, Dart, GetX, une couche de service HTTP, GetStorage, Google Maps, la géolocalisation et WebView. Une variante React Native plus ancienne (Expo SDK 55, TypeScript, Expo Router) couvre les produits, le panier, le paiement, l'historique des commandes, les favoris, le profil, les adresses enregistrées et les paramètres du compte, avec un backend WooCommerce/WordPress et une authentification JWT.",
    },
    glance: {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      client: { en: "Restaurant", fr: "Restaurant" },
      team: 1,
      duration: "2 months",
    },
    keyMetrics: [],
    myRole: {
      en: "Built and delivered the customer ordering apps (Flutter and React Native variants) as a freelance mission, including checkout, order tracking, and payment flows.",
      fr: "Conçu et livré les applications de commande client (variantes Flutter et React Native) dans le cadre d'une mission freelance, incluant le paiement, le suivi des commandes et les flux de paiement.",
    },
    capabilities: [
      {
        label: { en: "Ordering", fr: "Commande" },
        items: [
          { en: "Browse menu and manage cart", fr: "Parcourir le menu et gérer le panier" },
          { en: "Delivery and takeaway ordering", fr: "Commande en livraison et à emporter" },
          { en: "Checkout and delivery addresses", fr: "Paiement et adresses de livraison" },
          { en: "Order history and tracking", fr: "Historique et suivi des commandes" },
        ],
      },
      {
        label: { en: "Payments & localization", fr: "Paiements et localisation" },
        items: [
          { en: "WebView-based payment flows", fr: "Flux de paiement basés sur WebView" },
          { en: "Localization", fr: "Localisation" },
          { en: "Firebase notifications (optional or placeholder setup)", fr: "Notifications Firebase (configuration optionnelle ou placeholder)" },
        ],
      },
    ],
    roles: [
      { label: { en: "Customer", fr: "Client" } },
    ],
    stack: [
      { layer: { en: "Mobile", fr: "Mobile" }, items: ["Flutter", "Dart", "GetX", "HTTP", "GetStorage", "Google Maps", "WebView"] },
      { layer: { en: "Mobile (legacy)", fr: "Mobile (legacy)" }, items: ["React Native", "Expo SDK 55", "TypeScript", "Expo Router"] },
    ],
    integrations: [
      { name: { en: "WooCommerce/WordPress backend (legacy app)", fr: "Backend WooCommerce/WordPress (application héritée)" }, state: "dependency-present" },
      { name: { en: "Firebase notifications", fr: "Notifications Firebase" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Built from the Kombat Sushi customer apps fact sheet. The older React Native app is not confirmed replaced by the Flutter apps. Build logs in one folder are historical, not proof of a passing build. No POS or kitchen-display functionality is documented (see Conflict 3).",
      fr: "Construit à partir de la fiche Kombat Sushi customer apps. L'application React Native plus ancienne n'est pas confirmée comme remplacée par les applications Flutter. Les journaux de build dans un dossier sont historiques, ce n'est pas une preuve d'un build réussi. Aucune fonctionnalité POS ou d'affichage de cuisine n'est documentée (voir Conflit 3).",
    },
    setup: undefined,
    links: { live: "https://kombatsushi.com/" },
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: { en: "Two Flutter variants (different package IDs; neither confirmed canonical) plus one older React Native app. The live link is for the KombatSushi customer apps.", fr: "Deux variantes Flutter (différents IDs de package ; aucune confirmée comme canonique) plus une ancienne application React Native. Le lien en direct concerne les applications client KombatSushi." },
    assets: { logo: "/logos/kombatsushi-logo.jpg", hero: "/project.png" },
    unconfirmed: ["mapping"],
  },
  {
    slug: "secudrive",
    displayName: { en: "SECUDRIVE", fr: "SECUDRIVE" },
    category: "enterprise",
    platform: "Web",
    access: "private",
    status: "Production",
    statusConfirmed: false,
    visibility: "public",
    summary: {
      en: "Secure logistics tracking for cash-in-transit operations.",
      fr: "Suivi logistique sécurisé pour les opérations de transport de fonds.",
    },
    overview: {
      en: "SECUDRIVE is a secure logistics tracking system for cash-in-transit operations. Built with React, Spring Boot, and PostgreSQL, exposing REST and GraphQL APIs.",
      fr: "SECUDRIVE est un système de suivi logistique sécurisé pour les opérations de transport de fonds. Construit avec React, Spring Boot et PostgreSQL, exposant des API REST et GraphQL.",
    },
    glance: {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      client: { en: "Logistics & Security", fr: "Logistique & Sécurité" },
      team: 2,
      duration: "3 months",
    },
    keyMetrics: [
      { label: { en: "Latency Reduction", fr: "Réduction de latence" }, value: { en: "Optimized", fr: "Optimisé" }, description: { en: "SQL query refactoring", fr: "Refactorisation de requêtes SQL" } },
    ],
    myRole: {
      en: "Full Stack Developer on the secure logistics tracking system for cash-in-transit operations.",
      fr: "Développeur Full Stack sur le système de suivi logistique sécurisé pour les opérations de transport de fonds.",
    },
    capabilities: [
      {
        label: { en: "Logistics tracking", fr: "Suivi logistique" },
        items: [
          { en: "Secure tracking for cash-in-transit operations", fr: "Suivi sécurisé pour les opérations de transport de fonds" },
        ],
      },
    ],
    roles: [],
    stack: [
      { layer: { en: "Frontend", fr: "Frontend" }, items: ["React"] },
      { layer: { en: "Backend", fr: "Backend" }, items: ["Spring Boot", "REST API", "GraphQL"] },
      { layer: { en: "Data", fr: "Données" }, items: ["PostgreSQL"] },
    ],
    integrations: [],
    evidenceNotes: {
      en: "Built only from the existing SECUDRIVE page and card content. No modules, screens, user roles, integrations, or numbers beyond what is shown. Status 'Production' is owner-provided and flagged (Conflict 4).",
      fr: "Construit uniquement à partir du contenu existant de la page et de la carte SECUDRIVE. Aucun module, écran, rôle utilisateur, intégration ou chiffre au-delà de ce qui est affiché. Le statut 'Production' est fourni par le propriétaire et signalé (Conflit 4).",
    },
    setup: undefined,
    links: {},
    relatedSlugs: ["secudrive-mobile"],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/logos/secudrive-logo.png", hero: "/project.png" },
    unconfirmed: ["status"],
  },
  {
    slug: "secudrive-mobile",
    displayName: { en: "SECUDRIVE Mobile", fr: "SECUDRIVE Mobile" },
    category: "enterprise",
    platform: "Cross-platform",
    access: "private",
    status: "Built",
    statusConfirmed: false,
    visibility: "public",
    context: { en: "Freelance mission", fr: "Mission freelance" },
    summary: {
      en: "Rider and driver app with separate workflows for ride requests, earnings, payments, and safety-related screens.",
      fr: "Application pour conducteurs et chauffeurs avec des flux séparés pour les demandes de course, les gains, les paiements et les écrans liés à la sécurité.",
    },
    overview: {
      en: "SECUDRIVE Mobile is a Flutter rider and driver app with separate registration, login, ride requests, history, driver profiles and earnings, payments and saved places, and safety-related screens. It uses Supabase and map/location services. Layered into application, core, domain, infrastructure, and presentation.",
      fr: "SECUDRIVE Mobile est une application Flutter pour conducteurs et chauffeurs avec inscription, connexion, demandes de courses, historique, profils et gains des chauffeurs, paiements et lieux enregistrés, et écrans liés à la sécurité. Elle utilise Supabase et des services de cartographie et de géolocalisation. Structurée en couches application, cœur, domaine, infrastructure et présentation.",
    },
    glance: undefined,
    keyMetrics: [],
    myRole: {
      en: "Built the Flutter rider and driver app as a freelance mission.",
      fr: "Construit l'application Flutter pour conducteurs et chauffeurs dans le cadre d'une mission freelance.",
    },
    capabilities: [
      {
        label: { en: "Rider workflows", fr: "Flux client" },
        items: [
          { en: "Registration and login", fr: "Inscription et connexion" },
          { en: "Ride requests and history", fr: "Demandes de courses et historique" },
          { en: "Payments and saved places", fr: "Paiements et lieux enregistrés" },
        ],
      },
      {
        label: { en: "Driver workflows", fr: "Flux chauffeur" },
        items: [
          { en: "Registration and login", fr: "Inscription et connexion" },
          { en: "Driver profiles and earnings", fr: "Profils et gains du chauffeur" },
          { en: "Safety-related screens", fr: "Écrans liés à la sécurité" },
        ],
      },
    ],
    roles: [
      { label: { en: "Rider", fr: "Client" } },
      { label: { en: "Driver", fr: "Chauffeur" } },
    ],
    stack: [
      { layer: { en: "Mobile", fr: "Mobile" }, items: ["Flutter", "Dart", "GetX", "Supabase", "Maps", "Geolocation"] },
    ],
    integrations: [
      { name: { en: "Supabase", fr: "Supabase" }, state: "dependency-present" },
      { name: { en: "Maps and geolocation", fr: "Cartes et géolocalisation" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Built from the SECUDRIVE Mobile fact sheet (Mobile Dev/SECUDRIVE). Platform folders for Android, iOS, web, Windows, Linux, macOS exist but none are confirmed built. Treat SECUDRIVE Mobile and SECUDRIVE as separate entries unless confirmed otherwise.",
      fr: "Construit à partir de la fiche SECUDRIVE Mobile (Mobile Dev/SECUDRIVE). Les dossiers de plateforme pour Android, iOS, web, Windows, Linux et macOS existent mais aucun n'est confirmé comme construit. Traiter SECUDRIVE Mobile et SECUDRIVE comme des entrées distinctes, sauf confirmation contraire.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: ["secudrive"],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/logos/secudrive-logo.png", hero: "/project.png" },
    unconfirmed: ["mapping"],
  },
  {
    slug: "autodeal",
    displayName: { en: "AutoDeal", fr: "AutoDeal" },
    category: "ecommerce",
    platform: "Android",
    access: "private",
    status: "Built",
    statusConfirmed: false,
    visibility: "public",
    context: { en: "Final-year project (PFE)", fr: "Projet de fin d'études (PFE)" },
    summary: {
      en: "An Android car marketplace app for selling, renting, and buying cars.",
      fr: "Une application Android de marché automobile pour vendre, louer et acheter des voitures.",
    },
    overview: {
      en: "AutoDeal is a car marketplace for selling, renting, and buying cars. Users can browse, search, and view offers; create and edit offers; sign in and register; manage account, profile, and settings; bookmark offers; message buyers and sellers; receive notifications; and access contact and about screens. Data, storage, and realtime are backed by Supabase. It is my final-year project (PFE).",
      fr: "AutoDeal est un marché automobile pour vendre, louer et acheter des voitures. Les utilisateurs peuvent parcourir, rechercher et consulter des offres ; créer et modifier des offres ; se connecter et s'inscrire ; gérer le compte, le profil et les paramètres ; ajouter des offres aux favoris ; échanger des messages avec acheteurs et vendeurs ; recevoir des notifications ; et accéder aux écrans contact et à propos. Les données, le stockage et le temps réel sont appuyés par Supabase. C'est mon projet de fin d'études (PFE).",
    },
    glance: undefined,
    keyMetrics: [],
    myRole: {
      en: "AutoDeal is my final-year project (PFE): an Android car marketplace for selling, renting, and buying cars.",
      fr: "AutoDeal est mon projet de fin d'études (PFE) : une application Android de marché automobile pour vendre, louer et acheter des voitures.",
    },
    capabilities: [
      {
        label: { en: "Buying, renting, selling", fr: "Achat, location, vente" },
        items: [
          { en: "Browse, search, and view offers", fr: "Parcourir, rechercher et consulter les offres" },
          { en: "Create and edit an offer", fr: "Créer et modifier une offre" },
          { en: "Bookmark offers", fr: "Ajouter des offres aux favoris" },
          { en: "Buyer-seller conversations and messages", fr: "Conversations et messages acheteur-vendeur" },
        ],
      },
      {
        label: { en: "Account & settings", fr: "Compte et réglages" },
        items: [
          { en: "Sign in and register", fr: "Connexion et inscription" },
          { en: "Account, profile, and settings", fr: "Compte, profil et paramètres" },
          { en: "Notifications", fr: "Notifications" },
          { en: "Contact and about screens", fr: "Écrans contact et à propos" },
        ],
      },
    ],
    roles: [
      { label: { en: "Car buyer", fr: "Acheteur de voiture" } },
      { label: { en: "Car seller", fr: "Vendeur de voiture" } },
    ],
    stack: [
      { layer: { en: "Mobile", fr: "Mobile" }, items: ["Kotlin 2.0", "Android SDK 35", "Jetpack Compose", "Material 3"] },
      { layer: { en: "Data & Realtime", fr: "Données & Temps réel" }, items: ["Supabase PostgREST", "Supabase Realtime", "Supabase Storage", "DataStore"] },
      { layer: { en: "Networking & Media", fr: "Réseau & Média" }, items: ["Ktor with OkHttp", "Coil", "Navigation Compose"] },
    ],
    integrations: [
      { name: { en: "Supabase (data, storage, realtime)", fr: "Supabase (données, stockage, temps réel)" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Built from the AutoDeal fact sheet. Owner-provided: car marketplace for selling, renting, and buying cars; final-year project (PFE). Car-specific features verified against the source where reachable; otherwise feature wording is generic and flagged as owner-provided. Needs a Supabase URL/key and compatible backend; visible tests are a sample instrumentation test only.",
      fr: "Construit à partir de la fiche AutoDeal. Fourni par le propriétaire : marché automobile pour vendre, louer et acheter des voitures ; projet de fin d'études (PFE). Les fonctionnalités spécifiques aux voitures sont vérifiées par rapport à la source lorsque accessible ; sinon le libellé des fonctionnalités est générique et signalé comme fourni par le propriétaire. Nécessite une URL/clé Supabase et un backend compatible ; les tests visibles sont un test d'instrumentation d'exemple seulement.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/project.png", hero: "/project.png" },
    unconfirmed: ["mapping", "car-specific features"],
  },
  {
    slug: "courier-go",
    displayName: { en: "CourierGo", fr: "CourierGo" },
    category: "enterprise",
    platform: "Cross-platform",
    access: "private",
    status: "Built",
    statusConfirmed: false,
    visibility: "public",
    context: { en: "Freelance mission", fr: "Mission freelance" },
    summary: {
      en: "A Flutter delivery-worker companion app: worker authentication and profile, home/dashboard, delivery history, and location/map support.",
      fr: "Une application compagnon Flutter pour livreurs : authentification et profil du travailleur, écran d'accueil/tableau de bord, historique des livraisons et support de carte/localisation.",
    },
    overview: {
      en: "CourierGo is a Flutter delivery-worker companion app (not a customer storefront). It provides worker authentication and profile, home/dashboard, delivery history, and location and map support. Built with Flutter, Dart, GetX, GetStorage, HTTP, SQLite, and maps/location packages. Code is split into data, modules, and routes. Android and iOS projects exist. No setup guide; Firebase appears not yet configured, so notifications and backend readiness are not claimed.",
      fr: "CourierGo est une application compagnon Flutter pour livreurs (pas une vitrine client). Elle fournit l'authentification et le profil du travailleur, l'accueil/le tableau de bord, l'historique des livraisons et le support de carte/localisation. Construite avec Flutter, Dart, GetX, GetStorage, HTTP, SQLite et les packages de carte/localisation. Le code est divisé en données, modules et routes. Les projets Android et iOS existent. Aucun guide de configuration ; Firebase ne semble pas encore configuré, donc les notifications et la préparation du backend ne sont pas revendiquées.",
    },
    glance: undefined,
    keyMetrics: [],
    myRole: {
      en: "Built the Flutter delivery-worker companion app as a freelance mission.",
      fr: "Construit l'application compagnon Flutter pour livreurs dans le cadre d'une mission freelance.",
    },
    capabilities: [
      {
        label: { en: "Delivery worker", fr: "Livreur" },
        items: [
          { en: "Worker authentication and profile", fr: "Authentification et profil du livreur" },
          { en: "Home/dashboard", fr: "Accueil / tableau de bord" },
          { en: "Delivery history", fr: "Historique des livraisons" },
          { en: "Location and map support", fr: "Support de localisation et carte" },
        ],
      },
    ],
    roles: [
      { label: { en: "Delivery worker", fr: "Livreur" } },
    ],
    stack: [
      { layer: { en: "Mobile", fr: "Mobile" }, items: ["Flutter", "Dart", "GetX", "GetStorage", "HTTP", "SQLite", "Maps / location", "WebView"] },
    ],
    integrations: [
      { name: { en: "Maps / location", fr: "Cartes / localisation" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Built from the CourierGo delivery-worker fact sheet. No setup guide; Firebase appears not yet configured. No claims of notifications or backend readiness.",
      fr: "Construit à partir de la fiche de l'application livreur CourierGo. Aucun guide de configuration ; Firebase ne semble pas encore configuré. Aucune réclamation concernant les notifications ou la préparation du backend.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/project.png", hero: "/project.png" },
    unconfirmed: ["mapping"],
  },
  {
    slug: "ride-link",
    displayName: { en: "RideLink", fr: "RideLink" },
    category: "enterprise",
    platform: "Cross-platform",
    access: "private",
    status: "Built",
    statusConfirmed: false,
    visibility: "public",
    context: { en: "Freelance mission", fr: "Mission freelance" },
    summary: {
      en: "A Flutter ride-sharing and parcel customer app: ride and trip requests, parcel workflows, maps, payments, wallet, profile, and notifications.",
      fr: "Une application cliente Flutter de covoiturage et de colis : demandes de trajet et de course, flux de colis, cartes, paiements, portefeuille, profil et notifications.",
    },
    overview: {
      en: "RideLink is a Flutter ride-sharing and parcel customer app. It supports ride and trip requests and history, parcel workflows, maps, geolocation, and saved addresses, plus payment and wallet screens, profile, and notifications. Built with Flutter, Dart, GetX, Firebase Core and Messaging, Google Maps, and geolocation. Platform folders for Android, iOS, web, Windows, Linux, macOS exist; none are confirmed built.",
      fr: "RideLink est une application cliente Flutter de covoiturage et de colis. Elle prend en charge les demandes et l'historique de trajets et de courses, les flux de colis, les cartes, la géolocalisation et les adresses enregistrées, ainsi que les écrans de paiement et de portefeuille, le profil et les notifications. Construite avec Flutter, Dart, GetX, Firebase Core et Messaging, Google Maps et la géolocalisation. Des dossiers de plateforme pour Android, iOS, web, Windows, Linux et macOS existent ; aucun n'est confirmé comme construit.",
    },
    glance: undefined,
    keyMetrics: [],
    myRole: {
      en: "Built the Flutter ride-sharing and parcel customer app as a freelance mission.",
      fr: "Construit l'application cliente Flutter de covoiturage et de colis dans le cadre d'une mission freelance.",
    },
    capabilities: [
      {
        label: { en: "Rides & parcels", fr: "Trajets et colis" },
        items: [
          { en: "Ride and trip requests and history", fr: "Demandes de trajet et d'historique" },
          { en: "Parcel workflows", fr: "Flux de colis" },
          { en: "Maps, geolocation, and saved addresses", fr: "Cartes, géolocalisation et adresses enregistrées" },
        ],
      },
      {
        label: { en: "Payments & profile", fr: "Paiements et profil" },
        items: [
          { en: "Payment and wallet screens", fr: "Écrans de paiement et de portefeuille" },
          { en: "Profile and notifications", fr: "Profil et notifications" },
        ],
      },
    ],
    roles: [
      { label: { en: "Customer", fr: "Client" } },
    ],
    stack: [
      { layer: { en: "Mobile", fr: "Mobile" }, items: ["Flutter", "Dart", "GetX", "Firebase Core", "Firebase Messaging", "Google Maps", "Geolocation"] },
    ],
    integrations: [
      { name: { en: "Firebase Core and Messaging", fr: "Firebase Core et Messaging" }, state: "dependency-present" },
      { name: { en: "Google Maps", fr: "Google Maps" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Built from the RideLink ride-sharing & parcel fact sheet. The folder label 'release-3.2' is not proof of a release. Platform folders exist but none confirmed built.",
      fr: "Construit à partir de la fiche de l'application de covoiturage et colis RideLink. L'étiquette de dossier 'release-3.2' n'est pas une preuve de publication. Les dossiers de plateforme existent mais aucun n'est confirmé comme construit.",
    },
    setup: undefined,
    links: {},
    relatedSlugs: [],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/project.png", hero: "/project.png" },
    unconfirmed: ["mapping"],
  },
  {
    slug: "bluevision",
    displayName: { en: "BlueVision", fr: "BlueVision" },
    category: "enterprise",
    platform: "Web",
    access: "repo",
    status: "Built",
    statusConfirmed: false,
    visibility: "public",
    context: { en: "Final-year internship project (SFE)", fr: "Projet de stage de fin d'études (SFE)" },
    summary: {
      en: "A web platform for managing digital signage displays, built on top of the Xibo CMS.",
      fr: "Une plateforme web de gestion d'affichage numérique, construite au-dessus du CMS Xibo.",
    },
    overview: {
      en: "BlueVision is a management interface and workflow layer for digital signage displays. It provides dashboard analytics and KPIs, display health monitoring with grouping and multi-location organization, a drag-and-drop layout builder with templates and live preview, a media library for images/videos/documents, time-based and bulk scheduling with conflict detection, role-based access control with audit trail, and an in-app assistant named Brinky. Light and dark themes with system detection and saved preference. It integrates with Xibo CMS through a service layer and an edge-function proxy; Supabase provides PostgreSQL, authentication, row-level security, edge functions, and realtime.",
      fr: "BlueVision est une interface de gestion et une couche de workflow pour les écrans d'affichage numérique. Elle fournit un tableau de bord avec analyses et KPI, la surveillance de l'état des écrans avec regroupement et organisation multi-locations, un constructeur de mise en page par glisser-déposer avec modèles et aperçu en direct, une bibliothèque multimédia pour images/vidéos/documents, la planification basée sur le temps et en lot avec détection de conflits, le contrôle d'accès basé sur les rôles avec piste d'audit, et un assistant intégré nommé Brinky. Thèmes clair et sombre avec détection système et préférence enregistrée. Il s'intègre au CMS Xibo via une couche de service et un proxy edge-function ; Supabase fournit PostgreSQL, l'authentification, la sécurité au niveau des lignes, les edge functions et le temps réel.",
    },
    glance: {
      role: { en: "Full Stack Developer", fr: "Développeur Full Stack" },
      client: { en: "Brink's Morocco", fr: "Brink's Maroc" },
      team: undefined,
      duration: undefined,
    },
    keyMetrics: [],
    myRole: {
      en: "BlueVision was my final-year internship project (SFE) at Brink's Morocco. I built the management interface and workflow layer on top of the Xibo CMS.",
      fr: "BlueVision était mon projet de stage de fin d'études (SFE) chez Brink's Maroc. J'ai construit l'interface de gestion et la couche de workflow au-dessus du CMS Xibo.",
    },
    capabilities: [
      {
        label: { en: "Dashboard & displays", fr: "Tableau de bord & écrans" },
        items: [
          { en: "Real-time analytics and KPIs, display status at a glance", fr: "Analyses en temps réel et KPI, état des écrans d'un coup d'œil" },
          { en: "Display health monitoring (online, offline, warning) with last-seen timestamps", fr: "Surveillance de l'état des écrans (en ligne, hors ligne, avertissement) avec horodatages de dernière activité" },
          { en: "Grouping and multi-location organization; remote commands (reboot, refresh, screenshot, collect logs)", fr: "Regroupement et organisation multi-locations ; commandes à distance (redémarrer, rafraîchir, capture d'écran, collecter les logs)" },
        ],
      },
      {
        label: { en: "Layouts, media, scheduling", fr: "Mises en page, médias, planification" },
        items: [
          { en: "Drag-and-drop zones, grid templates (1x3, 2x2, 1x4, custom), live preview", fr: "Zones par glisser-déposer, modèles de grille (1x3, 2x2, 1x4, personnalisé), aperçu en direct" },
          { en: "Media library: images, videos, documents; upload progress, metadata, versioning, search", fr: "Bibliothèque multimédia : images, vidéos, documents ; progression d'upload, métadonnées, versioning, recherche" },
          { en: "Time-based, multi-display, and bulk scheduling with conflict detection", fr: "Planification basée sur le temps, multi-écrans et en lot avec détection de conflits" },
        ],
      },
      {
        label: { en: "Users, access, themes", fr: "Utilisateurs, accès, thèmes" },
        items: [
          { en: "Role-based access control, profile management, permission-based actions, audit trail", fr: "Contrôle d'accès basé sur les rôles, gestion de profils, actions basées sur les permissions, piste d'audit" },
          { en: "In-app assistant 'Brinky' (contextual help; not described as AI-powered)", fr: "Assistant intégré 'Brinky' (aide contextuelle ; non décrit comme basé sur l'IA)" },
          { en: "Light and dark themes with system detection and saved preference", fr: "Thèmes clair et sombre avec détection système et préférence enregistrée" },
        ],
      },
    ],
    roles: [
      { label: { en: "Display manager", fr: "Responsable d'affichage" } },
      { label: { en: "Administrator", fr: "Administrateur" } },
    ],
    stack: [
      { layer: { en: "Frontend", fr: "Frontend" }, items: ["React 18+", "TypeScript", "Vite", "React Router", "React Query", "Zustand", "Tailwind CSS 3", "shadcn/ui", "Zod"] },
      { layer: { en: "Backend / Services", fr: "Backend / Services" }, items: ["Supabase (PostgreSQL, Auth, RLS, Edge Functions, Realtime)", "Xibo CMS (service layer + edge-function proxy)"] },
    ],
    integrations: [
      { name: { en: "Xibo CMS integration", fr: "Intégration CMS Xibo" }, state: "dependency-present" },
      { name: { en: "Supabase Edge Functions", fr: "Edge Functions Supabase" }, state: "dependency-present" },
    ],
    evidenceNotes: {
      en: "Built from the BlueVision fact sheet and README. BlueVision is the management interface and workflow layer on top of the third-party Xibo CMS; Xibo's own capabilities are not presented as BlueVision's. The README is feature-descriptive and was not checked against a running app; no automated test suite is described; a 'server' folder is described as 'if applicable', so no custom backend beyond edge functions is claimed. Roadmap items (mobile app, advanced analytics, template library, API docs/webhooks, multi-tenancy, preview player, batch operations, third-party integrations) are not published.",
      fr: "Construit à partir de la fiche BlueVision et du README. BlueVision est l'interface de gestion et la couche de workflow au-dessus du CMS Xibo tiers ; les capacités propres à Xibo ne sont pas présentées comme celles de BlueVision. Le README est descriptif de fonctionnalités et n'a pas été vérifié contre une application en cours d'exécution ; aucune suite de tests automatisée n'est décrite ; un dossier 'server' est décrit comme 'si applicable', donc aucun backend personnalisé au-delà des edge functions n'est revendiqué. Les éléments de la feuille de route (application mobile, analyses avancées, bibliothèque de modèles, documentation API/webhooks, multi-locataire, lecteur d'aperçu, opérations par lot, intégrations tierces) ne sont pas publiés.",
    },
    setup: {
      steps: ["Clone the repository", "Install dependencies", "Configure Supabase connection", "Run the development server"],
    },
    links: { repo: "https://github.com/ZakariaMirinioui/BlueVision" },
    relatedSlugs: [],
    relatedExperience: ["brinks-morocco"],
    variantNote: undefined,
    assets: { logo: "/project.png", hero: "/project.png" },
    unconfirmed: [],
  },
  {
    slug: "evolution-agent",
    displayName: { en: "EvolutionAgent", fr: "EvolutionAgent" },
    category: "automation",
    platform: "Automation",
    access: "private",
    status: "Built",
    statusConfirmed: true,
    visibility: "public",
    context: { en: "Workflow blueprint", fr: "Blueprint de workflow" },
    summary: {
      en: "103-node n8n conversational WhatsApp agent with Redis message buffering, context refinement, and Gemini AI.",
      fr: "Agent conversationnel WhatsApp n8n de 103 nœuds avec mise en mémoire tampon Redis, affinement de contexte et IA Gemini."
    },
    overview: {
      en: "An advanced conversational agent workflow for WhatsApp designed in n8n (103 nodes). It receives inbound messages via webhook, buffers rapid user messages with Redis to prevent race conditions, and handles multimedia inputs including images, audio, video, documents, and media albums. Conversational context is retrieved from Redis with a PostgreSQL fallback, refined, and synthesized by Google Gemini before dispatching replies with parallel typing indicators and read receipts.",
      fr: "Un workflow d'agent conversationnel avancé pour WhatsApp conçu sous n8n (103 nœuds). Il reçoit les messages entrants par webhook, met en mémoire tampon les messages rapides avec Redis pour éviter les conditions de concurrence, et prend en charge les entrées multimédias (images, audio, vidéo, documents et albums médias). Le contexte conversationnel est extrait de Redis avec repli PostgreSQL, affiné et synthétisé par Google Gemini avant d'envoyer les réponses avec indicateurs de saisie et accusés de lecture en parallèle."
    },
    glance: {
      role: { en: "Workflow Designer & Automation Engineer", fr: "Concepteur de workflows & Ingénieur automatisation" },
      duration: "Completed blueprint"
    },
    keyMetrics: [
      { label: { en: "Nodes", fr: "Nœuds" }, value: { en: "103", fr: "103" }, description: { en: "Orchestrated n8n blueprint", fr: "Blueprint n8n orchestré" } }
    ],
    myRole: {
      en: "Designed and engineered the n8n blueprint, including Redis message buffering logic, multimedia ingestion pipelines, context refinement, and Evolution API integration.",
      fr: "Conçu et développé le blueprint n8n, incluant la logique de mise en mémoire tampon Redis, les pipelines d'ingestion multimédia, l'affinement du contexte et l'intégration Evolution API."
    },
    capabilities: [
      {
        label: { en: "Messaging & Buffering", fr: "Messagerie & Mise en mémoire tampon" },
        items: [
          { en: "Webhook triggers with manual and subworkflow execution support", fr: "Déclencheurs webhook avec support manuel et exécution en sous-workflow" },
          { en: "Rapid message buffering via Redis to sequence fast multi-message user bursts", fr: "Mise en mémoire tampon Redis pour séquencer les rafales de messages rapides" },
          { en: "Multi-format input handling: text, media albums, images, audio, video, and documents", fr: "Prise en charge multi-format : texte, albums médias, images, audio, vidéo et documents" }
        ]
      },
      {
        label: { en: "Context & Intelligence", fr: "Contexte & Intelligence" },
        items: [
          { en: "Context retrieval from Redis with PostgreSQL chat history fallback", fr: "Récupération du contexte depuis Redis avec repli sur l'historique PostgreSQL" },
          { en: "Pre-response context refinement and structured prompt preparation", fr: "Affinement du contexte et préparation structurée des prompts avant génération" },
          { en: "Google Gemini conversational synthesis with conversation history synchronization", fr: "Synthèse conversationnelle Google Gemini avec synchronisation de l'historique" }
        ]
      },
      {
        label: { en: "Delivery & State", fr: "Distribution & État" },
        items: [
          { en: "WhatsApp message dispatch via Evolution API integration", fr: "Distribution des messages WhatsApp via l'intégration Evolution API" },
          { en: "Parallel background handling of typing status and read receipts", fr: "Gestion en tâche de fond des indicateurs de saisie et accusés de lecture" }
        ]
      }
    ],
    roles: [
      { label: { en: "WhatsApp User", fr: "Utilisateur WhatsApp" } },
      { label: { en: "Automation Operator", fr: "Opérateur d'automatisation" } }
    ],
    stack: [
      { layer: { en: "Orchestration", fr: "Orchestration" }, items: ["n8n", "n8n-nodes-evolution-api"] },
      { layer: { en: "APIs & Intelligence", fr: "APIs & Intelligence" }, items: ["Evolution API", "Google Gemini"] },
      { layer: { en: "Data & Caching", fr: "Données & Cache" }, items: ["Redis", "PostgreSQL (chat_history)"] }
    ],
    integrations: [
      { name: { en: "Evolution API", fr: "Evolution API" }, state: "configured-and-verified" },
      { name: { en: "Redis", fr: "Redis" }, state: "configured-and-verified" },
      { name: { en: "PostgreSQL", fr: "PostgreSQL" }, state: "configured-and-verified" },
      { name: { en: "Google Gemini", fr: "Google Gemini" }, state: "configured-and-verified" }
    ],
    evidenceNotes: {
      en: "Verified directly from the 103-node JSON workflow blueprint on disk. Requires an operational n8n instance with the community n8n-nodes-evolution-api node, Evolution API service, Redis cache, PostgreSQL with chat_history table, and Gemini API credentials.",
      fr: "Vérifié directement à partir du blueprint de workflow JSON de 103 nœuds sur le disque. Nécessite une instance n8n opérationnelle avec le nœud communautaire n8n-nodes-evolution-api, le service Evolution API, le cache Redis, PostgreSQL avec table chat_history et les identifiants API Gemini."
    },
    setup: {
      steps: [
        "Import the workflow JSON into n8n",
        "Install n8n-nodes-evolution-api community node",
        "Configure Evolution API, Redis, and PostgreSQL credentials",
        "Set Gemini API credentials and activate workflow"
      ]
    },
    links: {},
    relatedSlugs: ["whatsapp-sales-bot", "n8n-templates-library"],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/project.png", hero: "/project.png" },
    unconfirmed: []
  },
  {
    slug: "whatsapp-sales-bot",
    displayName: { en: "SalesBot", fr: "SalesBot" },
    category: "automation",
    platform: "Automation",
    access: "private",
    status: "Built",
    statusConfirmed: true,
    visibility: "public",
    context: { en: "Workflow blueprint", fr: "Blueprint de workflow" },
    summary: {
      en: "30-node active n8n conversational sales bot for WhatsApp with Gemini audio analysis, OpenAI agent, and Google Sheets order logging.",
      fr: "Bot commercial conversationnel WhatsApp n8n actif de 30 nœuds avec analyse audio Gemini, agent OpenAI et journalisation Google Sheets."
    },
    overview: {
      en: "A 30-node active n8n workflow export for conversational commerce on WhatsApp. It listens for inbound customer messages, routes requests by content, transcribes and analyzes audio voice notes using Google Gemini, and employs an OpenAI agent with window memory for interactive customer dialog. Dedicated product branches handle specific catalogs (Necklace and Bracelets), execute HTTP requests for catalog queries, log orders directly to Google Sheets, and send status replies over WhatsApp.",
      fr: "Un export de workflow n8n actif de 30 nœuds pour le commerce conversationnel sur WhatsApp. Il écoute les messages entrants, achemine les requêtes selon leur contenu, transcrit et analyse les notes vocales audio via Google Gemini, et emploie un agent OpenAI avec mémoire glissante pour le dialogue client. Des branches produits dédiées gèrent des catalogues spécifiques (Colliers et Bracelets), exécutent des requêtes HTTP pour les requêtes catalogue, enregistrent les commandes dans Google Sheets et envoient les réponses via WhatsApp."
    },
    glance: {
      role: { en: "Workflow Designer & Automation Engineer", fr: "Concepteur de workflows & Ingénieur automatisation" },
      duration: "Active blueprint"
    },
    keyMetrics: [
      { label: { en: "Nodes", fr: "Nœuds" }, value: { en: "30", fr: "30" }, description: { en: "Active exported n8n workflow", fr: "Workflow n8n actif exporté" } }
    ],
    myRole: {
      en: "Architected and exported the 30-node sales workflow, configuring Gemini voice transcription, OpenAI agent memory, product branching, and Google Sheets order pipeline.",
      fr: "Conçu et exporté le workflow commercial de 30 nœuds, configurant la transcription vocale Gemini, la mémoire de l'agent OpenAI, l'arborescence des produits et le pipeline de commandes Google Sheets."
    },
    capabilities: [
      {
        label: { en: "Customer Interaction & Audio", fr: "Interaction Client & Audio" },
        items: [
          { en: "Listen to inbound WhatsApp messages and branch by content type", fr: "Écoute des messages WhatsApp entrants et aiguillage selon le type de contenu" },
          { en: "Voice note download and audio analysis with Google Gemini", fr: "Téléchargement de notes vocales et analyse audio avec Google Gemini" },
          { en: "OpenAI-backed conversational agent with window memory", fr: "Agent conversationnel propulsé par OpenAI avec mémoire de fenêtre" }
        ]
      },
      {
        label: { en: "E-Commerce & Orders", fr: "E-Commerce & Commandes" },
        items: [
          { en: "Dedicated catalog branches for product categories (Necklace and Bracelets)", fr: "Branches de catalogue dédiées aux catégories de produits (Colliers et Bracelets)" },
          { en: "HTTP request orchestration for catalog operations", fr: "Orchestration de requêtes HTTP pour les opérations catalogue" },
          { en: "Direct order logging and updates to Google Sheets", fr: "Enregistrement et mise à jour directe des commandes dans Google Sheets" },
          { en: "Confirmation and order status dispatch back over WhatsApp", fr: "Envoi de confirmations et statuts de commande via WhatsApp" }
        ]
      }
    ],
    roles: [
      { label: { en: "Shopper / Client", fr: "Client / Acheteur" } },
      { label: { en: "Store Administrator", fr: "Administrateur de boutique" } }
    ],
    stack: [
      { layer: { en: "Orchestration", fr: "Orchestration" }, items: ["n8n"] },
      { layer: { en: "AI & Transcription", fr: "IA & Transcription" }, items: ["Google Gemini (Audio)", "OpenAI (Agent & Memory)"] },
      { layer: { en: "Services & Integrations", fr: "Services & Intégrations" }, items: ["WhatsApp API", "Google Sheets", "HTTP Webhooks"] }
    ],
    integrations: [
      { name: { en: "WhatsApp API", fr: "WhatsApp API" }, state: "dependency-present" },
      { name: { en: "Google Gemini", fr: "Google Gemini" }, state: "dependency-present" },
      { name: { en: "OpenAI", fr: "OpenAI" }, state: "dependency-present" },
      { name: { en: "Google Sheets", fr: "Google Sheets" }, state: "configured-and-verified" }
    ],
    evidenceNotes: {
      en: "Verified from the active 30-node workflow export file on disk. Endpoint contracts and prompts require domain validation before live customer deployment.",
      fr: "Vérifié à partir du fichier d'export de workflow actif de 30 nœuds sur le disque. Les contrats d'endpoints et les prompts nécessitent une validation avant déploiement client en production."
    },
    setup: {
      steps: [
        "Import the workflow JSON into n8n",
        "Set OpenAI and Gemini API credentials",
        "Connect Google Sheets OAuth credentials and spreadsheet ID",
        "Configure WhatsApp webhook endpoint"
      ]
    },
    links: {},
    relatedSlugs: ["evolution-agent", "n8n-templates-library"],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/project.png", hero: "/project.png" },
    unconfirmed: []
  },
  {
    slug: "n8n-templates-library",
    displayName: { en: "N8nLibrary", fr: "N8nLibrary" },
    category: "automation",
    platform: "Automation",
    access: "private",
    status: "Built",
    statusConfirmed: true,
    visibility: "public",
    context: { en: "Curated reference library", fr: "Bibliothèque de référence organisée" },
    summary: {
      en: "Curated reference library of 293 text-encoded n8n automation blueprints across 18 specialized operational categories.",
      fr: "Bibliothèque de référence de 293 blueprints d'automatisation n8n encodés en texte à travers 18 catégories opérationnelles."
    },
    overview: {
      en: "A curated reference library containing 293 text-encoded n8n templates across 18 categories, including OpenAI and LLMs (82), AI Research and RAG (41), Email Automation (21), Telegram (20), Document Processing (18), and Google Workspace (17). These workflows are collected and curated from the broader automation ecosystem for rapid reference and client workflow architecture; they are not authored by me and are not counted in my original project totals.",
      fr: "Une bibliothèque de référence organisée contenant 293 modèles n8n encodés en texte répartis sur 18 catégories, notamment OpenAI et LLMs (82), Recherche IA et RAG (41), Automatisation d'emails (21), Telegram (20), Traitement de documents (18) et Google Workspace (17). Ces workflows sont collectés et organisés depuis l'écosystème d'automatisation pour servir de référence rapide et concevoir des architectures client ; ils ne sont pas de ma création et ne sont pas comptabilisés dans le total de mes projets personnels."
    },
    glance: {
      role: { en: "Curator & Solution Architect", fr: "Curateur & Architecte de solutions" },
      duration: "Reference collection"
    },
    keyMetrics: [
      { label: { en: "Templates", fr: "Modèles" }, value: { en: "293", fr: "293" }, description: { en: "Curated from ecosystem", fr: "Collectés depuis l'écosystème" } },
      { label: { en: "Categories", fr: "Catégories" }, value: { en: "18", fr: "18" }, description: { en: "Covering AI, RAG, CRM, APIs", fr: "Couvrant IA, RAG, CRM, APIs" } }
    ],
    myRole: {
      en: "Curated, cataloged, and organized this reference collection from the automation ecosystem to accelerate client automation design and reference architectures.",
      fr: "Organisé, indexé et structuré cette collection de référence issue de l'écosystème d'automatisation pour accélérer la conception et les architectures de référence pour les clients."
    },
    capabilities: [
      {
        label: { en: "Curated Categories & Blueprints", fr: "Catégories & Blueprints organisés" },
        items: [
          { en: "OpenAI and LLM integration patterns (82 templates)", fr: "Modèles d'intégration OpenAI et LLM (82 modèles)" },
          { en: "AI Research, RAG, and Data Analysis architectures (41 templates)", fr: "Architectures de recherche IA, RAG et analyse de données (41 modèles)" },
          { en: "Messaging and Communication: Telegram (20), Slack (11), WhatsApp (5), Discord (3)", fr: "Messagerie et communication : Telegram (20), Slack (11), WhatsApp (5), Discord (3)" },
          { en: "Workspace and Cloud Storage: Gmail (21), Drive & Sheets (17), Databases (5), Airtable (5)", fr: "Productivité et stockage cloud : Gmail (21), Drive & Sheets (17), Bases de données (5), Airtable (5)" },
          { en: "Document & Content Automation: PDF Processing (18), Social Media (10), Notion (10), WordPress (6)", fr: "Traitement documentaire : PDF et documents (18), Réseaux sociaux (10), Notion (10), WordPress (6)" }
        ]
      }
    ],
    roles: [
      { label: { en: "Automation Architect", fr: "Architecte en automatisation" } },
      { label: { en: "Technical Consultant", fr: "Consultant technique" } }
    ],
    stack: [
      { layer: { en: "Ecosystem", fr: "Écosystème" }, items: ["n8n (JSON Blueprints)"] },
      { layer: { en: "Integrations Covered", fr: "Intégrations couvertes" }, items: ["OpenAI", "Google Workspace", "Telegram", "Slack", "Airtable", "Notion", "PostgreSQL"] }
    ],
    integrations: [
      { name: { en: "n8n template ecosystem", fr: "Écosystème de modèles n8n" }, state: "configured-and-verified" }
    ],
    evidenceNotes: {
      en: "Verified from the local repository directory containing 293 template JSON files. These workflows are collected from external community sources and curated as an architectural knowledge base; they are not authored by me and are excluded from original project counts.",
      fr: "Vérifié à partir du dossier local contenant 293 fichiers JSON de modèles. Ces workflows proviennent de sources communautaires externes et sont organisés comme base de connaissances architecturales ; ils ne sont pas conçus par moi et sont exclus du décompte de mes projets personnels."
    },
    setup: {
      steps: [
        "Browse the curated template categories",
        "Select and import the relevant JSON blueprint into n8n",
        "Configure credentials for the target services"
      ]
    },
    links: {},
    relatedSlugs: ["evolution-agent", "whatsapp-sales-bot"],
    relatedExperience: [],
    variantNote: undefined,
    assets: { logo: "/project.png", hero: "/project.png" },
    unconfirmed: []
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const publicProjects = projects.filter((p) => p.visibility === "public");
