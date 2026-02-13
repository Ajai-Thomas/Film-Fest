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

    // Pagination
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const LIMIT = 50;

    // Stats
    const [stats, setStats] = useState<any>(null);

    // 1. Fetch all registrations on load
    useEffect(() => {
        // Reset and fetch when filters change
        setTickets([]);
        setOffset(0);
        setHasMore(true);
        fetchRegistrations(0, true);
        fetchStats();
    }, [filterFilm, filterStatus]);

    // Keep track of the abort controller to cancel previous requests
    const abortControllerRef = useState(new AbortController())[0]; // Actually better to use useRef for this
    // But since I can't easily change hooks structure without rewriting the whole component, I'll stick to a simple ref pattern if possible or just use a variable outside if I could, but useRef is best.
    // Let's assume I can add useRef.
    // Wait, I can't add imports easily with replace_file_content if I don't target the top.
    // I'll just use a local variable in the module scope? No, that's bad.
    // I'll check if useRef is imported. `import { useState, useEffect}` is line 4.
    // I'll update line 4 too.

    // Actually, I'll just use a let variable for the "loading" guard that is more effective, or just rely on state.
    // The previous fix for deduplication WAS correct `!existingIds.has(t.id)`. 
    // If it failed, maybe `t.id` is not unique in the DB result?
    // Let's enforce unique IDs in the entire list, always.

    const fetchStats = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/`);
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error("Failed to fetch stats", err);
        }
    };

    const fetchRegistrations = async (currentOffset = 0, isReset = false) => {
        if (loading && !isReset) return; // Allow reset to override loading? Or just block?
        // If isReset is true, we probably want to proceed even if loading old data, but we should cancel old data.

        setLoading(true);
        try {
            // Build Query Params
            const params = new URLSearchParams();
            if (filterFilm) params.append("film", filterFilm);
            if (filterStatus) params.append("status", filterStatus);
            params.append("limit", LIMIT.toString());
            params.append("offset", currentOffset.toString());

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list/?${params.toString()}`);
            const data = await res.json();

            let newTickets = [];
            if (data.results) {
                newTickets = data.results;
                setHasMore(!!data.next);
            } else if (Array.isArray(data)) {
                newTickets = data;
                setHasMore(false);
            }

            setTickets(prev => {
                // If reset, start with empty prev, else use prev
                const base = isReset ? [] : prev;

                // Deduplicate strictly
                const combined = [...base, ...newTickets];
                const uniqueMap = new Map();
                combined.forEach(t => {
                    uniqueMap.set(t.id, t);
                });
                return Array.from(uniqueMap.values());
            });

            setOffset(currentOffset + LIMIT);

        } catch (err) {
            console.error("Failed to fetch tickets", err);
        } finally {
            setLoading(false);
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

            // Refresh list to show green check. We can just re-fetch the current list or reset.
            // Simplest is to reset to ensure consistency.
            if (data.status === "success" || data.message.includes("ALREADY USED")) {
                setTickets([]);
                setOffset(0);
                fetchRegistrations(0, true);
                fetchStats(); // Refresh stats too
            }
        } catch (err) {
            setMessage("Error verifying ticket");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-accent">Admin Dashboard</h1>

            {/* STATS OVERVIEW */}
            {stats && (
                <div className="mb-8 p-6 bg-white/5 rounded-lg border border-white/10">
                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total</p>
                            <p className="text-3xl font-bold text-white font-quittance">{stats.total}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Checked In</p>
                            <p className="text-3xl font-bold text-green-400 font-quittance">{stats.checked_in}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Pending</p>
                            <p className="text-3xl font-bold text-red-400 font-quittance">{stats.pending}</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <p className="text-xs text-gray-500 uppercase mb-4 text-center tracking-widest">Registrations By Film</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {stats.by_film.map((s: any) => (
                                <div key={s.film__slug} className="flex items-center bg-black/40 px-3 py-2 rounded border border-white/5 hover:border-white/20 transition-colors">
                                    <span className="text-xs text-gray-300 mr-2 uppercase">{s.film__title}</span>
                                    <span className="text-sm font-bold text-accent">{s.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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
                <div className="bg-white/10 p-6 rounded-lg flex flex-col h-[80vh] min-h-[500px]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Registrations ({stats ? stats.total : tickets.length})</h2>
                        <button onClick={() => { setTickets([]); setOffset(0); fetchRegistrations(0, true); fetchStats(); }} className="text-xs bg-white/20 px-2 py-1 rounded">Refresh</button>
                    </div>

                    {/* FILTERS */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <select
                            value={filterFilm}
                            onChange={(e) => { setFilterFilm(e.target.value); setOffset(0); setTickets([]); }}
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
                            onChange={(e) => { setFilterStatus(e.target.value); setOffset(0); setTickets([]); }}
                            className="bg-black/40 border border-white/20 text-xs p-2 rounded text-white"
                        >
                            <option value="">All Status</option>
                            <option value="checked_in">Checked In</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <div
                        className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-2 relative z-10"
                        data-lenis-prevent
                        onScroll={(e) => {
                            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
                            if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !loading) {
                                fetchRegistrations(offset);
                            }
                        }}
                    >
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
                        {loading && <div className="text-center text-xs text-gray-400 py-2">Loading more...</div>}
                        {!loading && hasMore && (
                            <button
                                onClick={() => fetchRegistrations(offset)}
                                className="w-full py-2 bg-white/10 hover:bg-white/20 text-xs rounded text-center mt-2"
                            >
                                Load More
                            </button>
                        )}
                        {!hasMore && tickets.length > 0 && <div className="text-center text-xs text-gray-500 py-2">No more registrations</div>}
                    </div>
                </div>

            </div>
        </div>
    );
}