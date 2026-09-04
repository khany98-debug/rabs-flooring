/**
 * PROJECTS / OUR WORK — maps to a `project` document type in the CMS.
 *
 * Every entry below is `isExample: true`. RABS has genuine installation
 * photography on social; none of it could be verified or attributed here, and
 * inventing a customer, a location or a testimonial is not acceptable. These
 * entries exist to prove the layout and the content model, are tagged in the
 * UI, carry no fabricated testimonial, and vanish when pitch mode is off.
 *
 * To go live: replace with real jobs (photos, rooms, products), set
 * `isExample: false`, and set NEXT_PUBLIC_PITCH_MODE=false.
 */

import { PITCH_MODE } from "./pitch";

export type ProjectCategory =
  | "Carpet"
  | "LVT"
  | "Laminate"
  | "Vinyl"
  | "Furniture"
  | "Whole house";

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Area only — never a full customer address. */
  location: string | null;
  category: ProjectCategory;
  summary: string;
  services: string[];
  flooringType: string | null;
  furniture: string[];
  rooms: string[];
  /** Asset slots under /public/media/projects/ */
  images: string[];
  beforeImages: string[];
  afterImages: string[];
  /** Only ever populated with a real, attributable customer quote. */
  testimonial: { quote: string; attribution: string; source: string } | null;
  completionDate: string | null;
  featured: boolean;
  isExample: boolean;
}

const exampleProjects: Project[] = [
  {
    id: "prj-1",
    slug: "whole-house-carpet-and-lvt",
    title: "Whole house — carpet upstairs, LVT down",
    location: null,
    category: "Whole house",
    summary:
      "A full property fitted in one go: LVT through the hallway, kitchen and living space, with carpet to the stairs, landing and bedrooms.",
    services: ["Measure", "Supply", "Fitting", "Subfloor preparation"],
    flooringType: "LVT and carpet",
    furniture: [],
    rooms: ["Hallway", "Kitchen", "Living room", "Stairs", "Landing", "Bedrooms"],
    images: ["whole-house-1", "whole-house-2", "whole-house-3", "whole-house-4"],
    beforeImages: ["whole-house-before"],
    afterImages: ["whole-house-after"],
    testimonial: null,
    completionDate: null,
    featured: true,
    isExample: true,
  },
  {
    id: "prj-2",
    slug: "living-room-lvt-herringbone",
    title: "Herringbone LVT in an open-plan living space",
    location: null,
    category: "LVT",
    summary:
      "Herringbone LVT laid across an open-plan room, with the subfloor levelled first so the pattern ran true from wall to wall.",
    services: ["Measure", "Supply", "Subfloor levelling", "Fitting"],
    flooringType: "Herringbone LVT",
    furniture: [],
    rooms: ["Living room", "Dining area"],
    images: ["herringbone-1", "herringbone-2", "herringbone-3"],
    beforeImages: [],
    afterImages: [],
    testimonial: null,
    completionDate: null,
    featured: true,
    isExample: true,
  },
  {
    id: "prj-3",
    slug: "stairs-and-landing-carpet",
    title: "Stairs and landing in a hard-wearing twist pile",
    location: null,
    category: "Carpet",
    summary:
      "Stairs take more punishment than any other part of a house. This one was specified around durability first and colour second.",
    services: ["Measure", "Supply", "Fitting"],
    flooringType: "Twist pile carpet",
    furniture: [],
    rooms: ["Stairs", "Landing"],
    images: ["stairs-1", "stairs-2"],
    beforeImages: [],
    afterImages: [],
    testimonial: null,
    completionDate: null,
    featured: false,
    isExample: true,
  },
  {
    id: "prj-4",
    slug: "living-room-floor-and-furniture",
    title: "Floor and furniture chosen together",
    location: null,
    category: "Furniture",
    summary:
      "A living room done as one project — floor first, then the sofa and units picked against it in the showroom rather than guessed at across two shops.",
    services: ["Measure", "Supply", "Fitting", "Furniture"],
    flooringType: "LVT",
    furniture: ["Corner sofa", "TV unit"],
    rooms: ["Living room"],
    images: ["floor-furniture-1", "floor-furniture-2", "floor-furniture-3"],
    beforeImages: [],
    afterImages: [],
    testimonial: null,
    completionDate: null,
    featured: false,
    isExample: true,
  },
];

/** Real projects go here. Empty until RABS supplies them. */
const realProjects: Project[] = [];

export const projects: Project[] = PITCH_MODE
  ? [...realProjects, ...exampleProjects]
  : realProjects;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  const featured = projects.filter((p) => p.featured);
  return [...featured, ...projects.filter((p) => !p.featured)].slice(0, limit);
}

export const projectCategories: ProjectCategory[] = [
  "Whole house",
  "Carpet",
  "LVT",
  "Laminate",
  "Vinyl",
  "Furniture",
];
