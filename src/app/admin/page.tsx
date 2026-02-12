/* src/app/admin/page.tsx */
"use client";

import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { filmsData } from "../../data/films";

export default function AdminPage() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [scanResult, setScanResult] = useState("");

    // Filters
    const [filterFilm, setFilterFilm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // 1. Fetch all registrations on load
    useEffect(() => {
        fetchRegistrations();
    }, [filterFilm, filterStatus]); // Re-fetch when filters change

    const fetchRegistrations = async () => {
        try {
            // Build Query Params
            const params = new URLSearchParams();
            if (filterFilm) params.append("film", filterFilm);
            if (filterStatus) params.append("status", filterStatus);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list/?${params.toString()}`);
            const data = await res.json();
            setTickets(data);
        } catch (err) {
            console.error("Failed to fetch tickets", err);
        }
    };

    // 2. Handle QR Scan
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        scanner.render(
            async (decodedText) => {
                scanner.clear(); // Stop scanning once found
                setScanResult(decodedText);
                verifyTicket(decodedText);
            },
            (error) => {
                // scan errors are common, ignore them
            }
        );

        return () => {
            scanner.clear().catch(error => console.error("Failed to clear scanner", error));
        };
    }, []);

    const verifyTicket = async (ticketId: string) => {
        setMessage("Verifying...");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scan/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticket_id: ticketId }),
            });
            const data = await res.json();
            setMessage(data.message);
            fetchRegistrations(); // Refresh list to show green check
        } catch (err) {
            setMessage("Error verifying ticket");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-accent">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT: SCANNER */}
                <div className="bg-white/10 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Scan Ticket</h2>
                    <div id="reader" className="w-full bg-white text-black"></div>
                    {message && (
                        <div className={`mt-4 p-4 text-center text-xl font-bold ${message.includes("Welcome") ? "text-green-400" : "text-red-500"}`}>
                            {message}
                        </div>
                    )}
                    {scanResult && <p className="text-xs mt-2 text-gray-500">Ticket ID: {scanResult}</p>}
                    <button onClick={() => window.location.reload()} className="mt-4 w-full bg-blue-600 py-2 rounded">Scan Another</button>
                </div>

                {/* RIGHT: LIST */}
                <div className="bg-white/10 p-6 rounded-lg overflow-hidden flex flex-col h-[600px]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Registrations ({tickets.length})</h2>
                        <button onClick={fetchRegistrations} className="text-xs bg-white/20 px-2 py-1 rounded">Refresh</button>
                    </div>

                    {/* FILTERS */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <select
                            value={filterFilm}
                            onChange={(e) => setFilterFilm(e.target.value)}
                            className="bg-black/40 border border-white/20 text-xs p-2 rounded text-white"
                        >
                            <option value="">All Films</option>
                            {filmsData.map((film) => (
                                <option key={film.slug} value={film.slug}>
                                    {film.title}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-black/40 border border-white/20 text-xs p-2 rounded text-white"
                        >
                            <option value="">All Status</option>
                            <option value="checked_in">Checked In</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {tickets.map((t) => (
                            <div key={t.id} className={`p-3 border-l-4 ${t.is_checked_in ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-white/5'} flex justify-between items-center`}>
                                <div>
                                    <p className="font-bold">{t.user_name}</p>
                                    <p className="text-xs text-white/60">{t.film_title}</p>
                                    <p className="text-xs text-white/40">{t.user_mobile}</p>
                                </div>
                                {t.is_checked_in ? (
                                    <span className="text-green-400 text-xs font-bold uppercase">Checked In</span>
                                ) : (
                                    <span className="text-red-400 text-xs font-bold uppercase">Pending</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}