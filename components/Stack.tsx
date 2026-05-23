"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STACK_GROUPS = [
  {
    label: "Language",
    items: ["TypeScript", "JavaScript", "SQL"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Kafka"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS EC2", "VPC", "ECS", "CloudFront", "S3",
      "Route 53", "ALB", "API Gateway", "ElastiCache", "MediaConvert",
      "Docker", "Docker Compose", "Terraform", "Nginx",
    ],
  },
  {
    label: "Frontend",
    items: ["Angular.js", "React.js", "Next.js", "Redux Toolkit", "TailwindCSS"],
  },
  {
    label: "Tooling",
    items: ["Git", "GitHub Actions", "Jenkins", "Grafana", "Prometheus", "Loki"],
  },
];

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
      gsap.from(el.querySelector(".stack-watermark"), {
        opacity: 0, x: 60, duration: DUR.slow, ease: EASE.entrance,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      el.querySelectorAll<HTMLElement>(".stack-row").forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, x: -24, duration: DUR.base, ease: EASE.entrance,
          delay: i * 0.07,
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
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

      {/* Ghost watermark */}
      <div
        className="stack-watermark absolute right-[-2vw] top-1/2 -translate-y-1/2 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontSize: "clamp(8rem, 18vw, 22rem)",
          fontFamily: "var(--font-fraunces)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        STACK
      </div>

      <div className="relative px-6 md:px-12 lg:px-16 pt-20 pb-32 md:pb-48">
        {/* Section label */}
        <div className="flex items-center gap-4 pb-16 md:pb-20">
          <span
            id="stack-label"
            className="stack-label font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            03 — Stack
          </span>
          <span className="stack-label-line label-line flex-1" />
        </div>

        {/* Table rows */}
        <div className="flex flex-col">
          {STACK_GROUPS.map((group) => (
            <div
              key={group.label}
              className="stack-row group relative grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-3 md:gap-x-16 py-7 md:py-9"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {/* Hover accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
                style={{ background: "var(--accent)" }}
              />

              {/* Category label */}
              <p
                className="font-mono text-xs tracking-widest uppercase self-center"
                style={{ color: "var(--fg-muted)" }}
              >
                {group.label}
              </p>

              {/* Items */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono group-hover:text-[var(--fg)] transition-colors duration-200"
                    style={{
                      fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
                      color: "var(--fg)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
