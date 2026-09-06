# Concept imagery for the proposal

The current pitch build includes AI-generated interior visuals so the client can
review the composition, tone and image treatment before RABS supplies approved
photography.

These images are intentionally limited to showroom atmosphere, flooring
categories, furniture categories, offers and the whole-home feature. They are
not photographs of the RABS showroom, a RABS installation, a specific product,
or a customer home. The pitch banner says this on every page while pitch mode is
enabled.

Before launch:

1. Replace the concept files in `public/media/` with approved RABS photography,
   keeping the same slot names.
2. Replace the example project content and remove any concept project assets.
3. Confirm the address, hours, offers, prices, reviews and map pin in
   `docs/CLIENT-CONFIRMATION.md`.
4. Set `NEXT_PUBLIC_PITCH_MODE=false` only after the real content and assets are
   in place.

The AI assets were generated from the supplied proposal screenshots as visual
references for palette and presentation only. No logos, text, customer
identities or location-specific signage were generated.
