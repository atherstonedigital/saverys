"use client";

import { ANIMATION } from "@/lib/constants";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: ANIMATION.reveal.hidden,
        visible: {
          ...ANIMATION.reveal.visible,
          transition: {
            ...ANIMATION.reveal.visible.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
