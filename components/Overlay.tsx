"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────
interface TextSectionProps {
  scrollYProgress: MotionValue<number>;
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
  children: React.ReactNode;
  align?: "center" | "left" | "right";
  parallaxStrength?: number;
}

// ─── Single animated text section ───────────────────────────────────────────
function TextSection({
  scrollYProgress,
  inStart,
  inEnd,
  outStart,
  outEnd,
  children,
  align = "center",
  parallaxStrength = 60,
}: TextSectionProps) {
  const opacity = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [inStart, outEnd],
    [parallaxStrength, -parallaxStrength]
  );

  const springY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 });

  const alignClass =
    align === "left"
      ? "items-start text-left pl-8 md:pl-24"
      : align === "right"
      ? "items-end text-right pr-8 md:pr-24"
      : "items-center text-center";

  return (
    <motion.div
      style={{ opacity, y: springY }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignClass}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll indicator ────────────────────────────────────────────────────────
function ScrollIndicator({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span
        className="text-xs tracking-[0.3em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        Scroll
      </span>
      <div className="w-px h-12 overflow-hidden" style={{ background: "var(--border)" }}>
        <motion.div
          className="w-full h-1/2 origin-top"
          style={{ background: "var(--fg)" }}
          animate={{ y: ["-100%", "200%"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Overlay ────────────────────────────────────────────────────────────
export default function Overlay({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {/* ── Section 1: Hero (0–18%) ─────────────────────────── */}
      <TextSection
        scrollYProgress={scrollYProgress}
        inStart={0}
        inEnd={0.04}
        outStart={0.14}
        outEnd={0.18}
        align="center"
        parallaxStrength={40}
      >
        {/* Tiny eyebrow */}
        <motion.p
          className="text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: "var(--muted)" }}
        >
          Creative Developer
        </motion.p>

        {/* Name — large display */}
        <h1
          className="font-semibold leading-none tracking-tight"
          style={{
            fontSize: "clamp(3rem, 10vw, 9rem)",
            color: "var(--fg)",
          }}
        >
          Surya
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 text-base md:text-xl font-light"
          style={{ color: "var(--muted)" }}
        >
          Building digital experiences that feel alive.
        </p>
      </TextSection>

      {/* ── Section 2: Left (28–48%) ────────────────────────── */}
      <TextSection
        scrollYProgress={scrollYProgress}
        inStart={0.28}
        inEnd={0.33}
        outStart={0.43}
        outEnd={0.48}
        align="left"
        parallaxStrength={50}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: "var(--accent)" }}
        >
          01 — Craft
        </p>
        <h2
          className="font-semibold leading-tight"
          style={{
            fontSize: "clamp(2rem, 6vw, 5.5rem)",
            color: "var(--fg)",
          }}
        >
          I build
          <br />
          digital
          <br />
          experiences.
        </h2>
        <p
          className="mt-4 max-w-xs text-sm md:text-base font-light"
          style={{ color: "var(--muted)" }}
        >
          Pixel-perfect interfaces driven by motion and purpose.
        </p>
      </TextSection>

      {/* ── Section 3: Right (55–75%) ───────────────────────── */}
      <TextSection
        scrollYProgress={scrollYProgress}
        inStart={0.55}
        inEnd={0.60}
        outStart={0.70}
        outEnd={0.75}
        align="right"
        parallaxStrength={50}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: "var(--accent)" }}
        >
          02 — Bridge
        </p>
        <h2
          className="font-semibold leading-tight"
          style={{
            fontSize: "clamp(2rem, 6vw, 5.5rem)",
            color: "var(--fg)",
          }}
        >
          Bridging
          <br />
          design and
          <br />
          engineering.
        </h2>
        <p
          className="mt-4 max-w-xs text-sm md:text-base font-light ml-auto"
          style={{ color: "var(--muted)" }}
        >
          From concept to code — fluent in both languages.
        </p>
      </TextSection>

      {/* ── Section 4: Center outro (82–95%) ───────────────── */}
      <TextSection
        scrollYProgress={scrollYProgress}
        inStart={0.82}
        inEnd={0.87}
        outStart={0.93}
        outEnd={0.97}
        align="center"
        parallaxStrength={30}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          03 — Work
        </p>
        <h2
          className="font-semibold leading-tight"
          style={{
            fontSize: "clamp(2rem, 6vw, 5.5rem)",
            color: "var(--fg)",
          }}
        >
          See the work
          <br />
          below.
        </h2>
      </TextSection>

      {/* Scroll indicator (fades out after 8% scroll) */}
      <ScrollIndicator scrollYProgress={scrollYProgress} />
    </div>
  );
}
