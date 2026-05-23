"use client";

import { useRef, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import { prefersReducedMotion, EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = ["Software &", "DevOps", "Engineer."];

export default function Hero({ ready = false }: Readonly<{ ready?: boolean }>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  // Set initial hidden state before first paint — prevents flash when loader exits
  useLayoutEffect(() => {
    if (!heroRef.current) return;
    if (reduced) {
      gsap.set(heroRef.current.querySelectorAll(".hero-line, .hero-identity, .hero-desc, .hero-meta"), {
        opacity: 1, y: 0,
      });
    } else {
      gsap.set(heroRef.current.querySelectorAll(".hero-line"), { y: "105%" });
      gsap.set(heroRef.current.querySelector(".hero-identity"), { opacity: 0, y: 16 });
      gsap.set(heroRef.current.querySelector(".hero-desc"), { opacity: 0, y: 20 });
      gsap.set(heroRef.current.querySelectorAll(".hero-meta"), { opacity: 0, y: 12 });
    }
  }, [reduced]);

  // Animate in only once loader is done
  useGSAP(
    () => {
      if (reduced || !ready || !heroRef.current) return;

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(heroRef.current.querySelectorAll(".hero-line"), {
        y: "0%",
        duration: DUR.slow,
        stagger: 0.08,
        ease: EASE.hero,
      });

      tl.to(heroRef.current.querySelector(".hero-identity"), {
        opacity: 1, y: 0, duration: DUR.base, ease: EASE.entrance,
      }, `-=${DUR.slow * 0.4}`);

      tl.to(heroRef.current.querySelector(".hero-desc"), {
        opacity: 1, y: 0, duration: DUR.base, ease: EASE.entrance,
      }, "-=0.5");

      tl.to(heroRef.current.querySelectorAll(".hero-meta"), {
        opacity: 1, y: 0, duration: 0.6, ease: EASE.entrance, stagger: 0.08,
      }, "-=0.4");
    },
    { scope: heroRef, dependencies: [ready, reduced] }
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.28], [0, -48]);

  return (
    <section
      ref={containerRef}
      style={{ height: "300vh", position: "relative" }}
      aria-label="Introduction"
    >
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Canvas */}
        <div className="absolute inset-0">
          <ScrollyCanvas containerRef={containerRef} />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 10%, rgba(10,10,12,0.7) 100%)",
            zIndex: 5,
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-56 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg))", zIndex: 6 }}
        />

        {/* Hero content */}
        <motion.div
          ref={heroRef}
          style={{ opacity: contentOpacity, y: contentY, zIndex: 10 }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-14 lg:px-20 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h1
              className="mb-8 md:mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 0.92,
              }}
            >
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="hero-line-wrap">
                  <span
                    className="hero-line block"
                    style={{
                      fontSize: "clamp(40px, 7vw, 100px)",
                      color: "var(--fg)",
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="hero-identity font-mono text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: "var(--fg-muted)" }}
            >
              Surya Pratap Das&nbsp;&nbsp;·&nbsp;&nbsp;Bhubaneswar, India
            </p>

            <p
              className="hero-desc text-base md:text-lg font-light leading-relaxed mb-8 max-w-[60ch]"
              style={{ color: "var(--fg-secondary)" }}
            >
              I build event-driven backends and the cloud infrastructure they live on.
              Most recently at Gravitones, scaling a live streaming platform from zero
              to seventy thousand concurrent users.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span
                className="hero-meta inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
                style={{ color: "var(--accent-cyan)" }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent-cyan)", boxShadow: "0 0 6px var(--accent-cyan)" }}
                />
                Available for new roles
              </span>
              <span
                className="hero-meta font-mono text-xs tracking-widest uppercase"
                style={{ color: "var(--fg-tertiary)" }}
              >
                Open to Bangalore / Hyderabad
              </span>
            </div>
          </div>
        </motion.div>

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
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <motion.div
      style={{ opacity, zIndex: 10 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
    >
      <div className="w-px h-14 overflow-hidden" style={{ background: "var(--stroke)" }}>
        <motion.div
          className="w-full h-1/2 origin-top"
          style={{ background: "var(--fg)" }}
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{ color: "var(--fg-tertiary)", writingMode: "horizontal-tb" }}
      >
        Scroll
      </span>
    </motion.div>
  );
}
