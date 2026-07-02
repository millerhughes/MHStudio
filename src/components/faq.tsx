"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

const faqs = [
  {
    q: "How much does a website actually cost?",
    a: "Every site is priced per project and scales with the work. You get one fixed price agreed before anything starts. No hourly billing, no surprise invoices. Tell me what you need and I will give you a clear number.",
  },
  {
    q: "How long does it take?",
    a: "Most sites go live in about a week from our first call. Bigger builds take longer, but you'll always know the timeline up front.",
  },
  {
    q: "Do I have to write all the content?",
    a: "No. Tell me about your business and I will write the copy with you. If you have content and photos ready, even better. We will use them.",
  },
  {
    q: "Can I edit the site myself later?",
    a: "You can, but you do not have to. The care plan means I make your changes for you, usually same day. No wrestling with a clunky editor.",
  },
  {
    q: "Do I own the website?",
    a: "Completely. The site, the code and the content are yours from day one. If you ever leave the care plan, you take everything with you.",
  },
  {
    q: "I already have a website. Is it worth redoing?",
    a: "If it's slow, hard to use on a phone, or not bringing enquiries in, yes. Send me the link and I'll tell you honestly whether a rebuild is worth it.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border bg-panel">
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <span className="mark-label">FAQ</span>
          <h2 className="mt-3 text-[clamp(1.9rem,1.1rem+2.4vw,3rem)]">
            The questions every owner asks.
          </h2>
          <p className="mt-4 max-w-xs text-muted">
            Straight answers. Anything else, just email me. I reply myself.
          </p>
        </Reveal>

        <Reveal as="ul" className="flex flex-col">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-t border-border first:border-t-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[1.05rem] font-medium tracking-tight">{f.q}</span>
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-primary transition-transform duration-300 ease-[var(--ease-out-quint)]"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14">
                      <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-quint)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-muted">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
