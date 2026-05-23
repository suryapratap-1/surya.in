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
        scaleX: 0, duration: 0.6, ease: EASE.transition,
        scrollTrigger: { trigger: el.querySelector(".stack-label"), start: "top 85%" },
        delay: 0.15,
      });

      el.querySelectorAll<HTMLElement>(".stack-group").forEach((group, i) => {
        gsap.from(group, {
          opacity: 0, y: 28, duration: DUR.base, ease: EASE.entrance,
          delay: i * 0.06,
          scrollTrigger: { trigger: group, start: "top 84%" },
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
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ background: "var(--bg-elevated)" }}
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span
            id="stack-label"
            className="stack-label font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            03 — Stack
          </span>
          <span className="stack-label-line label-line flex-1" />
        </div>

        {/* Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
          {STACK_GROUPS.map((group) => (
            <div key={group.label} className="stack-group">
              <p
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: "var(--fg-muted)" }}
              >
                {group.label}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {group.items.map((item, j) => (
                  <span
                    key={item}
                    className="font-mono"
                    style={{
                      fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                      color: "var(--fg)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                    {j < group.items.length - 1 && (
                      <span style={{ color: "var(--border)", marginLeft: "0.3em" }}>
                        /
                      </span>
                    )}
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
