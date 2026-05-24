"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

// Use every other source frame to stay closer to the 90-frame target.
// Source frames: frame_000, frame_002, … frame_158 → 80 frames total.
// ⚠️  Production: recompress source WebPs to q55–65 @ 1280×720 to reach <2MB.
const TOTAL_FRAMES = 80;
const PRIORITY_FRAMES = 10; // load these first before the batch

const FRAME_PATH = (i: number) => {
  const source = i * 2;
  return `/sequence/frame_${String(source).padStart(3, "0")}_delay-0.05s.webp`;
};

function drawCoverFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
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

export default function ScrollyCanvas({
  scrollYProgress,
}: Readonly<{
  scrollYProgress: MotionValue<number>;
}>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  // CSS logical size — updated on resize, used for cover math
  const cssSizeRef = useRef({ w: 0, h: 0 });

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img?.complete || img.naturalWidth === 0) return;
    const { w, h } = cssSizeRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCoverFrame(ctx, img, w, h);
  }, []);

  // Load first PRIORITY_FRAMES sequentially, then fire the rest in parallel
  useEffect(() => {
    let cancelled = false;

    const loadRest = () => {
      for (let i = PRIORITY_FRAMES; i < TOTAL_FRAMES; i++) {
        if (framesRef.current[i]) continue;
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.onload = () => {
          if (cancelled) return;
          framesRef.current[i] = img;
        };
        framesRef.current[i] = img; // placeholder so we don't double-load
      }
    };

    const loadPriority = async () => {
      for (let i = 0; i < PRIORITY_FRAMES; i++) {
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.src = FRAME_PATH(i);
          img.onload = () => {
            if (!cancelled) {
              framesRef.current[i] = img;
              if (i === 0) renderFrame(0);
            }
            resolve();
          };
          img.onerror = () => resolve();
        });
      }
      if (!cancelled) loadRest();
    };

    loadPriority();
    return () => { cancelled = true; };
  }, [renderFrame]);

  // Canvas resize — accounts for devicePixelRatio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      cssSizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      renderFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [renderFrame]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const frameIndex = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1)))
    );
    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", willChange: "transform" }}
    />
  );
}
