import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Stakes } from "@/components/stakes";
import { SeoAeo } from "@/components/seo-aeo";
import { WhyDifferent } from "@/components/why-different";
import { About } from "@/components/about";
import { Offer } from "@/components/offer";
import { Process } from "@/components/process";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Cta } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { MAILTO } from "@/lib/site";

/**
 * Section order tells the sale: hook → proof → why it matters → the nudge →
 * why us → who builds it → how it works → what it costs (build + ownership,
 * one section) → getting found → objections → final ask. Process and Pricing
 * sit high, right after the trust sections: show the simple path, then the
 * price it earns.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Stakes />
      <InterestCta />
      <WhyDifferent />
      <About />
      <Process />
      <Offer />
      <SeoAeo />
      <Faq />
      <FinalCta />
    </>
  );
}

/**
 * Mid-page nudge at the interest peak, right after the work. Deliberately light:
 * one primary action plus a plain text route for anyone who would rather not
 * write an email. No heading, no card, just the two actions on a hairline.
 */
function InterestCta() {
  return (
    <section className="border-t border-border bg-bg">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-lg font-semibold tracking-tight">
          Like what you see? Let&apos;s talk about yours.
        </p>
        <div className="flex items-center gap-5">
          <Cta href={MAILTO} size="md">
            Start a project
          </Cta>
        </div>
      </Reveal>
    </section>
  );
}

