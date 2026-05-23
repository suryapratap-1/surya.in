"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  {
    label: "Email",
    value: "suryapratap0765@gmail.com",
    href: "mailto:suryapratap0765@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/suryapratap-1",
    href: "https://github.com/suryapratap-1",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/suryapratapdas",
    href: "https://linkedin.com/in/suryapratapdas",
    external: true,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
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
        scaleX: 0, duration: 0.6, ease: EASE.transition,
        scrollTrigger: { trigger: el.querySelector(".contact-label"), start: "top 85%" },
        delay: 0.15,
      });

      gsap.from(el.querySelector(".contact-headline"), {
        opacity: 0, y: 40, duration: DUR.slow, ease: EASE.hero,
        scrollTrigger: { trigger: el.querySelector(".contact-headline"), start: "top 80%" },
      });

      el.querySelectorAll<HTMLElement>(".contact-link").forEach((link, i) => {
        gsap.from(link, {
          opacity: 0, y: 24, duration: DUR.base, ease: EASE.entrance,
          delay: i * 0.1,
          scrollTrigger: { trigger: link, start: "top 84%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-label"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: "var(--bg-elevated)" }}
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Atmospheric orb */}
      <div
        className="orb"
        style={{
          width: "500px",
          height: "500px",
          background: "var(--accent)",
          bottom: "-200px",
          left: "-100px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span
            id="contact-label"
            className="contact-label font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            05 — Contact
          </span>
          <span className="contact-label-line label-line flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16 items-start">

          {/* Headline */}
          <div className="lg:col-span-6">
            <h2
              className="contact-headline leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontFamily: "var(--font-fraunces)",
                fontWeight: 700,
                color: "var(--fg)",
              }}
            >
              Let&apos;s
              <br />
              <span style={{ color: "var(--fg-muted)" }}>work</span>
              <br />
              together.
            </h2>
          </div>

          {/* Links */}
          <div className="lg:col-span-6 flex flex-col gap-0">
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="contact-link group flex items-center justify-between py-6 transition-colors duration-200"
                style={{
                  borderBottom: "1px solid var(--border)",
                  color: "var(--fg-muted)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
                }}
              >
                <div>
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-1"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {link.label}
                  </p>
                  <p className="font-mono text-sm md:text-base" style={{ color: "var(--fg)" }}>
                    {link.value}
                  </p>
                </div>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "var(--accent)" }}
                >
                  <path
                    d="M4 16L16 4M16 4H7M16 4v9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}

            {/* Availability callout */}
            <div className="mt-10 flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                }}
              />
              <p className="font-mono text-xs tracking-wide" style={{ color: "var(--fg-muted)" }}>
                Open to Backend / DevOps roles in Bangalore, Hyderabad, or remote.
                Actively interviewing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
