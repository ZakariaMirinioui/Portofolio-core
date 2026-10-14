import { BiBriefcaseAlt } from "react-icons/bi";
import { defineField, defineType } from "sanity";

const service = defineType({
  name: "service",
  title: "Services",
  description: "Service offerings for agency/freelance work",
  type: "document",
  icon: BiBriefcaseAlt,
  groups: [
    { name: "basics", title: "Basics" },
    { name: "details", title: "Details & Process" },
    { name: "proof", title: "Proof & Credentials" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Service Name",
      type: "string",
      group: "basics",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basics",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      group: "basics",
      description: "One-liner for service cards (max 160 chars)",
      validation: (rule) => rule.max(160).required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      group: "basics",
      description: "React-icons name (e.g., HiOutlineShieldCheck, HiOutlineDatabase)",
      options: {
        list: [
          "HiOutlineShieldCheck",
          "HiOutlineDatabase",
          "HiOutlineCog",
          "HiOutlineGlobeAlt",
          "HiOutlineChartBar",
          "HiOutlineCode",
          "HiOutlineServer",
          "HiOutlineLockClosed",
          "HiOutlineCloud",
          "HiOutlineCpuChip",
        ],
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "Digital Transformation", value: "digital-transformation" },
          { title: "Custom Software Development", value: "custom-dev" },
          { title: "Legacy Modernization", value: "legacy-modernization" },
          { title: "Infrastructure & DevOps", value: "infra-devops" },
          { title: "Security & Compliance", value: "security-compliance" },
          { title: "Product Strategy & Discovery", value: "product-strategy" },
          { title: "Technical Advisory / CTO-as-a-Service", value: "advisory" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      group: "basics",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "basics",
    }),

    // Details & Process
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "blockContent",
      group: "details",
      description: "Detailed service description for service page",
    }),
    defineField({
      name: "whatWeDeliver",
      title: "What We Deliver",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Tangible deliverables (e.g., 'Architecture diagram', 'Production-ready code', 'Runbooks')",
    }),
    defineField({
      name: "process",
      title: "Our Process",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", title: "Step Number", type: "number" },
            { name: "title", title: "Step Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            { name: "duration", title: "Typical Duration", type: "string" },
            { name: "deliverables", title: "Deliverables", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
      description: "Step-by-step engagement process",
    }),
    defineField({
      name: "engagementModels",
      title: "Engagement Models",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Model Name", type: "string", options: { list: ["Fixed Scope / Fixed Price", "Time & Materials", "Dedicated Team", "Retainer / Advisory", "Milestone-based"], layout: "dropdown" } },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "bestFor", title: "Best For", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "techStack",
      title: "Typical Tech Stack",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    // Proof & Credentials
    defineField({
      name: "caseStudies",
      title: "Related Case Studies",
      type: "array",
      group: "proof",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "certifications",
      title: "Relevant Certifications",
      type: "array",
      group: "proof",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Certification", type: "string" },
            { name: "issuer", title: "Issuer", type: "string" },
            { name: "year", title: "Year", type: "number" },
            { name: "url", title: "Verification URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "clients",
      title: "Past Clients (Anonymized)",
      type: "array",
      group: "proof",
      of: [{ type: "reference", to: [{ type: "client" }] }],
    }),
  ],
});

export default service;