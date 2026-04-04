// ─── Shared motion constants ────────────────────────────────────────────────
// Single source of truth for all animation values in the site.

// "ease out expo" — fast start, elegant deceleration
export const EASE = [0.22, 1, 0.36, 1];

// ─── Page-level enter / exit ─────────────────────────────────────────────────
export const PAGE_VARIANTS = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -10 },
};

export const PAGE_TRANSITION = {
  duration: 0.5,
  ease: EASE,
};

// ─── Scroll-triggered section reveal ─────────────────────────────────────────
export const FADE_UP = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

// ─── Stagger container (times children) ──────────────────────────────────────
export const STAGGER_CONTAINER = (stagger = 0.07, delay = 0.05) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// ─── Generic staggered child ──────────────────────────────────────────────────
export const STAGGER_CHILD = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } },
};

// ─── Hero text line ───────────────────────────────────────────────────────────
export const HERO_LINE = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
