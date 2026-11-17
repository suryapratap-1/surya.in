"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

// Lenis keeps its own scroll position across client navigations; reset it
// so the case study always opens at the top.
export default function ScrollToTop() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [lenis]);
  return null;
}
