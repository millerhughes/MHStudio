import { Reveal } from "./reveal";

const steps = [
  {
    n: "01",
    day: "Day 1",
    title: "A call, then a plan",
    body: "We talk for 20 minutes about your business and what the site needs to do. You get a fixed price and a clear plan.",
  },
  {
    n: "02",
    day: "Days 2–3",
    title: "I design the first draft",
    body: "I draw your site from scratch and send you a real, clickable draft. You react, I refine. Your taste leads.",
  },
  {
    n: "03",
    day: "Days 3–5",
    title: "Built properly",
    body: "I build it to a high standard: fast, responsive, and easy for customers to use. Content and forms wired in.",
  },
  {
    n: "04",
    day: "Launch",
    title: "We launch it together",
    body: "We put it live together. From there I host it and keep it running: updates, fixes and steady improvements, so you never touch the tech. See the hosting options below.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-border bg-ink-bg text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <span className="mark-label" style={{ color: "rgba(255,255,255,0.55)" }}>
            How it works
          </span>
          <h2 className="mt-3 text-[clamp(1.9rem,1.1rem+2.4vw,3rem)] text-white">
            From first call to live in about a week.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="flex flex-col bg-ink-bg p-7">
              <div className="flex items-center justify-between">
                <span className="text-[2.2rem] font-extrabold tracking-tight text-white/90">
                  {s.n}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                  {s.day}
                </span>
              </div>
              <h3 className="mt-6 text-lg text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
