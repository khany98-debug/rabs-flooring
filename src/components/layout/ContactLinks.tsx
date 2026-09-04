"use client";

import type { ReactNode } from "react";
import { phone, whatsapp, directionsUrl } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Contact links live in their own client module so that server components —
 * the footer, showroom page, contact page — stay server-rendered while still
 * firing the conversion events that matter most to RABS (phone_click,
 * whatsapp_click, directions_click).
 */

export function PhoneLink({
  children,
  className,
  location,
}: {
  children: ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <a
      href={phone.href}
      className={className}
      onClick={() => track("phone_click", { location })}
    >
      {children}
    </a>
  );
}

export function WhatsAppLink({
  children,
  className,
  location,
}: {
  children: ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("whatsapp_click", { location })}
    >
      {children}
    </a>
  );
}

export function DirectionsLink({
  children,
  className,
  location,
}: {
  children: ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <a
      href={directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("directions_click", { location })}
    >
      {children}
    </a>
  );
}
