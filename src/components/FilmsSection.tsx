/* src/components/FilmsSection.tsx */
"use client";

import { useRef, useState, useMemo } from "react";
import FilmCard from "../components/FilmCard";
import { filmsData } from "../data/films"; 

type DayKey = "Day 1" | "Day 2" | "Day 3";

export default function FilmsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<DayKey>("Day 2");

  const currentFilms = useMemo(() => {
    const dayMap: Record<string, string> = {
      "Day 1": "Day 01",
      "Day 2": "Day 02",
      "Day 3": "Day 03"
    };
    return filmsData.filter(f => f.day === dayMap[selectedDay]);
  }, [selectedDay]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
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
        pt-12 pb-32 px-6 
        overflow-hidden min-h-[80vh] flex flex-col justify-center
      "
    >
      <div className="hero-texture opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
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
               Curated films screening on {selectedDay}.
             </p>

             <div className="flex items-center gap-4">
               {/* DAY DROPDOWN */}
               <div className="relative">
                 <select
                   value={selectedDay}
                   onChange={(e) => setSelectedDay(e.target.value as DayKey)}
                   className="
                     appearance-none bg-transparent text-white font-ostwall text-xl uppercase
                     border border-white/20 px-4 py-3 w-32 text-center cursor-pointer
                     hover:bg-white hover:text-black transition-colors outline-none
                   "
                 >
                   {/* FIXED: Added 'bg-black text-white' explicitly to options */}
                   <option value="Day 1" className="bg-black text-white">Day 01</option>
                   <option value="Day 2" className="bg-black text-white">Day 02</option>
                   <option value="Day 3" className="bg-black text-white">Day 03</option>
                 </select>
                 <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs opacity-50">▼</div>
               </div>

               {/* Nav Buttons */}
               <div className="flex gap-2">
                 <button onClick={() => scroll("left")} className="w-14 h-14 text-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-95">←</button>
                 <button onClick={() => scroll("right")} className="w-14 h-14 text-xl border border-white/20 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all active:scale-95">→</button>
               </div>
             </div>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-10 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {currentFilms.length > 0 ? (
            currentFilms.map((film, i) => (
              <FilmCard key={film.slug} {...film} index={i + 1} />
            ))
          ) : (
            <div className="w-full text-center py-20 text-white/30 font-ostwall text-2xl uppercase">
              No films scheduled for this day
            </div>
          )}
        </div>

      </div>
    </section>
  );
}