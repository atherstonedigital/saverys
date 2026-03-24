"use client";

import { ANIMATION } from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={ANIMATION.reveal.hidden}
      animate={{
        ...ANIMATION.reveal.visible,
        transition: {
          ...ANIMATION.reveal.visible.transition,
          delay: delay + 0.3,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
