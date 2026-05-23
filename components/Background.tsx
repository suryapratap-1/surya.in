"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface Role {
  period: string;
  title: string;
  company: string;
  location: string;
  bullets: string[];
}

const EXPERIENCE: Role[] = [
  {
    period: "Nov 2025 — Present",
    title: "Software Developer (Full Stack & DevOps)",
    company: "Gravitones",
    location: "Bhubaneswar",
    bullets: [
      "Owned backend and infrastructure for a live streaming platform built with Hike — one of 4 engineers on the project.",
      "Scaled to 60K–70K concurrent users in load testing via CDN, ECS auto-scaling, multi-AZ deployments, and read replicas.",
      "Replaced FFmpeg/HLS transcoding (5–6 containers) with AWS Elemental MediaConvert, removing the bottleneck to 1M users.",
      "Integrated Widevine and FairPlay DRM for end-to-end video pipeline security.",
      "Provisioned the entire AWS stack in Terraform — the org's first fully infrastructure-as-code project.",
      "Set up GitHub Actions CI/CD across 6 services; rolled the same standard out to other team projects.",
      "Led incident response after a server compromise on a DigitalOcean product; migrated to fresh infra with hardened access.",
    ],
  },
  {
    period: "Apr 2024 — Nov 2025",
    title: "Software Developer",
    company: "Quotus Software Solutions",
    location: "Bhubaneswar",
    bullets: [
      "Owned backend for a F&B POS and channel manager integrating Square POS and Loyverse with DoorDash and Deliveroo.",
      "Migrated to event-driven architecture on Kafka — decoupled topics with retries and dead-letter queues.",
      "Built an LLM-assisted normalisation layer mapping payloads from 4 vendors into a single internal schema.",
      "Set up Grafana + Prometheus + Loki observability; integrated Razorpay, Stripe, and Resend.",
      "Stood up an on-prem bare-metal server for the Bahrain pilot, fixing a DHCP MAC-binding issue.",
      "Full-stack features on OTA platform; Amadeus GDS + Wincloud PMS integrations.",
      "Cut full-text search latency 30–40% via Elasticsearch migration; Redis caching on hot read paths.",
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
        scaleX: 0, duration: 0.6, ease: EASE.transition,
        scrollTrigger: { trigger: el.querySelector(".bg-label"), start: "top 85%" },
        delay: 0.15,
      });

      el.querySelectorAll<HTMLElement>(".bg-role").forEach((role, i) => {
        gsap.from(role, {
          opacity: 0, y: 32, duration: DUR.base, ease: EASE.entrance,
          delay: i * 0.1,
          scrollTrigger: { trigger: role, start: "top 84%" },
        });
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
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
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
        <div className="flex flex-col gap-16 md:gap-24 mb-20 md:mb-28">
          {EXPERIENCE.map((role) => (
            <div
              key={role.company}
              className="bg-role grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-16"
            >
              {/* Left — meta */}
              <div className="lg:col-span-4">
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {role.period}
                </p>
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-fraunces)",
                  }}
                >
                  {role.company}
                </h3>
                <p
                  className="font-mono text-xs"
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
              <ul className="lg:col-span-8 flex flex-col gap-3">
                {role.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <span
                      className="shrink-0 mt-2 w-1 h-1 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div
          className="bg-education glass rounded-2xl p-8 md:p-10"
        >
          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            Education
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <h3
                className="text-xl font-semibold mb-1"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-fraunces)",
                }}
              >
                {EDUCATION.degree}
              </h3>
              <p
                className="font-mono text-sm"
                style={{ color: "var(--fg-muted)" }}
              >
                {EDUCATION.institution} — {EDUCATION.location}
              </p>
            </div>
            <p
              className="font-mono text-xs tracking-widest"
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
