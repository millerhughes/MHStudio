# Design

## Theme
**"The proof mark."** MH Studio = the precise maker's studio. The surface is an off-white drafting sheet with a breath of forest green; the brand colour is a deep forest-teal — the careful maker's mark. Signature device: print/registration marks (corner crop ticks, measurement ticks, a faint blueprint grid) used structurally, never as decoration. Confident, crafted, fast. Not dark-developer, not cream-editorial, not warm/earthy. The colour system is replicated from VectorFlowAI (forest-teal, locked D-024); the structural proof-mark device is unchanged — only the colour identity moved (D-027). **Logo: the isometric MH-cube (D-036)** — an outline 3D cube with the initials M and H painted on its two front faces (affine-sheared to each isometric plane); `logo-mark.tsx`, used in the nav wordmark, the favicon (`app/icon.svg`) and the OG card (`app/opengraph-image.tsx`). It replaced the interim registration-crosshair glyph; the proof-mark device (crop marks, grid, underline) still stands.

## Color (OKLCH)
Strategy: **Committed** — off-white tinted canvas + near-black teal-cast ink + one decisive forest-teal. One drenched deep-teal moment at the Process and final CTA sections.

- `--bg` off-white tinted surface `oklch(0.975 0.004 145)` — base canvas, a breath of green
- `--panel` deeper tinted surface `oklch(0.948 0.006 152)` — alternating sections; teal-tinted, never warm/cream
- `--ink` near-black teal-cast `oklch(0.11 0.015 150)` — body + headings
- `--muted` `oklch(0.46 0.01 152)` — secondary text, ≥4.5:1 on bg and panel (4.9:1 / 4.7:1)
- `--primary` forest-teal `oklch(0.4 0.09 167)` — marks, key display words, buttons (white/large text only; never small body on a tinted surface)
- `--primary-deep` `oklch(0.33 0.08 167)` — hover/active (white-on-hover ≈9.4:1)
- `--border` `oklch(0.885 0.008 152)` — teal-tinted hairlines
- `--ink-bg` `oklch(0.25 0.07 172)` — deep forest-teal drench for Process + final CTA (white text ≈11.3:1, a brand moment not a generic dark)
- Brand flow-field ramp (from VectorFlowAI): `--vf-deep` `oklch(0.25 0.07 172)` → `--vf-core` `oklch(0.4 0.09 167)` → `--vf-glow` `oklch(0.6 0.1 162)` → `--vf-spark` `oklch(0.8 0.06 155)`

Contrast: ink on bg ≈16.4:1; muted on bg ≈4.9:1; muted on panel ≈4.7:1; white on primary ≈6.2:1 (buttons use bold/large text → AA large). Primary never carries small body copy. Step numerals on the drench use white/90, not primary, to stay legible.

## Typography
**Bricolage Grotesque** (variable, single family, deliberate). Characterful humanist grotesque — made-by-hand voice, off the reflex-reject list. Weight contrast carries hierarchy.
- Display h1/h2: weight 700-800, tracking `-0.025em`, `text-wrap: balance`.
- Body: weight 400-450, 1.6 line-height, max 68ch, `text-wrap: pretty`.
- Labels/marks: weight 600, `0.12em` tracking, small caps-ish via size, used sparingly as real registration labels (e.g. `TF · 01`), not as per-section eyebrows.
- Scale: fluid `clamp()`, ≥1.25 ratio. h1 `clamp(2.75rem, 1.5rem + 5vw, 5rem)` (≤5rem, under the 6rem ceiling).

## Spacing & layout
Fluid `clamp()` section padding, varied for rhythm (tight groupings inside generous separations). Max content width ~72rem. Asymmetric hero. Work section is the centre of gravity: a two-panel split — fan-menu on the left, one large browser-chrome preview on the right — not an identical card grid. Semantic z-scale: base < grid < sticky-nav < marks < modal.

## Motion
Motion stack: **`motion` (Framer Motion, imported from `motion/react`) + `lenis` smooth scroll**, layered on the CSS + IntersectionObserver `Reveal` baseline (kept). Adopted 2026-07-01 (D-029) — this REVERSES the earlier "lean, no library" stance: the site must feel like a premium build to convert cold leads. Refined, not maximal — small physical accents, no glow, no bounce.
- Smooth scroll: `smooth-scroll.tsx` wraps the tree in `ReactLenis root`; disabled under `prefers-reduced-motion`.
- Hero: orchestrated load — staggered word/line reveal + registration ticks drawing in (stroke-dashoffset).
- Buttons (`cta.tsx`): cursor-tracked radial sheen + magnetic lean + spring press + optional arrow slide. Reduced-motion drops the pointer FX.
- Work portfolio (`fan-portfolio.tsx`, D-030): a left menu of project names that fans open on hover (items ease apart, the active one expands to reveal its result line), beside one full-width `DemoPreview` browser mock that crossfades to the hovered project. Each menu item carries the `cta.tsx` motion (cursor sheen + magnetic lean + tap-spring). Reduced-motion + mobile fall back to a plain vertical card stack. _(Replaced the earlier `stacked-panels.tsx` 3D fan, which hid the previews; that file remains in-repo, unused, as a 3D-animation reference.)_
- Nav (`site-nav.tsx`): floating frosted island bar; solidifies slightly once scrolled past the hero; mobile hamburger opens a frosted sheet.
- Reveals enhance an already-visible default (content never gated on JS). Every animation has a `prefers-reduced-motion: reduce` instant/crossfade fallback.
- **Two hydration-safe rules are mandatory** (both bugs were hit and fixed): (1) `motion` 3D transforms need a mount gate — render a plain static element on the server + first client render, swap to `MotionLink` only after mount via a `mounted` flag; (2) early scripts mutating `<html>`/`<body>` className (the `js` progressive-enhancement flag) require `suppressHydrationWarning` on that element. **Success gate for any motion work: zero hydration warnings in the console.**

## Components
`SiteNav` (floating frosted island bar — inset rounded pill, translucent `backdrop-blur`, solidifies past the hero, mobile hamburger sheet; wordmark + single CTA), `SmoothScroll` (Lenis root), `Hero`, `Work` → renders `FanPortfolio` (D-030: left fan-menu of project names + single crossfading `DemoPreview` browser mock; `Sample` labels; each item a clickable slot for a future live site; mobile = vertical card stack). `DemoPreview` carries a `variant` per demo so each shows a distinct layout + visual language, not one recoloured template (D-032): **glass** (Iron & Oak — frosted panels/stat chips over a CSS gradient backdrop), **clay** (Harbour & Vine — puffy soft-shadow claymorphism), **blueprint** (Marsh & Sons — navy grid + white line-art roof + gold dimension ticks). All pure CSS/SVG (no images), each with a solid high-contrast CTA. `WhyDifferent`, `About` (founder trust section — maths+ML/Loughborough framed as rigour, branded photo placeholder awaiting a real image, D-039), `Offer` — now the **merged Pricing section** (D-037): the build (from £300, own it outright) → "after launch, two ways to run it" = self-host (free handover, visually receded) or care plan (from £20/mo, recommended, elevated); the old separate `Ownership` section was folded in and deleted, `Process` (real 3-4 step sequence — numbers earned), `Faq`, `FinalCta` (ink drench), `SiteFooter`, `Cta` (upgraded physical button), `Reveal`, `RegMarks` (corner crop ticks / blueprint grid SVG), `Wordmark` (renders `LogoMark` — the MH-cube glyph, D-036). Hero: `HeroGrid` (canvas blueprint grid — cursor displacement on desktop, slow ambient drift on touch devices, D-039), `HeroBuildCard` (before/after drag-compare — a gym "FORGE": a flat static 2016 template BEFORE vs a molten-orange-on-charcoal premium AFTER, D-039). Contact is email-only (`ContactBand`, phone/SMS removed, D-037).
