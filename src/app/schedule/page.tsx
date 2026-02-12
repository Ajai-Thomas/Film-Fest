"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";

const scheduleData = [
  {
    date: "Feb 13 (Fri)",
    events: [
      { time: "06:30 PM", title: "Inaugural Ceremony", location: "Auditorium" },
    ],
  },
  {
    date: "Feb 14 (Sat)",
    events: [
      { time: "08:00 AM", title: "Corpse Bride", location: "Arch Seminar Hall" },
      { time: "08:00 AM", title: "50/50", location: "EEE Seminar Hall" },
      { time: "08:00 AM", title: "Flow", location: "Chemical Seminar Hall" },
      { time: "09:20 AM", title: "Hereditary", location: "Arch Seminar Hall" },
      { time: "09:30 AM", title: "City of God", location: "Chemical Seminar Hall" },
      { time: "11:30 AM", title: "Lady Bird", location: "Arch Seminar Hall" },
      { time: "11:40 AM", title: "Atonement", location: "Chemical Seminar Hall" },
      { time: "01:05 PM", title: "KD (A) Karuppudurai", location: "Arch Seminar Hall" },
      { time: "01:45 PM", title: "Silenced", location: "Chemical Seminar Hall" },
      { time: "03:00 PM", title: "Welcome Home", location: "EEE Seminar Hall" },
      { time: "03:10 PM", title: "Call Me By Your Name", location: "Arch Seminar Hall" },
      { time: "03:30 PM", title: "The Lunchbox", location: "Auditorium" },
      { time: "05:00 PM", title: "A Pregnant Widow", location: "APJ Hall" },
      { time: "05:00 PM", title: "Perfect Blue", location: "PTA Hall" },
      { time: "05:15 PM", title: "Forgotten", location: "EEE Seminar Hall" },
      { time: "05:20 PM", title: "Host", location: "Arch Seminar Hall" },
    ],
  },
  {
    date: "Feb 15 (Sun)",
    events: [
      { time: "07:00 AM", title: "Fan Show: Marvel/DC", location: "APJ Hall" },
      { time: "07:00 AM", title: "Be With You", location: "Auditorium" },
      { time: "07:00 AM", title: "Gran Torino", location: "PTA Hall" },
      { time: "07:00 AM", title: "Coraline", location: "Arch Seminar Hall" },
      { time: "07:00 AM", title: "Purusha Pretham", location: "EEE Seminar Hall" },
      { time: "07:00 AM", title: "Vrithakrithiyulla Chathuram", location: "Chemical Seminar Hall" },
      { time: "08:50 AM", title: "Cinema Paradiso", location: "Arch Seminar Hall" },
      { time: "09:00 AM", title: "Grave of the Fireflies", location: "Auditorium" },
      { time: "09:00 AM", title: "Battle Royale", location: "PTA Hall" },
      { time: "09:35 AM", title: "Bulbbul", location: "EEE Seminar Hall" },
      { time: "10:00 AM", title: "Fan Show: Marvel/DC", location: "APJ Hall" },
      { time: "10:45 AM", title: "Audience Favorite Movie", location: "Auditorium" },
      { time: "11:05 AM", title: "Gargi", location: "PTA Hall" },
      { time: "11:10 AM", title: "Aavasavyuham", location: "EEE Seminar Hall" },
      { time: "11:30 AM", title: "The Autopsy of Jane Doe", location: "Arch Seminar Hall" },
      { time: "12:10 PM", title: "Monkey Man", location: "Arch Seminar Hall" },
      { time: "12:30 PM", title: "Chokher Bali", location: "Chemical Seminar Hall" },
      { time: "01:05 PM", title: "Victoria", location: "EEE Seminar Hall" },
      { time: "02:30 PM", title: "Fan Show: Mammootty/Mohanlal", location: "Auditorium" },
      { time: "05:30 PM", title: "Fan Show: Mammootty/Mohanlal", location: "Auditorium" },
    ],
  },
];

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-0" 
           style={{ backgroundImage: 'url("/textures/grain.png")', backgroundSize: '260px' }} 
      />

      <div className="relative z-10 pt-40 px-6 pb-20 max-w-6xl mx-auto">
        
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-white/20 pb-8">
            <div>
              {/* Removed "Program Timeline" label */}
              <h1 className="text-6xl md:text-8xl font-ostwall uppercase leading-none">
                Festival<br />Schedule
              </h1>
            </div>

            <div className="flex flex-wrap gap-4">
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

        <div className="space-y-4 min-h-[400px]">
          {scheduleData[activeDay].events.map((event, i) => (
            <Reveal key={`${activeDay}-${i}`} delay={i * 0.05}>
              <div 
                className="
                  group relative flex flex-col md:flex-row md:items-center 
                  border-b border-white/10 py-6 hover:bg-white/5 transition-colors px-4
                  cursor-default
                "
              >
                <div className="w-40 shrink-0 mb-2 md:mb-0">
                  <span className="font-ostwall text-xl md:text-2xl text-white/40 group-hover:text-accent transition-colors">
                    {event.time}
                  </span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-ostwall uppercase group-hover:translate-x-2 transition-transform duration-300">
                    {event.title}
                  </h3>
                  <p className="text-white/50 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
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