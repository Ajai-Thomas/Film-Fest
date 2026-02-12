/* src/components/PromoSection.tsx */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function PromoSection() {
  const containerRef = useRef(null);
  
  // Scroll parallax hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Text Parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  // Poster Animation (Bending/Tilting effect)
  const posterRotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const posterY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col items-center justify-center bg-black text-white overflow-hidden py-24 px-6"
      style={{ perspective: "1000px" }} // Adds 3D depth to the scene
    >
      {/* Background Texture */}
      <div className="hero-texture opacity-[0.1]" />

      {/* --- BENDED POSTER BACKGROUND --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
         <motion.div 
           style={{ 
             y: posterY, 
             rotateX: 15, // Tilted back
             rotateY: posterRotate, // Slight rotation on scroll
           }}
           className="
             relative 
             w-[65vw] md:w-100 aspect-2/3 
             opacity-50 
             shadow-2xl
             rounded-xl
             overflow-hidden
           "
         >
            {/* POSTER IMAGE - Replace '/films/host.jpg' with your promo poster */}
            <Image 
              src="/films/masthishka.jpg" 
              alt="Masthishka Maranam"
              fill
              className="object-cover"
            />
            
            {/* SHADOW OVERLAY (Creates the 'Bended' Curve Illusion) */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-black/80 z-10" />
            
            {/* RED TINT OVERLAY */}
            <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-30 z-20" />
         </motion.div>
      </div>

      {/* --- TEXT CONTENT (Z-10 to sit above poster) --- */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-12 drop-shadow-lg">
        
        {/* Intro Text */}
        <motion.div style={{ y: y2 }}>
          <p className="font-ostwall text-2xl md:text-4xl text-white/80 uppercase tracking-widest mb-4">
            They’re coming… 👀
          </p>
          <h2 className="font-quittance text-6xl md:text-9xl uppercase leading-[0.9]">
            Get <span className="text-accent">Ready.</span>
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full max-w-50ccent/80 mx-auto shadow-[0_0_10px_var(--accent)]" />

        {/* Main Hype Text */}
        <motion.div style={{ y: y1 }}>
          <p className="font-ostwall text-3xl md:text-6xl uppercase leading-tight">
            Because we’re starting with a <br />
            {/* Text Stroke Effect */}
            <span className="text-transparent [-webkit-text-stroke:1px_white] text-[1.2em]">
              Bang!
            </span>
          </p>
        </motion.div>

      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent blur-[150px] opacity-[0.1] pointer-events-none z-0" />

    </section>
  );
}