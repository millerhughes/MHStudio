"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { DemoPreview, type DemoTheme, type DemoVariant } from "./demo-preview";

const MAGNET_SPRING = { stiffness: 260, damping: 18, mass: 0.4 };
const GLOW_SPRING = { stiffness: 220, damping: 26, mass: 0.5 };

export type FanProject = {
  name: string;
  kind: string;
  cta: string;
  result: string;
  theme: DemoTheme;
  variant: DemoVariant;
  href: string;
};

export function FanPortfolio({ projects }: { projects: FanProject[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();
  const active = projects[activeIdx];

  return (
    <>
      {/* Desktop: two-panel layout */}
      <div
        className="hidden sm:flex items-center gap-12 lg:gap-20 min-h-[480px]"
        onMouseEnter={() => { if (!reduced) setIsOpen(true); }}
        onMouseLeave={() => { if (!reduced) setIsOpen(false); }}
      >
        {/* Left: fan menu */}
        <div className="w-64 lg:w-72 shrink-0 flex flex-col justify-center">
          <div className="flex flex-col">
            {projects.map((p, i) => (
              <FanItem
                key={p.name}
                project={p}
                isActive={activeIdx === i}
                isOpen={isOpen}
                onHover={() => setActiveIdx(i)}
                reduced={!!reduced}
              />
            ))}
          </div>
        </div>

        {/* Right: site preview */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <DemoPreview
                  theme={active.theme}
                  name={active.name}
                  kind={active.kind}
                  cta={active.cta}
                  variant={active.variant}
                  tall
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile: vertical card stack */}
      <div className="space-y-6 sm:hidden">
        {projects.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="block overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_40px_-12px_rgba(20,40,36,0.3)]"
          >
            <DemoPreview theme={p.theme} name={p.name} kind={p.kind} cta={p.cta} variant={p.variant} />
            <div className="flex items-center justify-between gap-3 border-t border-border bg-white px-4 py-3">
              <div>
                <h3 className="text-[0.95rem] font-semibold tracking-tight">{p.name}</h3>
                <p className="text-xs text-muted">{p.kind}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-panel px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sample
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function FanItem({
  project,
  isActive,
  isOpen,
  onHover,
  reduced,
}: {
  project: FanProject;
  isActive: boolean;
  isOpen: boolean;
  onHover: () => void;
  reduced: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Cursor-tracked sheen — same mechanic as Cta
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useSpring(0, GLOW_SPRING);
  const sheen = useMotionTemplate`radial-gradient(100px circle at ${mx}px ${my}px, rgba(23,82,74,0.12), transparent 70%)`;

  // Magnetic lean — same mechanic as Cta, reduced factor for a menu item
  const magX = useSpring(0, MAGNET_SPRING);
  const magY = useSpring(0, MAGNET_SPRING);

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - r.left;
    const relY = e.clientY - r.top;
    mx.set(relX);
    my.set(relY);
    magX.set((relX - r.width / 2) * 0.1);
    magY.set((relY - r.height / 2) * 0.15);
  }

  function handleEnter() {
    onHover();
    if (!reduced) glow.set(1);
  }

  function handleLeave() {
    magX.set(0);
    magY.set(0);
    glow.set(0);
  }

  // Fan-open padding: when open, active item gets the most breathing room
  const ptPb = isOpen
    ? isActive ? 22 : 14
    : 12;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      style={{ x: magX, y: magY }}
      animate={{ paddingTop: ptPb, paddingBottom: ptPb }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      aria-pressed={isActive}
      className="group relative isolate flex w-full items-start gap-3 overflow-hidden rounded-xl px-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Sheen overlay */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
        style={{ background: sheen, opacity: glow }}
      />

      {/* Accent bar */}
      <motion.span
        aria-hidden="true"
        className="mt-1 shrink-0 rounded-full bg-primary"
        animate={{
          width: isActive ? 3 : 2,
          height: isActive ? 22 : 14,
          opacity: isActive ? 1 : 0.22,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      />

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-[1.05rem] font-semibold tracking-tight transition-colors duration-200 ${
            isActive ? "text-ink" : "text-muted"
          }`}
        >
          {project.name}
        </p>
        <p
          className={`text-xs mt-0.5 transition-colors duration-200 ${
            isActive ? "text-muted" : "text-muted/50"
          }`}
        >
          {project.kind}
        </p>

        {/* Description: reveals when active */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden text-sm leading-relaxed text-muted"
            >
              {project.result}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
