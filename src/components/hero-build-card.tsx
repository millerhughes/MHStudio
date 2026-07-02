"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * HeroBuildCard — the hero's centrepiece. Two acts in one card:
 *
 *  1. Construction: on mount the polished "after" build assembles in stages
 *     (nav, then headline, body, CTA, cards) while a progress bar fills. Looks
 *     like a real site being built in real time.
 *  2. Compare: once built, a drag handle fades in. The BEFORE site (a genuinely
 *     dated, clashing template) occupies the LEFT of the card; dragging the
 *     divider right widens it so you can peel back to what the business had.
 *     Left = before, right = after — the conventional read. The whole argument
 *     — look what it becomes — is felt before a word is read.
 *
 * Hydration + no-JS safety: the default render is the finished build with the
 * divider at rest (both sides visible), so SSR and first client render match.
 * The construction act is gated behind a mount flag and replayed via a keyed
 * remount, so it can never ship the card blank and never mismatches on hydrate.
 * Decorative to AT (aria-hidden); the message lives in the hero copy.
 */

// Divider rest position: % of the card width, measured from the left, that the
// BEFORE site occupies once built. 25 = 75% new site visible, 25% old.
const REST_BEFORE = 25;

const container = {
  hidden: {},
  built: { transition: { staggerChildren: 0.2, delayChildren: 0.12 } },
};
const stage = {
  hidden: { opacity: 0, y: 12 },
  built: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroBuildCard() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(true); // handle + drag enabled
  const [beforePct, setBeforePct] = useState(REST_BEFORE); // % width the BEFORE site occupies from the left
  const [dragging, setDragging] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  // Replay construction once, after hydration, when motion is allowed. Deferred
  // a frame so the mount flag doesn't set state synchronously inside the effect.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      if (reduced) return;
      setReady(false);
      setBeforePct(0); // AFTER fills the card while it assembles
    });
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  const animate = mounted && !reduced;

  function settle() {
    setReady(true);
    setBeforePct(REST_BEFORE);
  }

  function setFromClientX(clientX: number) {
    const el = areaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setBeforePct(Math.max(4, Math.min(94, p)));
  }

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!ready) return;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragging) setFromClientX(e.clientX);
  }
  function onUp(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  const clipTransition = dragging
    ? "none"
    : "clip-path 0.4s cubic-bezier(0.25,0.46,0.45,0.94)";

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(14,21,18,0.32),inset_0_0_60px_rgba(23,82,74,0.05)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border/70 bg-panel px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        </span>
        <span className="ml-2 flex-1 rounded-md border border-border/70 bg-white px-2.5 py-1 text-center text-[0.62rem] tracking-wide text-muted">
          yourbusiness.co.uk
        </span>
      </div>

      {/* Compare area */}
      <div
        ref={areaRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={[
          "relative h-[300px] select-none sm:h-[336px]",
          ready ? "cursor-ew-resize" : "",
        ].join(" ")}
      >
        {/* AFTER — the polished MH Studio build, sits underneath, full width */}
        <div className="absolute inset-0">
          <motion.div
            key={animate ? "assemble" : "static"}
            variants={container}
            initial={animate ? "hidden" : false}
            animate="built"
            onAnimationComplete={animate ? settle : undefined}
            className="h-full"
          >
            <AfterSite item={stage} reduced={!!reduced} />
          </motion.div>
        </div>

        {/* BEFORE — the dated site on top, clipped to `beforePct` from the left */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - beforePct}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - beforePct}% 0 0)`,
            transition: clipTransition,
          }}
        >
          <BeforeSite />
        </div>

        {/* Divider + handle — fade in once the build is ready */}
        <AnimatePresence>
          {ready && (
            <motion.div
              key="divider"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-y-0"
              style={{
                left: `${beforePct}%`,
                transition: dragging
                  ? "none"
                  : "left 0.6s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <span className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(23,82,74,0.12)]" />
              <span className="absolute top-1/2 left-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-[0_3px_14px_rgba(14,21,18,0.22)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M6 4L2.5 8 6 12M10 4l3.5 4-3.5 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar — only while the site is assembling */}
        {animate && !ready && (
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "linear" }}
          />
        )}

        {/* Corner tags */}
        <span
          className="absolute top-2.5 left-2.5 rounded bg-ink/75 px-2 py-0.5 text-[0.6rem] font-semibold tracking-wide text-white uppercase transition-opacity"
          style={{ opacity: beforePct > 10 ? 1 : 0 }}
        >
          Before
        </span>
        <span
          className="absolute top-2.5 right-2.5 rounded bg-primary px-2 py-0.5 text-[0.6rem] font-semibold tracking-wide text-white uppercase transition-opacity"
          style={{ opacity: beforePct < 88 ? 1 : 0 }}
        >
          After
        </span>
      </div>
    </div>
  );
}

/* ---- The polished "after" build — a premium GYM site (FORGE). Dark, molten-
   orange athletic palette, deliberately unlike the studio's forest-teal, to
   prove the studio builds in any brand. Staged for the construction animation;
   keeps its restrained motion (pulse dot, button sheen). ---- */

function AfterSite({ item, reduced }: { item: typeof stage; reduced: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#17181c]">
      {/* nav */}
      <motion.div
        variants={item}
        className="flex items-center justify-between border-b border-[#2a2b31] px-3.5 py-2.5"
      >
        <span className="flex items-center gap-1.5 text-[0.7rem] font-black tracking-tight text-[#f2f1ee]">
          {/* live status dot — slow, self-contained pulse */}
          <motion.span className="relative flex h-1.5 w-1.5" aria-hidden>
            <motion.span
              className="absolute inset-0 rounded-full bg-[#ff5a1f]"
              animate={reduced ? undefined : { scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
          </motion.span>
          FORGE
        </span>
        <span className="flex items-center gap-2.5">
          <span className="h-1.5 w-7 rounded-full bg-[#33343b]" />
          <span className="h-1.5 w-7 rounded-full bg-[#33343b]" />
          <span className="rounded bg-[#ff5a1f] px-2 py-1 text-[0.55rem] font-bold text-[#17181c]">
            Join now
          </span>
        </span>
      </motion.div>

      {/* hero */}
      <div className="px-3.5 pt-3.5 pb-2">
        <motion.div
          variants={item}
          className="mb-2 flex items-center gap-1.5 text-[0.55rem] font-bold tracking-[0.1em] text-[#ff5a1f] uppercase"
        >
          <span className="h-1 w-1 rounded-full bg-[#ff5a1f]" />
          Strength &amp; Conditioning · Derby
        </motion.div>
        <motion.div variants={item} className="space-y-1.5">
          <span className="block h-3 w-[82%] rounded bg-[#f2f1ee]" />
          <span className="block h-3 w-[60%] rounded bg-[#f2f1ee]" />
        </motion.div>
        <motion.div variants={item} className="mt-2.5 space-y-1">
          <span className="block h-1.5 w-[90%] rounded bg-[#9a9791]/55" />
          <span className="block h-1.5 w-[74%] rounded bg-[#9a9791]/55" />
        </motion.div>
        <motion.div variants={item} className="mt-3 flex gap-2">
          {/* primary button with a slow sheen sweep */}
          <span className="relative overflow-hidden rounded-md bg-[#ff5a1f] px-3 py-1.5 text-[0.55rem] font-bold text-[#17181c] shadow-[0_4px_12px_-4px_rgba(255,90,31,0.6)]">
            <motion.span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              animate={reduced ? undefined : { left: ["-50%", "150%"] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 2.6,
                ease: "easeInOut",
              }}
            />
            <span className="relative">Start free trial</span>
          </span>
          <span className="rounded-md border border-[#ff5a1f]/45 px-3 py-1.5 text-[0.55rem] font-bold text-[#ff5a1f]">
            View timetable
          </span>
        </motion.div>
      </div>

      {/* cards */}
      <motion.div
        variants={item}
        className="mt-auto grid grid-cols-3 gap-2 px-3.5 pt-2 pb-3.5"
      >
        {[
          ["Classes", "40+ a week"],
          ["Coaching", "1-to-1 PT"],
          ["Open gym", "5am–11pm"],
        ].map(([t, s]) => (
          <div
            key={t}
            className="rounded-lg border border-[#2a2b31] bg-[#1f2026] p-2"
          >
            <span className="mb-1.5 block h-4 w-4 rounded bg-[#ff5a1f]/20" />
            <span className="block text-[0.58rem] font-bold text-[#f2f1ee]">
              {t}
            </span>
            <span className="block text-[0.52rem] text-[#9a9791]">{s}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---- The dated "before" site — FORGE's old 2016 site. Flat, cluttered, no
   motion at all: Flat-UI palette, Arial, an overstuffed nav, a stock-photo
   hero with slapped-on text, a cramped feature grid and a newsletter footer.
   Static by design (no animation prop). Sits on top on the left. ---- */

function BeforeSite() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#ecf0f1] [font-family:Arial,Helvetica,sans-serif]">
      {/* utility bar: phone + email + socials */}
      <div className="flex items-center justify-between bg-[#1f2d3a] px-2.5 py-0.5 text-[0.4rem] text-[#bdc3c7]">
        <span>☎ 01234 567890 &nbsp;|&nbsp; info@forgefitness.co.uk</span>
        <span className="flex gap-1 font-bold">
          <span>f</span>
          <span>t</span>
          <span>in</span>
          <span>▶</span>
        </span>
      </div>

      {/* header: logo, join button, overstuffed nav */}
      <div className="bg-[#2c3e50] px-2.5 py-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[0.72rem] font-bold text-white">
            FORGE<span className="text-[#3498db]">FITNESS</span>
          </span>
          <span className="rounded-[2px] bg-[#3498db] px-2 py-0.5 text-[0.42rem] font-bold text-white uppercase">
            Join Now
          </span>
        </div>
        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[0.44rem] text-[#bdc3c7]">
          <span>Home</span>
          <span>About</span>
          <span>Classes</span>
          <span>Timetable</span>
          <span>Gallery</span>
          <span>Blog</span>
          <span>Contact</span>
        </div>
      </div>

      {/* stock-photo hero with slapped-on text */}
      <div className="relative flex h-[74px] items-center justify-center overflow-hidden px-3 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#95a5a6] to-[#5d6d7e]" />
        <div className="relative">
          <div className="text-[0.72rem] font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
            Welcome to our website
          </div>
          <p className="mt-0.5 text-[0.44rem] text-[#ecf0f1]">
            The best gym in town — get fit today!
          </p>
          <span className="mt-1 inline-block rounded-[2px] bg-[#e67e22] px-2 py-0.5 text-[0.42rem] font-bold text-white uppercase">
            Read more
          </span>
        </div>
      </div>

      {/* cramped 4-box feature grid */}
      <div className="grid grid-cols-4 gap-1 px-2 py-1.5">
        {[
          ["Membership", "From £29/mo"],
          ["Classes", "Book online"],
          ["Personal Training", "Get a coach"],
          ["Opening Times", "Mon–Sun"],
        ].map(([t, s]) => (
          <div key={t} className="rounded-[1px] border border-[#bdc3c7] bg-white p-1">
            <span className="mb-0.5 block h-3.5 w-3.5 rounded-full bg-[#3498db]" />
            <span className="block text-[0.4rem] font-bold leading-tight text-[#2c3e50]">
              {t}
            </span>
            <span className="block text-[0.36rem] leading-tight text-[#95a5a6]">{s}</span>
          </div>
        ))}
      </div>

      {/* newsletter + copyright footer */}
      <div className="mt-auto flex items-center justify-between border-t border-[#bdc3c7] bg-[#dfe4e6] px-2 py-1 text-[0.38rem] text-[#7f8c8d]">
        <span>© 2016 Forge Fitness Ltd</span>
        <span className="flex items-center gap-1">
          <span className="rounded-[1px] border border-[#bdc3c7] bg-white px-1 py-0.5">
            Your email
          </span>
          <span className="rounded-[1px] bg-[#3498db] px-1 py-0.5 font-bold text-white">
            Sign up
          </span>
        </span>
      </div>
    </div>
  );
}
