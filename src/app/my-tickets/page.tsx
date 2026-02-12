/* src/app/my-tickets/page.tsx */
"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Ticket from "../../components/Ticket";
import Reveal from "../../components/Reveal";
import { filmsData } from "../../data/films";

export default function MyTicketsPage() {
    const [mobile, setMobile] = useState("");
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mobile) return;

        setLoading(true);
        setSearched(true);
        setTickets([]);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-tickets/?mobile=${mobile}`);
            if (res.ok) {
                const data = await res.json();
                setTickets(data);
            } else {
                console.error("Failed to fetch tickets");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* Background Texture */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.1] z-0"
                style={{ backgroundImage: 'url("/textures/grain.png")', backgroundSize: '260px' }}
            />

            <div className="relative z-10 min-h-screen pt-32 px-6 pb-20 max-w-4xl mx-auto flex flex-col">

                <Reveal>
                    <h1 className="text-4xl md:text-6xl font-ostwall uppercase text-center mb-12">
                        My <span className="text-accent">Tickets</span>
                    </h1>
                </Reveal>

                {/* SEARCH FORM */}
                <div className="w-full max-w-md mx-auto mb-16">
                    <form onSubmit={handleSearch} className="relative group">
                        <input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="
                w-full bg-transparent 
                border-b border-white/20 
                py-4 text-center text-xl font-ostwall uppercase tracking-widest
                focus:outline-none focus:border-accent 
                transition-colors
              "
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                absolute right-0 top-1/2 -translate-y-1/2
                text-sm uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity
                disabled:opacity-20
              "
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </form>
                </div>

                {/* RESULTS GRID */}
                {searched && !loading && tickets.length === 0 && (
                    <div className="text-center text-white/40 font-mono uppercase tracking-widest">
                        No tickets found for this number.
                    </div>
                )}

                <div className="grid grid-cols-1 gap-12">
                    {tickets.map((t, index) => {
                        // Find the film in static data to get the correct date/time/venue
                        const film = filmsData.find(f => f.title === t.film_title) || filmsData.find(f => f.slug === t.film_slug);

                        return (
                            <Reveal key={t.id} delay={index * 0.1}>
                                <Ticket
                                    id={t.id}
                                    filmTitle={t.film_title}
                                    userName={t.user_name}
                                    userMobile={t.user_mobile}
                                    qrCodeUrl={t.qr_code}
                                    isCheckedIn={t.is_checked_in}
                                    date={film?.date || t.date || "Upcoming"}
                                    time={film?.time || t.time || "TBA"}
                                    venue={film?.venue || t.venue || "Main Auditorium"}
                                />
                            </Reveal>
                        );
                    })}
                </div>

            </div>
        </>
    );
}
