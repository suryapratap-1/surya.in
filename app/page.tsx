"use client";

import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import WhatIBuild from "@/components/WhatIBuild";
import SelectedWork from "@/components/SelectedWork";
import Stack from "@/components/Stack";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Skip-to-content link — keyboard / screen reader users */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* White dot cursor follower */}
      <Cursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Fixed navbar */}
      <Navbar />

      <main id="main-content">
        {/* Hero — 300vh sticky scroll with canvas frame scrubber */}
        <Hero />

        {/* 01 — What I Build */}
        <WhatIBuild />

        {/* 02 — Selected Work */}
        <SelectedWork />

        {/* 03 — Stack */}
        <Stack />

        {/* 04 — Background */}
        <Background />

        {/* 05 — Contact */}
        <Contact />

        <Footer />
      </main>
    </>
  );
}
