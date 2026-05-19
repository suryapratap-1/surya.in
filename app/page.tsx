"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  // The 500vh scroll container — shared between canvas and overlay
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main style={{ background: "var(--bg)" }}>
      {/* ── Scroll progress bar ───────────────────────────────────── */}
      <ScrollProgress />

      {/* ── Fixed Navbar (always on top) ──────────────────────────── */}
      <Navbar />

      {/* ── 500vh Scrolly Section ─────────────────────────────────── */}
      <section
        ref={scrollContainerRef}
        style={{ height: "500vh", position: "relative" }}
      >
        {/* Sticky viewport — canvas + overlay live here */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: "100vh" }}
        >
          {/* Layer 0: Canvas (frame scrubber) */}
          <div className="absolute inset-0">
            <ScrollyCanvas containerRef={scrollContainerRef} />
          </div>

          {/* Layer 1: Dark gradient vignette so text pops */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(14,14,14,0.55) 100%)",
              zIndex: 5,
            }}
          />

          {/* Layer 2: Parallax text overlay */}
          <Overlay containerRef={scrollContainerRef} />
        </div>
      </section>

      {/* ── Projects grid (below the sticky section) ──────────────── */}
      <div id="work">
        <Projects />
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
