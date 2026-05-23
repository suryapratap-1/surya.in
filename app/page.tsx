"use client";

import { useState } from "react";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
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
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero ready={loaderDone} />
        <WhatIBuild />
        <SelectedWork />
        <Stack />
        <Background />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
