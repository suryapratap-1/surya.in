"use client";

import { useState } from "react";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import WhatIBuild from "@/components/WhatIBuild";
import SelectedWork from "@/components/SelectedWork";
import PullQuote from "@/components/PullQuote";
import Stack from "@/components/Stack";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function shouldSkipLoader(): boolean {
  // window.__loaderPlayed persists across SPA remounts (window is never reset during
  // client-side navigation) but is undefined after a hard reload (fresh window object).
  const w = globalThis as typeof globalThis & { __loaderPlayed?: boolean };
  if (w.__loaderPlayed) return true;
  w.__loaderPlayed = true;
  return false;
}

export default function HomeClient() {
  // ssr:false guarantees this only runs on the client, so browser APIs are safe here.
  const [loaderDone, setLoaderDone] = useState(() => shouldSkipLoader());

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
        <PullQuote />
        <Stack />
        <Background />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
