"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/**
 * Global smooth-scroll provider.
 *
 * Hydration-safe by construction: with `root`, ReactLenis renders no wrapper
 * DOM — children pass straight through — so the server HTML and the first
 * client render are identical. Lenis only starts its rAF loop after mount.
 *
 * `smooth` starts `true` on both server and first client render (they match),
 * then an effect flips it off for `prefers-reduced-motion` users. Because the
 * tree shape never changes, there is no mismatch and no remount.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSmooth(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: smooth,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
