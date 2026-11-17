"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, useReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function PullQuote() {
  const quoteRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !quoteRef.current) return;
      const el = quoteRef.current;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      tl.from(el.querySelector(".pq-rule"), {
        scaleY: 0, duration: 0.5, ease: EASE.transition,
      });
      tl.from(el.querySelector(".pq-text"), {
        opacity: 0, y: 40, duration: DUR.slow, ease: EASE.hero,
      }, "-=0.2");
      tl.from(el.querySelector(".pq-attr"), {
        opacity: 0, y: 12, duration: DUR.base, ease: EASE.entrance,
      }, "-=0.6");
    },
    { scope: quoteRef, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <section
      ref={quoteRef}
      aria-label="Philosophy"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(12.5rem, 24vw, 22.5rem)",
        paddingBottom: "clamp(12.5rem, 24vw, 22.5rem)",
      }}
    >
      <div className="flex flex-col items-center text-center px-6">
        <div
          className="pq-rule mb-12"
          style={{
            width: "1px",
            height: "4rem",
            background: "var(--stroke)",
            transformOrigin: "top center",
          }}
        />

        <figure className="flex flex-col items-center">
        <blockquote
          className="pq-text"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2.25rem, 5vw, 6rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--fg)",
            maxWidth: "22ch",
          }}
        >
          <p>“I’d rather ship a system that holds at 3am than one that demos well at 3pm.”</p>
        </blockquote>

        <figcaption
          className="pq-attr font-mono text-xs tracking-[0.3em] uppercase mt-10"
          style={{ color: "var(--fg-tertiary)" }}
        >
          Surya Pratap Das
        </figcaption>
        </figure>
      </div>
    </section>
  );
}
