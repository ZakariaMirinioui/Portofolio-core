import { PortableTextBlock } from "sanity";

export type ProfileType = {
  _id: string;
  fullName: string;
  headline: string;
  profileImage: {
    image: string;
    lqip: string;
    alt: string;
  };
  shortBio: string;
  email: string;
  fullBio: PortableTextBlock[];
  location: string;
  resumeURL: string;
  og: string;
  usage: PortableTextBlock[];
};

export type JobType = {
  _id: string;
  name: string;
  jobTitle: string;
  logo: string;
  url: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type ProjectType = {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  projectUrl: string;
  repository: string;
  logo: string;
  coverImage: {
    image: string;
    alt: string | null;
    lqip: string;
  };
  description: PortableTextBlock[];
  // New fields
  category?: string;
  status?: string;
  featured?: boolean;
  clientType?: string;
  role?: string;
  teamSize?: number;
  duration?: string;
  techStack?: string[];
  metrics?: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  gallery?: Array<{
    image: string;
    alt?: string;
    caption?: string;
    lqip?: string;
  }>;
  caseStudy?: {
    _ref: string;
    _type: "reference";
  };
  architectureDiagram?: {
    image: string;
    alt?: string;
    caption?: string;
    lqip?: string;
  };
};

export type CaseStudyType = {
  _id: string;
  title: string;
  slug: string;
  tagline?: string;
  coverImage?: {
    image: string;
    alt?: string;
    lqip?: string;
  };
  publishedAt?: string;
  clientContext?: PortableTextBlock[];
  challenge?: PortableTextBlock[];
  constraints?: string[];
  approach?: PortableTextBlock[];
  architecture?: PortableTextBlock[];
  keyTechnologies?: Array<{
    name: string;
    category: string;
    reason: string;
  }>;
  architectureDiagrams?: Array<{
    image: string;
    alt?: string;
    caption?: string;
    type?: string;
    lqip?: string;
  }>;
  adrs?: Array<{
    title: string;
    context: string;
    decision: string;
    consequences: string;
    status: string;
  }>;
  outcomes?: PortableTextBlock[];
  metrics?: Array<{
    label: string;
    value: string;
    unit?: string;
    description?: string;
    beforeAfter?: boolean;
  }>;
  testimonials?: Array<{
    _id: string;
    quote: string;
    authorName?: string;
    authorRole?: string;
    authorOrganization?: string;
    authorImage?: {
      image: string;
      alt?: string;
    };
    authorLinkedIn?: string;
    isAnonymous?: boolean;
    rating?: number;
    dateReceived?: string;
  }>;
  lessonsLearned?: string[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: {
    image: string;
  };
};

export type ServiceType = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon?: string;
  category: string;
  featured?: boolean;
  order?: number;
  fullDescription?: PortableTextBlock[];
  whatWeDeliver?: string[];
  process?: Array<{
    step: number;
    title: string;
    description: string;
    duration?: string;
    deliverables?: string[];
  }>;
  engagementModels?: Array<{
    name: string;
    description: string;
    bestFor: string;
  }>;
  techStack?: string[];
  caseStudies?: Array<{ _ref: string }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    year: number;
    url?: string;
  }>;
  clients?: Array<{ _ref: string }>;
};

export type TestimonialType = {
  _id: string;
  quote: string;
  project?: { _ref: string };
  caseStudy?: { _ref: string };
  service?: { _ref: string };
  authorName?: string;
  authorRole?: string;
  authorOrganization?: string;
  authorImage?: {
    image: string;
    alt?: string;
  };
  authorLinkedIn?: string;
  isAnonymous?: boolean;
  rating?: number;
  featured?: boolean;
  dateReceived?: string;
  permissionToPublish?: boolean;
};

export type ClientType = {
  _id: string;
  displayName: string;
  logo?: {
    image: string;
    alt?: string;
  };
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  projects?: Array<{ _ref: string }>;
  services?: Array<{ _ref: string }>;
  testimonial?: { _ref: string };
  isPublic?: boolean;
  ndaExpires?: string;
};
