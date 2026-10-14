import { BiBookOpen } from "react-icons/bi";
import { defineField, defineType } from "sanity";

const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  description: "Detailed project case studies with problem, solution, results",
  type: "document",
  icon: BiBookOpen,
  groups: [
    { name: "overview", title: "Overview" },
    { name: "problem", title: "Problem & Context" },
    { name: "solution", title: "Solution & Architecture" },
    { name: "results", title: "Results & Metrics" },
    { name: "meta", title: "Meta & SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "overview",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "project",
      title: "Linked Project",
      type: "reference",
      to: [{ type: "project" }],
      group: "overview",
      description: "Reference to the portfolio project",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "overview",
      options: { hotspot: true, metadata: ["lqip"] },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "overview",
      description: "One-line summary for listings",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      group: "overview",
    }),

    // Problem & Context
    defineField({
      name: "clientContext",
      title: "Client Context",
      type: "blockContent",
      group: "problem",
      description: "Who is the client? What's their domain? Anonymize if needed.",
    }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "blockContent",
      group: "problem",
      description: "What problem were they facing? Why was it hard?",
    }),
    defineField({
      name: "constraints",
      title: "Constraints & Requirements",
      type: "array",
      group: "problem",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Regulatory, technical, budget, timeline constraints",
    }),

    // Solution & Architecture
    defineField({
      name: "approach",
      title: "Our Approach",
      type: "blockContent",
      group: "solution",
      description: "How did you tackle it? Methodology, process, key decisions",
    }),
    defineField({
      name: "architecture",
      title: "Architecture Overview",
      type: "blockContent",
      group: "solution",
      description: "High-level architecture, key components, data flow",
    }),
    defineField({
      name: "keyTechnologies",
      title: "Key Technologies",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "category", title: "Category", type: "string", options: { list: ["Frontend", "Backend", "Database", "Infrastructure", "Security", "AI/ML", "DevOps", "Other"], layout: "dropdown" } },
            { name: "reason", title: "Why This Choice?", type: "string" },
          ],
        },
      ],
      description: "Technology choices with rationale",
    }),
    defineField({
      name: "architectureDiagrams",
      title: "Architecture Diagrams",
      type: "array",
      group: "solution",
      of: [
        {
          type: "image",
          options: { hotspot: true, metadata: ["lqip"] },
          fields: [
            { name: "alt", title: "Alt", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
            { name: "type", title: "Diagram Type", type: "string", options: { list: ["C4 Context", "C4 Container", "C4 Component", "Sequence", "Infrastructure", "Data Flow", "Deployment", "Other"], layout: "dropdown" } },
          ],
        },
      ],
    }),
    defineField({
      name: "adrs",
      title: "Architecture Decision Records (ADRs)",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Decision Title", type: "string" },
            { name: "context", title: "Context", type: "text", rows: 3 },
            { name: "decision", title: "Decision", type: "text", rows: 3 },
            { name: "consequences", title: "Consequences", type: "text", rows: 3 },
            { name: "status", title: "Status", type: "string", options: { list: ["Proposed", "Accepted", "Superseded", "Deprecated"], layout: "dropdown" } },
          ],
        },
      ],
      description: "Key architectural decisions with trade-offs",
    }),

    // Results & Metrics
    defineField({
      name: "outcomes",
      title: "Outcomes & Impact",
      type: "blockContent",
      group: "results",
      description: "What changed? Business impact, user feedback, measurable results",
    }),
    defineField({
      name: "metrics",
      title: "Key Metrics",
      type: "array",
      group: "results",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
            { name: "unit", title: "Unit (optional)", type: "string" },
            { name: "description", title: "Context", type: "string" },
            { name: "beforeAfter", title: "Before/After", type: "boolean", initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Client Testimonials",
      type: "array",
      group: "results",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
    }),
    defineField({
      name: "lessonsLearned",
      title: "Lessons Learned",
      type: "array",
      group: "results",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "What would you do differently? Key takeaways",
    }),

    // Meta & SEO
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "meta",
      description: "Override default title for search engines",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "meta",
      rows: 3,
      description: "Meta description for search engines (max 160 chars)",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      group: "meta",
      options: { hotspot: true },
    }),
  ],
});

export default caseStudy;