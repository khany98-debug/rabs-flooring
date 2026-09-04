import type { ReactNode, ElementType } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Container                                                                  */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        wide ? "max-w-[1680px]" : "max-w-[1360px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * `tone` drives the page's vertical rhythm. The homepage deliberately
 * alternates ink → ivory → imagery → oxblood → ivory so no two adjacent
 * sections share a ground. Monotone pages are the fastest way to make a retail
 * site feel like a template.
 */
export type SectionTone = "ivory" | "parchment" | "ink" | "oxblood" | "burgundy" | "none";

const toneClasses: Record<SectionTone, string> = {
  ivory: "bg-ivory text-body",
  parchment: "bg-parchment text-body",
  ink: "bg-ink text-white",
  oxblood: "bg-oxblood text-white",
  burgundy: "bg-burgundy text-white",
  none: "",
};

export function Section({
  children,
  tone = "parchment",
  className,
  id,
  as: Tag = "section",
  padded = true,
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
  as?: ElementType;
  padded?: boolean;
  "aria-labelledby"?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative",
        toneClasses[tone],
        padded && "py-16 sm:py-20 lg:py-28",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading                                                            */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onDark = false,
  id,
  action,
  size = "lg",
}: {
  eyebrow?: string;
  /** Pass an array for a two-line display lockup. */
  title: string | [string, string];
  lead?: string;
  align?: "left" | "center";
  onDark?: boolean;
  id?: string;
  /** Optional link on the right of the heading row (desktop). */
  action?: { label: string; href: string };
  size?: "md" | "lg";
}) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action && "sm:flex-row sm:items-end sm:justify-between",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && (
          <div
            className={cn(
              "mb-4 flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            <span className="rule-gold h-px w-8" aria-hidden="true" />
            <span
              className={cn(
                "type-eyebrow",
                onDark ? "text-gold" : "text-burgundy",
              )}
            >
              {eyebrow}
            </span>
          </div>
        )}

        <h2
          id={id}
          className={cn(
            "type-display",
            size === "lg"
              ? "text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem]"
              : "text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem]",
            onDark ? "text-white" : "text-ink",
          )}
        >
          {lines.map((line, i) => (
            <span key={line} className="block">
              {/* Second line drops to gold — the brand's headline signature. */}
              <span className={i === 1 ? (onDark ? "text-gold" : "text-burgundy") : undefined}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        {lead && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
              onDark ? "text-white/70" : "text-muted",
            )}
          >
            {lead}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className={cn(
            "group/act inline-flex shrink-0 items-center gap-2 self-start pb-2 type-eyebrow sm:self-end",
            onDark ? "text-gold hover:text-gold-soft" : "text-burgundy hover:text-ruby",
          )}
        >
          {action.label}
          <svg
            aria-hidden="true"
            viewBox="0 0 20 12"
            className="h-3 w-4 transition-transform duration-300 group-hover/act:translate-x-1 motion-reduce:group-hover/act:translate-x-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
          </svg>
        </Link>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */

export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "red" | "outline";
  className?: string;
}) {
  const tones = {
    gold: "bg-gold text-ink",
    red: "bg-burgundy text-white",
    outline: "border border-current text-current",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 type-eyebrow leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumbs                                                                */
/* -------------------------------------------------------------------------- */

export function Breadcrumbs({
  crumbs,
  onDark = false,
}: {
  crumbs: { name: string; href: string }[];
  onDark?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs", onDark ? "text-white/55" : "text-muted")}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={onDark ? "text-white/85" : "text-body"}>
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className={cn(
                    "inline-flex min-h-6 items-center hover:underline",
                    onDark ? "hover:text-gold" : "hover:text-burgundy",
                  )}
                >
                  {c.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
