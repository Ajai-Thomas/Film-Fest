"use client";

import { use, useState } from "react";
import Navbar from "../../../components/Navbar";
import Reveal from "../../../components/Reveal";
import { filmsData } from "../../../data/films";
import Link from "next/link";

export default function RegisterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [form, setForm] = useState({
    name: "",
    branch: "",
    year: "1",
    contact: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const film = filmsData.find((f) => f.slug === slug);

  if (!film) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="font-ostwall text-2xl">Event Not Found</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registered:", { ...form, film: film.title });
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      <Navbar />

      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.1] z-0" 
        style={{ backgroundImage: 'url("/textures/grain.png")', backgroundSize: '260px' }} 
      />

      <div className="relative z-10 pt-24 md:pt-32 px-4 md:px-6 pb-20 max-w-6xl mx-auto min-h-screen flex flex-col justify-center">
        
        <Reveal>
          <Link href="/#films" className="text-white/50 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase mb-8 inline-block">
            ← Back to Films
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            
            {/* LEFT: Event Details */}
            <div>
              <span className="block text-accent text-xs md:text-sm tracking-[0.4em] font-bold uppercase mb-4">
                Event Registration
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-ostwall uppercase leading-[0.9] mb-8">
                {film.title}
              </h1>

              <div className="space-y-6 border-t border-white/20 pt-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Date</p>
                    <p className="font-ostwall text-2xl">{film.date}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Time</p>
                    <p className="font-ostwall text-2xl">{film.time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Venue</p>
                    <p className="font-ostwall text-xl uppercase">{film.venue}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Duration</p>
                    <p className="font-ostwall text-xl">{film.duration}</p>
                  </div>
                </div>

                <div>
                   <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Director</p>
                   <p className="font-ostwall text-xl uppercase">{film.director}</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Registration Form */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-12 relative overflow-hidden">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <h3 className="font-ostwall text-3xl uppercase mb-6">Enter Details</h3>
                  
                  {/* Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      placeholder=" "
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                    <label className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">
                      Full Name
                    </label>
                  </div>

                  {/* Branch & Year Row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        placeholder=" "
                        value={form.branch}
                        onChange={(e) => setForm({ ...form, branch: e.target.value })}
                        className="peer w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors"
                      />
                       <label className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">
                        Branch
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors text-white"
                      >
                        <option value="1" className="bg-black text-white">Year 1</option>
                        <option value="2" className="bg-black text-white">Year 2</option>
                        <option value="3" className="bg-black text-white">Year 3</option>
                        <option value="4" className="bg-black text-white">Year 4</option>
                      </select>
                      <label className="absolute left-0 -top-4 text-white/40 text-xs">
                        Year of Study
                      </label>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="relative group">
                    <input
                      type="tel"
                      required
                      placeholder=" "
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">
                      Contact Number
                    </label>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="
                      w-full bg-white text-black font-ostwall uppercase text-xl py-4 
                      hover:bg-[#B00000] hover:text-black 
                      transition-all mt-4 tracking-wider
                    "
                  >
                    Confirm Registration
                  </button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <span className="text-6xl text-accent mb-4">✓</span>
                  <h3 className="font-ostwall text-3xl uppercase mb-2">You're In!</h3>
                  <p className="text-white/60">
                    Registration confirmed for <br />
                    <span className="text-white">{film.title}</span>
                  </p>
                  <Link href="/#films" className="mt-8 border-b border-white/40 pb-1 hover:text-accent hover:border-accent transition-colors text-sm uppercase tracking-widest">
                    Register for another
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}