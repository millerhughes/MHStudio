import { Reveal } from "./reveal";
import { LogoMark } from "./logo-mark";

/**
 * About — a small, personal trust section. Sits right after "Why MH Studio":
 * the anti-agency argument names one builder, this puts a face and a name to
 * that person. Craft-led per the studio positioning (D-033): AI is a tool that
 * makes the build faster, not the pitch. Maths is framed as the rigour behind
 * the work, not a "student" credential. Kept deliberately short.
 *
 * PHOTO: the left panel is a branded placeholder. When Miller supplies a photo,
 * drop it at /public/miller.jpg and replace the placeholder block with:
 *   <img src="/miller.jpg" alt="Miller Hughes" className="h-full w-full object-cover" />
 */
export function About() {
  return (
    <section id="about" className="border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-7">
            <div>
              <span className="mark-label">About</span>
              <h2 className="mt-3 text-[clamp(1.9rem,1.1rem+2.4vw,3rem)]">
                The person building it.
              </h2>
            </div>

            {/* Branded placeholder — swap for a real photo (see file header). */}
            <div className="relative aspect-[4/5] w-full max-w-[17rem] overflow-hidden rounded-2xl border border-border">
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-panel to-primary/10">
                <LogoMark size={46} />
                <span className="mark-label">Miller Hughes</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="max-w-xl lg:pt-1">
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
              <p>
                I&apos;m Miller Hughes, founder of MH Studio. I build every site
                here myself — the design, the code, and the monthly care after
                launch. No account managers, no handing your project to a junior.
                You talk to the person doing the work.
              </p>
              <p>
                I study Mathematics and Machine Learning at Loughborough
                University, and that is the discipline behind the work: I strip a
                problem to its structure before I build, and I sweat the details
                most people skip. Modern tooling lets me move fast and hold a
                high standard — but the judgement and the care are mine, and that
                is the part worth paying for.
              </p>
            </div>
            <p className="mt-6 text-lg font-semibold tracking-tight text-ink">
              — Miller
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
