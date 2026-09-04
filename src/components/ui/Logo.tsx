import Image from "next/image";
import { resolveMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * RABS lockup.
 *
 * The real logo is a circular badge with a horse motif and a metallic gold
 * treatment. That artwork was not available, so this is a typographic stand-in
 * built from the same ingredients — condensed caps, a gold gradient and the
 * tagline set small beneath a hairline rule.
 *
 * Drop the supplied vector at /public/media/brand/logo.svg and this component
 * uses it automatically. Nothing else needs to change.
 */
export function Logo({
  className,
  onDark = true,
  showTagline = true,
}: {
  className?: string;
  onDark?: boolean;
  showTagline?: boolean;
}) {
  const supplied = resolveMedia("brand/logo");

  if (supplied.src) {
    return (
      <Image
        src={supplied.src}
        alt="RABS Flooring — Turning Houses Into Homes"
        width={200}
        height={64}
        priority
        className={cn("h-auto w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className="type-display text-[1.75rem] sm:text-[2rem]"
        style={{
          background:
            "linear-gradient(178deg, #f0d99a 0%, #e2b64e 38%, #c99a3e 62%, #8f6a24 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          letterSpacing: "0.02em",
        }}
      >
        RABS
      </span>
      {showTagline && (
        <>
          <span className="rule-gold mt-1 h-px w-full" aria-hidden="true" />
          <span
            className={cn(
              "mt-1 font-sans text-[7px] font-semibold uppercase tracking-[0.22em]",
              onDark ? "text-white/65" : "text-ink/60",
            )}
          >
            Turning Houses Into Homes
          </span>
        </>
      )}
    </span>
  );
}
