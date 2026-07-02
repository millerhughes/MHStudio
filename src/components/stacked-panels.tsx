"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { DemoPreview, type DemoTheme } from "./demo-preview";

/**
 * StackedPanels — the interactive portfolio.
 *
 * A pointer-driven 3D fan of the sample builds. Panels spread like a hand of
 * cards (static base transform); as the cursor crosses the fan, the nearest
 * panel lifts toward the viewer and comes forward in the stack. Each panel is a
 * real slot: it links to the live site (or a "start a project" mail) so the
 * display device doubles as the click target.
 *
 * Mechanic borrowed from a 21st.dev "Shadway" component, re-skinned to brand
 * and rebuilt for our structure: no third-party image hotlinks (panels render
 * our own `DemoPreview` mockups), no glow, and hooks are declared per-panel
 * (each `Panel` owns its springs) rather than looped, so rules-of-hooks hold.
 *
 * Hydration-safe by a mount gate: the server and the first client render both
 * emit a plain static fan (deterministic CSS transforms, no `motion` in the
 * DOM), so the HTML matches exactly. The interactive `motion` version — which
 * serialises 3D transforms differently on server vs client — is swapped in only
 * after mount, in an effect, well past hydration. Reduced-motion users keep the
 * static fan for good.
 */

const MotionLink = motion.create(Link);

export type PanelProject = {
  name: string;
  kind: string;
  cta: string;
  result: string;
  theme: DemoTheme;
  href: string;
};

// Spread geometry (desktop fan). rel = index - centre, so the middle panel
// sits flat and the outer panels fan away symmetrically.
const FAN_OFFSET_X = 176; // px of lateral spread per step
const FAN_ROT_Y = 9; // deg of y-rotation per step (the "open book" tilt)
const FAN_ROT_Z = 2.2; // deg of in-plane tilt per step
const PROX = 0.34; // how wide (0..1) a panel's pull radius reaches
const LIFT_SPRING = { stiffness: 220, damping: 26, mass: 0.6 };

export function StackedPanels({ projects }: { projects: PanelProject[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Mount gate — false on server and first client render, true after hydration.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-shot hydration mount gate
  useEffect(() => setMounted(true), []);
  const interactive = mounted && !reduced;

  // Normalised cursor position across the fan (0 = left edge, 1 = right) and an
  // engagement gate that fades the whole effect in on enter / out on leave.
  const pointer = useMotionValue(0.5);
  const active = useMotionValue(0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    pointer.set((e.clientX - r.left) / r.width);
  }

  function handleEnter() {
    if (!reduced) active.set(1);
  }

  function handleLeave() {
    pointer.set(0.5);
    active.set(0);
  }

  return (
    <>
      {/* Desktop: the 3D fan. */}
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative hidden h-[clamp(380px,40vw,520px)] w-full [perspective:1600px] sm:block"
      >
        <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
          {projects.map((p, i) => (
            <Panel
              key={p.name}
              project={p}
              index={i}
              total={projects.length}
              pointer={pointer}
              active={active}
              interactive={interactive}
            />
          ))}
        </div>
      </div>

      {/* Mobile: no 3D, just a clean stack of the same cards. */}
      <div className="space-y-8 sm:hidden">
        {projects.map((p) => (
          <Link key={p.name} href={p.href} className="block">
            <PanelCard project={p} />
          </Link>
        ))}
      </div>
    </>
  );
}

function Panel({
  project,
  index,
  total,
  pointer,
  active,
  interactive,
}: {
  project: PanelProject;
  index: number;
  total: number;
  pointer: MotionValue<number>;
  active: MotionValue<number>;
  interactive: boolean;
}) {
  const centre = (total - 1) / 2;
  const rel = index - centre;
  const myPos = (index + 0.5) / total; // this panel's centre, normalised

  // Base fan pose — the "spread deck" at rest, shared by both renders.
  const baseX = rel * FAN_OFFSET_X;
  const baseRotY = rel * FAN_ROT_Y;
  const baseRotZ = rel * FAN_ROT_Z;

  // Hooks are always called (rules of hooks) even when we render the static
  // fan; the motion values simply stay off the DOM until `interactive`.
  const prox = useTransform(pointer, (p) =>
    Math.max(0, 1 - Math.abs(p - myPos) / PROX),
  );
  const engaged = useTransform(() => prox.get() * active.get());
  const lift = useSpring(engaged, LIFT_SPRING);

  // Derived motion from the smoothed lift.
  const z = useTransform(lift, [0, 1], [0, 96]);
  const y = useTransform(lift, [0, 1], [0, -18]);
  const scale = useTransform(lift, [0, 1], [1, 1.06]);
  // Nearest panel jumps forward in the stack (discrete, no tween needed).
  const zIndex = useTransform(prox, (p) => Math.round(p * 100) + index);

  const className =
    "group absolute block w-[clamp(268px,30vw,384px)] will-change-transform focus-visible:outline-none";

  // Server + first client render: plain link, deterministic CSS transform. This
  // is what hydration checks against, so no `motion` serialisation mismatch.
  if (!interactive) {
    return (
      <Link
        href={project.href}
        style={{
          transform: `translateX(${baseX}px) rotateY(${baseRotY}deg) rotateZ(${baseRotZ}deg)`,
        }}
        className={className}
      >
        <PanelCard project={project} />
      </Link>
    );
  }

  return (
    <MotionLink
      href={project.href}
      style={{ x: baseX, rotateY: baseRotY, rotateZ: baseRotZ, y, z, scale, zIndex }}
      className={className}
    >
      <PanelCard project={project} />
    </MotionLink>
  );
}

/**
 * The visible card: our own browser mockup plus a caption strip. Shared by the
 * desktop fan and the mobile stack so both render identically.
 */
function PanelCard({ project }: { project: PanelProject }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_28px_60px_-28px_rgba(20,40,36,0.45)] transition-[border-color,box-shadow] duration-300 group-hover:border-primary/40 group-hover:shadow-[0_36px_80px_-24px_rgba(20,40,36,0.55)]">
      <DemoPreview
        theme={project.theme}
        name={project.name}
        kind={project.kind}
        cta={project.cta}
        variant="glass"
      />
      <div className="flex items-center justify-between gap-3 border-t border-border bg-white px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-[0.95rem] font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="truncate text-xs text-muted">{project.kind}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-panel px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Sample
        </span>
      </div>
    </div>
  );
}
