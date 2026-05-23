"use client";

import { useEffect, useRef, useState } from "react";
import { CURSOR_LERP } from "@/lib/motion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const hoverRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only activate on fine-pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hoverRef.current = !!(
        target.closest("a, button, [role='button'], [data-magnetic]")
      );
    };

    const tick = () => {
      const { x: tx, y: ty } = posRef.current;
      const cur = currentRef.current;

      cur.x += (tx - cur.x) * CURSOR_LERP;
      cur.y += (ty - cur.y) * CURSOR_LERP;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        const tf = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
        dot.style.transform = tf;
        ring.style.transform = tf;

        if (hoverRef.current) {
          dot.style.opacity = "0";
          ring.style.width = "40px";
          ring.style.height = "40px";
          ring.style.marginLeft = "-20px";
          ring.style.marginTop = "-20px";
          ring.style.background = "rgba(255,255,255,0.06)";
          ring.style.border = "1px solid rgba(255,255,255,0.3)";
          ring.style.backdropFilter = "blur(4px)";
        } else {
          dot.style.opacity = "1";
          ring.style.width = "8px";
          ring.style.height = "8px";
          ring.style.marginLeft = "-4px";
          ring.style.marginTop = "-4px";
          ring.style.background = "rgba(245,244,240,0.9)";
          ring.style.border = "none";
          ring.style.backdropFilter = "none";
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          marginLeft: "-4px",
          marginTop: "-4px",
          borderRadius: "50%",
          background: "rgba(245,244,240,0.9)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, width 0.25s, height 0.25s, margin 0.25s, background 0.25s, border 0.25s",
          willChange: "transform",
        }}
      />
      {/* Ring (hover state) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          marginLeft: "-4px",
          marginTop: "-4px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, width 0.25s, height 0.25s, margin 0.25s, background 0.25s, border 0.25s, backdrop-filter 0.25s",
          willChange: "transform",
        }}
      />
    </>
  );
}
