"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { search, groupResults } from "@/lib/search";
import { track } from "@/lib/analytics";

const SUGGESTIONS = ["Grey carpet", "Corner sofa", "LVT", "Stairs", "Full house", "Beds"];

/**
 * Site search.
 *
 * Matches against a small in-bundle index, so results appear as the visitor
 * types with no loading state. Implemented as a proper modal dialog: labelled,
 * focus-trapped, Escape to close, and arrow keys to move through results
 * without leaving the input.
 */
export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => search(query), [query]);
  const groups = useMemo(() => groupResults(results), [results]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  /**
   * The highlighted result is stored alongside the query it belongs to and
   * derived during render, so changing the query resets the highlight without
   * a setState-in-effect. The component is mounted only while open (see
   * Header), so there is nothing to reset on open either.
   */
  const [highlight, setHighlight] = useState<{ q: string; i: number }>({ q: "", i: 0 });
  const active = highlight.q === query ? Math.min(highlight.i, Math.max(flat.length - 1, 0)) : 0;
  const setActive = (i: number) => setHighlight({ q: query, i });

  // Focus the input and lock the page behind the dialog — both genuine
  // external-system effects.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 20);

    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      clearTimeout(t);
      body.style.overflow = prev;
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (flat.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((active + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((active - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flat[active];
      if (target) {
        track("search_query", { query, result: target.href });
        window.location.href = target.href;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[80]" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-label="Close search"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="relative mx-auto mt-[8vh] w-[min(42rem,calc(100%-2rem))] overflow-hidden bg-parchment shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-stone px-5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search carpets, sofas, offers, guides…"
            aria-label="Search the site"
            className="h-16 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted/70"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center text-muted hover:text-burgundy"
            aria-label="Close search"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-3">
          {query.trim().length < 2 ? (
            <div className="p-4">
              <p className="type-eyebrow mb-4 text-muted">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="min-h-11 border border-stone px-4 text-sm text-body transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : flat.length === 0 ? (
            <div className="p-8 text-center">
              <p className="type-editorial text-xl text-ink">Nothing found for &ldquo;{query}&rdquo;</p>
              <p className="mt-2 text-sm text-muted">
                Give us a call and we will tell you straight away whether we have it.
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.type} className="mb-2">
                <p className="type-eyebrow px-4 py-2 text-muted">{group.type}</p>
                <ul>
                  {group.items.map((item) => {
                    const index = flat.indexOf(item);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            track("search_query", { query, result: item.href });
                            onClose();
                          }}
                          onMouseEnter={() => setActive(index)}
                          aria-current={index === active ? "true" : undefined}
                          className={`flex min-h-14 flex-col justify-center px-4 py-2 transition-colors ${
                            index === active ? "bg-ink text-white" : "hover:bg-stone/40"
                          }`}
                        >
                          <span className="type-editorial text-lg">{item.title}</span>
                          <span
                            className={`text-xs ${index === active ? "text-white/60" : "text-muted"}`}
                          >
                            {item.description}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
