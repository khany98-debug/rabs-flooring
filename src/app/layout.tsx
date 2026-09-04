import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { PitchBanner } from "@/components/layout/PitchBanner";
import { localBusinessSchema, websiteSchema, jsonLd } from "@/lib/schema";
import { brand, siteUrl, isIndexable } from "@/content/site";

/**
 * Two families, subset to Latin only, both self-hosted by next/font so there
 * is no render-blocking request to Google and no layout shift when they swap.
 *
 * Barlow Condensed carries the promotional, retail energy RABS already has on
 * social. Manrope keeps the body copy calm and highly readable underneath it —
 * the contrast between the two is what stops the site reading as a sale poster.
 */
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} | Flooring, Furniture & Fitting in Stoke-on-Trent`,
    template: `%s | ${brand.name}`,
  },
  description: brand.positioning,
  applicationName: brand.name,
  // Belt and braces with robots.ts and the X-Robots-Tag header in next.config.
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0909",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body>
        <PitchBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <CookieBanner />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([localBusinessSchema(), websiteSchema()])}
        />
      </body>
    </html>
  );
}
