"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { EASE, DUR, FRAMER_EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  index: string;
  company: string;
  year: string;
  role: string;
  metric: string;
  metricLabel: string;
  outcome: string;
  description: string;
  stack: string[];
  github?: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    index: "01",
    company: "Gravitones × Hike",
    year: "Nov 2025 — present",
    role: "Backend & DevOps",
    metric: "60–70K",
    metricLabel: "concurrent users\nin load testing",
    outcome: "Scaled a live streaming platform from zero to production at Hike",
    description:
      "Owned the backend and every layer of AWS infrastructure for a live streaming platform inside India's Hike app. Replaced a five-container FFmpeg/HLS transcoding cluster with AWS Elemental MediaConvert — removing the bottleneck that blocked the path to 1M users. Provisioned ECS, VPC, RDS, CloudFront, and ElastiCache in Terraform, making this the org's first fully infrastructure-as-code project. Integrated Widevine and FairPlay DRM end-to-end, and standardised GitHub Actions CI/CD across six services.",
    stack: ["Node.js", "AWS ECS", "CloudFront", "MediaConvert", "RDS", "Terraform", "GitHub Actions", "Widevine", "FairPlay DRM"],
    github: "https://github.com/suryapratap-hike",
    accent: "#3ef0ff",
  },
  {
    index: "02",
    company: "Quotus — F&B POS",
    year: "Apr 2024 — Nov 2025",
    role: "Backend Developer",
    metric: "4",
    metricLabel: "vendor payloads\nnormalised by LLM",
    outcome: "Event-driven POS middleware live in a pilot restaurant, Bahrain",
    description:
      "Built the backend for a POS and delivery channel manager connecting Square POS and Loyverse to DoorDash and Deliveroo. Migrated the system to Kafka — orders, POS sync, and delivery callbacks flow through decoupled topics with retry queues and dead-letter handling. The most unusual piece: an LLM-assisted normalisation layer that maps payloads from four vendors into one internal schema, eliminating per-vendor branching downstream. Set up Grafana, Prometheus, and Loki observability, and stood up an on-prem bare-metal server for the Bahrain pilot.",
    stack: ["Node.js", "Kafka", "PostgreSQL", "LLM normalisation", "Grafana", "Prometheus", "Loki", "Razorpay", "Stripe", "Resend"],
    accent: "#f5a642",
  },
  {
    index: "03",
    company: "Quotus — OTA Platform",
    year: "Apr 2024 — Nov 2025",
    role: "Full Stack",
    metric: "30–40%",
    metricLabel: "reduction in\nsearch latency",
    outcome: "Full-stack feature work with Amadeus GDS and Wincloud PMS integrations",
    description:
      "Shipped full-stack features across an online travel agency platform, integrating Amadeus GDS for flight and hotel inventory and Wincloud PMS for property management. Migrated property search from a relational query to Elasticsearch — cutting p95 latency by 30–40% in benchmarks. Applied Redis caching on the hot read paths (listings, property details, bookings) to remove database pressure at peak.",
    stack: ["Node.js", "Elasticsearch", "Redis", "Angular", "PostgreSQL", "Amadeus GDS", "Wincloud PMS"],
    accent: "#a78bfa",
  },
];

function ProjectRow({ project, i }: Readonly<{ project: Project; i: number }>) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !rowRef.current) return;
      const el = rowRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
        },
      });

      tl.from(el.querySelector(".proj-index"), {
        opacity: 0, x: -20, duration: DUR.base, ease: EASE.entrance,
      });
      tl.from(el.querySelector(".proj-company"), {
        opacity: 0, y: 30, duration: DUR.slow, ease: EASE.hero,
      }, "-=0.4");
      tl.from(el.querySelector(".proj-body"), {
        opacity: 0, y: 20, duration: DUR.base, ease: EASE.entrance,
      }, "-=0.6");
      tl.from(el.querySelector(".proj-metric"), {
        opacity: 0, x: 30, duration: DUR.slow, ease: EASE.hero,
      }, "<");
    },
    { scope: rowRef }
  );

  return (
    <div
      ref={rowRef}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent border — draws on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px"
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: FRAMER_EASE }}
        style={{
          background: project.accent,
          transformOrigin: "top center",
        }}
      />

      {/* Hover background tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: `${project.accent}06` }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 px-6 md:px-12 lg:px-16 py-14 md:py-20">

        {/* Left — index + company + detail */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Index + role row */}
          <div className="proj-index flex items-center gap-4">
            <span
              className="font-mono text-xs tracking-widest"
              style={{ color: project.accent }}
            >
              {project.index}
            </span>
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "var(--fg-muted)" }}
            >
              {project.role} &nbsp;·&nbsp; {project.year}
            </span>
          </div>

          {/* Company name */}
          <h3
            className="proj-company leading-none tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              fontFamily: "var(--font-fraunces)",
              fontWeight: 700,
              color: hovered ? "var(--fg)" : "rgba(245,244,240,0.9)",
              transition: "color 0.3s ease",
            }}
          >
            {project.company}
          </h3>

          {/* Body */}
          <div className="proj-body flex flex-col gap-5">
            {/* Outcome line */}
            <p
              className="font-mono text-xs tracking-wide"
              style={{ color: project.accent }}
            >
              → {project.outcome}
            </p>

            {/* Description */}
            <p
              className="text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ color: "var(--fg-muted)" }}
            >
              {project.description}
            </p>

            {/* Stack — inline slash-separated */}
            <p
              className="font-mono text-xs leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {project.stack.join("  ·  ")}
            </p>

            {/* GitHub */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 self-start"
                style={{ color: hovered ? project.accent : "var(--fg-muted)" }}
              >
                View on GitHub
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right — metric */}
        <div className="lg:col-span-5 flex flex-col justify-start items-start lg:items-end lg:text-right gap-2 lg:pt-8">
          <p
            className="proj-metric leading-none tracking-tight"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 8rem)",
              fontFamily: "var(--font-fraunces)",
              fontWeight: 700,
              color: hovered ? project.accent : "rgba(245,244,240,0.28)",
              transition: "color 0.5s ease",
            }}
          >
            {project.metric}
          </p>
          <p
            className="font-mono text-xs leading-relaxed"
            style={{ color: "var(--fg-muted)", whiteSpace: "pre-line" }}
          >
            {project.metricLabel}
          </p>
        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="mx-6 md:mx-12 lg:mx-16 h-px"
        style={{ background: "var(--border)" }}
      />
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const el = sectionRef.current;
      gsap.from(el.querySelector(".work-label"), {
        x: -32, opacity: 0, duration: DUR.base, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".work-label"), start: "top 85%" },
      });
      gsap.from(el.querySelector(".work-label-line"), {
        scaleX: 0, duration: 0.6, ease: EASE.transition, delay: 0.15,
        scrollTrigger: { trigger: el.querySelector(".work-label"), start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-label"
      className="relative"
      style={{ background: "var(--bg)" }}
    >
      {/* Top separator */}
      <div className="h-px mx-6 md:mx-12 lg:mx-16" style={{ background: "var(--border)" }} />

      {/* Section label */}
      <div className="flex items-center gap-4 px-6 md:px-12 lg:px-16 pt-20 pb-8">
        <span
          id="work-label"
          className="work-label font-mono text-xs tracking-[0.4em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          02 — Selected Work
        </span>
        <span className="work-label-line label-line flex-1" />
      </div>

      {/* Projects */}
      {PROJECTS.map((project, i) => (
        <ProjectRow key={project.index} project={project} i={i} />
      ))}

      <div className="pb-24 md:pb-40" />
    </section>
  );
}
