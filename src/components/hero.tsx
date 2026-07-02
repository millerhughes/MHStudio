import { Reveal } from "./reveal";
import { Cta } from "./cta";
import { ProofMark } from "./reg-marks";
import { HeroGrid } from "./hero-grid";
import { HeroBuildCard } from "./hero-build-card";
import { TiltCard } from "./tilt-card";
import { MAILTO } from "@/lib/site";

const trust = [
  "Live in days, not months",
  "Fixed price, agreed up front",
  "Yours to keep, no lock-in",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <HeroGrid className="absolute inset-0 z-[var(--z-grid)] h-full w-full [mask-image:radial-gradient(120%_90%_at_50%_0%,black_30%,transparent_75%)] [-webkit-mask-image:radial-gradient(120%_90%_at_50%_0%,black_30%,transparent_75%)]" />
      <div className="relative z-[var(--z-marks)] mx-auto grid max-w-6xl items-start gap-10 px-5 pt-9 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-12 lg:pb-20">
        <div>
          <Reveal>
            <span className="mark-label inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Full-stack web studio · United Kingdom
            </span>
          </Reveal>

          <h1 className="mt-5 text-[clamp(2rem,0.9rem+3.8vw,3.6rem)] leading-[1.02]">
            <Reveal as="span" className="block">
              The website your
            </Reveal>
            <Reveal as="span" className="block" delay={70}>
              business needs,
            </Reveal>
            <Reveal as="span" className="relative block w-fit" delay={140}>
              <span className="relative">
                built to work
                <ProofMark className="absolute -bottom-1 left-0" />
              </span>
              , deployed fast.
            </Reveal>
          </h1>

          <Reveal delay={210}>
            <p className="mt-5 max-w-[34rem] text-lg text-muted">
              MH Studio builds bespoke websites for local businesses, designed
              around your customers and built to bring enquiries in. AI-powered
              tooling means a faster build and higher quality.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Cta href={MAILTO} size="lg" withArrow iridescent>
                Start a project
              </Cta>
              <Cta href="#work" variant="outline" size="lg" iridescent>
                See the work
              </Cta>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-ink">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative lg:self-center [perspective:1200px]">
          <TiltCard className="relative">
            <HeroBuildCard />
          </TiltCard>
          <span className="mark-label absolute -bottom-3 right-4 z-[var(--z-marks)] bg-bg px-2">
            Drag to compare · before and after
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
