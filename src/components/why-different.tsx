import { Reveal } from "./reveal";

const rows = [
  {
    usual: "An account manager, a sales team, and a junior building your site",
    ours: "One person designs and builds it. The same person you talk to.",
  },
  {
    usual: "A theme thousands of other businesses are also using",
    ours: "Drawn from scratch around your business. Never a template.",
  },
  {
    usual: "Three months, endless meetings, a surprise invoice",
    ours: "Live in days, a fixed price agreed up front",
  },
  {
    usual: "Handed a login and left to fight the tech yourself",
    ours: "Looked after every month. You never have to touch the code.",
  },
];

export function WhyDifferent() {
  return (
    <section className="border-t border-border bg-panel">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <span className="mark-label">Why MH Studio</span>
            <h2 className="mt-3 text-[clamp(1.9rem,1.1rem+2.4vw,3rem)]">
              The opposite of an agency.
            </h2>
            <p className="mt-5 max-w-sm text-muted">
              Most local businesses get burned by agencies or settle for a
              template. MH Studio fills the gap: studio-grade work, built by one
              person, who you can actually reach.
            </p>
          </Reveal>

          <ul className="flex flex-col">
            {rows.map((r, i) => (
              <Reveal as="li" key={i} delay={i * 70} className="border-t border-border py-7 first:border-t-0 first:pt-0">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
                  <p className="flex gap-3 text-[0.95rem] text-muted">
                    <span aria-hidden className="mt-0.5 shrink-0 font-semibold text-primary/70">
                      ✕
                    </span>
                    {r.usual}
                  </p>
                  <p className="flex gap-3 text-[1.02rem] font-medium text-ink">
                    <Check />
                    {r.ours}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden className="mt-1 shrink-0">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
