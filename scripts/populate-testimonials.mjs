import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function createTestimonials() {
  // First, get the actual project IDs by slug
  const projects = await client.fetch(`*[_type == "project"]{ _id, "slug": slug.current }`);
  const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p._id]));
  
  console.log("Project ID map:", projectMap);

  const testimonials = [
    {
      _type: "testimonial",
      quote: "Dossera JAMS has completely transformed how our court manages judicial archives. What used to take hours of manual searching now takes seconds. The system's reliability and security give us complete confidence in handling sensitive legal documents.",
      authorName: "Presiding Judge",
      authorRole: "Chief Magistrate",
      authorOrganization: "Court of First Instance - Khouribga",
      isAnonymous: true,
      rating: 5,
      featured: true,
      permissionToPublish: true,
      dateReceived: "2024-06-15",
      project: projectMap["dossera-jams"] ? { _type: "reference", _ref: projectMap["dossera-jams"] } : undefined,
    },
    {
      _type: "testimonial",
      quote: "The clinic management platform has streamlined our entire appointment workflow. Our staff productivity increased by 40% in the first month. The multi-tenant architecture means each clinic operates independently while we maintain centralized oversight.",
      authorName: "Dr. Amina Benali",
      authorRole: "Medical Director",
      authorOrganization: "Healthcare Network - Casablanca",
      isAnonymous: false,
      rating: 5,
      featured: true,
      permissionToPublish: true,
      dateReceived: "2024-03-20",
      project: projectMap["doctor-pwadcteam"] ? { _type: "reference", _ref: projectMap["doctor-pwadcteam"] } : undefined,
    },
    {
      _type: "testimonial",
      quote: "We evaluated several school management solutions before choosing this platform. The comprehensive feature set — admissions, grading, attendance, parent communication — combined with the affordable pricing made it the clear choice for our institution.",
      authorName: "Mohammed Tazi",
      authorRole: "School Principal",
      authorOrganization: "Private School - Rabat",
      isAnonymous: false,
      rating: 5,
      featured: false,
      permissionToPublish: true,
      dateReceived: "2024-01-10",
      project: projectMap["school-pwadcteam"] ? { _type: "reference", _ref: projectMap["school-pwadcteam"] } : undefined,
    },
    {
      _type: "testimonial",
      quote: "As a law firm managing hundreds of cases, document retrieval was our biggest pain point. This platform's OCR and search capabilities have reduced our document lookup time from minutes to seconds. The audit trail feature ensures we meet all compliance requirements.",
      authorName: "Fatima Zahra El Amrani",
      authorRole: "Managing Partner",
      authorOrganization: "Law Firm - Marrakech",
      isAnonymous: false,
      rating: 5,
      featured: true,
      permissionToPublish: true,
      dateReceived: "2024-05-05",
      project: projectMap["avocat-pwadcteam"] ? { _type: "reference", _ref: projectMap["avocat-pwadcteam"] } : undefined,
    },
    {
      _type: "testimonial",
      quote: "The salon booking platform reduced our no-show rate by 45% through automated SMS reminders. Our clients love the online booking experience, and our staff appreciates the simplified scheduling dashboard.",
      authorName: "Sara Mansouri",
      authorRole: "Salon Owner",
      authorOrganization: "Beauty Salon - Tangier",
      isAnonymous: false,
      rating: 4,
      featured: false,
      permissionToPublish: true,
      dateReceived: "2024-04-12",
      project: projectMap["salon-pwadcteam"] ? { _type: "reference", _ref: projectMap["salon-pwadcteam"] } : undefined,
    },
  ];

  console.log(`Creating ${testimonials.length} testimonials...`);

  for (const testimonial of testimonials) {
    try {
      const existing = await client.fetch(
        `*[_type == "testimonial" && authorOrganization == $org][0]`,
        { org: testimonial.authorOrganization }
      );
      if (existing) {
        console.log(`Skipping ${testimonial.authorOrganization} (already exists)`);
        continue;
      }
      const created = await client.create(testimonial);
      console.log(`Created testimonial: ${testimonial.authorOrganization} (${created._id})`);
    } catch (error) {
      console.error(`Failed to create testimonial for ${testimonial.authorOrganization}:`, error);
    }
  }

  console.log("Testimonials migration complete!");
}

createTestimonials().catch(console.error);