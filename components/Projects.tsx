"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Project {
  index: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
  accent: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Spatial UI Framework",
    description:
      "A design system built for mixed-reality interfaces — bridging physical space with digital interaction layers.",
    tags: ["React", "WebXR", "Three.js", "GLSL"],
    year: "2025",
    accent: "#c8ff57",
  },
  {
    index: "02",
    title: "Motion Design Engine",
    description:
      "A real-time, GPU-accelerated motion composition tool. Designed for agencies who treat motion as a first-class medium.",
    tags: ["Next.js", "WebGL", "Framer Motion", "WASM"],
    year: "2024",
    accent: "#57c8ff",
  },
  {
    index: "03",
    title: "Generative Brand System",
    description:
      "An algorithmic brand identity platform that produces unique visual outputs from a single parametric seed.",
    tags: ["Canvas API", "p5.js", "TypeScript", "Figma API"],
    year: "2024",
    accent: "#ff57c8",
  },
  {
    index: "04",
    title: "Scroll-Driven Storytelling",
    description:
      "This very site — an open-source template for cinematic, scroll-linked image-sequence portfolios.",
    tags: ["Next.js", "Framer Motion", "HTML Canvas", "WebP"],
    year: "2025",
    accent: "#ffa857",
  },
];

// ─── Single card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between rounded-2xl p-7 md:p-8 overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        minHeight: "320px",
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accent}12, transparent 40%)`,
        }}
      />

      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-px origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: project.accent, width: "100%" }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: project.accent }}
        >
          {project.index}
        </span>
        <span
          className="font-mono text-xs"
          style={{ color: "var(--muted)" }}
        >
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-end">
        <h3
          className="text-xl md:text-2xl font-semibold mb-3 leading-snug transition-colors duration-300"
          style={{ color: "var(--fg)" }}
        >
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-mono"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow hint on hover */}
      <motion.div
        className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
        style={{ color: project.accent }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10h12M11 5l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mb-16 md:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs tracking-[0.5em] uppercase mb-4"
        style={{ color: "var(--accent)" }}
      >
        Selected Work
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-semibold leading-tight"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color: "var(--fg)",
        }}
      >
        Things I&apos;ve
        <br />
        <span style={{ color: "var(--muted)" }}>shipped.</span>
      </motion.h2>
    </div>
  );
}

// ─── Main Projects section ────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader />

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.index} project={project} i={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="mailto:hello@surya.dev"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--accent)",
              color: "#000",
            }}
          >
            <span>Let&apos;s work together</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M8 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
