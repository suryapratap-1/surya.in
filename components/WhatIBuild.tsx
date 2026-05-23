"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const section = sectionRef.current;

      // Section label slides in from left + underline draws
      gsap.from(section.querySelector(".section-label"), {
        x: -32,
        opacity: 0,
        duration: DUR.base,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: section.querySelector(".section-label"),
          start: "top 85%",
        },
      });

      gsap.from(section.querySelector(".label-line"), {
        scaleX: 0,
        duration: 0.6,
        ease: EASE.transition,
        scrollTrigger: {
          trigger: section.querySelector(".section-label"),
          start: "top 85%",
        },
        delay: 0.15,
      });

      // Headline words stagger in
      gsap.from(section.querySelectorAll(".what-word"), {
        opacity: 0,
        y: 30,
        duration: DUR.base,
        stagger: 0.08,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: section.querySelector(".what-headline"),
          start: "top 80%",
        },
      });

      // Prose paragraph
      gsap.from(section.querySelector(".what-prose"), {
        opacity: 0,
        y: 24,
        duration: DUR.base,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: section.querySelector(".what-prose"),
          start: "top 82%",
        },
      });

      // Stat items
      gsap.from(section.querySelectorAll(".what-stat"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: section.querySelector(".what-stats"),
          start: "top 82%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="what-i-build"
      aria-labelledby="what-i-build-label"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Atmospheric orb */}
      <div
        className="orb"
        style={{
          width: "600px",
          height: "600px",
          background: "var(--accent)",
          top: "-200px",
          right: "-200px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16">

          {/* Left column — label + headline */}
          <div className="lg:col-span-7">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-12">
              <span
                id="what-i-build-label"
                className="section-label font-mono text-xs tracking-[0.4em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                01 — What I Build
              </span>
              <span className="label-line flex-1" />
            </div>

            {/* Headline */}
            <h2
              className="what-headline leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontFamily: "var(--font-fraunces)",
                fontWeight: 700,
                color: "var(--fg)",
              }}
            >
              {["Event-driven", "backends.", "Infrastructure", "at scale."].map(
                (word, i) => (
                  <span
                    key={i}
                    className="what-word block"
                    style={{
                      color: i % 2 === 1 ? "var(--fg-muted)" : "var(--fg)",
                    }}
                  >
                    {word}
                  </span>
                )
              )}
            </h2>
          </div>

          {/* Right column — prose + stats */}
          <div className="lg:col-span-5 lg:pt-24 flex flex-col gap-12">
            <p
              className="what-prose text-base md:text-lg leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              I work on the parts of a system that move data reliably and
              survive traffic spikes. That means message queues, cloud
              networking, container orchestration, and the CI/CD pipelines
              that tie it together — not pixel-pushing.
            </p>

            {/* Stats */}
            <div className="what-stats grid grid-cols-2 gap-6">
              {[
                { value: "60–70K", label: "concurrent users\n(load tested)" },
                { value: "6", label: "services on one\nCI/CD standard" },
                { value: "4", label: "vendor payloads\nnormalised by LLM" },
                { value: "30–40%", label: "search latency\nreduction" },
              ].map((stat) => (
                <div key={stat.label} className="what-stat">
                  <p
                    className="font-mono text-2xl md:text-3xl font-medium mb-1"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-fraunces)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-mono text-xs leading-relaxed"
                    style={{ color: "var(--fg-muted)", whiteSpace: "pre-line" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
