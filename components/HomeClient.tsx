"use client";

import { useEffect, useState } from "react";
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

type LoaderWindow = typeof globalThis & { __loaderPlayed?: boolean };

// The loader plays once per hard load. `window.__loaderPlayed` survives
// client-side navigation (e.g. back from a case study) but not a reload.
// On the server and during hydration this is always false, so markup matches.
function loaderAlreadyPlayed(): boolean {
  return typeof window !== "undefined" && Boolean((window as LoaderWindow).__loaderPlayed);
}

export default function HomeClient() {
  const [loaderDone, setLoaderDone] = useState(loaderAlreadyPlayed);

  useEffect(() => {
    (window as LoaderWindow).__loaderPlayed = true;
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      <Cursor />
      <ScrollProgress />
      <Navbar ready={loaderDone} />

      <main id="main-content">
        <Hero ready={loaderDone} />
        <WhatIBuild />
        <SelectedWork />
        <PullQuote />
        <Stack />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
