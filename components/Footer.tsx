"use client";

import { motion } from "framer-motion";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/surya" },
  { label: "Twitter", href: "https://twitter.com/surya" },
  { label: "LinkedIn", href: "https://linkedin.com/in/surya" },
  { label: "Dribbble", href: "https://dribbble.com/surya" },
];

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 md:px-12 lg:px-24"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left */}
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--fg)" }}>
            surya<span style={{ color: "var(--accent)" }}>.</span>dev
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </div>

        {/* Center: socials */}
        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-100"
              style={{ color: "var(--muted)" }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Right */}
        <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          Built with Next.js + Framer Motion
        </p>
      </div>
    </footer>
  );
}
