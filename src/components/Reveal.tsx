"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Start slightly lower and invisible
      whileInView={{ opacity: 1, y: 0 }} // Move to normal position
      viewport={{ once: true, margin: "-100px" }} // Trigger when 100px into view
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}