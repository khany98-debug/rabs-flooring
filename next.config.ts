import type { NextConfig } from "next";

/**
 * PITCH MODE
 * ----------
 * While this build lives on a Vercel preview domain it must never compete with
 * rabsflooring.co.uk in search. `NEXT_PUBLIC_INDEXABLE` gates every indexing
 * signal (this header, robots.ts and the metadata robots directives).
 * Set NEXT_PUBLIC_INDEXABLE=true only once the production domain is live.
 */
const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: indexable
          ? security
          : [
              ...security,
              { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
            ],
      },
    ];
  },
};

export default nextConfig;
