"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "./useInView";

type RevealProps = {
  children: ReactNode;
  /** Delay in milliseconds before the fade/slide starts. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Fade + slide-up wrapper.
 *
 * - Hidden state: opacity 0, translateY(8px)
 * - Visible state: opacity 1, translateY(0)
 * - Transition: 600ms ease-out (with optional `delay` for stagger)
 * - When the user prefers reduced motion, the final state is shown
 *   immediately with no transition.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  style,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const shown = reduced || inView;

  const mergedStyle: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(8px)",
    transition: reduced
      ? "none"
      : `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
    willChange: "opacity, transform",
    ...style,
  };

  return (
    <div ref={ref} className={className} style={mergedStyle}>
      {children}
    </div>
  );
}
