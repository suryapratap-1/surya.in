"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollyCanvas from "./ScrollyCanvas";
import { useReducedMotion, EASE, DUR } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = ["Software &", "DevOps", "Engineer."];

const INTRO_TARGETS = ".hero-line, .hero-identity, .hero-desc, .hero-meta";

export default function Hero({ ready = false }: Readonly<{ ready?: boolean }>) {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Intro: hidden while the loader runs, animated in once it is done.
  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
      const q = gsap.utils.selector(hero);

      if (reduced) {
        gsap.set(q(INTRO_TARGETS), { opacity: 1, y: 0 });
        return;
      }

      const hidden = () => {
        gsap.set(q(".hero-line"), { y: "105%" });
        gsap.set(q(".hero-identity"), { opacity: 0, y: 16 });
        gsap.set(q(".hero-desc"), { opacity: 0, y: 20 });
        gsap.set(q(".hero-meta"), { opacity: 0, y: 12 });
      };

      hidden();
      if (!ready) return;

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(q(".hero-line"), { y: "0%", duration: DUR.slow, stagger: 0.08, ease: EASE.hero });
      tl.to(q(".hero-identity"), { opacity: 1, y: 0, duration: DUR.base, ease: EASE.entrance }, `-=${DUR.slow * 0.4}`);
      tl.to(q(".hero-desc"), { opacity: 1, y: 0, duration: DUR.base, ease: EASE.entrance }, "-=0.5");
      tl.to(q(".hero-meta"), { opacity: 1, y: 0, duration: 0.6, ease: EASE.entrance, stagger: 0.08 }, "-=0.4");
    },
    { scope: heroRef, dependencies: [ready, reduced] }
  );

  // Scroll-linked fade of the hero copy and the scroll indicator.
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;
      const scrollable = () => container.offsetHeight - window.innerHeight;

      gsap.to(heroRef.current, {
        opacity: 0,
        y: -48,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollable() * 0.28}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(indicatorRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollable() * 0.05}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative" style={{ height: "300vh" }} aria-label="Introduction">
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>
        {/* Canvas */}
        <div className="absolute inset-0">
          <ScrollyCanvas triggerRef={containerRef} />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 10%, rgba(10,10,12,0.7) 100%)",
            zIndex: 5,
          }}
        />

        {/* Mobile scrim: copy sits over the portrait on narrow screens */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{ background: "linear-gradient(to bottom, rgba(10,10,12,0.15) 25%, rgba(10,10,12,0.8) 70%)", zIndex: 5 }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-56 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg))", zIndex: 6 }}
        />

        {/* Hero content */}
        <div
          ref={heroRef}
          style={{ zIndex: 10 }}
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
                  <span className="hero-line block" style={{ fontSize: "clamp(40px, 7vw, 100px)", color: "var(--fg)" }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="hero-identity font-mono text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: "var(--fg-secondary)" }}
            >
              Surya Pratap Das&nbsp;&nbsp;·&nbsp;&nbsp;Bhubaneswar, India
            </p>

            <p
              className="hero-desc text-base md:text-lg font-light leading-relaxed mb-8 max-w-[60ch]"
              style={{ color: "var(--fg-secondary)" }}
            >
              I build event-driven backends and the cloud infrastructure they live on.
              Most recently at Gravitones, building a live streaming platform that held
              70K concurrent users in load testing.
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
              <span className="hero-meta font-mono text-xs tracking-widest uppercase" style={{ color: "var(--fg-tertiary)" }}>
                Bangalore / Gurugram / Remote
              </span>
              <span className="hero-meta font-mono text-xs tracking-widest uppercase" style={{ color: "var(--fg-tertiary)" }}>
                Open to freelance
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={indicatorRef}
          aria-hidden="true"
          style={{ zIndex: 10 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        >
          <div className="w-px h-14 overflow-hidden" style={{ background: "var(--stroke)" }}>
            <div className="scroll-cue w-full h-1/2" style={{ background: "var(--fg)" }} />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--fg-tertiary)" }}>
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
