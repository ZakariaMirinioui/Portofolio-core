import { BiPackage } from "react-icons/bi";
import { defineField, defineType } from "sanity";

const project = defineType({
  name: "project",
  title: "Projects",
  description: "Project Schema - Portfolio showcase items",
  type: "document",
  icon: BiPackage,
  groups: [
    { name: "basics", title: "Basics" },
    { name: "details", title: "Details & Metrics" },
    { name: "media", title: "Media & Links" },
    { name: "caseStudy", title: "Case Study" },
  ],
  fields: [
    // Basics
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the project",
      group: "basics",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One-line summary (max 60 chars)",
      group: "basics",
      validation: (rule) => rule.max(60).required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Add a custom slug for the URL or generate one from the name",
      group: "basics",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Project category for filtering",
      group: "basics",
      options: {
        list: [
          { title: "Judicial / Legal Tech", value: "judicial" },
          { title: "Healthcare SaaS", value: "healthcare" },
          { title: "Education SaaS", value: "education" },
          { title: "Professional Services SaaS", value: "professional-services" },
          { title: "Wellness / Beauty SaaS", value: "wellness" },
          { title: "E-commerce / Marketplace", value: "ecommerce" },
          { title: "Enterprise / Internal Tools", value: "enterprise" },
          { title: "Open Source", value: "open-source" },
          { title: "R&D / Experiment", value: "rd" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "Production / Live", value: "production" },
          { title: "Active Development", value: "active" },
          { title: "Maintenance Mode", value: "maintenance" },
          { title: "Archived / Sunset", value: "archived" },
          { title: "Concept / Prototype", value: "prototype" },
        ],
        layout: "radio",
      },
      initialValue: "production",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Show in featured row on projects page",
      group: "basics",
      initialValue: false,
    }),

    // Details & Metrics
    defineField({
      name: "clientType",
      title: "Client Type",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Government / Public Institution", value: "government" },
          { title: "Enterprise (B2B)", value: "enterprise" },
          { title: "SME / Mid-market", value: "sme" },
          { title: "Startup", value: "startup" },
          { title: "Own Product (Agency)", value: "own-product" },
          { title: "Open Source Community", value: "open-source" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Technical Project Lead", value: "tech-lead" },
          { title: "Solutions Architect", value: "architect" },
          { title: "Full Stack Developer", value: "fullstack" },
          { title: "Backend Engineer", value: "backend" },
          { title: "Frontend Engineer", value: "frontend" },
          { title: "DevOps / Infrastructure", value: "devops" },
          { title: "Product Owner / Manager", value: "product" },
          { title: "Founder / CTO", value: "founder" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "teamSize",
      title: "Team Size",
      type: "number",
      group: "details",
      description: "Number of engineers on the project",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "details",
      description: "e.g., '6 months', 'Jan 2023 - Present'",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Technologies used (e.g., React, Node.js, PostgreSQL, Docker)",
    }),
    defineField({
      name: "metrics",
      title: "Key Metrics & Impact",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
            { name: "description", title: "Context (optional)", type: "string" },
          ],
        },
      ],
      description: "Quantifiable results: users, revenue, performance, time savings",
    }),

    // Media & Links
    defineField({
      name: "logo",
      title: "Project Logo",
      type: "image",
      group: "media",
    }),
    defineField({
      name: "projectUrl",
      title: "Live Project URL",
      type: "url",
      group: "media",
      description: "Leaving blank shows 'Coming Soon'",
    }),
    defineField({
      name: "repository",
      title: "Repository URL",
      type: "url",
      group: "media",
      description: "GitHub/GitLab link (blank = 'No Repo')",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "media",
      description: "Upload a cover image for project cards",
      options: { hotspot: true, metadata: ["lqip"] },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Screenshot Gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true, metadata: ["lqip"] },
          fields: [{ name: "alt", title: "Alt", type: "string" }, { name: "caption", title: "Caption", type: "string" }],
        },
      ],
      description: "Additional screenshots for case study",
    }),

    // Case Study
    defineField({
      name: "description",
      title: "Short Description (Project Card)",
      type: "blockContent",
      group: "caseStudy",
      description: "Brief description for project listing cards",
    }),
    defineField({
      name: "caseStudy",
      title: "Full Case Study",
      type: "reference",
      to: [{ type: "caseStudy" }],
      group: "caseStudy",
      description: "Link to detailed case study (optional)",
    }),
    defineField({
      name: "architectureDiagram",
      title: "Architecture Diagram",
      type: "image",
      group: "caseStudy",
      description: "C4, sequence, or infrastructure diagram",
      options: { hotspot: true, metadata: ["lqip"] },
      fields: [{ name: "alt", title: "Alt", type: "string" }, { name: "caption", title: "Caption", type: "string" }],
    }),
  ],
});

export default project;
