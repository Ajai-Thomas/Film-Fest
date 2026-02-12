/* src/components/Hero.tsx */
"use client";

import { useLenis } from "lenis/react";

export default function Hero() {
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    lenis?.scrollTo(targetId, { 
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-accent overflow-hidden">
      
      {/* Grain + Vignette */}
      <div className="hero-texture" />
      <div className="hero-vignette" />

      {/* BLACK BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black via-black/60 to-transparent z-5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center pt-16 px-4 w-full">

        {/* MAIN TITLE */}
        <h1
          className="
            font-quittance
            /* UPDATED: Massive text on mobile (22vw) for 3-line layout */
            text-[22vw] md:text-[clamp(4rem,9.2vw,8.6rem)]
            font-extrabold
            tracking-[-0.045em]
            /* Tighter leading on mobile to keep the stack compact */
            leading-[0.85] md:leading-[1]
            scale-y-[1.08]
            scale-x-[1.03]
            uppercase
            text-image-black
            drop-shadow-sm
          "
        >
          {/* 3 Lines on Mobile, 1 Line on Desktop */}
          TKM
          <br className="md:hidden" />
          FILM
          <br className="md:hidden" />
          FEST
        </h1>

        {/* ANCHOR LINE */}
        <div className="mx-auto mt-6 md:mt-5 h-[3px] w-24 md:w-40 bg-black" />

        {/* DATES */}
        <div className="mt-5 md:mt-7 text-black text-sm md:text-base tracking-[0.45em] uppercase font-semibold">
          13 · 14 · 15 FEB
        </div>

        {/* TAGLINE */}
        <p className="mt-2 md:mt-4 text-black text-xs md:text-base italic opacity-90">
          By artists. For artists.
        </p>

        {/* CTA */}
        <div className="mt-10 md:mt-16 pb-10 md:pb-0">
          <a
            href="#films"
            onClick={(e) => handleScroll(e, "#films")}
            className="
              inline-flex items-center gap-2
              text-black
              font-semibold
              tracking-[0.32em]
              text-xs md:text-sm
              uppercase
              hover:opacity-70
              transition
              cursor-pointer
              /* Mobile Button Styling */
              border border-black/20 px-8 py-4 rounded-full md:border-none md:p-0 md:rounded-none
              bg-black/5 md:bg-transparent
            "
          >
            Register for Screening →
          </a>
        </div>

      </div>
    </section>
  );
}