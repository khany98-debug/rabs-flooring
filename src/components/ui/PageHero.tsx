import type { ReactNode } from "react";
import { Media } from "./Media";
import { Container, Breadcrumbs } from "./Layout";
import { cn } from "@/lib/utils";

/**
 * Interior page hero.
 *
 * One component for every page below the homepage, so the site has a
 * consistent entry rhythm: breadcrumb, eyebrow, two-line display heading,
 * lead, actions. The photograph sits behind at low opacity with a directional
 * scrim rather than a flat black wash, which keeps the imagery readable as
 * texture without fighting the type.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageHint,
  crumbs,
  children,
  size = "md",
}: {
  eyebrow?: string;
  title: [string, string] | string;
  lead?: string;
  image: string;
  imageHint?: string;
  crumbs: { name: string; href: string }[];
  /** CTAs or filters rendered under the lead. */
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Media slot={image} alt="" priority sizes="100vw" hint={imageHint} />
        <div className="scrim-hero absolute inset-0" />
      </div>

      <Container wide>
        <div
          className={cn(
            "relative",
            size === "sm" && "py-12 sm:py-16",
            size === "md" && "py-16 sm:py-20 lg:py-24",
            size === "lg" && "py-20 sm:py-28 lg:py-36",
          )}
        >
          <Breadcrumbs crumbs={crumbs} onDark />

          <div className="mt-8 max-w-3xl">
            {eyebrow && (
              <div className="mb-5 flex items-center gap-3">
                <span className="rule-gold h-px w-8" aria-hidden="true" />
                <p className="type-eyebrow text-gold">{eyebrow}</p>
              </div>
            )}

            <h1
              className={cn(
                "type-display",
                size === "lg"
                  ? "text-[2.75rem] sm:text-[4rem] lg:text-[5rem]"
                  : "text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem]",
              )}
            >
              {lines.map((line, i) => (
                <span key={line} className="block">
                  <span className={i === 1 ? "text-gold" : undefined}>{line}</span>
                </span>
              ))}
            </h1>

            {lead && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">
                {lead}
              </p>
            )}

            {children && <div className="mt-9">{children}</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}
