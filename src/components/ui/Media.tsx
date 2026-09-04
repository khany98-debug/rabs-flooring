import Image from "next/image";
import { resolveMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * The single image primitive for the whole site.
 *
 * Supplied a real file → renders an optimised next/image (AVIF/WebP, correct
 * sizes, lazy below the fold).
 *
 * No file yet → renders a branded plate: an oxblood/ink gradient with the
 * woven texture and a gold keyline, varied per slot so a grid of them does not
 * look like six copies of the same tile. It reads as a designed surface rather
 * than a broken image, which matters when this is going in front of a client.
 *
 * Either way the layout is identical, so dropping the real photography in
 * changes nothing about the page structure.
 */

export interface MediaProps {
  /** Slot id, e.g. "flooring/carpets". See docs/ASSETS.md. */
  slot: string;
  alt: string;
  /** Fills its positioned parent. The default for every card and hero. */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Shown on the placeholder so RABS can see exactly which photo is wanted. */
  hint?: string;
}

/** Deterministic per-slot variation so grids of plates do not look identical. */
function variantOf(slot: string) {
  let hash = 0;
  for (let i = 0; i < slot.length; i++) hash = (hash * 31 + slot.charCodeAt(i)) >>> 0;
  const angle = 100 + (hash % 60); // 100–160deg
  const mid = hash % 3; // which brand red sits in the middle
  const reds = ["#560909", "#761010", "#3d0a0a"];
  return { angle, red: reds[mid] };
}

export function Media({
  slot,
  alt,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className,
  hint,
}: MediaProps) {
  const { src } = resolveMedia(slot);

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width: width ?? 1200, height: height ?? 800 })}
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const { angle, red } = variantOf(slot);

  return (
    <div
      data-media-fill
      data-media-slot={slot}
      /**
       * A decorative image (alt="") must not be announced at all. Giving it
       * role="img" with an empty label leaves screen readers with an
       * unlabelled image role, which is worse than being skipped entirely.
       */
      {...(alt
        ? { role: "img" as const, "aria-label": alt }
        : { "aria-hidden": true as const })}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        !fill && "relative",
        className,
      )}
      style={{
        background: `linear-gradient(${angle}deg, #0a0909 0%, ${red} 58%, #0a0909 100%)`,
      }}
    >
      <div className="texture-weave absolute inset-0 opacity-60" />

      {/* Gold keyline — the logo's metallic rule, used as a frame. */}
      <div className="absolute inset-3 border border-[color-mix(in_srgb,var(--color-champagne)_38%,transparent)]" />

      {/* Home-outline motif, very quiet. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.4"
      >
        <path d="M12 46 L50 16 L88 46" strokeLinecap="square" />
        <path d="M22 44 V84 H78 V44" strokeLinecap="square" />
        <path d="M42 84 V62 H58 V84" strokeLinecap="square" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="rule-gold mb-2 h-px w-10" />
        <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-gold)_85%,white)]">
          {hint ?? "RABS photography"}
        </p>
        <p className="mt-0.5 font-mono text-[10px] leading-tight text-white/45">{slot}</p>
      </div>
    </div>
  );
}
