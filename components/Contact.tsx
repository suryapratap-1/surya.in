"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { EASE, DUR, FRAMER_EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const SECONDARY_LINKS = [
  {
    label: "GitHub",
    value: "suryapratap-1",
    href: "https://github.com/suryapratap-1",
  },
  {
    label: "LinkedIn",
    value: "suryapratapdas",
    href: "https://linkedin.com/in/suryapratapdas",
  },
];

function SecondaryLink({
  label,
  value,
  href,
}: Readonly<{ label: string; value: string; href: string }>) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-secondary flex items-center justify-between py-5"
      style={{ borderBottom: "1px solid var(--border)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="font-mono text-xs tracking-widest uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-sm transition-colors duration-200"
          style={{ color: hovered ? "var(--fg)" : "var(--fg-muted)" }}
        >
          {value}
        </span>
        <motion.div
          animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
          transition={{ duration: 0.2, ease: FRAMER_EASE }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{ color: "var(--accent)" }}
          >
            <path
              d="M2 12L12 2M12 2H5M12 2v7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [emailHovered, setEmailHovered] = useState(false);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const el = sectionRef.current;

      gsap.from(el.querySelector(".contact-label"), {
        x: -32, opacity: 0, duration: DUR.base, ease: EASE.entrance,
        scrollTrigger: { trigger: el.querySelector(".contact-label"), start: "top 85%" },
      });
      gsap.from(el.querySelector(".contact-label-line"), {
        scaleX: 0, duration: 0.6, ease: EASE.transition, delay: 0.15,
        scrollTrigger: { trigger: el.querySelector(".contact-label"), start: "top 85%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el.querySelector(".contact-body"), start: "top 75%" },
      });
      tl.from(el.querySelector(".contact-intro"), {
        opacity: 0, y: 20, duration: DUR.base, ease: EASE.entrance,
      });
      tl.from(el.querySelector(".contact-email"), {
        opacity: 0, y: 48, duration: DUR.slow, ease: EASE.hero,
      }, "-=0.4");
      tl.from(el.querySelectorAll(".contact-secondary"), {
        opacity: 0, y: 20, duration: DUR.base, ease: EASE.entrance, stagger: 0.1,
      }, "-=0.5");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-label"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top separator */}
      <div className="h-px mx-6 md:mx-12 lg:mx-16" style={{ background: "var(--border)" }} />

      {/* Atmospheric orb */}
      <div
        className="orb"
        style={{
          width: "600px",
          height: "600px",
          background: "var(--accent)",
          bottom: "-260px",
          left: "-160px",
          opacity: 0.45,
        }}
      />

      <div className="relative px-6 md:px-12 lg:px-16 pt-20 pb-40 md:pb-60">
        {/* Section label */}
        <div className="flex items-center gap-4 pb-20 md:pb-28">
          <span
            id="contact-label"
            className="contact-label font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            05 — Contact
          </span>
          <span className="contact-label-line label-line flex-1" />
        </div>

        <div className="contact-body">
          {/* Intro */}
          <p
            className="contact-intro font-mono text-xs tracking-widest uppercase mb-12 md:mb-16"
            style={{ color: "var(--fg-muted)" }}
          >
            Open to Backend / DevOps roles &nbsp;·&nbsp; Bangalore &nbsp;·&nbsp; Hyderabad &nbsp;·&nbsp; Remote
          </p>

          {/* Email — the centrepiece */}
          <a
            href="mailto:suryapratap0765@gmail.com"
            className="contact-email group block mb-16 md:mb-24"
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <div className="flex items-start gap-4 md:gap-6">
              <span
                className="leading-none tracking-tight"
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 5rem)",
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  color: emailHovered ? "var(--accent)" : "var(--fg)",
                  transition: "color 0.4s ease",
                  wordBreak: "break-all",
                }}
              >
                suryapratap0765@gmail.com
              </span>
              <motion.div
                className="shrink-0 mt-1 md:mt-2"
                animate={{
                  x: emailHovered ? 6 : 0,
                  y: emailHovered ? -6 : 0,
                  opacity: emailHovered ? 1 : 0.35,
                }}
                transition={{ duration: 0.3, ease: FRAMER_EASE }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  style={{ color: "var(--accent)" }}
                >
                  <path
                    d="M5 23L23 5M23 5H10M23 5v13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </a>

          {/* Secondary links */}
          <div
            className="max-w-md"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {SECONDARY_LINKS.map((link) => (
              <SecondaryLink key={link.label} {...link} />
            ))}
          </div>

          {/* Availability */}
          <div className="mt-10 flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />
            <p
              className="font-mono text-xs tracking-wide"
              style={{ color: "var(--fg-muted)" }}
            >
              Actively interviewing · Available from June 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
