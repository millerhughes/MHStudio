"use client";

import { useEffect, useRef } from "react";

/**
 * HeroGrid — the blueprint grid rendered live on a canvas. Replaces the static
 * CSS `.blueprint-grid`. One effect only: displacement — points near the cursor
 * are pushed outward (a gravity well), warping the grey lines and springing back
 * as the cursor leaves. No glow, no colour shift; the lines just move.
 * Purely ambient (aria-hidden, pointer-events none). Fills its positioned
 * parent; size the parent, not this. Reduced motion draws one static grid.
 */

const SPACING = 46; // px between grid points
const STRENGTH = 80; // max displacement in px, cursor (desktop)
const RADIUS = 260; // cursor influence radius in px (desktop)
// Touch devices have no cursor, so a slow invisible "well" drifts on its own.
// Deliberately gentle: smaller displacement, tighter reach, and confined to the
// upper band so the motion never pulls the eye down onto the CTAs.
const STRENGTH_DRIFT = 30; // max displacement in px, ambient drift
const RADIUS_DRIFT = 210; // influence radius in px, ambient drift
const DRIFT_SPEED = 0.00007; // radians/ms — one lazy loop every ~90s
const RGB = "148,150,148"; // neutral grey grid lines
const ALPHA = 0.32; // constant line opacity
const WIDTH = 0.8; // constant line weight

type Pt = { ox: number; oy: number };
type Disp = { x: number; y: number; t: number };

export function HeroGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    // Re-bind so the inferred type is non-null inside the nested draw closures.
    const canvas = canvasEl;
    const ctx = context;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Coarse pointer (touch) => no cursor to follow. Disable animation on mobile.
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const strength = coarse ? 0 : STRENGTH;
    const radius = coarse ? 0 : RADIUS;

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let pts: Pt[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;

    function build() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / SPACING) + 2;
      rows = Math.ceil(H / SPACING) + 2;
      pts = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          pts.push({ ox: c * SPACING - SPACING / 2, oy: r * SPACING - SPACING / 2 });
        }
      }
    }

    function displaced(p: Pt): Disp {
      const dx = mouse.x - p.ox;
      const dy = mouse.y - p.oy;
      const dist = Math.hypot(dx, dy);
      if (dist >= radius || dist < 1) return { x: p.ox, y: p.oy, t: 0 };
      const t = 1 - dist / radius;
      const f = t * t * strength;
      return { x: p.ox + (dx / dist) * f, y: p.oy + (dy / dist) * f, t };
    }

    function paint() {
      ctx.clearRect(0, 0, W, H);
      const d = pts.map(displaced);

      // Plain grey lines — constant colour and weight, only their positions move.
      ctx.strokeStyle = `rgba(${RGB},${ALPHA})`;
      ctx.lineWidth = WIDTH;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = d[r * cols + c];
          if (c < cols - 1) {
            const pr = d[r * cols + c + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pr.x, pr.y);
            ctx.stroke();
          }
          if (r < rows - 1) {
            const pb = d[(r + 1) * cols + c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
      }
    }

    function frame(now: number) {
      raf = 0;
      if (!visible) return;
      // Ambient drift: move the well along a slow path confined to the upper
      // band (y ~0.18–0.42H) so the motion stays clear of the CTAs below.
      if (coarse) {
        mouse.x = W * (0.5 + 0.3 * Math.sin(now * DRIFT_SPEED));
        mouse.y = H * (0.3 + 0.12 * Math.sin(now * DRIFT_SPEED * 1.6 + 1.3));
      }
      paint();
      raf = requestAnimationFrame(frame);
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const resetMouse = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();

    if (reduced) {
      paint();
      const ro = new ResizeObserver(() => {
        build();
        paint();
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    // Desktop only: follow the cursor. Touch devices use the ambient drift above.
    if (!coarse) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("blur", resetMouse);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("blur", resetMouse);
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
