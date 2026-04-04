import { motion, useReducedMotion } from "framer-motion";
import { EASE, FADE_UP } from "../motion/variants.js";

/**
 * Scroll-triggered fade + lift reveal.
 * Wraps children in a motion.div that animates when it enters the viewport.
 * Automatically disabled when the user prefers reduced motion.
 *
 * Props:
 *   delay   — stagger offset in seconds (default 0)
 *   y       — distance to travel upward (default 28)
 *   once    — only trigger once (default true)
 *   margin  — viewport margin before trigger (default "-60px")
 */
export default function FadeIn({
  children,
  delay  = 0,
  y      = 28,
  once   = true,
  margin = "-60px",
  style,
  className,
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
