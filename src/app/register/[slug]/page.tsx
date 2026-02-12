/* src/app/register/[slug]/page.tsx */
"use client";

import { use, useState } from "react";
import Navbar from "../../../components/Navbar";
import Reveal from "../../../components/Reveal";
import { filmsData } from "../../../data/films";
import Link from "next/link";
import Ticket from "../../../components/Ticket";

export default function RegisterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [form, setForm] = useState({
    name: "",
    branch: "Civil Engineering",
    year: "1",
    contact: "",
  });

  const [status, setStatus] = useState({ submitted: false, loading: false, message: "" });
  const [ticketData, setTicketData] = useState<any>(null);

  const film = filmsData.find((f) => f.slug === slug);

  if (!film) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="font-ostwall text-2xl">Event Not Found</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitted: false, loading: true, message: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          film_slug: film.slug,
          film_title: film.title,
          date: film.date,
          time: film.time,
          venue: film.venue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTicketData(data);
        setStatus({ submitted: true, loading: false, message: "Registration Successful!" });
      } else {
        setStatus({ submitted: false, loading: false, message: data.message || "Something went wrong." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ submitted: false, loading: false, message: "Server error. Is the backend running?" });
    }
  };

  const branches = [
    "Civil Engineering", "Mechanical Engineering", "Electrical & Electronics Engineering",
    "Electronics & Communication Engineering", "Chemical Engineering", "Computer Science & Engineering",
    "Computer Science & Engineering (AI)", "Electrical & Computer Engineering", "Barch."
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      <Navbar />
      <div className="fixed inset-0 pointer-events-none opacity-[0.1] z-0" style={{ backgroundImage: 'url("/textures/grain.png")', backgroundSize: '260px' }} />

      <div className="relative z-10 pt-24 md:pt-32 px-4 md:px-6 pb-20 max-w-6xl mx-auto min-h-screen flex flex-col justify-center">
        <Reveal>
          <Link href="/#films" className="text-white/50 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase mb-8 inline-block">← Back to Films</Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Event Details */}
            <div>
              <span className="block text-accent text-xs md:text-sm tracking-[0.4em] font-bold uppercase mb-4">Event Registration</span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-ostwall uppercase leading-[0.9] mb-8">{film.title}</h1>
              <div className="space-y-6 border-t border-white/20 pt-8">
                <div className="grid grid-cols-2 gap-8">
                  <div><p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Date</p><p className="font-ostwall text-2xl">{film.date}</p></div>
                  <div><p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Time</p><p className="font-ostwall text-2xl">{film.time}</p></div>
                </div>
                <div><p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Venue</p><p className="font-ostwall text-xl uppercase">{film.venue}</p></div>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-12 relative overflow-hidden">
              {!status.submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <h3 className="font-ostwall text-3xl uppercase mb-6">Enter Details</h3>

                  {/* Error Message */}
                  {status.message && <p className="text-red-500 text-sm">{status.message}</p>}

                  <div className="relative group">
                    <input type="text" required placeholder=" " value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="peer w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors font-sans" />
                    <label className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">Full Name</label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors text-white appearance-none">
                        {branches.map((b) => <option key={b} value={b} className="bg-black text-white">{b}</option>)}
                      </select>
                      <label className="absolute left-0 -top-4 text-white/40 text-xs">Branch</label>
                    </div>
                    <div className="relative">
                      <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors text-white appearance-none">
                        <option value="1" className="bg-black">Year 1</option>
                        <option value="2" className="bg-black">Year 2</option>
                        <option value="3" className="bg-black">Year 3</option>
                        <option value="4" className="bg-black">Year 4</option>
                        <option value="5" className="bg-black">Year 5</option>
                      </select>
                      <label className="absolute left-0 -top-4 text-white/40 text-xs">Year</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input type="tel" required placeholder=" " value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="peer w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent transition-colors" />
                    <label className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">Contact Number</label>
                  </div>

                  <button type="submit" disabled={status.loading} className="w-full bg-[#b00000] text-white font-ostwall uppercase text-xl py-4 hover:bg-white hover:text-black transition-all mt-8 tracking-wider shadow-[0_0_15px_rgba(176,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:scale-105">
                    {status.loading ? "Processing..." : "Confirm Registration"}
                  </button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <span className="text-6xl text-accent mb-4">✓</span>
                  <h3 className="font-ostwall text-3xl uppercase mb-6">You're In!</h3>

                  {/* TICKET COMPONENT */}
                  {ticketData && (
                    <div className="w-full max-w-sm mx-auto mb-8 transform scale-90 md:scale-100">
                      <Ticket
                        id={ticketData.ticket_id}
                        filmTitle={film.title}
                        userName={form.name}
                        userMobile={form.contact}
                        qrCodeUrl={ticketData.qr_code}
                        isCheckedIn={false}
                        venue={film.venue}
                        date={film.date}
                        time={film.time}
                      />
                    </div>
                  )}

                  <p className="text-white/60 mb-6 text-sm">
                    Please take a screenshot of your ticket. <br />
                    You can also find it later in "My Tickets".
                  </p>

                  <Link href="/#films" className="border-b border-white/40 pb-1 hover:text-accent text-sm uppercase">Register for another</Link>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}