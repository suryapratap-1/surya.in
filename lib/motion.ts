import gsap from "gsap";

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

export const SCRUB = {
  hero: 1.5,
  content: 1,
} as const;

export const CURSOR_LERP = 0.18;
export const MAGNET_LERP = 0.15;

export const FRAMER_EASE = [0.16, 1, 0.3, 1] as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function safeGsap<T>(fn: () => T): T | undefined {
  if (prefersReducedMotion()) return undefined;
  return fn();
}

export function registerGSAPPlugins() {
  const { ScrollTrigger } = require("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
}
