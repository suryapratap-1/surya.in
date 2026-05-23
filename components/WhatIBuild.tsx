"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { suffix: "K", countTo: 70, label: "concurrent users\nin load testing" },
  { suffix: "", countTo: 6, label: "services on one\nCI/CD standard" },
  { suffix: "", countTo: 4, label: "vendor payloads\nnormalised by LLM" },
  { suffix: "%", countTo: 40, label: "p95 search latency\nreduction" },
];

const HEADLINE = [
  { text: "Event-driven", muted: false },
  { text: "backends.", muted: true },
  { text: "Cloud infra", muted: false },
  { text: "at scale.", muted: true },
];

export default function WhatIBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const el = sectionRef.current;

      if (reduced) {
        gsap.set(
          el.querySelectorAll(".wib-label-text, .wib-headline-line, .wib-para, .wib-stat"),
          { opacity: 1, x: 0, y: 0 }
        );
        return;
      }

      gsap.from(el.querySelector(".wib-label-text"), {
        x: -32, opacity: 0, duration: DUR.base, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".wib-label-text"), start: "top 85%" },
      });
      gsap.from(el.querySelector(".wib-label-line"), {
        scaleX: 0, duration: 0.6, ease: EASE.transition, delay: 0.15,
        scrollTrigger: { trigger: el.querySelector(".wib-label-text"), start: "top 85%" },
      });

      gsap.from(el.querySelectorAll(".wib-headline-line"), {
        y: "110%", duration: DUR.slow, stagger: 0.1, ease: EASE.hero,
        scrollTrigger: { trigger: el.querySelector(".wib-headline"), start: "top 80%" },
      });

      gsap.from(el.querySelectorAll(".wib-para"), {
        opacity: 0, y: 20, duration: DUR.base, stagger: 0.12, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".wib-paras"), start: "top 78%" },
      });

      el.querySelectorAll<HTMLElement>(".wib-stat").forEach((statEl, i) => {
        const numEl = statEl.querySelector<HTMLSpanElement>(".wib-stat-num");
        const { countTo, suffix } = STATS[i];
        const obj = { count: 0 };

        gsap.to(obj, {
          count: countTo,
          duration: 1.2,
          ease: "power2.out",
          onUpdate() {
            if (numEl) numEl.textContent = Math.round(obj.count) + suffix;
          },
          scrollTrigger: { trigger: statEl, start: "top 85%", once: true },
        });

        gsap.from(statEl.querySelector(".wib-stat-label"), {
          opacity: 0, y: 10, duration: 0.6, ease: EASE.entrance, delay: 0.5,
          scrollTrigger: { trigger: statEl, start: "top 85%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="what-i-build"
      aria-labelledby="wib-label"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top separator */}
      <div className="h-px mx-6 md:mx-12 lg:mx-16" style={{ background: "var(--border)" }} />

      <div className="px-6 md:px-12 lg:px-16 pt-20 pb-0">
        {/* Section label */}
        <div className="flex items-center gap-4 pb-16 md:pb-24">
          <span
            id="wib-label"
            className="wib-label-text font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            01 — What I Build
          </span>
          <span className="wib-label-line label-line flex-1" />
        </div>

        {/* Two-column: headline left, paragraphs right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16 pb-28 md:pb-36">
          {/* Left — headline with 8% indent */}
          <div className="lg:col-span-5 lg:pl-[8%]">
            <h2 className="wib-headline leading-none tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              {HEADLINE.map(({ text, muted }) => (
                <span key={text} className="block overflow-hidden">
                  <span
                    className="wib-headline-line block"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
                      color: muted ? "var(--fg-muted)" : "var(--fg)",
                    }}
                  >
                    {text}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Right — three paragraphs */}
          <div className="wib-paras lg:col-span-7 flex flex-col gap-8 lg:pt-2">
            <p
              className="wib-para text-base md:text-lg leading-relaxed font-light"
              style={{ color: "var(--fg-secondary)" }}
            >
              I work on the backend systems that move data reliably under pressure —
              message queues, retry logic, dead-letter handling. Systems that don't
              fall apart at 3am.
            </p>
            <p
              className="wib-para text-base md:text-lg leading-relaxed font-light"
              style={{ color: "var(--fg-secondary)" }}
            >
              Cloud infrastructure is the other half: VPC topology, ECS task
              definitions, CloudFront distributions, Terraform modules. The parts
              that let one engineer operate what would normally need a team.
            </p>
            <p
              className="wib-para text-base md:text-lg leading-relaxed font-light"
              style={{ color: "var(--fg-secondary)" }}
            >
              I won't ship something that only demos well. Every service I own has
              real observability — Grafana, Prometheus, Loki — before it goes
              to production.
            </p>
          </div>
        </div>

        {/* Oversized stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--border)",
            gap: "1px",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="wib-stat flex flex-col gap-4 py-14 md:py-20 px-6 md:px-8 lg:px-10"
              style={{ background: "var(--bg)" }}
            >
              <span
                className="wib-stat-num leading-none tabular-nums"
                style={{
                  fontSize: "clamp(4rem, 9vw, 12rem)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  color: "var(--fg)",
                  letterSpacing: "-0.03em",
                }}
              >
                {"0" + stat.suffix}
              </span>
              <span
                className="wib-stat-label font-mono text-xs leading-relaxed"
                style={{ color: "var(--fg-tertiary)", whiteSpace: "pre-line" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
