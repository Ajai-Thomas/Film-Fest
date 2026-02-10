"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";

// --- DATA ---
const scheduleData = [
  {
    day: "Day 01",
    date: "Feb 13",
    events: [
      { time: "09:30 AM", title: "Inaugural Ceremony", location: "Main Auditorium" },
      { time: "11:00 AM", title: "Opening Film: 'The Master'", location: "Screen 1" },
      { time: "02:00 PM", title: "Short Film Contest: Batch A", location: "Screen 2" },
      { time: "04:30 PM", title: "Panel: Future of Cinema", location: "Seminar Hall" },
    ],
  },
  {
    day: "Day 02",
    date: "Feb 14",
    events: [
      { time: "10:00 AM", title: "Workshop: Cinematography", location: "Studio Lab" },
      { time: "01:00 PM", title: "Documentary Showcase", location: "Screen 1" },
      { time: "03:30 PM", title: "Feature Film: 'Parasite'", location: "Main Auditorium" },
      { time: "06:00 PM", title: "Networking Dinner", location: "Open Air Theatre" },
    ],
  },
  {
    day: "Day 03",
    date: "Feb 15",
    events: [
      { time: "09:30 AM", title: "Short Film Contest: Finalists", location: "Screen 1" },
      { time: "12:00 PM", title: "Director's Q&A Session", location: "Seminar Hall" },
      { time: "03:00 PM", title: "Closing Ceremony & Awards", location: "Main Auditorium" },
      { time: "05:00 PM", title: "Closing Film", location: "Screen 1" },
    ],
  },
];

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      <Navbar />

      {/* BACKGROUND TEXTURE */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-0" 
           style={{ backgroundImage: 'url("/textures/grain.png")', backgroundSize: '260px' }} 
      />

      <div className="relative z-10 pt-40 px-6 pb-20 max-w-6xl mx-auto">
        
        <Reveal>
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-white/20 pb-8">
            <div>
              <span className="block text-accent text-xs tracking-[0.4em] font-bold uppercase mb-4">
                Program Timeline
              </span>
              <h1 className="text-6xl md:text-8xl font-ostwall uppercase leading-none">
                Festival<br />Schedule
              </h1>
            </div>

            {/* DAY TABS */}
            <div className="flex gap-4">
              {scheduleData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`
                    px-6 py-3 border transition-all duration-300 uppercase tracking-widest text-xs font-bold
                    ${activeDay === index 
                      ? "bg-accent border-accent text-white" 
                      : "border-white/20 text-white/50 hover:border-white hover:text-white"
                    }
                  `}
                >
                  {item.date}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* EVENTS LIST */}
        <div className="space-y-4 min-h-[400px]">
          {scheduleData[activeDay].events.map((event, i) => (
            <Reveal key={`${activeDay}-${i}`} delay={i * 0.1}>
              <div 
                className="
                  group relative flex flex-col md:flex-row md:items-center 
                  border-b border-white/10 py-8 hover:bg-white/5 transition-colors px-4
                  cursor-default
                "
              >
                {/* Time */}
                <div className="w-40 shrink-0 mb-2 md:mb-0">
                  <span className="font-ostwall text-2xl text-white/40 group-hover:text-accent transition-colors">
                    {event.time}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-ostwall uppercase group-hover:translate-x-2 transition-transform duration-300">
                    {event.title}
                  </h3>
                  <p className="text-white/50 text-xs tracking-[0.2em] uppercase mt-2">
                    {event.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </main>
  );
}