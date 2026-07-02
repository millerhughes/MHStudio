import { Reveal } from "./reveal";
import { Cta } from "./cta";
import { CropMarks, ProofMark } from "./reg-marks";
import { MAILTO } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="border-t border-border bg-ink-bg text-white">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="relative mx-auto max-w-2xl px-6 py-4 text-center sm:px-12">
          <CropMarks color="var(--primary)" />

          <span className="mark-label" style={{ color: "rgba(255,255,255,0.55)" }}>
            Start a project
          </span>

          <h2 className="mt-5 text-[clamp(2rem,1.2rem+3vw,3.4rem)] text-white">
            Let&apos;s build you a site that does{" "}
            <span className="relative inline-block">
              the work
              <ProofMark className="absolute -bottom-1 left-0" />
            </span>
            .
          </h2>

          <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
            Tell me what your business does and what your site currently costs
            you. I will reply myself, usually the same day, with a straight answer.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <Cta href={MAILTO} variant="ghostOnInk" size="lg" withArrow>
              Email me about your site
            </Cta>
          </div>

          <p className="mt-6 text-sm text-white/55">
            No forms. No sales call ambush. A straight reply from a real person.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
