"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver hook.
 *
 * - Default `threshold: 0.1`.
 * - Once the element first intersects the viewport, the observer disconnects
 *   (the returned `inView` value latches to `true` and never flips back).
 * - SSR-safe: returns `false` on the server / before mount.
 */
export function useInView<T extends Element = Element>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers / certain test envs):
    // fall back to "always visible" so content does not stay hidden.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // We intentionally read `options` once at mount; callers pass stable values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
