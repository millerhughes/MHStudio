import { Reveal } from "./reveal";
import { Cta } from "./cta";
import { ContactBand } from "./contact-band";
import { MAILTO } from "@/lib/site";

/**
 * Pricing + ownership, merged into one section. One story, told once: pay a
 * fixed price to build the site (you own it outright), then after launch choose
 * how it is run — take it and self-host, or the care plan where I keep it
 * running. Replaces the old separate Offer + Ownership sections, which said the
 * "care plan / managed" part three times over.
 */

const buildIncludes = [
  "Designed around your business, never a template",
  "Built, wired up and tested, live in days",
  "One fixed price, agreed before we start",
  "Yours outright: the code, the content, the domain",
];

const carePlan = [
  "Hosting, SSL and backups handled",
  "Up to 10 small updates a month",
  "Monthly check: speed, security scan, broken links",
  "A real person who replies, not a ticket queue",
  "Cancel any time, you keep the code and domain",
];

const selfHost = [
  "Complete source code, yours to keep and modify",
  "Deployment guide, modern stack (Next.js / React, deploys to Vercel)",
  "14 days of post-launch support for handover questions",
];

export function Offer() {
  return (
    <section id="pricing" className="border-t border-border bg-panel">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <span className="mark-label">Pricing</span>
          <h2 className="mt-3 text-[clamp(1.9rem,1.1rem+2.4vw,3rem)]">
            One build. Then it&apos;s yours.
          </h2>
          <p className="mt-5 text-muted">
            No retainers you cannot read, no surprise invoices. You pay once to
            build the site, you own it outright, then choose how it is kept
            running.
          </p>
        </Reveal>

        {/* The build — the one-off */}
        <Reveal className="mt-12">
          <div className="flex flex-col gap-8 rounded-2xl border border-ink/15 bg-bg p-7 sm:p-9 lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:max-w-sm">
              <span className="mark-label">The build</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight">From £249</span>
                <span className="text-sm text-muted">fixed quote, up front</span>
              </div>
              <p className="mt-3 text-[0.95rem] text-muted">
                Your whole site, designed and built from scratch, and yours to
                keep, code and all.
              </p>
              <div className="mt-7">
                <Cta href={MAILTO} variant="primary" size="lg">
                  Start a project
                </Cta>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-3 lg:max-w-md">
              {buildIncludes.map((it) => (
                <li key={it} className="flex gap-3 text-[0.95rem]">
                  <Check />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* After launch — the two ownership paths */}
        <Reveal className="mt-14">
          <h3 className="text-xl font-semibold tracking-tight">
            After launch, two ways to run it.
          </h3>
          <p className="mt-2 max-w-xl text-[0.95rem] text-muted">
            The site is yours either way. This is only about who keeps it
            running once it is live.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Self-host */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-transparent p-7 sm:p-8">
              <span className="mark-label">Self-host</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight">No fees</span>
                <span className="text-sm text-muted">full handover</span>
              </div>
              <p className="mt-3 text-[0.95rem] text-muted">
                Take the code and run it yourself. No lock-in, no recurring fees.
                Suits developers or technical founders.
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {selfHost.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.95rem]">
                    <Check />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">
                You handle hosting, domain and future updates.
              </p>
              <div className="mt-6">
                <Cta href={MAILTO} variant="outline">
                  Ask about a handover
                </Cta>
              </div>
            </div>
          </Reveal>

          {/* Care plan — recommended */}
          <Reveal delay={90}>
            <div className="relative flex h-full flex-col rounded-2xl border border-primary/35 bg-bg p-7 shadow-[0_24px_60px_-34px_rgba(14,21,18,0.45)] sm:p-8">
              <span className="absolute right-7 top-7 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Recommended
              </span>
              <span className="mark-label">Care plan</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight">From £20</span>
                <span className="text-sm text-muted">/mo, cancel any time</span>
              </div>
              <p className="mt-3 text-[0.95rem] text-muted">
                We launch, then I keep it running: hosting, updates and a real
                person on top of it. One message and it is done.
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {carePlan.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.95rem]">
                    <Check />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Cta href={MAILTO} variant="primary">
                  Start with the care plan
                </Cta>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-6 text-sm text-muted">
            Bigger or more complex? The build scales with the work. You will get
            one clear quote before anything starts.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-lg border border-primary/25 bg-primary/5 p-5">
            <p className="text-[0.95rem] font-medium text-ink">
              First site, first referral.
            </p>
            <p className="mt-2 text-[0.9rem] text-muted">
              Building your site at no cost — if you refer a paying client later,
              I knock £249 off theirs too. Start here, help them start, both win.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <p className="text-[0.95rem] font-medium text-ink">
            Ready to talk numbers? Email me and I will reply the same day.
          </p>
          <ContactBand className="mt-4" />
        </Reveal>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" aria-hidden className="mt-0.5 shrink-0">
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
