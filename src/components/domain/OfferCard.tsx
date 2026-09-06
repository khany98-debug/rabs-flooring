import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";
import { hasRealPrice, type Offer } from "@/content/offers";
import { PITCH_MODE } from "@/content/pitch";

/**
 * Offer card.
 *
 * RABS is a genuinely offer-led business — that energy is a real asset and is
 * kept, not sanded off. What changes is the execution: a proper promotional
 * lockup with a diagonal flash and a clear price hierarchy, rather than the
 * usual red-and-yellow starburst.
 *
 * The price block has two states. When RABS supplies a real figure it renders
 * the full was/now lockup. Until then it renders "Ask in store" — a
 * placeholder price on a live retail site is both a trading-standards problem
 * and a fast way to lose a customer's trust at the door.
 *
 * `featured` switches to a horizontal split on desktop, so the lead campaign
 * runs full width instead of towering over the cards beside it.
 */
export function OfferCard({
  offer,
  featured = false,
}: {
  offer: Offer;
  featured?: boolean;
}) {
  const realPrice = hasRealPrice(offer);

  return (
    <article
      id={offer.slug}
      className={cn(
        "media-zoom group relative h-full overflow-hidden bg-charcoal text-white",
        featured ? "flex flex-col lg:grid lg:grid-cols-[1.15fr_1fr]" : "flex flex-col",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[24rem]" : "aspect-[16/11]",
        )}
      >
        <Media
          slot={`offers/${offer.image}`}
          alt={PITCH_MODE ? `AI-generated concept image for ${offer.title}` : offer.title}
          sizes={featured ? "(max-width: 1024px) 100vw, 52vw" : "(max-width: 640px) 100vw, 31vw"}
          hint="Offer image"
        />
        <div className="scrim-card absolute inset-0 lg:hidden" aria-hidden="true" />

        {offer.flash && (
          <div className="absolute right-0 top-0 z-10">
            <span
              className="block bg-burgundy px-4 py-2 type-eyebrow text-[10px] text-white"
              style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {offer.flash}
            </span>
          </div>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-10")}>
        <h3
          className={cn(
            "type-display leading-[0.95]",
            featured ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl",
          )}
        >
          {offer.title}
        </h3>

        <p className={cn("mt-3 text-sm leading-relaxed text-white/65", !featured && "flex-1")}>
          {offer.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/10 pt-5">
          {realPrice ? (
            <>
              {offer.priceUnit && (
                <span className="type-eyebrow text-[10px] text-white/50">{offer.priceUnit}</span>
              )}
              <span className="type-display text-3xl text-gold sm:text-4xl">
                {formatPrice(offer.priceNow as number)}
              </span>
              {offer.priceWas && (
                <span className="text-sm text-white/40 line-through">
                  {formatPrice(offer.priceWas)}
                </span>
              )}
            </>
          ) : (
            <span className="type-eyebrow text-[11px] text-gold">
              Ask in store for this week&rsquo;s price
            </span>
          )}
        </div>

        {offer.conditions.length > 0 && (
          <p className="mt-3 text-[11px] leading-relaxed text-white/40">{offer.conditions[0]}</p>
        )}

        <div className="mt-6">
          <Button href={offer.ctaHref} variant="gold" size="sm" arrow>
            {offer.ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
