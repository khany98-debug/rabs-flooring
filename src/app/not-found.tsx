import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { PhoneLink } from "@/components/layout/ContactLinks";
import { phone } from "@/content/site";

/**
 * A 404 that still does a job: the four things most people were probably
 * looking for, plus the phone number. Sending someone to a dead end with a
 * "go home" link wastes a visit that was one click from an enquiry.
 */
export default function NotFound() {
  return (
    <div className="bg-ink py-20 text-white sm:py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="type-eyebrow text-gold">404</p>
          <h1 className="type-display mt-5 text-[2.5rem] leading-[0.9] sm:text-[3.5rem]">
            <span className="block">That page has</span>
            <span className="block text-gold">moved on.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/65">
            It might have been part of our old site. Here is where most people are heading.
          </p>

          <ul className="mt-10 grid gap-2 sm:grid-cols-2">
            {[
              { label: "Flooring", href: "/flooring" },
              { label: "Furniture", href: "/furniture" },
              { label: "Current offers", href: "/offers" },
              { label: "The showroom", href: "/showroom" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-14 items-center justify-center border border-white/20 px-5 type-eyebrow text-[11px] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/get-a-quote" variant="gold" size="lg" arrow>
              Get a free quote
            </Button>
            <PhoneLink
              location="not_found"
              className="inline-flex min-h-11 items-center justify-center border border-white/30 px-8 py-4 type-eyebrow text-[13px] text-white transition-colors hover:border-gold hover:text-gold"
            >
              Call {phone.display}
            </PhoneLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
