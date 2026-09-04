"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

/**
 * FIND MY FLOOR
 *
 * A short guided narrowing-down, not a quiz with a fake "result". It answers
 * the single most common question in the showroom — "which type do I even want
 * for this room?" — and then hands the customer to a human.
 *
 * Two deliberate constraints:
 *
 *   1. It recommends CATEGORIES, never specific products, and never claims a
 *      product is "suitable" or "guaranteed" for a use. Suitability depends on
 *      the subfloor, the specification and the household — that is a
 *      conversation, not an algorithm, and pretending otherwise would be
 *      making a professional judgement the website is not entitled to make.
 *
 *   2. The reasoning is always shown. A recommendation with a visible "because"
 *      is useful even when the customer disagrees with it.
 *
 * Scoring is a transparent weighted tally over general material properties —
 * all of which are ordinary product facts, not claims about RABS.
 */

type Room = "living" | "bedroom" | "kitchen" | "hallway" | "stairs" | "bathroom";
type Priority = "kids" | "pets" | "traffic" | "water" | "warmth" | "budget";
type FloorKey = "carpets" | "lvt" | "laminate" | "vinyl";

const ROOMS: { key: Room; label: string }[] = [
  { key: "living", label: "Living room" },
  { key: "bedroom", label: "Bedroom" },
  { key: "kitchen", label: "Kitchen" },
  { key: "hallway", label: "Hallway" },
  { key: "stairs", label: "Stairs & landing" },
  { key: "bathroom", label: "Bathroom" },
];

const PRIORITIES: { key: Priority; label: string; hint: string }[] = [
  { key: "kids", label: "Young children", hint: "Spills and heavy use" },
  { key: "pets", label: "Pets", hint: "Claws and accidents" },
  { key: "traffic", label: "Busy household", hint: "Constant foot traffic" },
  { key: "water", label: "Gets wet", hint: "Splashes or damp" },
  { key: "warmth", label: "Warm underfoot", hint: "Comfort matters most" },
  { key: "budget", label: "Tighter budget", hint: "Best value for money" },
];

const FLOORS: Record<FloorKey, { name: string; href: string; blurb: string }> = {
  carpets: { name: "Carpet", href: "/flooring/carpets", blurb: "Warm, quiet and soft underfoot." },
  lvt: { name: "LVT", href: "/flooring/lvt", blurb: "Realistic, hard-wearing and water resistant." },
  laminate: { name: "Laminate", href: "/flooring/laminate", blurb: "A convincing wood look for less." },
  vinyl: { name: "Vinyl", href: "/flooring/vinyl", blurb: "Waterproof, warm and straightforward." },
};

/** Room suitability. Ordinary material properties, nothing RABS-specific. */
const ROOM_SCORES: Record<Room, Record<FloorKey, number>> = {
  living: { carpets: 5, lvt: 4, laminate: 4, vinyl: 1 },
  bedroom: { carpets: 5, lvt: 3, laminate: 3, vinyl: 1 },
  kitchen: { carpets: -4, lvt: 5, laminate: 1, vinyl: 5 },
  hallway: { carpets: 1, lvt: 5, laminate: 3, vinyl: 3 },
  stairs: { carpets: 5, lvt: 1, laminate: 1, vinyl: 0 },
  bathroom: { carpets: -5, lvt: 4, laminate: -3, vinyl: 5 },
};

const PRIORITY_SCORES: Record<Priority, Record<FloorKey, number>> = {
  kids: { carpets: 0, lvt: 3, laminate: 1, vinyl: 3 },
  pets: { carpets: -1, lvt: 3, laminate: 1, vinyl: 3 },
  traffic: { carpets: 0, lvt: 3, laminate: 1, vinyl: 1 },
  water: { carpets: -4, lvt: 3, laminate: -2, vinyl: 4 },
  warmth: { carpets: 4, lvt: 1, laminate: 0, vinyl: 2 },
  budget: { carpets: 2, lvt: 0, laminate: 3, vinyl: 3 },
};

/** The visible "because" line for the top recommendation. */
function reasonFor(floor: FloorKey, room: Room, priorities: Priority[]): string {
  const roomLabel = ROOMS.find((r) => r.key === room)?.label.toLowerCase() ?? "room";

  const reasons: string[] = [];
  if (floor === "carpets") reasons.push("it is the warmest and quietest option");
  if (floor === "lvt") reasons.push("it handles daily wear and moisture well");
  if (floor === "laminate") reasons.push("it gives a wood look at a lower cost");
  if (floor === "vinyl") reasons.push("it is waterproof and simple to look after");

  if (priorities.includes("pets") && (floor === "lvt" || floor === "vinyl"))
    reasons.push("accidents clean up completely rather than soaking into a pile");
  if (priorities.includes("warmth") && floor === "carpets")
    reasons.push("you told us warmth underfoot matters most");
  if (priorities.includes("budget") && (floor === "laminate" || floor === "vinyl"))
    reasons.push("it stretches a tighter budget furthest");
  if (room === "stairs" && floor === "carpets")
    reasons.push("stairs take more concentrated wear than anywhere else in the house");

  return `For a ${roomLabel}, ${reasons.slice(0, 2).join(", and ")}.`;
}

export function FlooringFinder() {
  const [room, setRoom] = useState<Room | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  const results = useMemo(() => {
    if (!room) return null;

    const totals = (Object.keys(FLOORS) as FloorKey[]).map((key) => {
      let score = ROOM_SCORES[room][key];
      for (const p of priorities) score += PRIORITY_SCORES[p][key];
      return { key, score };
    });

    return totals.sort((a, b) => b.score - a.score);
  }, [room, priorities]);

  const togglePriority = (p: Priority) => {
    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const reset = () => {
    setRoom(null);
    setPriorities([]);
  };

  return (
    <div className="border border-white/12 bg-charcoal">
      <div className="grid lg:grid-cols-[1fr_minmax(0,24rem)]">
        {/* Questions */}
        <div className="p-6 sm:p-9 lg:p-11">
          <fieldset>
            <legend className="type-eyebrow mb-1 text-gold">Step 1 — Which room?</legend>
            <p className="mb-5 text-sm text-white/50">Pick the room you are doing first.</p>
            <div className="flex flex-wrap gap-2">
              {ROOMS.map((r) => {
                const selected = room === r.key;
                return (
                  <button
                    key={r.key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setRoom(r.key);
                      track("category_view", { tool: "flooring_finder", room: r.key });
                    }}
                    className={cn(
                      "min-h-11 border px-4 text-sm transition-colors",
                      selected
                        ? "border-gold bg-gold text-ink"
                        : "border-white/20 text-white/80 hover:border-gold hover:text-gold",
                    )}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-10">
            <legend className="type-eyebrow mb-1 text-gold">Step 2 — What matters here?</legend>
            <p className="mb-5 text-sm text-white/50">Choose as many as apply, or none.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {PRIORITIES.map((p) => {
                const selected = priorities.includes(p.key);
                return (
                  <button
                    key={p.key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => togglePriority(p.key)}
                    className={cn(
                      "flex min-h-14 flex-col justify-center border px-4 py-2.5 text-left transition-colors",
                      selected
                        ? "border-gold bg-gold/10 text-white"
                        : "border-white/15 text-white/75 hover:border-white/35",
                    )}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "inline-flex h-4 w-4 shrink-0 items-center justify-center border",
                          selected ? "border-gold bg-gold text-ink" : "border-white/30",
                        )}
                      >
                        {selected && (
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="m2 6 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {p.label}
                    </span>
                    <span className="mt-0.5 pl-6 text-xs text-white/45">{p.hint}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {room && (
            <button
              type="button"
              onClick={reset}
              className="mt-8 min-h-11 type-eyebrow text-[10px] text-white/45 underline underline-offset-4 hover:text-gold"
            >
              Start again
            </button>
          )}
        </div>

        {/* Result */}
        <div className="border-t border-white/12 bg-ink p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
          <p className="type-eyebrow mb-5 text-gold">Where we would start</p>

          {!results ? (
            <div className="flex h-full min-h-[16rem] flex-col justify-center">
              <p className="type-editorial text-2xl text-white/30">
                Pick a room and we will point you in the right direction.
              </p>
            </div>
          ) : (
            <>
              <ol className="space-y-3">
                {results.slice(0, 3).map((r, i) => {
                  const floor = FLOORS[r.key];
                  return (
                    <li key={r.key}>
                      <Link
                        href={floor.href}
                        onClick={() => track("category_view", { from: "flooring_finder", category: r.key })}
                        className={cn(
                          "group flex items-start gap-4 border p-4 transition-colors",
                          i === 0
                            ? "border-gold bg-gold/[0.07]"
                            : "border-white/12 hover:border-white/30",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center type-eyebrow text-[10px]",
                            i === 0 ? "bg-gold text-ink" : "border border-white/20 text-white/50",
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="type-editorial block text-xl text-white group-hover:text-gold">
                            {floor.name}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-white/50">
                            {floor.blurb}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-5 border-l-2 border-champagne/50 pl-4 text-sm leading-relaxed text-white/65">
                {reasonFor(results[0].key, room!, priorities)}
              </p>

              <p className="mt-5 text-xs leading-relaxed text-white/40">
                A starting point, not a specification. What actually suits your room depends on the
                subfloor and the product — worth two minutes with someone who fits these every day.
              </p>

              <div className="mt-7">
                <Button href="/get-a-quote?interest=flooring" variant="gold" size="sm" arrow>
                  Get expert advice
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
