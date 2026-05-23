"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Loader({ onComplete }: Readonly<{ onComplete: () => void }>) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const overlay = overlayRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;

    // Lock scroll while loader is active
    document.documentElement.style.overflow = "hidden";

    if (prefersReducedMotion()) {
      document.documentElement.style.overflow = "";
      onCompleteRef.current();
      return;
    }

    if (!overlay || !counter || !progress) return;

    const obj = { count: 0 };
    const tl = gsap.timeline();

    // Entrance — counter fades in (fromTo so the opacity:0 inline style doesn't confuse GSAP)
    tl.fromTo(counter, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.1);

    // Count 0 → 100
    tl.to(
      obj,
      {
        count: 100,
        duration: 2.0,
        ease: "power2.inOut",
        onUpdate() {
          const val = Math.round(obj.count);
          counter.textContent = String(val);
          progress.style.transform = `scaleX(${val / 100})`;
        },
      },
      0.4
    );

    // Hold at 100
    tl.to({}, { duration: 0.35 });

    // Slide the whole overlay up — reveals the page below
    tl.to(overlay, {
      yPercent: -100,
      duration: 1.1,
      ease: "expo.inOut",
      onComplete: () => {
        document.documentElement.style.overflow = "";
        onCompleteRef.current();
      },
    });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Top-left */}
      <p
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{
          position: "absolute",
          top: "clamp(1.5rem, 3vw, 3rem)",
          left: "clamp(1.5rem, 3vw, 3rem)",
          color: "var(--fg-tertiary)",
        }}
      >
        Portfolio — 2025
      </p>

      {/* Top-right */}
      <p
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{
          position: "absolute",
          top: "clamp(1.5rem, 3vw, 3rem)",
          right: "clamp(1.5rem, 3vw, 3rem)",
          color: "var(--fg-tertiary)",
        }}
      >
        surya.in
      </p>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          ref={counterRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(96px, 18vw, 220px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "var(--fg)",
            fontVariantNumeric: "tabular-nums",
            opacity: 0,
          }}
        >
          0
        </span>
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 3vw, 3rem)",
          left: "clamp(1.5rem, 3vw, 3rem)",
          right: "clamp(1.5rem, 3vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            className="font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--fg-tertiary)" }}
          >
            Surya Pratap Das
          </span>
          <span
            className="font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--fg-tertiary)" }}
          >
            Software & DevOps Engineer
          </span>
        </div>

        {/* Progress line */}
        <div style={{ height: "1px", background: "var(--stroke)", overflow: "hidden" }}>
          <div
            ref={progressRef}
            style={{
              height: "100%",
              background: "var(--accent-cyan)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
