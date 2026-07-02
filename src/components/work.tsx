import { Reveal } from "./reveal";
import { FanPortfolio, type FanProject } from "./fan-portfolio";
import { type DemoTheme, type DemoVariant } from "./demo-preview";
import { MAILTO } from "@/lib/site";

/**
 * Portfolio data. Today these are SAMPLE builds (demo businesses) so the work
 * speaks before there are clients. Each entry is shaped to become a real case:
 * add `liveUrl` and swap `sample` to false when an actual build ships. When a
 * real URL exists the panel links to it; until then it opens a project enquiry.
 */
type Project = {
  name: string;
  kind: string;
  cta: string;
  result: string;
  theme: DemoTheme;
  variant: DemoVariant;
  sample: boolean;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    name: "Iron & Oak",
    kind: "Gym & personal training",
    cta: "Free trial",
    result: "Free-trial signups land straight in the inbox, ready to follow up.",
    variant: "glass",
    sample: true,
    theme: {
      bg: "#15161a",
      ink: "#f2f2f0",
      accent: "#c6f24e",
      accentInk: "#15161a",
      muted: "#9a9a98",
      font: "var(--font-bricolage)",
    },
  },
  {
    name: "Harbour & Vine",
    kind: "Coffee & brunch",
    cta: "Book a table",
    result:
      "Table bookings and order-ahead built in, so the counter stops answering the phone.",
    variant: "clay",
    sample: true,
    theme: {
      bg: "#faf6ef",
      ink: "#2a211c",
      accent: "#b5532f",
      accentInk: "#ffffff",
      muted: "#7c6f64",
      font: "var(--font-bricolage)",
    },
  },
  {
    name: "Marsh & Sons",
    kind: "Roofing & groundworks",
    cta: "Get a quote",
    result:
      "Quote requests arrive with photos attached. No more phone tag for estimates.",
    variant: "blueprint",
    sample: true,
    theme: {
      bg: "#0f1d2e",
      ink: "#eef2f6",
      accent: "#f7c948",
      accentInk: "#0f1d2e",
      muted: "#90a2b4",
      font: "var(--font-bricolage)",
    },
  },
];

const panels: FanProject[] = projects.map((p) => ({
  name: p.name,
  kind: p.kind,
  cta: p.cta,
  result: p.result,
  theme: p.theme,
  variant: p.variant,
  href: p.liveUrl ?? MAILTO,
}));

export function Work() {
  return (
    <section id="work" className="border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <FanPortfolio projects={panels} />
        </Reveal>
      </div>
    </section>
  );
}
