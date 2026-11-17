import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "./ScrollToTop";

export const metadata: Metadata = {
  title: "Gravitones × Hike Cinema",
  description:
    "Owned the backend and full AWS infrastructure for a live streaming platform inside India's Hike app. Held 70K concurrent users in load testing. AWS ECS, Terraform, Widevine DRM, GitHub Actions.",
  openGraph: {
    title: "Gravitones × Hike Cinema — Surya Pratap Das",
    description:
      "Live streaming platform at scale: AWS ECS, CloudFront, MediaConvert, Terraform IaC, Widevine + FairPlay DRM, 70K concurrent users in load testing.",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://surya.in/work/hike-cinema",
  },
};

type Shot = { src: string; alt: string; label: string };

const LANDING_SCREENSHOTS: Shot[] = [
  {
    src: "/work/hike-landing-hero.png",
    alt: "HikeCinema landing page hero — Endless Desi Dramas, Zero Ads",
    label: "Hero",
  },
  {
    src: "/work/hike-landing-dramas.png",
    alt: "HikeCinema landing page — Discover Dramas Made for You content grid",
    label: "Content Discovery",
  },
];

const ADMIN_SCREENSHOTS: Shot[] = [
  {
    src: "/work/hike-dashboard.png",
    alt: "Admin dashboard — stat cards, Top Series Performance chart, User Growth",
    label: "Dashboard",
  },
  {
    src: "/work/hike-series.png",
    alt: "Series management — content grid with thumbnails and inline controls",
    label: "Series Management",
  },
  {
    src: "/work/hike-roles.png",
    alt: "Role management — RBAC split-panel with permission matrix",
    label: "Role Management",
  },
];

const STACK = [
  "Node.js", "AWS ECS", "CloudFront", "MediaConvert",
  "RDS", "Terraform", "GitHub Actions", "Widevine", "FairPlay DRM",
];

const ACCENT = "#3ef0ff";

function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <h2 className="font-mono text-xs tracking-[0.4em] uppercase shrink-0" style={{ color: "var(--fg-tertiary)" }}>
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function ScreenshotStack({ shots, priorityFirst = false }: Readonly<{ shots: Shot[]; priorityFirst?: boolean }>) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {shots.map((shot, i) => (
        <figure key={shot.src} className="reveal-on-view">
          <figcaption className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: ACCENT }}>
            {shot.label}
          </figcaption>
          <div
            className="relative w-full overflow-hidden"
            style={{ borderRadius: "8px", border: "1px solid var(--border)", aspectRatio: "16/9" }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1152px"
              className="object-cover object-top"
              priority={priorityFirst && i === 0}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

function BackLink({ label, href }: Readonly<{ label: string; href: string }>) {
  return (
    <Link href={href} className="link-muted inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
        <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </Link>
  );
}

export default function HikeCinemaPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--fg)" }}>
      <ScrollToTop />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 pb-4">
        <BackLink label="Back to portfolio" href="/" />
      </nav>

      <main>
        <header className="px-6 md:px-12 lg:px-20 pt-12 pb-16 md:pb-24 max-w-7xl mx-auto">
          <p
            className="enter font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: ACCENT, animationDelay: "0ms" }}
          >
            Shipped&nbsp;&nbsp;·&nbsp;&nbsp;Backend &amp; DevOps&nbsp;&nbsp;·&nbsp;&nbsp;Nov 2025 — present
          </p>

          <h1
            className="enter mt-4 mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 6vw, 7rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              animationDelay: "100ms",
            }}
          >
            Gravitones × Hike
          </h1>

          <p
            className="enter text-base md:text-lg font-light leading-relaxed max-w-[65ch]"
            style={{ color: "var(--fg-secondary)", animationDelay: "200ms" }}
          >
            Owned the backend and every layer of AWS infrastructure for a live streaming
            platform inside India’s Hike app. Replaced a five-container FFmpeg/HLS
            transcoding cluster with AWS Elemental MediaConvert — removing the bottleneck
            that blocked the path to 1M users. Provisioned ECS, VPC, RDS, CloudFront, and
            ElastiCache in Terraform, making this the org’s first fully infrastructure-as-code
            project. Integrated Widevine and FairPlay DRM end-to-end, and standardised
            GitHub Actions CI/CD across six services.
          </p>

          <ul className="enter mt-8 flex flex-wrap gap-2" style={{ animationDelay: "300ms" }} aria-label="Tech stack">
            {STACK.map((item) => (
              <li
                key={item}
                className="font-mono text-xs tracking-wide px-3 py-1"
                style={{ color: "var(--fg-tertiary)", border: "1px solid var(--border)", borderRadius: "4px" }}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="enter mt-8" style={{ animationDelay: "400ms", "--accent": ACCENT } as React.CSSProperties}>
            <a
              href="https://hikecinema.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-3"
            >
              Visit hikecinema.com
              <span className="sr-only"> (opens in a new tab)</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </header>

        <div className="h-px mx-6 md:mx-12 lg:mx-20" style={{ background: "var(--border)" }} />

        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
          <SectionLabel>Consumer Landing Page</SectionLabel>
          <ScreenshotStack shots={LANDING_SCREENSHOTS} priorityFirst />
        </section>

        <div className="h-px mx-6 md:mx-12 lg:mx-20" style={{ background: "var(--border)" }} />

        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-7xl mx-auto">
          <SectionLabel>Admin Portal</SectionLabel>
          <ScreenshotStack shots={ADMIN_SCREENSHOTS} />
        </section>
      </main>

      <div className="h-px mx-6 md:mx-12 lg:mx-20" style={{ background: "var(--border)" }} />
      <footer className="px-6 md:px-12 lg:px-20 py-12 flex justify-between items-center">
        <BackLink label="All work" href="/#work" />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--fg-tertiary)" }}>
          surya.in
        </span>
      </footer>
    </div>
  );
}
