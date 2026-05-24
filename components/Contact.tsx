"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { EASE, DUR, FRAMER_EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Email", href: "mailto:dev.suryapratap65@gmail.com", external: false },
  { label: "GitHub", href: "https://github.com/suryapratap-1", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/suryapratapdas", external: true },
  { label: "X", href: "https://x.com/SuryaPratapDas4", external: true },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const el = sectionRef.current;

      gsap.from(el.querySelector(".ct-label-text"), {
        x: -32, opacity: 0, duration: DUR.base, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".ct-label-text"), start: "top 85%" },
      });
      gsap.from(el.querySelector(".ct-label-line"), {
        scaleX: 0, duration: 0.6, ease: EASE.transition, delay: 0.15,
        scrollTrigger: { trigger: el.querySelector(".ct-label-text"), start: "top 85%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el.querySelector(".ct-body"), start: "top 72%" },
      });
      tl.from(el.querySelector(".ct-headline"), {
        opacity: 0, y: 48, duration: DUR.slow, ease: EASE.hero,
      });
      tl.from(el.querySelectorAll(".ct-link"), {
        opacity: 0, y: 16, duration: DUR.base, ease: EASE.entrance, stagger: 0.1,
      }, "-=0.5");
      tl.from(el.querySelector(".ct-avail"), {
        opacity: 0, y: 12, duration: 0.6, ease: EASE.entrance,
      }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="ct-label"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top separator */}
      <div className="h-px mx-6 md:mx-12 lg:mx-16" style={{ background: "var(--border)" }} />

      <div className="relative px-6 md:px-12 lg:px-16 pt-20 pb-40 md:pb-60">
        {/* Section label */}
        <div className="flex items-center gap-4 pb-20 md:pb-32">
          <span
            id="ct-label"
            className="ct-label-text font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            05 — Contact
          </span>
          <span className="ct-label-line label-line flex-1" />
        </div>

        <div className="ct-body flex flex-col items-center text-center">
          {/* Headline */}
          <h2
            className="ct-headline mb-16 md:mb-24"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 6vw, 7rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--fg)",
              maxWidth: "20ch",
            }}
          >
            Let's build something that holds.
          </h2>

          {/* Links row */}
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {LINKS.map((link) => (
              <ContactLink key={link.label} {...link} />
            ))}
          </div>

          {/* Availability chip */}
          <div className="ct-avail flex items-center gap-3 mt-16">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "var(--accent-cyan)",
                boxShadow: "0 0 8px var(--accent-cyan)",
              }}
            />
            <p
              className="font-mono text-xs tracking-wide"
              style={{ color: "var(--fg-muted)" }}
            >
              Actively interviewing · Available from June 2026 · Bangalore / Gurugram / Remote · Freelance welcome
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  label,
  href,
  external,
}: Readonly<{ label: string; href: string; external: boolean }>) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="ct-link group relative font-mono text-xs tracking-[0.3em] uppercase pb-1"
      style={{ color: hovered ? "var(--fg)" : "var(--fg-muted)", transition: "color 0.2s ease" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px"
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: FRAMER_EASE }}
        style={{ background: "var(--accent-cyan)", transformOrigin: "left center" }}
      />
    </a>
  );
}
