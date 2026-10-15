import { Metadata } from "next";
import { Slide } from "../animation/Slide";
import PageHeading from "../components/shared/PageHeading";
import DosseraContactForm from "../components/sections/DosseraContactForm";
import TestimonialsCarousel from "../components/sections/TestimonialsCarousel";
import { testimonialsQuery } from "@/lib/sanity.query";
import { sanityFetch } from "@/lib/sanity.client";
import {
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineSearch,
  HiOutlineDatabase,
  HiOutlineCog,
  HiOutlineGlobe,
} from "react-icons/hi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dossera | Zakaria Mirinioui",
  metadataBase: new URL("https://zakaria-mirinioui.dev/dossera"),
  description:
    "Dossera JAMS - Sovereign Judicial Archive Management System. Digitizing justice for courts, law firms, and notary offices across Morocco.",
  openGraph: {
    title: "Dossera | Zakaria Mirinioui",
    url: "https://zakaria-mirinioui.dev/dossera",
    description:
      "Dossera JAMS - Sovereign Judicial Archive Management System. Digitizing justice for courts, law firms, and notary offices across Morocco.",
    images: "/og.png",
  },
};

const features = [
  {
    icon: HiOutlineDocumentText,
    title: "Intelligent OCR",
    description:
      "Multilingual document scanning (Arabic/French) powered by Tesseract.js with 98%+ accuracy. Transform paper archives into searchable digital assets instantly.",
  },
  {
    icon: HiOutlineSearch,
    title: "Hybrid Semantic Search",
    description:
      "Combining Meilisearch full-text indexing with pgvector semantic vector search for instant, context-aware document retrieval across your entire archive.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Immutable Archiving",
    description:
      "MinIO S3-compatible object storage with AES-256 encryption at rest. Certified retention with SHA-256 digital signatures for legal compliance.",
  },
  {
    icon: HiOutlineCog,
    title: "RBAC & Audit Trail",
    description:
      "Role-based access control (Magistrate, Clerk, Administrator, Auditor) with immutable timestamped logging of every action for complete accountability.",
  },
  {
    icon: HiOutlineDatabase,
    title: "3-Tier Cache Architecture",
    description:
      "L1 LRU in-memory (< 1ms), L2 Redis Cluster, L3 PostgreSQL/MinIO. Achieving 99.9% cache hit rate for lightning-fast document access.",
  },
  {
    icon: HiOutlineGlobe,
    title: "100% On-Premise",
    description:
      "Zero mandatory cloud dependency. Full data sovereignty with Proxmox VE hypervisor, pfSense firewall, and 5 isolated VLANs for maximum security.",
  },
];

const deployments = [
  {
    court: "Court of First Instance of Khouribga",
    status: "Active Production",
    description:
      "First production deployment serving dozens of daily users. Successfully digitized judicial procedures, achieving a 30% reduction in administrative processing time.",
  },
  {
    court: "Court of Appeal",
    status: "Production Ready",
    description:
      "Full deployment validated with Proxmox VE, pfSense 5-VLAN architecture, complete SOC stack, and comprehensive team training delivered.",
  },
];

const services = [
  {
    title: "Courts & Tribunals",
    description:
      "Complete digitization of judicial archives with intelligent OCR, semantic search, and immutable storage. Compliant with Moroccan Law 09-08 and GDPR.",
  },
  {
    title: "Law Firms & Legal Departments",
    description:
      "Streamline case management with instant document retrieval, role-based access, and comprehensive audit trails for complete accountability.",
  },
  {
    title: "Notary Offices",
    description:
      "Secure archiving of notarial acts with certified digital signatures, automated indexing, and multi-language search capabilities.",
  },
  {
    title: "Government Institutions",
    description:
      "Enterprise-grade document management with military-grade security, real-time monitoring, and full data sovereignty on your own infrastructure.",
  },
];

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "pgvector", category: "Vector Search" },
  { name: "Meilisearch", category: "Full-Text Search" },
  { name: "MinIO", category: "Object Storage" },
  { name: "Redis", category: "Cache" },
  { name: "Docker", category: "Containerization" },
  { name: "Proxmox VE", category: "Virtualization" },
  { name: "pfSense", category: "Firewall" },
  { name: "Wazuh SIEM", category: "Security" },
  { name: "Grafana", category: "Monitoring" },
  { name: "Ansible", category: "Automation" },
  { name: "Tesseract.js", category: "OCR" },
];

import type { TestimonialType } from "@/types";

export default async function Dossera() {
  const testimonials = await sanityFetch({
    query: testimonialsQuery,
    tags: ["testimonial"],
  }) as TestimonialType[];
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Dossera JAMS"
        description="Sovereign Judicial Archive Management System — Digitizing justice for courts, law firms, notary offices, and legal institutions across Morocco and beyond."
      />

      {/* Status Badge */}
      <Slide delay={0.1}>
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="sr-only">Dossera JAMS</span>
            <picture>
              <source
                srcSet="/dossera-darkmode.png"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="/dossera-lightmode.png"
                alt="Dossera JAMS Logo"
                className="h-8 w-auto transition-opacity duration-300"
              />
            </picture>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium dark:bg-green-900/30 bg-transparent dark:text-green-400 text-green-700 border dark:border-green-800 border-green-300">
            Operational System — JAMS v2.4
          </span>
          <a
            href="https://dossera.surge.sh"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium dark:bg-primary-bg bg-zinc-100 dark:text-white text-zinc-700 border dark:border-zinc-700 border-zinc-200 hover:dark:border-primary-color hover:border-secondary-color transition-colors"
          >
            View Live Demo →
          </a>
        </div>
      </Slide>

      {/* About Dossera */}
      <Slide delay={0.15}>
        <section className="mb-20">
          <h2 className="text-3xl font-incognito font-bold tracking-tight mb-6">
            What is Dossera?
          </h2>
          <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed space-y-4">
            <p>
              <strong className="dark:text-white text-zinc-900">
                Dossera JAMS
              </strong>{" "}
              is a sovereign, on-premise judicial archive management platform
              designed for the Kingdom of Morocco. Built with a decoupled
              client-server architecture, it transforms how judicial institutions
              manage, search, and secure their critical documents.
            </p>
            <p>
              As the{" "}
              <strong className="dark:text-white text-zinc-900">
                Technical Project Lead & Full Stack Developer
              </strong>
              , I architected and delivered the entire system — from translating
              complex legal requirements into technical specifications to
              deploying a production-ready platform that serves real users daily.
            </p>
            <p>
              The system is{" "}
              <strong className="dark:text-white text-zinc-900">
                successfully deployed in production
              </strong>{" "}
              at the Court of First Instance of Khouribga, with a second
              deployment validated at the Court of Appeal. It delivers measurable
              results: a{" "}
              <strong className="dark:text-primary-color">
                30% reduction in administrative processing time
              </strong>{" "}
              and complete data confidentiality for sensitive judicial documents.
            </p>
          </div>
        </section>
      </Slide>

      {/* Key Features */}
      <Slide delay={0.2}>
        <section className="mb-20">
          <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            Core Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors"
              >
                <feature.icon className="text-3xl dark:text-primary-color text-secondary-color mb-4" />
                <h3 className="text-lg font-incognito font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Slide>

      {/* Production Deployments */}
      <Slide delay={0.25}>
        <section className="mb-20">
          <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            Production Deployments
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {deployments.map((deployment, index) => (
              <div
                key={index}
                className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-incognito font-semibold">
                    {deployment.court}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium dark:bg-green-900/30 bg-green-100 dark:text-green-400 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {deployment.status}
                  </span>
                </div>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {deployment.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Slide>

      {/* Services We Offer */}
      <Slide delay={0.3}>
        <section className="mb-20">
          <h2 className="text-3xl font-incognito font-bold tracking-tight mb-4">
            Our Services
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 mb-8 max-w-3xl">
            We help legal institutions digitize their archives with a
            comprehensive, secure, and sovereign solution. From initial
            assessment to full deployment and training — we handle the entire
            transformation.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6 hover:dark:border-zinc-600 hover:border-zinc-300 transition-colors"
              >
                <h3 className="text-lg font-incognito font-semibold mb-2 dark:text-primary-color text-secondary-color">
                  {service.title}
                </h3>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Slide>

      {/* Technical Architecture */}
      <Slide delay={0.35}>
        <section className="mb-20">
          <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            Technical Architecture
          </h2>
          <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-3 rounded-md dark:bg-zinc-800/50 bg-zinc-100 border dark:border-zinc-700 border-zinc-200"
                >
                  <span className="text-sm font-medium dark:text-white text-zinc-900">
                    {tech.name}
                  </span>
                  <span className="text-xs dark:text-zinc-500 text-zinc-500">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t dark:border-zinc-700 border-zinc-200">
              <h3 className="text-lg font-incognito font-semibold mb-4">
                Security Stack
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm dark:text-zinc-400 text-zinc-600">
                <div>
                  <strong className="dark:text-white text-zinc-900">
                    Network:
                  </strong>{" "}
                  pfSense firewall, 5 isolated VLANs (Staff, Archives, DMZ, SOC,
                  Honeypot)
                </div>
                <div>
                  <strong className="dark:text-white text-zinc-900">
                    Monitoring:
                  </strong>{" "}
                  Wazuh SIEM, CrowdSec, T-Pot honeypot, Prometheus + Grafana
                </div>
                <div>
                  <strong className="dark:text-white text-zinc-900">
                    Compliance:
                  </strong>{" "}
                  GDPR, Moroccan Law 09-08, SHA-256 signatures, AES-256
                  encryption
                </div>
              </div>
            </div>
          </div>
        </section>
      </Slide>

      {/* Deployment Timeline */}
      <Slide delay={0.4}>
        <section className="mb-20">
          <h2 className="text-3xl font-incognito font-bold tracking-tight mb-8">
            Deployment Timeline
          </h2>
          <div className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full dark:bg-primary-color bg-secondary-color flex items-center justify-center text-sm font-bold dark:text-zinc-900 text-white">
                    1
                  </div>
                  <div className="w-0.5 h-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <div>
                  <h4 className="font-incognito font-semibold mb-1">
                    Week 1 — Infrastructure Setup
                  </h4>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600">
                    Proxmox VE hypervisor deployment, pfSense firewall
                    configuration, VLAN segmentation, and network routing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full dark:bg-primary-color bg-secondary-color flex items-center justify-center text-sm font-bold dark:text-zinc-900 text-white">
                    2
                  </div>
                  <div className="w-0.5 h-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <div>
                  <h4 className="font-incognito font-semibold mb-1">
                    Weeks 2-3 — Application Deployment
                  </h4>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600">
                    JAMS application stack deployment, database initialization,
                    OCR configuration, search engine indexing, and security
                    hardening.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full dark:bg-primary-color bg-secondary-color flex items-center justify-center text-sm font-bold dark:text-zinc-900 text-white">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-incognito font-semibold mb-1">
                    Week 4 — Training & Handover
                  </h4>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600">
                    Comprehensive team training, Wazuh SIEM integration,
                    disaster recovery plan (PRA) delivery, and production
                    validation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Slide>

      {/* Testimonials */}
      <Slide delay={0.5}>
        <section className="mb-20">
          <h2 className="text-2xl font-incognito font-bold tracking-tight mb-8 text-center">
            Trusted by Legal Institutions
          </h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </section>
      </Slide>

      {/* Contact Form */}
      <section className="mb-20">
        <DosseraContactForm />
      </section>
    </main>
  );
}
