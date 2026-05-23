"use client";

import { useEffect, useRef } from "react";

const DOT_LERP = 0.85;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!globalThis.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) visibleRef.current = false;
    };
    const handleMouseIn = (e: MouseEvent) => {
      if (!e.relatedTarget) visibleRef.current = true;
    };

    const tick = () => {
      const { x: tx, y: ty } = targetRef.current;
      dotPosRef.current.x += (tx - dotPosRef.current.x) * DOT_LERP;
      dotPosRef.current.y += (ty - dotPosRef.current.y) * DOT_LERP;

      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0)`;
        dot.style.opacity = visibleRef.current ? "1" : "0";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    globalThis.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseover", handleMouseIn);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      globalThis.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseover", handleMouseIn);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "10px",
        height: "10px",
        marginLeft: "-5px",
        marginTop: "-5px",
        borderRadius: "50%",
        background: "rgba(245,244,240,0.9)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity 0.3s",
        willChange: "transform",
      }}
    />
  );
}
