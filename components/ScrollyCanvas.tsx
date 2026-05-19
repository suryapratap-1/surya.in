"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// ─── Config ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 160;
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.05s.webp`;

// ─── Helpers ───────────────────────────────────────────────────────────────
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
    // image is wider — crop sides
    sw = img.naturalHeight * canvasAspect;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    // image is taller — crop top/bottom
    sh = img.naturalWidth / canvasAspect;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function ScrollyCanvas({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // ── Preload images ───────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    // Load frame 0 first so canvas isn't blank on mount
    const first = new Image();
    first.src = FRAME_PATH(0);
    first.onload = () => {
      framesRef.current[0] = first;
      renderFrame(0);
    };

    // Then load the rest in order
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        images[i] = img;
        loaded++;
        if (loaded === TOTAL_FRAMES - 1) {
          framesRef.current = [first, ...images.slice(1)];
        }
      };
      images[i] = img;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Canvas resize ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── Render helper ────────────────────────────────────────────────────────
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = framesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCoverFrame(ctx, img, canvas.width, canvas.height);
  }, []);

  // ── Scroll → frame index ─────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const rawIndex = Math.round(progress * (TOTAL_FRAMES - 1));
    const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawIndex));

    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
