import { Section, Container, SectionHeading } from "@/components/ui/Layout";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { socialPosts } from "@/content/social";
import { social } from "@/content/site";

/**
 * "See what's happening at RABS."
 *
 * Deliberately not the Instagram embed. That widget pulls a large third-party
 * script, costs a chunk of the performance budget, sets cookies before consent
 * and breaks whenever Meta changes the API.
 *
 * Instead: curated posts whose images live in /public/media/social, each card
 * linking out to the original post. Faster, consent-clean, and RABS keeps
 * control of which six things a first-time visitor sees.
 */
export function SocialWall() {
  if (socialPosts.length === 0) return null;

  return (
    <Section tone="parchment" aria-labelledby="social-title">
      <Container wide>
        <SectionHeading
          id="social-title"
          eyebrow={social.instagram.handle}
          title={["See what's happening", "at RABS."]}
          lead="New stock, current offers and jobs we have just finished."
          action={{ label: "Follow us on Instagram", href: social.instagram.href }}
        />

        <ul className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          {socialPosts.slice(0, 6).map((post, i) => (
            <Reveal key={post.id} delay={Math.min(i, 5) * 0.04}>
              <li>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-zoom group relative block aspect-square overflow-hidden bg-ink"
                >
                  <Media
                    slot={`social/${post.image}`}
                    alt={post.caption}
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 16vw"
                    hint={post.kind}
                  />
                  <div className="scrim-card absolute inset-0 opacity-90" aria-hidden="true" />

                  {post.isVideo && (
                    <span className="absolute right-2.5 top-2.5" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white drop-shadow" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  )}

                  <span className="absolute inset-x-0 bottom-0 p-3">
                    <span className="type-eyebrow block text-[9px] text-gold">{post.kind}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-white/75">
                      {post.caption}
                    </span>
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
