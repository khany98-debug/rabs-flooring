import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";
import { footerNav, legalNav } from "@/content/nav";
import {
  brand,
  phone,
  email,
  showroom,
  openingHours,
  hoursStatus,
  social,
  fullAddress,
} from "@/content/site";
import { formatTime } from "@/lib/utils";
import { PhoneLink, WhatsAppLink } from "./ContactLinks";

/**
 * Grouped opening hours: consecutive days that share the same times collapse
 * into a single row ("Monday – Sunday"), which is how a person would write it.
 */
function groupedHours() {
  const rows: { label: string; time: string }[] = [];
  let start = 0;

  const timeOf = (i: number) => {
    const h = openingHours[i];
    return h.opens && h.closes ? `${formatTime(h.opens)} – ${formatTime(h.closes)}` : "Closed";
  };

  for (let i = 1; i <= openingHours.length; i++) {
    if (i === openingHours.length || timeOf(i) !== timeOf(start)) {
      const label =
        start === i - 1
          ? openingHours[start].day
          : `${openingHours[start].day} – ${openingHours[i - 1].day}`;
      rows.push({ label, time: timeOf(start) });
      start = i;
    }
  }
  return rows;
}

export function Footer() {
  const hours = groupedHours();

  return (
    <footer className="bg-ink text-white/70">
      <Container wide>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2.4fr] lg:gap-16 lg:py-20">
          {/* Brand + contact */}
          <div>
            <Logo className="w-36" />

            <p className="mt-7 max-w-xs text-sm leading-relaxed">
              Flooring, furniture and professional fitting from our showroom in{" "}
              {showroom.locality.value}, {showroom.city}.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <PhoneLink
                location="footer"
                className="flex min-h-11 items-center text-lg text-white hover:text-gold"
              >
                {phone.display}
              </PhoneLink>

              <a
                href={`mailto:${email.value}`}
                className="flex min-h-11 items-center break-all hover:text-gold"
              >
                {email.value}
              </a>

              <address className="not-italic leading-relaxed">
                {showroom.line1.value}
                <br />
                {showroom.locality.value}, {showroom.city}
                <br />
                {showroom.postcode.value}
              </address>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppLink
                location="footer"
                className="inline-flex min-h-11 items-center border border-white/20 px-4 type-eyebrow text-[10px] text-white hover:border-gold hover:text-gold"
              >
                WhatsApp
              </WhatsAppLink>
              <a
                href={social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center border border-white/20 px-4 type-eyebrow text-[10px] text-white hover:border-gold hover:text-gold"
              >
                Instagram
              </a>
              <a
                href={social.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center border border-white/20 px-4 type-eyebrow text-[10px] text-white hover:border-gold hover:text-gold"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Link columns + hours */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="type-eyebrow mb-5 text-gold">{col.title}</p>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="sm:col-span-2 lg:col-span-4">
              <div className="mt-4 border-t border-white/10 pt-8">
                <p className="type-eyebrow mb-5 text-gold">Opening hours</p>
                <dl className="grid gap-x-10 gap-y-2 text-sm sm:grid-cols-2 lg:max-w-xl">
                  {hours.map((row) => (
                    <div key={row.label} className="flex justify-between gap-6 border-b border-white/[0.06] pb-2">
                      <dt>{row.label}</dt>
                      <dd className="text-white/85">{row.time}</dd>
                    </div>
                  ))}
                </dl>
                {hoursStatus !== "verified" && (
                  <p className="mt-4 text-xs text-white/45">
                    Please call before travelling to confirm we are open — hours can change around
                    bank holidays.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/45">
            &copy; {new Date().getFullYear()} {brand.legalName}. Registered in England &amp; Wales,
            company no. {brand.companyNumber}.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-6 items-center py-0.5 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="sr-only">{fullAddress}</p>
      </Container>
    </footer>
  );
}
