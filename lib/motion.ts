import { useSyncExternalStore } from "react";

export const EASE = {
  entrance: "power3.out",
  transition: "power2.inOut",
  hero: "expo.out",
} as const;

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 1.2,
} as const;

/** CSS equivalent of the expo-style ease used across the site. */
export const CSS_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Live, SSR-safe reduced-motion flag. Server snapshot is `false`, so hydration
 * matches; the client re-renders if the user preference is (or becomes) set.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReduced, prefersReducedMotion, () => false);
}
