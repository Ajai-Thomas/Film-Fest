/* src/components/FilmsSection.tsx */
"use client";

import { useRef } from "react";
import FilmCard from "../components/FilmCard";

const films = [
  {
    title: "A Mountain for Dreamers",
    director: "Ajai Thomas",
    poster: "/films/a-mountain-for-dreamers.jpg",
  },
  {
    title: "Between Frames",
    director: "Nikhil R",
    poster: "/films/between-frames.jpg",
  },
  {
    title: "Red Silence",
    director: "Ananya S",
    poster: "/films/red-silence.jpg",
  },
  {
    title: "Last Reel",
    director: "Arjun K",
    poster: "/films/last-reel.jpg",
  },
];

export default function FilmsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Adjusted scroll amount for the smaller card size (w-56 + gap)
      const scrollAmount = 264; 
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="films"
      className="
        relative bg-black text-white 
        pt-12 pb-32 px-6        /* ⬅ CHANGED: Reduced top padding (pt-12), kept bottom (pb-32) */
        overflow-hidden min-h-[80vh] flex flex-col justify-center
      "
    >
      
      {/* Texture */}
      <div className="hero-texture opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header + Nav Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-6 mb-16">
          <div>
            <span className="block text-accent text-sm tracking-[0.4em] font-bold mb-2 uppercase drop-shadow-md">
              Official Selection
            </span>
            <h2 className="text-6xl md:text-8xl font-ostwall text-white uppercase leading-[0.9] drop-shadow-lg">
              Featured <br /> 
              <span className="text-transparent [-webkit-text-stroke:1px_white]">
                Films
              </span>
            </h2>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-col items-end gap-6">
             <p className="text-white/60 text-xs tracking-widest uppercase max-w-[200px] text-right">
               Curated short films from the students of TKM College of Engineering.
             </p>

             {/* Navigation Buttons */}
             <div className="flex gap-4">
               <button 
                 onClick={() => scroll("left")}
                 className="
                   w-16 h-16
                   text-2xl
                   border border-white/20 
                   flex items-center justify-center 
                   hover:bg-white hover:text-black 
                   hover:border-white
                   transition-all duration-300
                   active:scale-95
                 "
                 aria-label="Scroll Left"
               >
                 ←
               </button>
               <button 
                 onClick={() => scroll("right")}
                 className="
                   w-16 h-16
                   text-2xl
                   border border-white/20 
                   flex items-center justify-center 
                   hover:bg-accent hover:text-white hover:border-accent
                   transition-all duration-300
                   active:scale-95
                 "
                 aria-label="Scroll Right"
               >
                 →
               </button>
             </div>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-10 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {films.map((film, i) => (
            <FilmCard key={film.title} {...film} index={i + 1} />
          ))}
        </div>

      </div>
    </section>
  );
}