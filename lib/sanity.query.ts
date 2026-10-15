import { groq } from "next-sanity";

export const profileQuery = groq`*[_type == "profile"][0]{
  _id,
  fullName,
  headline,
  profileImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  shortBio,
  location,
  fullBio,
  email,
  "resumeURL": resumeURL.asset->url,
  socialLinks,
  usage
}`;

export const jobQuery = groq`*[_type == "job"] | order(_createdAt desc){
  _id,
  name,
  jobTitle,
  "logo": logo.asset->url,
  url,
  description,
  startDate,
  endDate,
}`;

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url,
  category,
  status,
  featured,
  "coverImage": coverImage.asset->url,
}`;

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url,
  category,
  status,
  "coverImage": coverImage.asset->url,
  techStack,
  metrics,
}`;

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  tagline,
  projectUrl,
  repository,
  category,
  status,
  featured,
  clientType,
  role,
  teamSize,
  duration,
  techStack,
  metrics,
  "logo": logo.asset->url,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  gallery[]{
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
    caption,
  },
  description,
  "caseStudy": caseStudy->{
    _id,
    title,
    "slug": slug.current,
  },
  architectureDiagram {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
    caption,
  },
}`;

export const caseStudyQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  tagline,
  publishedAt,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  clientContext,
  challenge,
  constraints,
  approach,
  architecture,
  keyTechnologies,
  architectureDiagrams[]{
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
    caption,
    type,
  },
  adrs,
  outcomes,
  metrics,
  "testimonials": testimonials[]->{
    _id,
    quote,
    authorName,
    authorRole,
    authorOrganization,
    authorImage {
      "image": asset->url,
      alt,
    },
    authorLinkedIn,
    isAnonymous,
    rating,
    dateReceived,
  },
  lessonsLearned,
  seoTitle,
  seoDescription,
  ogImage {
    "image": asset->url,
  },
}`;

export const caseStudiesQuery = groq`*[_type == "caseStudy"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  tagline,
  publishedAt,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc, _createdAt desc){
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  icon,
  category,
  featured,
  order,
  fullDescription,
  whatWeDeliver,
  process,
  engagementModels,
  techStack,
  "caseStudies": caseStudies[]->{
    _id,
    title,
    "slug": slug.current,
  },
  certifications,
  "clients": clients[]->{
    _id,
    displayName,
    logo {
      "image": asset->url,
      alt,
    },
  },
}`;

export const featuredServicesQuery = groq`*[_type == "service" && featured == true] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  icon,
  category,
}`;

export const testimonialsQuery = groq`*[_type == "testimonial" && permissionToPublish == true] | order(dateReceived desc){
  _id,
  quote,
  authorName,
  authorRole,
  authorOrganization,
  authorImage {
    "image": asset->url,
    alt,
  },
  authorLinkedIn,
  isAnonymous,
  rating,
  featured,
  dateReceived,
  "project": project->{
    _id,
    name,
    "slug": slug.current,
  },
  "caseStudy": caseStudy->{
    _id,
    title,
    "slug": slug.current,
  },
  "service": service->{
    _id,
    name,
    "slug": slug.current,
  },
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && permissionToPublish == true && featured == true] | order(dateReceived desc){
  _id,
  quote,
  authorName,
  authorRole,
  authorOrganization,
  authorImage {
    "image": asset->url,
    alt,
  },
  authorLinkedIn,
  isAnonymous,
  rating,
  dateReceived,
}`;

export const clientsQuery = groq`*[_type == "client" && isPublic == true] | order(displayName asc){
  _id,
  displayName,
  logo {
    "image": asset->url,
    alt,
  },
  website,
  industry,
  size,
  location,
  "projects": projects[]->{
    _id,
    name,
    "slug": slug.current,
  },
  "services": services[]->{
    _id,
    name,
    "slug": slug.current,
  },
  "testimonial": testimonial->{
    _id,
    quote,
    authorName,
    authorRole,
    authorOrganization,
  },
}`;
