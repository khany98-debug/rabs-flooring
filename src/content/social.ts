/**
 * SOCIAL WALL — maps to a `socialPost` document type in the CMS.
 *
 * Deliberately NOT an Instagram embed. The official widget pulls in a large
 * third-party script, blocks the main thread, is a privacy/consent problem and
 * breaks whenever the API changes. Instead RABS curates a handful of posts:
 * the image is downloaded into /public/media/social (never hotlinked from the
 * Instagram CDN, which rotates its URLs and would leave dead images), and the
 * card links out to the original post.
 *
 * The Instagram profile could not be read programmatically, so these are empty
 * slots with the caption describing what belongs there. See docs/ASSETS.md.
 */

export type SocialKind = "New stock" | "Offer" | "Showroom" | "Installation" | "Behind the scenes";

export interface SocialPost {
  id: string;
  /** Asset slot under /public/media/social/ */
  image: string;
  /** Short caption shown on the card — not the full Instagram caption. */
  caption: string;
  kind: SocialKind;
  /** Deep link to the original post. Falls back to the profile. */
  href: string;
  isVideo: boolean;
}

const PROFILE = "https://www.instagram.com/rabsflooring/";

export const socialPosts: SocialPost[] = [
  { id: "s1", image: "post-1", caption: "New in the showroom", kind: "New stock", href: PROFILE, isVideo: false },
  { id: "s2", image: "post-2", caption: "This week’s offer", kind: "Offer", href: PROFILE, isVideo: false },
  { id: "s3", image: "post-3", caption: "Inside the showroom", kind: "Showroom", href: PROFILE, isVideo: true },
  { id: "s4", image: "post-4", caption: "Fitted last week", kind: "Installation", href: PROFILE, isVideo: false },
  { id: "s5", image: "post-5", caption: "Behind the scenes", kind: "Behind the scenes", href: PROFILE, isVideo: false },
  { id: "s6", image: "post-6", caption: "Just landed", kind: "New stock", href: PROFILE, isVideo: false },
];
