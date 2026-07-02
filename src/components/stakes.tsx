import { Reveal } from "./reveal";

/**
 * Stakes — the money case. Turns "nice site" into "I need this" before the
 * reader ever reaches pricing. Same left-sticky / right-rows composition as
 * WhyDifferent (a shipped pattern), so it reads as part of the same system.
 * Two vetted stats live inline in the rows that earn them (Trust, Found); no
 * hero-metric block. The client-time point closes it out (client-first framing).
 */
const rows = [
  {
    tag: "Leads",
    claim: "It turns lookers into enquiries",
    body: (
      <>
        A site built to convert puts the next step right in front of people:
        call, book, message. Every enquiry lands straight in your inbox, ready
        to follow up.
      </>
    ),
  },
  {
    tag: "Trust",
    claim: "You are judged before you say a word",
    body: (
      <>
        People decide whether you are any good from your website, long before
        they ever call. A fast, sharp site earns that call.{" "}
        <strong className="font-semibold text-ink">53%</strong> of visitors
        leave a page that takes more than three seconds to load (Google), and
        you never hear from the ones who go.
      </>
    ),
  },
  {
    tag: "Found",
    claim: "The people already looking for you find you",
    body: (
      <>
        Most local buying starts with a search on a phone.{" "}
        <strong className="font-semibold text-ink">76%</strong> of people who
        search for something nearby visit a business within a day (Google). Show
        up, load fast, and that visit is yours, not a competitor&apos;s.
      </>
    ),
  },
  {
    tag: "Your time",
    claim: "It runs without eating your week",
    body: (
      <>
        You stay on the tools, not wrestling a website builder. I design it,
        build it and look after it for you, and it is live in days, not months.
      </>
    ),
  },
];

export function Stakes() {
  return (
    <section id="why-it-matters" className="border-t border-border bg-panel">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <span className="mark-label">Why it matters</span>
            <h2 className="mt-3 text-[clamp(1.9rem,1.1rem+2.4vw,3rem)]">
              A good website earns its keep.
            </h2>
            <p className="mt-5 max-w-sm text-muted">
              For a local business your site is the first thing most customers
              meet, and it works harder than anything else you own: open around
              the clock, earning while you sleep. Here is the job it should be
              doing for you, every day.
            </p>
          </Reveal>

          <ul className="flex flex-col">
            {rows.map((r, i) => (
              <Reveal
                as="li"
                key={r.tag}
                delay={i * 70}
                className="border-t border-border py-7 first:border-t-0 first:pt-0"
              >
                <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <span className="mark-label mt-1 text-primary">{r.tag}</span>
                  <div>
                    <p className="text-[1.05rem] font-semibold tracking-tight text-ink">
                      {r.claim}
                    </p>
                    <p className="mt-2 text-[0.95rem] text-muted">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
