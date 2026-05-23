"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Loader({ onComplete }: Readonly<{ onComplete: () => void }>) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const greeting = greetingRef.current;
    const progress = progressRef.current;

    const greetings = [
      "Hello",
      "Bonjour",
      "Hola",
      "こんにちは",
      "你好",
      "안녕하세요",
      "مرحبا",
      "Olá",
      "Здравствуйте",
      "नमस्ते",
      "Namaste",
    ];
    const greetingDurations = [240, 220, 200, 180, 170, 160, 180, 200, 220, 240, 9999];
    let greetingIndex = 0;
    let greetingInterval: number | null = null;

    // Lock scroll while loader is active
    document.documentElement.style.overflow = "hidden";

    if (prefersReducedMotion()) {
      document.documentElement.style.overflow = "";
      onCompleteRef.current();
      return;
    }

    if (!overlay || !greeting || !progress) return;

    greeting.textContent = greetings[greetingIndex];
    const scheduleNextGreeting = () => {
      const duration = greetingDurations[greetingIndex] ?? 400;
      greetingInterval = window.setTimeout(() => {
        if (greetingIndex < greetings.length - 1) {
          greetingIndex += 1;
          greeting.textContent = greetings[greetingIndex];
          scheduleNextGreeting();
        }
      }, duration);
    };
    scheduleNextGreeting();

    const tl = gsap.timeline();

    // Entrance — greeting fades in
    tl.fromTo(greeting, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.1);

    // Progress fill animation
    tl.to(
      progress,
      {
        duration: 1.5,
        ease: "power2.inOut",
        transform: "scaleX(1)",
      },
      0.4
    );

    // Hold at full progress
    tl.to({}, { duration: 0.15 });

    // Slide the whole overlay up — reveals the page below
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.95,
      ease: "expo.inOut",
      onComplete: () => {
        document.documentElement.style.overflow = "";
        if (greetingInterval !== null) {
          window.clearTimeout(greetingInterval);
        }
        onCompleteRef.current();
      },
    });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
      if (greetingInterval !== null) {
        window.clearTimeout(greetingInterval);
      }
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

      {/* Greeting */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          ref={greetingRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(56px, 10vw, 140px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "var(--fg)",
            opacity: 0,
          }}
        >
          Hello
        </p>
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
