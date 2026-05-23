"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    period: "Nov 2025 — Present",
    company: "Gravitones",
    title: "Software Developer — Backend & DevOps",
    location: "Bhubaneswar",
    bullets: [
      "Built live streaming platform for Hike — owned backend and full AWS infrastructure.",
      "Scaled to 60–70K concurrent users in load testing via ECS auto-scaling, CDN, and multi-AZ.",
      "Replaced 5-container FFmpeg/HLS cluster with AWS Elemental MediaConvert.",
      "Integrated Widevine and FairPlay DRM end-to-end.",
      "First fully IaC project in the org — entire stack provisioned in Terraform.",
      "GitHub Actions CI/CD standardised across 6 services.",
    ],
  },
  {
    period: "Apr 2024 — Nov 2025",
    company: "Quotus",
    title: "Software Developer",
    location: "Bhubaneswar",
    bullets: [
      "Backend for F&B POS connecting Square / Loyverse to DoorDash and Deliveroo.",
      "Kafka-based event-driven architecture with retry queues and dead-letter handling.",
      "LLM-assisted normalisation layer mapping 4 vendor payloads to one internal schema.",
      "Grafana + Prometheus + Loki observability; Razorpay, Stripe, and Resend integrations.",
      "Elasticsearch migration cut p95 search latency 30–40%; Redis caching on hot paths.",
    ],
  },
];

const EDUCATION = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "GITA Autonomous College",
  period: "2020 — 2024",
  location: "Bhubaneswar",
};

export default function Background() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const el = sectionRef.current;

      gsap.from(el.querySelector(".bg-label"), {
        x: -32, opacity: 0, duration: DUR.base, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".bg-label"), start: "top 85%" },
      });
      gsap.from(el.querySelector(".bg-label-line"), {
        scaleX: 0, duration: 0.6, ease: EASE.transition, delay: 0.15,
        scrollTrigger: { trigger: el.querySelector(".bg-label"), start: "top 85%" },
      });

      el.querySelectorAll<HTMLElement>(".bg-role").forEach((role) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: role, start: "top 78%" },
        });
        tl.from(role.querySelector(".bg-period"), {
          opacity: 0, x: -20, duration: DUR.base, ease: EASE.entrance,
        });
        tl.from(role.querySelector(".bg-company"), {
          opacity: 0, y: 48, duration: DUR.slow, ease: EASE.hero,
        }, "-=0.5");
        tl.from(role.querySelectorAll(".bg-bullet"), {
          opacity: 0, y: 16, duration: DUR.base, ease: EASE.entrance, stagger: 0.06,
        }, "-=0.6");
      });

      gsap.from(el.querySelector(".bg-education"), {
        opacity: 0, y: 24, duration: DUR.base, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".bg-education"), start: "top 84%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="background"
      aria-labelledby="background-label"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top separator */}
      <div className="h-px mx-6 md:mx-12 lg:mx-16" style={{ background: "var(--border)" }} />

      <div className="px-6 md:px-12 lg:px-16 pt-20 pb-32 md:pb-48">
        {/* Section label */}
        <div className="flex items-center gap-4 pb-16 md:pb-24">
          <span
            id="background-label"
            className="bg-label font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            04 — Background
          </span>
          <span className="bg-label-line label-line flex-1" />
        </div>

        {/* Experience */}
        <div className="flex flex-col">
          {EXPERIENCE.map((role) => (
            <div
              key={role.company}
              className="bg-role grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 py-16 md:py-24"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {/* Left — period + company + title */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                <p
                  className="bg-period font-mono text-xs tracking-widest uppercase mb-5"
                  style={{ color: "var(--accent)" }}
                >
                  {role.period}
                </p>
                <h3
                  className="bg-company leading-none tracking-tight mb-5"
                  style={{
                    fontSize: "clamp(2.5rem, 4.5vw, 5.5rem)",
                    fontFamily: "var(--font-fraunces)",
                    fontWeight: 700,
                    color: "var(--fg)",
                  }}
                >
                  {role.company}
                </h3>
                <p
                  className="font-mono text-xs tracking-wide"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {role.title}
                </p>
                <p
                  className="font-mono text-xs mt-1"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {role.location}
                </p>
              </div>

              {/* Right — bullets */}
              <ul className="lg:col-span-7 flex flex-col gap-5 lg:pt-2">
                {role.bullets.map((bullet, j) => (
                  <li
                    key={bullet}
                    className="bg-bullet flex items-start gap-5 text-sm md:text-base leading-relaxed"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <span
                      className="font-mono text-xs shrink-0 mt-1 tabular-nums"
                      style={{ color: "var(--accent)" }}
                    >
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="bg-education pt-16 md:pt-24">
          <p
            className="font-mono text-xs tracking-widest uppercase mb-8"
            style={{ color: "var(--fg-muted)" }}
          >
            Education
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h3
                className="leading-tight mb-2"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)",
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  color: "var(--fg)",
                }}
              >
                {EDUCATION.degree}
              </h3>
              <p
                className="font-mono text-sm"
                style={{ color: "var(--fg-muted)" }}
              >
                {EDUCATION.institution} &nbsp;·&nbsp; {EDUCATION.location}
              </p>
            </div>
            <p
              className="font-mono text-xs tracking-widest shrink-0"
              style={{ color: "var(--accent)" }}
            >
              {EDUCATION.period}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
