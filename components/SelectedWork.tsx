"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAMER_EASE, EASE, DUR, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  index: string;
  company: string;
  year: string;
  role: string;
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
    year: "2025 — present",
    role: "Backend & DevOps",
    outcome: "60K–70K concurrent users in load testing",
    description:
      "Live streaming platform for Hike, India's messaging app. Owned the backend and all AWS infrastructure — ECS auto-scaling, CloudFront CDN, multi-AZ RDS with read replicas. Replaced a brittle FFmpeg/HLS transcoding cluster with AWS Elemental MediaConvert, unblocking the path to 1M users. Provisioned everything in Terraform — the org's first fully IaC project.",
    stack: [
      "Node.js",
      "AWS ECS",
      "CloudFront",
      "MediaConvert",
      "Terraform",
      "GitHub Actions",
      "Widevine DRM",
      "FairPlay DRM",
    ],
    github: "https://github.com/suryapratap-hike",
    accent: "#3ef0ff",
  },
  {
    index: "02",
    company: "Quotus — F&B POS",
    year: "2024 — 2025",
    role: "Backend Developer",
    outcome: "Event-driven middleware live in a pilot restaurant, Bahrain",
    description:
      "Backend for a POS and delivery channel manager integrating Square POS and Loyverse with DoorDash and Deliveroo. Migrated to Kafka — orders, POS sync, and delivery callbacks flow through decoupled topics with retries and dead-letter queues. Built an LLM-assisted normalisation layer that maps payloads from four vendors into one internal schema, removing per-vendor branching downstream.",
    stack: [
      "Node.js",
      "Kafka",
      "PostgreSQL",
      "LLM normalisation",
      "Grafana",
      "Prometheus",
      "Loki",
      "Razorpay",
      "Stripe",
    ],
    accent: "#f5a642",
  },
  {
    index: "03",
    company: "Quotus — OTA Platform",
    year: "2024 — 2025",
    role: "Full Stack",
    outcome: "30–40% reduction in property search latency",
    description:
      "Full-stack feature work on an online travel agency platform. Integrated Amadeus GDS for flight and hotel inventory and Wincloud PMS for property management. Migrated property search from a relational query to Elasticsearch, cutting p95 latency by 30–40%. Redis caching on hot read paths — listings, property details, and bookings.",
    stack: [
      "Node.js",
      "Elasticsearch",
      "Redis",
      "Angular",
      "PostgreSQL",
      "Amadeus GDS",
      "Wincloud PMS",
    ],
    accent: "#a78bfa",
  },
];

function ProjectCard({ project, i }: Readonly<{ project: Project; i: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = prefersReducedMotion();

  return (
    <motion.article
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DUR.base, delay: i * 0.12, ease: FRAMER_EASE }}
      className="group relative glass rounded-2xl overflow-hidden"
      style={{ minHeight: "360px" }}
    >
      {/* Top accent line animates in with the card */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.9,
          delay: i * 0.12 + 0.25,
          ease: FRAMER_EASE,
        }}
        style={{
          width: "100%",
          background: project.accent,
          transformOrigin: "left center",
        }}
      />

      {/* Large background index number */}
      <span
        className="absolute right-6 top-4 font-mono select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 12vw, 9rem)",
          fontFamily: "var(--font-fraunces)",
          fontWeight: 900,
          color: project.accent,
          opacity: 0.05,
          lineHeight: 1,
        }}
      >
        {project.index}
      </span>

      {/* Content */}
      <div className="relative p-7 md:p-10 flex flex-col h-full gap-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="font-mono text-xs tracking-widest uppercase mb-1"
              style={{ color: project.accent }}
            >
              {project.index} — {project.role}
            </p>
            <h3
              className="text-xl md:text-2xl font-semibold leading-snug"
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-fraunces)",
              }}
            >
              {project.company}
            </h3>
          </div>
          <span
            className="font-mono text-xs shrink-0 mt-1"
            style={{ color: "var(--fg-muted)" }}
          >
            {project.year}
          </span>
        </div>

        {/* Outcome callout */}
        <p
          className="font-mono text-xs tracking-wide"
          style={{ color: project.accent }}
        >
          → {project.outcome}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--fg-muted)" }}
        >
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                color: "var(--fg-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 self-start"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = project.accent)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")
            }
          >
            View on GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 10L10 2M10 2H4M10 2v6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}

function SectionLabel({ sectionRef }: Readonly<{ sectionRef: React.RefObject<HTMLElement | null> }>) {
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
        scaleX: 0, duration: 0.6, ease: EASE.transition,
        scrollTrigger: { trigger: el.querySelector(".work-label"), start: "top 85%" },
        delay: 0.15,
      });
    },
    { scope: sectionRef }
  );

  return (
    <div className="flex items-center gap-4 mb-16 md:mb-20">
      <span
        id="work-label"
        className="work-label font-mono text-xs tracking-[0.4em] uppercase"
        style={{ color: "var(--accent)" }}
      >
        02 — Selected Work
      </span>
      <span className="work-label-line label-line flex-1" />
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-label"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel sectionRef={sectionRef} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects 01 and 02 side by side on large screens */}
          {PROJECTS.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.index} project={project} i={i} />
          ))}
          {/* Project 03 spans full width */}
          <div className="lg:col-span-2">
            <ProjectCard project={PROJECTS[2]} i={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
