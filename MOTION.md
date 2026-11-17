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

## Hover / focus states (CSS)

Hover effects are plain CSS in `globals.css` and also trigger on keyboard focus
(`:focus-visible` / `:focus-within`): `.link-muted`, `.link-underline`,
`.btn-accent`, and the `.proj-row` accent bar / tint / metric colour.
Ease token: `--ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## Cursor

`10px` dot, lerp `0.85` in a `requestAnimationFrame` loop. Only on `pointer: fine`.
The native cursor stays visible.

---

## Image sequence scrubbing (ScrollyCanvas)

| Property | Value |
|----------|-------|
| Frames | 80 in `public/hero/frame_00.webp` … `frame_79.webp`, 1166×656, ~2.4MB total |
| Drive mechanism | GSAP `ScrollTrigger` on the 300vh hero section (`onUpdate` → frame index) |
| Render | `drawImage` to `<canvas>` with cover-fit crop, DPR capped at 2 |
| Loading | First 10 frames in order, rest in parallel; draws nearest loaded frame |

---

## `prefers-reduced-motion`

Read live through `useReducedMotion()` (`lib/motion.ts`, SSR-safe via
`useSyncExternalStore`), so changing the OS setting applies without reload.

- Lenis stays mounted but wheel smoothing is off; anchor jumps are immediate.
- Section entrance animations are skipped (`revertOnUpdate` restores content).
- The loader completes instantly; the hero copy is shown without the intro.
- The stack marquee stops and wraps as a static list.
- CSS animations/transitions are reduced to ~0ms.

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
