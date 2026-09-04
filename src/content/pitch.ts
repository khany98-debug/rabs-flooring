/**
 * PITCH MODE
 * ──────────
 * This build is a client pitch. Some sections (projects, reviews, the social
 * wall) can only be filled with genuine RABS content that RABS supplies —
 * fabricating a customer project or a testimonial is not an option.
 *
 * So instead of leaving those sections empty and letting the design look
 * unfinished, they render *structural examples* which are:
 *
 *   • visibly tagged in the UI so nothing is ever passed off as real,
 *   • excluded from all structured data (no fake Review / AggregateRating),
 *   • removed completely the moment NEXT_PUBLIC_PITCH_MODE is not "true".
 *
 * Launch step: set NEXT_PUBLIC_PITCH_MODE=false, load the real content, done.
 */
export const PITCH_MODE = process.env.NEXT_PUBLIC_PITCH_MODE !== "false";

/** Label shown on any example content while the site is in pitch mode. */
export const SAMPLE_LABEL = "Layout example";
