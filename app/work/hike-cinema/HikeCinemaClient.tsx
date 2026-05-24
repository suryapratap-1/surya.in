"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FRAMER_EASE } from "@/lib/motion";

const ADMIN_SCREENSHOTS = [
  {
    src: "/work/hike-dashboard.png",
    alt: "Admin dashboard — stat cards, Top Series Performance chart, User Growth",
    label: "Dashboard",
  },
  {
    src: "/work/hike-series.png",
    alt: "Series management — content grid with thumbnails and inline controls",
    label: "Series Management",
  },
  {
    src: "/work/hike-roles.png",
    alt: "Role management — RBAC split-panel with permission matrix",
    label: "Role Management",
  },
];

const LANDING_SCREENSHOTS = [
  {
    src: "/work/hike-landing-hero.png",
    alt: "HikeCinema landing page hero — Endless Desi Dramas, Zero Ads",
    label: "Hero",
  },
  {
    src: "/work/hike-landing-dramas.png",
    alt: "HikeCinema landing page — Discover Dramas Made for You content grid",
    label: "Content Discovery",
  },
];

const STACK = [
  "Node.js", "AWS ECS", "CloudFront", "MediaConvert",
  "RDS", "Terraform", "GitHub Actions", "Widevine", "FairPlay DRM",
];

const ACCENT = "#3ef0ff";

function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <p
        className="font-mono text-xs tracking-[0.4em] uppercase shrink-0"
        style={{ color: "var(--fg-tertiary)" }}
      >
        {children}
      </p>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function ScreenshotStack({ shots }: Readonly<{ shots: typeof ADMIN_SCREENSHOTS }>) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {shots.map((shot, i) => (
        <motion.div
          key={shot.src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: FRAMER_EASE }}
        >
          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: ACCENT }}
          >
            {shot.label}
          </p>
          <div
            className="relative w-full overflow-hidden"
            style={{
              borderRadius: "8px",
              border: "1px solid var(--border)",
              aspectRatio: "16/9",
            }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BackLink({ label, href }: Readonly<{ label: string; href: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 cursor-pointer"
      style={{ color: "var(--fg-muted)" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")}
    >
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </Link>
  );
}

export default function HikeCinemaClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--fg)" }}>

      {/* Nav */}
      <div className="px-6 md:px-12 lg:px-20 pt-8 pb-4">
        <BackLink label="Back to portfolio" href="/" />
      </div>

      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 pt-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: FRAMER_EASE }}
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: ACCENT }}
        >
          SHIPPED&nbsp;&nbsp;·&nbsp;&nbsp;Backend &amp; DevOps&nbsp;&nbsp;·&nbsp;&nbsp;Nov 2025 — present
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: FRAMER_EASE }}
          className="mt-4 mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 6vw, 7rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          Gravitones × Hike
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: FRAMER_EASE }}
          className="text-base md:text-lg font-light leading-relaxed max-w-[65ch]"
          style={{ color: "var(--fg-secondary)" }}
        >
          Owned the backend and every layer of AWS infrastructure for a live streaming
          platform inside India's Hike app. Replaced a five-container FFmpeg/HLS
          transcoding cluster with AWS Elemental MediaConvert — removing the bottleneck
          that blocked the path to 1M users. Provisioned ECS, VPC, RDS, CloudFront, and
          ElastiCache in Terraform, making this the org's first fully infrastructure-as-code
          project. Integrated Widevine and FairPlay DRM end-to-end, and standardised
          GitHub Actions CI/CD across six services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: FRAMER_EASE }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {STACK.map((item) => (
            <span
              key={item}
              className="font-mono text-xs tracking-wide px-3 py-1"
              style={{
                color: "var(--fg-tertiary)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Live site link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: FRAMER_EASE }}
          className="mt-8"
        >
          <a
            href="https://hikecinema.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-3 transition-colors duration-200"
            style={{
              color: ACCENT,
              border: `1px solid ${ACCENT}40`,
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${ACCENT}10`;
              el.style.borderColor = ACCENT;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = `${ACCENT}40`;
            }}
          >
            Visit hikecinema.com
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </header>

      {/* Divider */}
      <div className="h-px mx-6 md:mx-12 lg:mx-20" style={{ background: "var(--border)" }} />

      {/* Landing page section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <SectionLabel>Consumer Landing Page</SectionLabel>
        <ScreenshotStack shots={LANDING_SCREENSHOTS} />
      </section>

      {/* Divider */}
      <div className="h-px mx-6 md:mx-12 lg:mx-20" style={{ background: "var(--border)" }} />

      {/* Admin portal section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <SectionLabel>Admin Portal</SectionLabel>
        <ScreenshotStack shots={ADMIN_SCREENSHOTS} />
      </section>

      {/* Footer nav */}
      <div className="h-px mx-6 md:mx-12 lg:mx-20" style={{ background: "var(--border)" }} />
      <div className="px-6 md:px-12 lg:px-20 py-12 flex justify-between items-center">
        <BackLink label="All work" href="/#work" />
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "var(--fg-tertiary)" }}
        >
          surya.in
        </span>
      </div>
    </div>
  );
}
