import { BiMessageSquareDetail } from "react-icons/bi";
import { defineField, defineType } from "sanity";

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  description: "Client and colleague testimonials",
  type: "document",
  icon: BiMessageSquareDetail,
  groups: [
    { name: "content", title: "Content" },
    { name: "author", title: "Author" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      group: "content",
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: "project",
      title: "Related Project",
      type: "reference",
      to: [{ type: "project" }],
      group: "content",
    }),
    defineField({
      name: "caseStudy",
      title: "Related Case Study",
      type: "reference",
      to: [{ type: "caseStudy" }],
      group: "content",
    }),
    defineField({
      name: "service",
      title: "Related Service",
      type: "reference",
      to: [{ type: "service" }],
      group: "content",
    }),

    // Author
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      group: "author",
      description: "Anonymize if needed (e.g., 'IT Director, Regional Court')",
    }),
    defineField({
      name: "authorRole",
      title: "Author Role",
      type: "string",
      group: "author",
    }),
    defineField({
      name: "authorOrganization",
      title: "Organization",
      type: "string",
      group: "author",
      description: "Anonymize if needed (e.g., 'Government Institution - Morocco')",
    }),
    defineField({
      name: "authorImage",
      title: "Author Photo",
      type: "image",
      group: "author",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({
      name: "authorLinkedIn",
      title: "Author LinkedIn",
      type: "url",
      group: "author",
    }),
    defineField({
      name: "isAnonymous",
      title: "Anonymous Testimonial",
      type: "boolean",
      group: "author",
      initialValue: false,
      description: "Hide name/photo, show only role + organization",
    }),

    // Meta
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      group: "meta",
      validation: (rule) => rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "featured",
      title: "Featured Testimonial",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "dateReceived",
      title: "Date Received",
      type: "date",
      group: "meta",
    }),
    defineField({
      name: "permissionToPublish",
      title: "Permission to Publish",
      type: "boolean",
      group: "meta",
      initialValue: true,
      description: "Confirm client has approved this testimonial",
    }),
  ],
});

export default testimonial;