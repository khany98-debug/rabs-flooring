import Link from "next/link";
import { Media } from "./Media";
import { Badge } from "./Layout";
import { cn } from "@/lib/utils";
import { PITCH_MODE, SAMPLE_LABEL } from "@/content/pitch";
import type { Project } from "@/content/projects";
import type { Article } from "@/content/articles";
import { formatDate } from "@/lib/utils";

/**
 * Marks any structural example content while the site is in pitch mode, so a
 * layout placeholder is never mistaken for a real RABS project or review.
 */
export function SampleTag({ className }: { className?: string }) {
  if (!PITCH_MODE) return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute left-3 top-3 z-10 bg-ink/85 px-2 py-1 type-eyebrow text-[9px] text-gold/90 backdrop-blur-sm",
        className,
      )}
    >
      {SAMPLE_LABEL}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Category card                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Editorial category tile. The whole card is one link (a card with a nested
 * "View range" anchor would give screen readers two links to the same place),
 * and the label sits over the image rather than in a box beneath it — which is
 * what keeps the homepage grid feeling like a retail magazine rather than a
 * directory listing.
 */
export function CategoryCard({
  name,
  href,
  image,
  line,
  tall = false,
  priority = false,
}: {
  name: string;
  href: string;
  image: string;
  line: string;
  tall?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className="media-zoom group relative block overflow-hidden bg-ink focus-visible:outline-offset-4"
    >
      <div className={cn("relative w-full", tall ? "aspect-[3/4]" : "aspect-[4/5] sm:aspect-square")}>
        <Media
          slot={image}
          alt={
            PITCH_MODE
              ? `AI-generated concept image of ${name} for the RABS Flooring proposal`
              : `${name} at the RABS Flooring showroom`
          }
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          priority={priority}
        />
        <div className="scrim-card absolute inset-0" aria-hidden="true" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <span className="rule-gold mb-2.5 block h-px w-8 transition-all duration-500 ease-[var(--ease-brand)] group-hover:w-14" />
          <h3 className="type-editorial text-lg text-white sm:text-xl">{name}</h3>
          <p className="mt-1 text-[11px] leading-snug text-white/60">{line}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 type-eyebrow text-[10px] text-gold">
            View range
            <svg
              aria-hidden="true"
              viewBox="0 0 20 12"
              className="h-2.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Project card                                                               */
/* -------------------------------------------------------------------------- */

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/our-work/${project.slug}`}
      className="media-zoom group relative block overflow-hidden bg-ink focus-visible:outline-offset-4"
    >
      {project.isExample && <SampleTag />}
      <div className="relative aspect-[4/3] w-full">
        <Media
          slot={`projects/${project.images[0]}`}
          alt={project.isExample ? `${project.title} — concept layout image` : project.title}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          priority={priority}
          hint="Installation photo"
        />
        <div className="scrim-card absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Badge tone="gold" className="mb-3">
            {project.category}
          </Badge>
          <h3 className="type-editorial text-xl text-white">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">
            {project.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Article card                                                               */
/* -------------------------------------------------------------------------- */

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/inspiration/${article.slug}`}
      className="media-zoom group flex flex-col overflow-hidden border border-stone/70 bg-white transition-colors duration-300 hover:border-champagne focus-visible:outline-offset-4"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
        <Media
          slot={article.image}
          alt=""
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="type-eyebrow text-burgundy">{article.category}</span>
        <h3 className="type-editorial mt-3 text-xl text-ink">{article.title}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        <p className="mt-5 text-[11px] text-muted/80">
          {formatDate(article.published)} · {article.readMinutes} min read
        </p>
      </div>
    </Link>
  );
}
