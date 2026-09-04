import manifest from "./media-manifest.json";

/**
 * ASSET RESOLVER
 *
 * RABS has a large library of genuine showroom, product and installation
 * photography on Instagram. It could not be downloaded programmatically
 * (Instagram blocks it, and hotlinking their CDN is not an option — those URLs
 * rotate and would leave dead images across the site).
 *
 * So every image is referenced by a stable *slot id* rather than a file path.
 * `resolveMedia("flooring/carpets")` looks the slot up in a manifest generated
 * from /public/media before each dev run and build, and returns the file if one
 * exists. If not, <Media> renders a branded plate instead of a broken image.
 *
 * The practical effect: RABS drops their photos into /public/media using the
 * filenames in docs/ASSETS.md, and the entire site becomes real with no code
 * changes. Nothing is ever silently replaced with stock or AI imagery.
 *
 * The manifest is a plain JSON import rather than a filesystem scan because
 * this runs inside client components too (the header renders the Logo), and
 * `node:fs` cannot be bundled for the browser.
 */

/** Ordered by preference — modern formats first. */
const EXTENSIONS = [".avif", ".webp", ".jpg", ".jpeg", ".png", ".svg"] as const;

const available = new Set(manifest as string[]);

export interface ResolvedMedia {
  /** Public URL, or null when no file has been supplied yet. */
  src: string | null;
  /** The slot id — used for the placeholder label and as a stable React key. */
  slot: string;
}

export function resolveMedia(slot: string): ResolvedMedia {
  for (const ext of EXTENSIONS) {
    const candidate = `${slot}${ext}`;
    if (available.has(candidate)) {
      return { src: `/media/${candidate}`, slot };
    }
  }
  return { src: null, slot };
}

/** How many slots are still waiting on real photography. */
export function mediaStats(slots: string[]) {
  const supplied = slots.filter((s) => resolveMedia(s).src !== null).length;
  return { total: slots.length, supplied, missing: slots.length - supplied };
}
