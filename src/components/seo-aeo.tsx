import { Reveal } from "./reveal";

/**
 * SeoAeo — how the site actually gets found. Method-only by decision: describe
 * what I do and why it works, no promised metrics until real builds produce
 * numbers worth showing. Composition is deliberately different from the two
 * sticky compare sections around it: full-width intro, then method rows on the
 * left beside an illustrative "found in search + AI answer" proof card. A faint
 * blueprint grid ties the section to the proof-mark language and reads as the
 * technical foundation the copy talks about.
 */
const method = [
  {
    title: "Fast, clean foundations",
    body: "Google and AI both favour sites they can read quickly. Yours is built fast, mobile-first, and structured cleanly under the hood so search engines can make sense of it.",
  },
  {
    title: "Found on your doorstep",
    body: "Your Google Business Profile, map pin and location details set up properly, so you appear when someone nearby searches for what you do.",
  },
  {
    title: "The words your customers use",
    body: "Pages written around what people actually type, with clean titles and headings, so you rank for the searches that bring real work, not vanity traffic.",
  },
  {
    title: "Ready for AI answers (AEO)",
    body: "AEO means answer-engine optimisation: being picked by AI assistants like ChatGPT and Google's AI overviews. Your site is structured so they can read it and recommend you by name when someone asks for a business like yours.",
  },
  {
    title: "Kept climbing",
    body: "Search never sits still. On the care plan I keep watch: fresh content, fixes and steady improvements, so your ranking holds and grows.",
  },
];

export function SeoAeo() {
  return (
    <section
      id="getting-found"
      className="relative isolate border-t border-border bg-bg"
    >
      <div
        aria-hidden
        className="blueprint-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
      />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <span className="mark-label">Getting found</span>
          <h2 className="mt-3 text-[clamp(1.9rem,1.1rem+2.4vw,3rem)]">
            Built to be found, by Google and by AI.
          </h2>
          <p className="mt-5 text-muted">
            A beautiful site nobody finds is a poster left in a drawer. So every
            build is made to show up where your customers already look, and to
            be picked by the AI tools they now ask. It is part of the build, not
            an add-on, and there is no jargon for you to learn.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ul className="flex flex-col">
            {method.map((m, i) => (
              <Reveal
                as="li"
                key={m.title}
                delay={i * 60}
                className="border-t border-border py-6 first:border-t-0 first:pt-0"
              >
                <h3 className="text-[1.05rem] font-semibold tracking-tight text-ink">
                  {m.title}
                </h3>
                <p className="mt-2 max-w-xl text-[0.95rem] text-muted">
                  {m.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={80} className="lg:sticky lg:top-24 lg:self-start">
            <FoundProof />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Illustrative proof of the outcome: a demo build (Harbour & Vine, from the
 * Work section) shown as it would appear in a search result and inside an AI
 * answer. Abstracted on purpose (no real Google chrome) and labelled as an
 * illustration, per the honest-demo principle.
 */
function FoundProof() {
  return (
    <figure className="flex flex-col gap-4">
      {/* Search result */}
      <div className="rounded-2xl border border-border bg-panel p-5 sm:p-6">
        <span className="mark-label">Search result</span>
        <div className="mt-3 flex items-center gap-2 text-[0.8rem] text-muted">
          <span className="grid size-5 place-items-center rounded-full border border-border bg-bg text-[0.6rem] font-semibold text-primary">
            H
          </span>
          harbourandvine.co.uk
        </div>
        <p className="mt-1.5 text-[1.05rem] font-semibold tracking-tight text-primary">
          Harbour &amp; Vine — Coffee &amp; Brunch
        </p>
        <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">
          Book a table or order ahead. Open 8am, seven days, on the harbour
          front.
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-muted">
          <Stars />
          <span>4.9 · 210 reviews</span>
        </div>
      </div>

      {/* AI answer — the AEO differentiator, given a touch of primary weight */}
      <div className="rounded-2xl border border-primary/30 bg-panel p-5 shadow-[0_18px_50px_-34px_rgba(14,21,18,0.45)] sm:p-6">
        <div className="flex items-center justify-between">
          <span className="mark-label">AI answer</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary">
            AI
          </span>
        </div>
        <p className="mt-3 text-[0.9rem] font-medium text-ink">
          &ldquo;Where can I get brunch near me?&rdquo;
        </p>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">
          <span className="font-semibold text-primary">Harbour &amp; Vine</span>{" "}
          is a local favourite for coffee and weekend brunch on the harbour
          front. You can book a table straight from their site.
        </p>
      </div>

      <figcaption className="text-[0.8rem] text-muted">
        Illustration: a demo build showing up in search and in an AI answer.
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 16 16">
          <path
            d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.9 4.2 13.3l.7-4.3-3.1-3 4.3-.6z"
            fill="var(--primary)"
          />
        </svg>
      ))}
    </span>
  );
}
