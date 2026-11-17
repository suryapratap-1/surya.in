"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Navbar({ ready = true }: Readonly<{ ready?: boolean }>) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!lenis) return; // fall back to the native anchor jump
    e.preventDefault();
    setMenuOpen(false);
    lenis.scrollTo(href, reduced ? { immediate: true } : { duration: 1.6, easing: easeInOutCubic });
    // Move focus to the target section for keyboard and screen-reader users
    const target = document.querySelector<HTMLElement>(href);
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Esc closes, focus moves into the menu and back to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const visible = ready || reduced;

  return (
    <>
      <header
        className="site-header fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(-16px)",
          background: scrolled || menuOpen ? "rgba(13,13,16,0.8)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          transition:
            "opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out), background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <Link
          href="/"
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "var(--fg)" }}
          aria-label="Surya Pratap Das — home"
        >
          surya<span style={{ color: "var(--accent)" }}>.</span>in
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="link-muted font-mono text-xs tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          ref={toggleRef}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{ color: "var(--fg)" }}
        >
          <span
            className="burger-bar block w-5 h-px"
            style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span className="burger-bar block w-5 h-px" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span
            className="burger-bar block w-5 h-px"
            style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
        </button>
      </header>

      <nav
        ref={menuRef}
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="mobile-menu fixed inset-x-0 top-16 z-40 flex flex-col gap-6 px-8 py-10 md:hidden"
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            className="mobile-menu-link text-2xl"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
