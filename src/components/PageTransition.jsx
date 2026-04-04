import { motion, useReducedMotion } from "framer-motion";
import { PAGE_VARIANTS, PAGE_TRANSITION } from "../motion/variants.js";

export default function PageTransition({ children }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={reduced ? {} : PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={reduced ? { duration: 0.15 } : PAGE_TRANSITION}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
