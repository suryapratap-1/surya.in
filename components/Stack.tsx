"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, useReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ROWS: { items: string[]; direction: "left" | "right"; duration: number }[] = [
  {
    direction: "left",
    duration: 55,
    items: [
      "Node.js", "TypeScript", "Kafka", "PostgreSQL", "Redis",
      "Elasticsearch", "AWS ECS", "CloudFront", "MediaConvert", "RDS",
      "S3", "VPC", "Express",
    ],
  },
  {
    direction: "right",
    duration: 45,
    items: [
      "Terraform", "GitHub Actions", "Docker", "Nginx", "Grafana",
      "Prometheus", "Loki", "ALB", "Route 53", "API Gateway",
      "ElastiCache", "Jenkins", "Git",
    ],
  },
  {
    direction: "left",
    duration: 65,
    items: [
      "Angular", "React", "Next.js", "Redux", "Tailwind",
      "Widevine", "FairPlay DRM", "Razorpay", "Stripe", "Resend",
      "Amadeus GDS", "Wincloud PMS", "JWT",
    ],
  },
];

function MarqueeRow({
  items,
  direction,
  duration,
}: Readonly<{ items: string[]; direction: "left" | "right"; duration: number }>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !trackRef.current) return;
      const track = trackRef.current;
      // The track holds two identical copies, so -50% is exactly one copy wide
      // (stays correct after web fonts swap in or the viewport resizes).
      gsap.fromTo(
        track,
        { xPercent: direction === "left" ? 0 : -50 },
        {
          xPercent: direction === "left" ? -50 : 0,
          duration,
          ease: "none",
          repeat: -1,
          scrollTrigger: { trigger: track, toggleActions: "play pause resume pause" },
        }
      );
    },
    { scope: trackRef, dependencies: [reduced], revertOnUpdate: true }
  );

  const copies = reduced ? [0] : [0, 1];

  return (
    <div className="overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
      <div ref={trackRef} className={reduced ? "" : "flex w-max items-center"}>
        {copies.map((copy) => (
          <ul key={copy} className={`flex items-center ${reduced ? "flex-wrap" : "shrink-0"}`} aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item, i) => (
              <li
                key={item}
                className="shrink-0 whitespace-nowrap"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 7rem)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  color: i % 2 === 0 ? "var(--fg)" : "var(--fg-tertiary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  padding: "clamp(1.5rem, 2.5vw, 2.5rem)",
                }}
              >
                {item}
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    marginLeft: "clamp(1rem, 2vw, 2rem)",
                    color: "var(--fg-tertiary)",
                    fontSize: "0.5em",
                    verticalAlign: "middle",
                  }}
                >
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const el = sectionRef.current;

      gsap.from(el.querySelector(".stack-label"), {
        x: -32, opacity: 0, duration: DUR.base, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".stack-label"), start: "top 85%" },
      });
      gsap.from(el.querySelector(".stack-label-line"), {
        scaleX: 0, duration: 0.6, ease: EASE.transition, delay: 0.15,
        scrollTrigger: { trigger: el.querySelector(".stack-label"), start: "top 85%" },
      });
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      id="stack"
      aria-labelledby="stack-label"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top separator */}
      <div className="h-px mx-6 md:mx-12 lg:mx-16" style={{ background: "var(--border)" }} />

      {/* Section label */}
      <div className="flex items-center gap-4 px-6 md:px-12 lg:px-16 pt-20 pb-12">
        <span
          id="stack-label"
          className="stack-label font-mono text-xs tracking-[0.4em] uppercase"
          style={{ color: "var(--accent-cyan)" }}
        >
          03 — Stack
        </span>
        <span className="stack-label-line label-line flex-1" />
      </div>

      {/* Kinetic marquee rows */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {ROWS.map((row) => (
          <MarqueeRow key={`${row.direction}-${row.duration}`} {...row} />
        ))}
      </div>

      <div className="pb-24 md:pb-40" />
    </section>
  );
}
