"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * TiltCard — a subtle 3D tilt toward the cursor for the hero build card. Max
 * ±6deg on each axis, spring-eased so it settles without bounce.
 *
 * Hydration-safe: the tilt style is mount-gated. Server and first client render
 * carry no transform (identical HTML); the motion transform is only attached
 * after mount, so there is never a transform mismatch to hydrate. Needs a
 * `perspective` on an ancestor for the depth to read.
 */
const SPRING = { stiffness: 150, damping: 18, mass: 0.5 };

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Normalised pointer position over the card (0..1), centre-default.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), SPRING);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const active = mounted && !reduced;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={active ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
