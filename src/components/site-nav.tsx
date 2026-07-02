"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wordmark } from "./wordmark";
import { Cta } from "./cta";
import { NAV_LINKS, MAILTO } from "@/lib/site";

/**
 * SiteNav — a floating frosted island bar.
 *
 * Instead of an edge-to-edge header, the bar is inset from both sides with a top
 * gap so it reads as a raised object floating over the page. It is translucent
 * with a backdrop blur, so page content is visibly frosted behind it as you
 * scroll; once you scroll past the hero it solidifies a touch to keep the links
 * legible over busier sections.
 *
 * Hydration-safe: `scrolled` and `open` both start `false` on the server and the
 * first client render, so the initial HTML matches; the scroll state only
 * updates after mount in an effect. The mobile sheet mounts only on interaction
 * (well past hydration), so its motion never touches the server render.
 */
export function SiteNav() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solidify the bar a little once the hero has scrolled away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape and whenever we cross up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[var(--z-nav)]">
      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4">
        <div
          className={[
            "flex h-14 items-center justify-between gap-3 rounded-full border pl-5 pr-2.5 transition-[background-color,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-out-quint)] sm:h-15 sm:pl-6 sm:pr-3",
            scrolled
              ? "border-border/80 bg-bg/80 shadow-[0_12px_44px_-14px_rgba(20,40,36,0.30)] backdrop-blur-xl backdrop-saturate-150"
              : "border-border/45 bg-bg/50 shadow-[0_8px_30px_-18px_rgba(20,40,36,0.22)] backdrop-blur-md backdrop-saturate-150",
          ].join(" ")}
        >
          <Link href="#top" aria-label="MH Studio, home" className="text-ink">
            <Wordmark />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.92rem] text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Cta href={MAILTO} size="md" iridescent>
              Start a project
            </Cta>
            <MenuButton open={open} reduced={reduced} onClick={() => setOpen((v) => !v)} />
          </div>
        </div>

        {/* Mobile sheet — only mounts on interaction, so it never affects SSR. */}
        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-sheet"
              aria-label="Primary"
              id="mobile-nav"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, height: "auto" }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
              transition={{
                duration: reduced ? 0.15 : 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden md:hidden"
            >
              <ul className="mt-2 flex flex-col gap-1 rounded-3xl border border-border/70 bg-bg/90 p-3 shadow-[0_14px_44px_-16px_rgba(20,40,36,0.30)] backdrop-blur-xl">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-[0.98rem] text-ink transition-colors hover:bg-primary/6"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/**
 * Hamburger that morphs to a close (X). md:hidden — desktop shows inline links.
 */
function MenuButton({
  open,
  reduced,
  onClick,
}: {
  open: boolean;
  reduced: boolean | null;
  onClick: () => void;
}) {
  const t = { duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] as const };
  // inset-0 + m-auto centres both axes with zero CSS transform, leaving the
  // transform channel free for motion's y/rotate (they would otherwise clash).
  const bar = "absolute inset-0 m-auto h-[1.6px] w-[18px] rounded-full bg-current";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-nav"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-primary/6 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
    >
      {/* Two bars that cross into an X. Centre transform-origin keeps it tidy. */}
      <motion.span
        aria-hidden="true"
        className={bar}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
        transition={t}
      />
      <motion.span
        aria-hidden="true"
        className={bar}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
        transition={t}
      />
    </button>
  );
}
