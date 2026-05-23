# Motion System

Design token reference for all animation in this codebase. Every engineer touching
animation should read this before writing a `gsap.to` or `transition` prop.

---

## Easing vocabulary — three curves only

| Name | GSAP string | Use case |
|------|-------------|----------|
| **power3.out** | `"power3.out"` | Scroll-triggered entrances — elements coming into view from below |
| **power2.inOut** | `"power2.inOut"` | State transitions — nav glass, hover color shifts, modal open/close |
| **expo.out** | `"expo.out"` | Hero reveals — letter-by-letter name, dramatic first-load entrances |

Do not introduce additional easing curves. If something feels wrong, adjust duration
or stagger before reaching for a new curve.

---

## Scroll — Lenis + GSAP ScrollTrigger

| Property | Value | Notes |
|----------|-------|-------|
| Lenis damping | `0.1` | Default; feel should be smooth but not laggy |
| Lenis lerp | `0.1` | Consistent with damping |
| Touch | disabled | Native momentum on mobile; Lenis only on pointer devices |
| ScrollTrigger scrub | `1.5` | Used for the hero canvas scrub and text fade |
| ScrollTrigger scrub (slow content) | `1` | Used for section parallax entrances |
| Pin release | Always clean | Any pinned section must have `pinSpacing: true` |

Lenis → GSAP sync is handled inside `SmoothScroll.tsx` via `useLenis` calling
`ScrollTrigger.update()` on every tick.

---

## Hero entrance sequence (GSAP timeline, on mount)

| Step | Target | From | Duration | Ease | Delay / offset |
|------|--------|------|----------|------|----------------|
| 1 | `.hero-char` (each letter) | `y: "110%"` | `1.2s` | `expo.out` | stagger `0.03s` |
| 2 | `.hero-subtitle` | `opacity: 0, y: 20` | `0.8s` | `power3.out` | `-=0.6` from step 1 end |
| 3 | `.hero-meta` items | `opacity: 0, y: 16` | `0.6s` | `power3.out` | stagger `0.1s`, `-=0.4` |

The whole sequence starts with a `delay: 0.15` to let the browser paint first.

---

## Section label entrance (GSAP ScrollTrigger)

Each `01 —`, `02 —` etc. label slides in from the left when its section enters the
viewport. A thin underline draws left-to-right immediately after.

| Property | Value |
|----------|-------|
| Trigger | the section's label element |
| Start | `"top 85%"` |
| From `x` | `-32px` |
| From `opacity` | `0` |
| Duration | `0.7s` |
| Ease | `power3.out` |
| Underline `scaleX` from | `0` |
| Underline `scaleX` ease | `power2.inOut` |
| Underline delay | `+0.15s` after label |

---

## Project card entrance (Framer Motion `useInView`)

| Property | Value |
|----------|-------|
| `initial` | `{ opacity: 0, y: 48 }` |
| `animate` | `{ opacity: 1, y: 0 }` |
| Duration | `0.7s` |
| Ease | cubic `[0.16, 1, 0.3, 1]` (matches expo.out in Framer) |
| Stagger | `i * 0.12s` |
| Viewport margin | `-80px` |

---

## Cursor (Framer Motion)

| State | Size | Background | Lerp factor |
|-------|------|-----------|-------------|
| Default | `8px` | `rgba(245,244,240,0.9)` | `0.18` |
| Over interactive element | `40px` | `rgba(255,255,255,0.08)` + `1px` white border | `0.18` |

Cursor is hidden on touch devices via `pointer: coarse` media query. The lerp
is applied in a `requestAnimationFrame` loop — not a CSS transition — so it
follows the damped behavior exactly.

---

## Magnetic button (Framer Motion)

Buttons with `data-magnetic` get a damped attraction on hover.

| Property | Value |
|----------|-------|
| Max displacement | `±12px` on X, `±8px` on Y |
| Lerp factor | `0.15` |
| On mouse-leave | springs back with `power3.out`, `0.5s` |

---

## Image sequence scrubbing (ScrollyCanvas)

| Property | Value |
|----------|-------|
| Frames used | 80 (every other source frame: `frame_000`, `frame_002`… `frame_158`) |
| Source total on disk | 160 frames @ 31MB — **needs recompression** |
| **Production target** | ≤ 90 frames, ≤ 2MB total payload |
| Drive mechanism | `useMotionValueEvent` on `scrollYProgress` from `useScroll` |
| Render | `drawImage` to `<canvas>` with cover-fit crop |
| Decode | Pre-load all frames on mount; frame 0 loads first to prevent blank canvas |

⚠️  **Action required before shipping to production**: run the frames through a
WebP re-encoder at lower quality (q55–65) and crop to 1280×720 or smaller.
At current 31MB the LCP will fail on any throttled connection.

---

## `prefers-reduced-motion`

All of the above is disabled when `prefers-reduced-motion: reduce` is set:

- Lenis is **not initialized** — native scroll is used.
- GSAP ScrollTrigger animations are **not registered**.
- Framer Motion `variants` reduce to instant opacity changes (no translate).
- The image-sequence canvas is replaced with a static first frame.
- Cursor animations are disabled (only the dot position follows the pointer).

Implementation: the `SmoothScroll.tsx` wrapper reads the media query and opts out
of Lenis. GSAP animations check a `prefersReducedMotion` guard before registering.
Framer components use a `reduceMotion` context value from `ReducedMotionProvider`.

---

## Performance constraints

- Only `transform` and `opacity` are animated. Never `width`, `height`, `top`,
  `left`, `margin`, or `padding` in a running animation.
- `will-change` is applied only at the start of an active animation and removed
  when it ends. Never blanket-applied in CSS.
- `backdrop-filter` is the sole exception — it cannot be GPU-layer-isolated cleanly
  and is accepted as a known cost on glass surfaces.
- Pinned sections must use `pinSpacing: true` to avoid layout jumps on release.
- 60fps floor on a 2019 MacBook Pro. Profile in DevTools before merging any new
  scroll animation.
