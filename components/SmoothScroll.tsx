"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function GSAPBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  // Always mounted so the tree never remounts when the preference changes;
  // with reduced motion, wheel smoothing is off (native-feeling scroll).
  // Touch always uses native scrolling (Lenis default, syncTouch: false).
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduced }}>
      <GSAPBridge />
      {children}
    </ReactLenis>
  );
}
