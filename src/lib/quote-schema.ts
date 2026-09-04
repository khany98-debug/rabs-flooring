import { z } from "zod";

/**
 * One schema, used by the browser and the server route.
 *
 * Client-side validation is a convenience; it is not security. The API route
 * re-parses the payload with this same schema before doing anything with it,
 * so a hand-crafted POST is rejected on exactly the same rules.
 */

export const INTERESTS = ["flooring", "furniture", "blinds", "whole-home"] as const;
export const FLOOR_TYPES = ["carpet", "lvt", "laminate", "vinyl", "not-sure"] as const;
export const ROOMS = [
  "Living room",
  "Bedroom",
  "Stairs",
  "Hallway",
  "Kitchen",
  "Dining room",
  "Bathroom",
  "Whole property",
  "Other",
] as const;
export const SUPPLY = ["supply-only", "supply-and-fit", "not-sure"] as const;
export const TIMING = ["asap", "1-2-weeks", "this-month", "researching"] as const;
export const CONTACT_METHODS = ["phone", "whatsapp", "email"] as const;

/** UK postcode, loosely validated — strict enough to catch typos, not so strict it rejects valid edge cases. */
const postcode = z
  .string()
  .trim()
  .min(5, "Please enter a full postcode")
  .max(9, "That postcode looks too long")
  .regex(/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/, "Please check the postcode");

/** UK phone number — accepts spaces, +44 and 0-prefixed forms. */
const ukPhone = z
  .string()
  .trim()
  .min(10, "Please enter a full phone number")
  .max(20, "That number looks too long")
  .regex(/^(\+44\s?|0)[\d\s-]{9,}$/, "Please check the phone number");

export const quoteSchema = z.object({
  interest: z.enum(INTERESTS, { message: "Please choose what you are interested in" }),

  floorType: z.enum(FLOOR_TYPES).optional(),

  rooms: z.array(z.enum(ROOMS)).min(1, "Please choose at least one room"),

  /** Free text. Deliberately not a rigid width × length form — people measure in all sorts of ways. */
  dimensions: z.string().trim().max(1000).optional(),
  needsMeasuring: z.boolean(),

  supply: z.enum(SUPPLY).optional(),

  timing: z.enum(TIMING, { message: "Please tell us roughly when" }),

  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: ukPhone,
  email: z.email("Please check the email address").max(120).or(z.literal("")).optional(),
  postcode,
  preferredContact: z.enum(CONTACT_METHODS),

  notes: z.string().trim().max(2000).optional(),

  /** Photo metadata only — see the API route for why the files themselves are handled separately. */
  photos: z
    .array(z.object({ name: z.string().max(255), size: z.number().int().nonnegative() }))
    .max(8)
    .optional(),

  /**
   * Honeypot. A real person never sees or fills this; most naive bots fill
   * every input they find. Free, invisible, and catches a surprising amount
   * before any rate limiting is needed.
   */
  company: z.string().max(0).optional(),
});

export type QuoteData = z.infer<typeof quoteSchema>;

/* -------------------------------------------------------------------------- */
/* Upload rules — enforced on both sides                                      */
/* -------------------------------------------------------------------------- */

export const MAX_PHOTOS = 8;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB each
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export function validatePhoto(file: { type: string; size: number }): string | null {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return "Photos only, please — JPG, PNG, WEBP or HEIC.";
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return "That photo is over 8MB. Most phones can send a smaller version.";
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/* Display labels                                                             */
/* -------------------------------------------------------------------------- */

export const INTEREST_LABELS: Record<(typeof INTERESTS)[number], string> = {
  flooring: "Flooring",
  furniture: "Furniture",
  blinds: "Blinds",
  "whole-home": "A whole-home project",
};

export const FLOOR_TYPE_LABELS: Record<(typeof FLOOR_TYPES)[number], string> = {
  carpet: "Carpet",
  lvt: "LVT",
  laminate: "Laminate",
  vinyl: "Vinyl",
  "not-sure": "Not sure yet",
};

export const SUPPLY_LABELS: Record<(typeof SUPPLY)[number], string> = {
  "supply-only": "Supply only",
  "supply-and-fit": "Supply and fit",
  "not-sure": "Not sure yet",
};

export const TIMING_LABELS: Record<(typeof TIMING)[number], string> = {
  asap: "As soon as possible",
  "1-2-weeks": "In the next week or two",
  "this-month": "This month",
  researching: "Just researching for now",
};

export const CONTACT_LABELS: Record<(typeof CONTACT_METHODS)[number], string> = {
  phone: "Phone call",
  whatsapp: "WhatsApp",
  email: "Email",
};
