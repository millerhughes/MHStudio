/**
 * DemoPreview — a small, crisp mock of a finished site, framed in browser
 * chrome. Each demo now has its OWN layout and visual language (a "morphism")
 * so the portfolio shows genuine range, not one template recoloured:
 *   - glass     — frosted panels over a CSS gradient backdrop (Iron & Oak, gym)
 *   - clay      — puffy claymorphism, soft double shadows (Harbour & Vine, cafe)
 *   - blueprint — navy technical line-art + grid (Marsh & Sons, roofing)
 * Built from HTML/CSS/SVG (no images) so it stays sharp at any size and fully
 * self-contained. Every variant carries a solid, high-contrast CTA. These are
 * SAMPLE builds for demo businesses; never presented as real clients.
 */
export type DemoVariant = "glass" | "clay" | "blueprint";

export type DemoTheme = {
  bg: string;
  ink: string;
  accent: string;
  accentInk: string;
  muted: string;
  font: string;
};

type BodyProps = {
  theme: DemoTheme;
  name: string;
  kind: string;
  cta: string;
  tall: boolean;
};

export function DemoPreview({
  theme,
  name,
  kind,
  cta,
  variant,
  tall = false,
}: {
  theme: DemoTheme;
  name: string;
  kind: string;
  cta: string;
  variant: DemoVariant;
  tall?: boolean;
}) {
  const body = { theme, name, kind, cta, tall };
  return (
    <div className="overflow-hidden rounded-[10px] border border-border bg-white shadow-sm">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-panel px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-[10px] text-muted ring-1 ring-border">
          {name.toLowerCase().replace(/[^a-z]+/g, "")}.co.uk
        </span>
      </div>

      {variant === "glass" && <GlassBody {...body} />}
      {variant === "clay" && <ClayBody {...body} />}
      {variant === "blueprint" && <BlueprintBody {...body} />}
    </div>
  );
}

/* ---------- Iron & Oak: glassmorphism over a CSS gradient ---------- */

function GlassBody({ theme, name, kind, cta, tall }: BodyProps) {
  return (
    <div
      style={{
        fontFamily: theme.font,
        // The dark gradient IS the container background (not a -z layer, which
        // would paint behind the white wrapper and wash the whole card out).
        background: `radial-gradient(120% 140% at 12% 8%, ${theme.accent}33, transparent 55%), radial-gradient(120% 130% at 92% 24%, #2bd4c033, transparent 52%), linear-gradient(165deg, ${theme.bg}, #0b0c0f)`,
      }}
      className="relative isolate overflow-hidden px-5 pb-6 pt-4 text-white"
    >
      {/* blurred glow blobs the glass frosts — above the bg, below content */}
      <div
        aria-hidden
        className="absolute -left-6 top-4 z-0 h-24 w-24 rounded-full blur-2xl"
        style={{ background: theme.accent, opacity: 0.45 }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-1 z-0 h-20 w-20 rounded-full blur-2xl"
        style={{ background: "#2bd4c0", opacity: 0.35 }}
      />

      <div className="relative z-10">
        {/* nav */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-tight">{name}</span>
          <span className="flex items-center gap-3 text-[9px] text-white/75">
            <span>Classes</span>
            <span>Coaching</span>
            <span
              className="rounded-full px-2 py-1 font-semibold"
              style={{ background: theme.accent, color: theme.accentInk }}
            >
              {cta}
            </span>
          </span>
        </div>

        {/* frosted hero card */}
        <div
          className={`${tall ? "mt-7" : "mt-5"} rounded-xl border border-white/20 bg-white/10 p-4 shadow-[0_10px_34px_rgba(0,0,0,0.4)] backdrop-blur-md`}
        >
          <span
            className="text-[9px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: theme.accent }}
          >
            {kind}
          </span>
          <p className="mt-1 max-w-[85%] text-[19px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
            {heroLine(kind)}
          </p>
          <p className="mt-1.5 max-w-[80%] text-[10px] leading-relaxed text-white/75">
            {subLine(kind)}
          </p>
          <span
            className="mt-3 inline-block rounded-full px-3 py-1.5 text-[10px] font-bold"
            style={{ background: theme.accent, color: theme.accentInk }}
          >
            {cta}
          </span>
        </div>

        {/* frosted stat chips */}
        <div className={`grid grid-cols-3 gap-2 ${tall ? "mt-4" : "mt-3"}`}>
          {[
            ["1,200+", "members"],
            ["40", "classes / wk"],
            ["7-day", "free trial"],
          ].map(([stat, label]) => (
            <div
              key={label}
              className="rounded-lg border border-white/15 bg-white/8 px-2 py-2 text-center backdrop-blur-md"
            >
              <div className="text-[13px] font-extrabold leading-none text-white">
                {stat}
              </div>
              <div className="mt-1 text-[8px] uppercase tracking-wide text-white/65">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Harbour & Vine: claymorphism ---------- */

function ClayBody({ theme, name, kind, cta, tall }: BodyProps) {
  // Soft double shadow: warm dark below-right, white highlight above-left.
  const clay =
    "8px 8px 18px rgba(180,140,110,0.38), -6px -6px 14px rgba(255,255,255,0.9)";
  const clayBtn =
    "4px 4px 10px rgba(120,60,30,0.35), -3px -3px 8px rgba(255,255,255,0.45)";
  const clayInset =
    "inset 3px 3px 6px rgba(120,60,30,0.30), inset -3px -3px 6px rgba(255,255,255,0.55)";
  const surface = "#fbf1e6"; // a touch lighter than the page for lift

  const CtaPill = (
    <span
      className="inline-block rounded-full px-4 py-2 text-[10px] font-bold"
      style={{ background: theme.accent, color: theme.accentInk, boxShadow: clayBtn }}
    >
      {cta}
    </span>
  );

  return (
    <div
      style={{ background: theme.bg, color: theme.ink, fontFamily: theme.font }}
      className="px-5 pb-6 pt-4"
    >
      {/* nav */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-extrabold tracking-tight">{name}</span>
        <span
          className="flex items-center gap-3 text-[9px]"
          style={{ color: theme.muted }}
        >
          <span>Menu</span>
          <span>Visit</span>
          <span
            className="rounded-full px-3 py-1.5 text-[9px] font-bold"
            style={{ background: theme.accent, color: theme.accentInk, boxShadow: clayBtn }}
          >
            {cta}
          </span>
        </span>
      </div>

      {/* hero clay panel */}
      <div
        className={`${tall ? "mt-7" : "mt-5"} rounded-[22px] p-4`}
        style={{ background: surface, boxShadow: clay }}
      >
        <span
          className="text-[9px] font-bold uppercase tracking-[0.14em]"
          style={{ color: theme.accent }}
        >
          {kind}
        </span>
        <p className="mt-1 max-w-[85%] text-[19px] font-extrabold leading-[1.05] tracking-[-0.01em]">
          {heroLine(kind)}
        </p>
        <p className="mt-1.5 max-w-[78%] text-[10px] leading-relaxed" style={{ color: theme.muted }}>
          {subLine(kind)}
        </p>
        <div className="mt-3">{CtaPill}</div>
      </div>

      {/* menu tiles — puffy clay */}
      <div className={`grid grid-cols-3 gap-2.5 ${tall ? "mt-4" : "mt-3"}`}>
        {[
          ["Flat white", "3.20"],
          ["Big brunch", "9.50"],
          ["Pastry", "2.80"],
        ].map(([item, price]) => (
          <div
            key={item}
            className="rounded-2xl p-2.5 text-center"
            style={{ background: surface, boxShadow: clay }}
          >
            <div
              className="mx-auto h-7 w-7 rounded-full"
              style={{ background: theme.accent, opacity: 0.92, boxShadow: clayInset }}
            />
            <div className="mt-1.5 text-[9px] font-bold">{item}</div>
            <div className="text-[8px]" style={{ color: theme.muted }}>
              £{price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Marsh & Sons: blueprint / technical ---------- */

function BlueprintBody({ theme, name, kind, cta, tall }: BodyProps) {
  return (
    <div
      style={{ background: theme.bg, color: theme.ink, fontFamily: theme.font }}
      className="relative overflow-hidden px-5 pb-6 pt-4"
    >
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* nav */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-extrabold tracking-tight">{name}</span>
        <span
          className="flex items-center gap-3 text-[9px]"
          style={{ color: theme.muted }}
        >
          <span>Services</span>
          <span>Areas</span>
          <span
            className="rounded-sm px-2 py-1 font-bold"
            style={{ background: theme.accent, color: theme.accentInk }}
          >
            {cta}
          </span>
        </span>
      </div>

      {/* hero: copy + technical drawing */}
      <div className={`grid grid-cols-[1.05fr_0.95fr] items-center gap-3 ${tall ? "mt-7" : "mt-5"}`}>
        <div>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{ color: theme.accent }}
          >
            {kind}
          </span>
          <p className="mt-1 text-[17px] font-extrabold leading-[1.06] tracking-[-0.01em]">
            {heroLine(kind)}
          </p>
          <p className="mt-1.5 text-[10px] leading-relaxed" style={{ color: theme.muted }}>
            {subLine(kind)}
          </p>
          <span
            className="mt-3 inline-block rounded-sm px-3 py-1.5 text-[10px] font-bold"
            style={{ background: theme.accent, color: theme.accentInk }}
          >
            {cta}
          </span>
        </div>

        <RoofDrawing accent={theme.accent} />
      </div>

      {/* trust strip */}
      <div className={`flex flex-wrap gap-2 ${tall ? "mt-5" : "mt-4"}`}>
        {["Fully insured", "25 yrs on the tools", "Free written quote"].map((t) => (
          <span
            key={t}
            className="rounded-sm border px-2 py-1 text-[8px] font-semibold uppercase tracking-wide"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: theme.muted }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Schematic roof elevation with dimension ticks — the draughting motif. */
function RoofDrawing({ accent }: { accent: string }) {
  const line = "rgba(255,255,255,0.85)";
  return (
    <svg viewBox="0 0 128 96" className="w-full" aria-hidden role="presentation">
      <g fill="none" stroke={line} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {/* house body */}
        <rect x="30" y="46" width="68" height="34" />
        {/* roof */}
        <path d="M24 46 L64 20 L104 46" />
        {/* ridge + rafters */}
        <path d="M64 20 L64 46" strokeWidth="1" opacity="0.7" />
        <path d="M44 33 L54 46 M84 33 L74 46" strokeWidth="0.9" opacity="0.55" />
        {/* door + window */}
        <rect x="58" y="60" width="12" height="20" />
        <rect x="38" y="54" width="12" height="10" />
      </g>
      {/* gold dimension line under the base */}
      <g stroke={accent} strokeWidth="1.2" strokeLinecap="round">
        <path d="M30 88 L98 88" />
        <path d="M30 84 L30 92 M98 84 L98 92" />
      </g>
      <text x="64" y="86" textAnchor="middle" fill={accent} fontSize="6" fontWeight="700">
        12.0m
      </text>
    </svg>
  );
}

function heroLine(kind: string) {
  if (kind.includes("Coffee")) return "Good coffee. Better mornings.";
  if (kind.includes("Gym")) return "Train like you mean it.";
  if (kind.includes("Roof")) return "Roofs done right, first time.";
  return "Made for your business.";
}

function subLine(kind: string) {
  if (kind.includes("Coffee")) return "Brunch served till 2. Book a table or order ahead.";
  if (kind.includes("Gym")) return "Coaching, classes and a 7-day free trial.";
  if (kind.includes("Roof")) return "Tiling, flat roofs and repairs across the county.";
  return "Clear, fast and built to convert.";
}
