"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const MotionLink = motion.create(Link);

// Press + magnetic springs. Snappy, no bounce.
const MAGNET_SPRING = { stiffness: 260, damping: 18, mass: 0.4 };
const GLOW_SPRING = { stiffness: 220, damping: 26, mass: 0.5 };

const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-3";

const sizes = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
} as const;

const variants = {
  primary: {
    className:
      "bg-primary text-white shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:bg-primary-deep",
    sheen: "rgba(255,255,255,0.24)",
  },
  ink: {
    className: "bg-ink text-white hover:bg-ink/90",
    sheen: "rgba(255,255,255,0.16)",
  },
  outline: {
    className:
      "border border-ink/15 text-ink hover:border-ink/40 hover:bg-primary/[0.06]",
    sheen: "rgba(23,82,74,0.16)",
  },
  ghostOnInk: {
    className: "bg-white text-ink hover:bg-white/90",
    sheen: "rgba(23,82,74,0.12)",
  },
} as const;

function Arrow() {
  return (
    <motion.svg
      viewBox="0 0 16 16"
      className="h-[0.9em] w-[0.9em] shrink-0"
      fill="none"
      aria-hidden="true"
      variants={{ rest: { x: 0 }, hover: { x: 3 } }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <path
        d="M3 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function Cta({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  iridescent = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  iridescent?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const v = variants[variant];

  // Magnetic offset.
  const x = useSpring(0, MAGNET_SPRING);
  const y = useSpring(0, MAGNET_SPRING);

  // Cursor-tracked sheen: live pointer coords + a fade-in opacity.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useSpring(0, GLOW_SPRING);
  const sheen = useMotionTemplate`radial-gradient(120px circle at ${mx}px ${my}px, ${v.sheen}, transparent 72%)`;

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - r.left;
    const relY = e.clientY - r.top;
    mx.set(relX);
    my.set(relY);
    x.set((relX - r.width / 2) * 0.22);
    y.set((relY - r.height / 2) * 0.28);
  }

  function handleEnter() {
    if (!reduced) glow.set(1);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    glow.set(0);
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={reduced ? undefined : { scale: 0.97 }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 380, damping: 25 }}
      className={[base, sizes[size], v.className, className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Iridescent teal foil. Always-on slow sweep behind the label. On the
          solid variants it overlays the deep-teal base at low opacity so white
          text keeps contrast; on outline it's a faint shimmer wash. */}
      {iridescent && (
        <span
          aria-hidden="true"
          className={[
            "irid-fill pointer-events-none absolute inset-0 -z-10",
            variant === "outline" ? "opacity-[0.14]" : "opacity-40",
          ].join(" ")}
        />
      )}
      {/* Cursor-tracked sheen. Sits under the label, never catches the pointer. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: sheen, opacity: glow }}
      />
      <span className="inline-flex items-center gap-2">
        {children}
        {withArrow && <Arrow />}
      </span>
    </MotionLink>
  );
}
