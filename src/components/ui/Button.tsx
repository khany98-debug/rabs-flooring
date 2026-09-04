import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The one button in the system.
 *
 * `gold` is the primary conversion action (Get a free quote) and is used
 * sparingly — one per viewport wherever possible, so it never stops meaning
 * "this is the thing to press".
 *
 * `onDark` switches the outline variants to a light keyline, because the site
 * alternates between ink/oxblood grounds and ivory ones and an outline button
 * has to work on both.
 *
 * NOTE: do not pass a display utility (`hidden`, `block`, `inline-flex`) via
 * `className`. The base styles already set `inline-flex`, and when two display
 * utilities are present the winner is decided by their order in the generated
 * stylesheet, not by the class attribute — so `hidden sm:inline-flex` silently
 * fails to hide the button. Wrap it in a `<span className="hidden sm:block">`
 * instead.
 */

type Variant = "gold" | "red" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-sans font-bold uppercase tracking-[0.1em] " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-brand)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 " +
  // 44px minimum touch target on every size.
  "min-h-11";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[11px]",
  md: "px-6 py-3.5 text-xs",
  lg: "px-8 py-4 text-[13px]",
};

function variantClasses(variant: Variant, onDark: boolean): string {
  switch (variant) {
    case "gold":
      return "bg-gold text-ink hover:bg-gold-soft";
    case "red":
      return "bg-burgundy text-white hover:bg-ruby";
    case "outline":
      return onDark
        ? "border border-white/30 text-white hover:border-gold hover:text-gold"
        : "border border-ink/25 text-ink hover:border-burgundy hover:text-burgundy";
    case "ghost":
      return onDark
        ? "text-white/80 hover:text-gold"
        : "text-ink/75 hover:text-burgundy";
  }
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
  /** Arrow that slides on hover. Used on forward-motion CTAs. */
  arrow?: boolean;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 12"
      className="h-3 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover/btn:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/btn:translate-x-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "gold", size = "md", onDark = false, className, children, arrow = false } = props;

  const classes = cn(base, sizes[size], variantClasses(variant, onDark), className);
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      onDark: _d,
      className: _c,
      children: _ch,
      arrow: _a,
      ...linkProps
    } = props;
    return (
      <Link {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    onDark: _d,
    className: _c,
    children: _ch,
    arrow: _a,
    href: _h,
    ...buttonProps
  } = props;

  return (
    <button {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
