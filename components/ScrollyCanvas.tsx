"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 80 frames, 1166×656 WebP (~30 KB each, ~2.4 MB total).
const TOTAL_FRAMES = 80;
const PRIORITY_FRAMES = 10; // loaded first, in order, before the rest in parallel

const FRAME_PATH = (i: number) => `/hero/frame_${String(i).padStart(2, "0")}.webp`;

function drawCoverFrame(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvasW: number, canvasH: number) {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasW / canvasH;

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
  if (imgAspect > canvasAspect) {
    sw = img.naturalHeight * canvasAspect;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasAspect;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

export default function ScrollyCanvas({ triggerRef }: Readonly<{ triggerRef: RefObject<HTMLElement | null> }>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !trigger || !ctx) return;

    const frames: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const loaded: boolean[] = new Array(TOTAL_FRAMES).fill(false);
    let cssW = 0;
    let cssH = 0;
    let current = 0;
    let rafId = 0;
    let cancelled = false;

    // Draw the requested frame, or the nearest earlier one already loaded.
    const render = (index: number) => {
      for (let i = index; i >= 0; i--) {
        const img = frames[i];
        if (loaded[i] && img) {
          ctx.clearRect(0, 0, cssW, cssH);
          drawCoverFrame(ctx, img, cssW, cssH);
          return;
        }
      }
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          loaded[i] = true;
          if (i === current || i === 0) render(current);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = FRAME_PATH(i);
        frames[i] = img;
      });

    (async () => {
      for (let i = 0; i < PRIORITY_FRAMES && !cancelled; i++) await load(i);
      for (let i = PRIORITY_FRAMES; i < TOTAL_FRAMES && !cancelled; i++) void load(i);
    })();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(current);
    };
    resize();
    window.addEventListener("resize", resize);

    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(self.progress * (TOTAL_FRAMES - 1))));
        if (index === current) return;
        current = index;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => render(index));
      },
    });

    return () => {
      cancelled = true;
      st.kill();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [triggerRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full block" />;
}
