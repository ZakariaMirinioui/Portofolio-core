import { BiBuilding } from "react-icons/bi";
import { defineField, defineType } from "sanity";

const client = defineType({
  name: "client",
  title: "Clients",
  description: "Anonymized client references for credibility",
  type: "document",
  icon: BiBuilding,
  groups: [
    { name: "basics", title: "Basics" },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({
      name: "displayName",
      title: "Display Name",
      type: "string",
      group: "basics",
      description: "Anonymized name for public display (e.g., 'Court of First Instance - Khouribga')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "basics",
      description: "Client logo (or generic icon if anonymized)",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      group: "basics",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Government / Judiciary", value: "government" },
          { title: "Healthcare", value: "healthcare" },
          { title: "Education", value: "education" },
          { title: "Legal / Law Firms", value: "legal" },
          { title: "Wellness / Beauty", value: "wellness" },
          { title: "Hospitality / Food", value: "hospitality" },
          { title: "Finance / Banking", value: "finance" },
          { title: "E-commerce / Retail", value: "ecommerce" },
          { title: "Technology / SaaS", value: "technology" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "size",
      title: "Organization Size",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Startup (1-10)", value: "startup" },
          { title: "Small (11-50)", value: "small" },
          { title: "Medium (51-200)", value: "medium" },
          { title: "Large (201-1000)", value: "large" },
          { title: "Enterprise (1000+)", value: "enterprise" },
          { title: "Government Agency", value: "government" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "details",
      description: "City, Country (e.g., 'Khouribga, Morocco')",
    }),
    defineField({
      name: "projects",
      title: "Projects Delivered",
      type: "array",
      group: "details",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "services",
      title: "Services Engaged",
      type: "array",
      group: "details",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      group: "details",
    }),
    defineField({
      name: "isPublic",
      title: "Publicly Referenceable",
      type: "boolean",
      group: "details",
      initialValue: true,
      description: "Can we show this client on our website?",
    }),
    defineField({
      name: "ndaExpires",
      title: "NDA Expires",
      type: "date",
      group: "details",
      description: "When can we publicly reference this work?",
    }),
  ],
});

export default client;