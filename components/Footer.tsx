"use client";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/suryapratap-1" },
  { label: "LinkedIn", href: "https://linkedin.com/in/suryapratapdas" },
  { label: "Email", href: "mailto:suryapratap0765@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      className="relative py-12 px-6 md:px-12 lg:px-24"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p
            className="font-mono text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--fg)" }}
          >
            Surya Pratap Das
          </p>
          <p className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
            © {new Date().getFullYear()} — Backend & DevOps Engineer
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--fg-muted)")
              }
            >
              {s.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
          Built with Next.js + GSAP
        </p>
      </div>
    </footer>
  );
}
