"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import { prefersReducedMotion, EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Each character is clipped inside an overflow-hidden wrapper so it
// can slide up from below the baseline on reveal.
function CharSplit({
  text,
  className,
}: Readonly<{ text: string; className?: string }>) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className="char-wrap">
          <span className="char hero-char">
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  // ── GSAP entrance timeline (scoped to heroRef) ────────────────────
  useGSAP(
    () => {
      if (!heroRef.current) return;

      if (reduced) {
        gsap.set(heroRef.current.querySelectorAll(".hero-char, .hero-subtitle, .hero-meta"), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(heroRef.current.querySelectorAll(".hero-char"), {
        y: "110%",
        duration: DUR.slow,
        stagger: 0.03,
        ease: EASE.hero,
      });

      tl.from(
        heroRef.current.querySelector(".hero-subtitle"),
        { opacity: 0, y: 20, duration: DUR.base, ease: EASE.entrance },
        `-=${DUR.slow * 0.5}`
      );

      tl.from(
        heroRef.current.querySelectorAll(".hero-meta"),
        {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: EASE.entrance,
          stagger: 0.1,
        },
        "-=0.4"
      );
    },
    { scope: heroRef }
  );

  // ── Scroll-driven content fade-out ──────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  return (
    <section
      ref={containerRef}
      style={{ height: "300vh", position: "relative" }}
      aria-label="Introduction"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Layer 0 — canvas frame scrubber */}
        <div className="absolute inset-0">
          <ScrollyCanvas containerRef={containerRef} />
        </div>

        {/* Layer 1 — vignette so text stays legible over the canvas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 50% 50%, transparent 20%, rgba(13,13,16,0.65) 100%)",
            zIndex: 5,
          }}
        />

        {/* Layer 2 — bottom fade into the next section */}
        <div
          className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--bg))",
            zIndex: 6,
          }}
        />

        {/* Layer 3 — hero content */}
        <motion.div
          ref={heroRef}
          style={{ opacity: contentOpacity, y: contentY, zIndex: 10 }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full">

            {/* Eyebrow */}
            <p
              className="hero-meta font-mono text-xs tracking-[0.4em] uppercase mb-8"
              style={{ color: "var(--accent)" }}
            >
              Backend &amp; DevOps Engineer
            </p>

            {/* Name — display serif */}
            <h1
              className="leading-none tracking-tight mb-6"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                fontFamily: "var(--font-fraunces)",
                fontWeight: 700,
                color: "var(--fg)",
              }}
            >
              <CharSplit text="Surya" className="hero-name block" />
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtitle max-w-lg text-base md:text-lg font-light leading-relaxed mb-10"
              style={{ color: "var(--fg-muted)" }}
            >
              Building event-driven systems and cloud infrastructure
              <br className="hidden md:block" />
              that hold at scale.
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span
                className="hero-meta font-mono text-xs tracking-widest uppercase"
                style={{ color: "var(--fg-muted)" }}
              >
                Bhubaneswar &rarr; open to Bangalore / Hyderabad
              </span>
              <span
                className="hero-meta inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 6px var(--accent)",
                  }}
                />
                Available for new roles
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

function ScrollIndicator({
  scrollYProgress,
}: Readonly<{
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}>) {
  const opacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <motion.div
      style={{ opacity, zIndex: 10 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        Scroll
      </span>
      <div className="w-px h-12 overflow-hidden" style={{ background: "var(--border)" }}>
        <motion.div
          className="w-full h-1/2 origin-top"
          style={{ background: "var(--fg)" }}
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
