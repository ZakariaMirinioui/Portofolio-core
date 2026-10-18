import job from "./job";
import profile from "./profile";
import project from "./project";
import blockContent from "./blockContent";
import caseStudy from "./caseStudy";
import service from "./service";
import testimonial from "./testimonial";
import client from "./client";

export const schemaTypes = [
  profile,
  job,
  project,
  caseStudy,
  service,
  testimonial,
  client,

  // Reference types
  blockContent,
];
