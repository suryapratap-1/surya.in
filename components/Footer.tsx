const SOCIALS = [
  { label: "GitHub", href: "https://github.com/suryapratap-1" },
  { label: "LinkedIn", href: "https://linkedin.com/in/suryapratapdas" },
  { label: "X", href: "https://x.com/SuryaPratapDas4" },
  { label: "Email", href: "mailto:dev.suryapratap65@gmail.com" },
];

const TOOLS = ["Next.js", "GSAP", "Lenis", "Tailwind", "Vercel"];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div className="px-6 md:px-12 lg:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p
            className="font-mono text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--fg)" }}
          >
            Surya Pratap Das
          </p>
          <p className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
            © {new Date().getFullYear()} — Software & DevOps Engineer
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === "Email" ? undefined : "_blank"}
              rel={s.label === "Email" ? undefined : "noopener noreferrer"}
              className="link-muted font-mono text-xs tracking-widest uppercase"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Tool credits */}
      <div
        className="px-6 md:px-12 lg:px-16 py-5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="font-mono text-xs" style={{ color: "var(--fg-tertiary)" }}>
          Website built using:{" "}
          {TOOLS.map((tool, i) => (
            <span key={tool}>
              {tool}
              {i < TOOLS.length - 1 && (
                <span style={{ color: "var(--border)", margin: "0 0.5em" }}>·</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
