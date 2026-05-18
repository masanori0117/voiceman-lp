"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useInView } from "./useInView";

type CountUpProps = {
  /** Final value to count up to. */
  target: number;
  /** Total duration of the animation in milliseconds. Default 1600ms. */
  duration?: number;
  /** Suffix appended after the number (e.g. "%"). */
  suffix?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Count-up number.
 *
 * - On first viewport intersection, animates 0 -> `target` over `duration`
 *   using an ease-out cubic curve (rAF-driven).
 * - When the user prefers reduced motion, the final `target` value is rendered
 *   immediately with no animation.
 */
export default function CountUp({
  target,
  duration = 1600,
  suffix = "",
  className,
  style,
}: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.1 });
  const [value, setValue] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Detect prefers-reduced-motion (and reflect changes at runtime).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reduced, target, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {value}
      {suffix}
    </span>
  );
}
