"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, prefersReducedMotion } from "@/lib/motion";

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
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !trackRef.current) return;
      const track = trackRef.current;
      const halfW = track.scrollWidth / 2;

      gsap.fromTo(
        track,
        { x: direction === "left" ? 0 : -halfW },
        {
          x: direction === "left" ? -halfW : 0,
          duration,
          ease: "none",
          repeat: -1,
        }
      );
    },
    { scope: trackRef }
  );

  const doubled = [
    ...items.map((item, idx) => ({ item, id: `a${idx}` })),
    ...items.map((item, idx) => ({ item, id: `b${idx}` })),
  ];

  return (
    <div
      className="marquee-outer"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div ref={trackRef} className="marquee-track flex items-center">
        {doubled.map(({ item, id }, i) => (
          <span
            key={id}
            className="shrink-0"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 7rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: id.startsWith("a") ? "var(--fg)" : "var(--fg-tertiary)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              paddingTop: "clamp(1.5rem, 2.5vw, 2.5rem)",
              paddingBottom: "clamp(1.5rem, 2.5vw, 2.5rem)",
              paddingLeft: "clamp(1.5rem, 2.5vw, 2.5rem)",
              paddingRight: "clamp(1.5rem, 2.5vw, 2.5rem)",
            }}
          >
            {item}
            <span
              style={{
                display: "inline-block",
                marginLeft: "clamp(1rem, 2vw, 2rem)",
                color: "var(--stroke)",
                fontSize: "0.5em",
                verticalAlign: "middle",
              }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();

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
    { scope: sectionRef }
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
