"use client";

import { useState, useEffect } from "react";

export default function LiveChip() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // IST = UTC+5:30
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utcMs + 5.5 * 3600000);
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      const s = String(ist.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div
      className="fixed z-40 font-mono text-xs tracking-widest select-none pointer-events-none hidden md:flex items-center gap-2"
      style={{
        top: "22px",
        right: "16px",
        color: "var(--fg-tertiary)",
      }}
      aria-label="Current time in IST, location, and availability"
      role="status"
      aria-live="off"
    >
      <span style={{ color: "var(--accent-cyan)" }}>{time}&nbsp;IST</span>
      <span>·</span>
      <span>BHUBANESWAR</span>
      <span>·</span>
      <span style={{ color: "var(--accent-cyan)" }}>AVAILABLE&nbsp;JUN&nbsp;2026</span>
    </div>
  );
}
