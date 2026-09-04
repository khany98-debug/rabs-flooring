/** Tiny class-name joiner. Avoids pulling clsx in for one function. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** £1,299 — no trailing pence unless the price actually has them. */
export function formatPrice(pence: number): string {
  const hasPence = pence % 100 !== 0;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: hasPence ? 2 : 0,
    maximumFractionDigits: hasPence ? 2 : 0,
  }).format(pence / 100);
}

/** "9:00am" from "09:00". */
export function formatTime(t: string): string {
  const [hRaw, m] = t.split(":");
  const h = Number(hRaw);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m}${suffix}`;
}

/** "10 February 2026" */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
