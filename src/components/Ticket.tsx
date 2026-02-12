/* src/components/Ticket.tsx */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TicketProps {
    id: string;
    filmTitle: string;
    userName: string;
    userMobile: string;
    qrCodeUrl: string;
    isCheckedIn: boolean;
    venue?: string;
    date?: string;
    time?: string;
}

export default function Ticket({
    id,
    filmTitle,
    userName,
    userMobile,
    qrCodeUrl,
    isCheckedIn,
    venue = "Main Auditorium",
    date = "Coming Soon",
    time = "TBA"
}: TicketProps) {

    // Construct full QR URL if it's a relative path from Django
    const fullQrUrl = qrCodeUrl.startsWith("http")
        ? qrCodeUrl
        : `${process.env.NEXT_PUBLIC_API_URL}${qrCodeUrl}`;

    return (
        <>
            <motion.div
                id={`ticket-${id}`} // ID for html2canvas targeting
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-[24rem] mx-auto bg-black border-2 border-[#ffffff1a] rounded-lg overflow-hidden" // border-white/10 -> #ffffff1a, removed shadow-2xl
                style={{ boxShadow: "0 0 40px rgba(176, 0, 0, 0.1)" }}
            >

                {/* --- LEFT SECTION: MAIN INFO --- */}
                <div className="relative p-6 pb-12 bg-[#0a0a0a]">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 border-b border-[#ffffff1a] pb-4">
                        <div>
                            <span className="text-accent text-[10px] tracking-[0.3em] font-bold uppercase">Admit One</span>
                            <h2 className="font-ostwall text-2xl uppercase text-white mt-1 leading-none">{filmTitle}</h2>
                        </div>
                        <div className="text-right">
                            <Image
                                src="/FF-26(white).png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="opacity-50"
                            />
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <p className="text-[#ffffff4d] uppercase tracking-widest mb-1">Name</p> {/* white/30 */}
                            <p className="font-bold text-white uppercase">{userName}</p>
                        </div>
                        <div>
                            <p className="text-[#ffffff4d] uppercase tracking-widest mb-1">Mobile</p>
                            <p className="font-mono text-[#ffffffcc]">{userMobile}</p> {/* white/80 */}
                        </div>
                        <div>
                            <p className="text-[#ffffff4d] uppercase tracking-widest mb-1">Date</p>
                            <p className="font-bold text-white">{date}</p>
                        </div>
                        <div>
                            <p className="text-[#ffffff4d] uppercase tracking-widest mb-1">Time</p>
                            <p className="font-bold text-white">{time}</p>
                        </div>
                    </div>

                    {/* Venue Footer */}
                    <div className="mt-6 pt-4 border-t border-dashed border-[#ffffff33]"> {/* white/20 */}
                        <p className="text-[#ffffff4d] uppercase tracking-widest text-[10px] mb-1">Venue</p>
                        <p className="font-ostwall text-lg text-[#ffffffe6]">{venue}</p> {/* white/90 */}
                    </div>

                    {/* Status Indicator */}
                    {isCheckedIn && (
                        <div className="absolute top-2 right-2 bg-[#22c55e33] border border-[#22c55e] text-[#22c55e] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider transform rotate-12">
                            Checked In
                        </div>
                    )}

                </div>

                {/* --- PERFORATED LINE SEPARATOR --- */}
                <div className="relative h-0 border-b-2 border-dashed border-[#ffffff33] w-full bg-[#0a0a0a]">
                    <div className="absolute -left-3 -top-3 w-6 h-6 bg-black rounded-full" /> {/* Cutout Left */}
                    <div className="absolute -right-3 -top-3 w-6 h-6 bg-black rounded-full" /> {/* Cutout Right */}
                </div>

                {/* --- RIGHT SECTION: QR CODE (TEAR-OFF) --- */}
                <div className="bg-[#0a0a0a] p-8 flex flex-col items-center justify-center text-white border-t border-[#ffffff1a]">
                    <div className="w-48 h-48 relative mb-4">
                        <img
                            src={fullQrUrl}
                            alt="QR Code"
                            className="w-full h-full object-contain invert" // 'invert' makes the black QR code white
                            style={{ mixBlendMode: 'screen' }}
                        />
                    </div>
                    <p className="text-[10px] font-mono tracking-widest uppercase opacity-60">Scan at Gate</p>
                    <p className="text-[8px] font-mono opacity-40 mt-1">{id.slice(0, 8)}...</p>
                </div>
            </motion.div>

            {/* DOWNLOAD BUTTON */}
            <div className="text-center mt-6">
                <button
                    onClick={() => {
                        const element = document.getElementById(`ticket-${id}`);
                        if (element) {
                            import("html2canvas").then((html2canvas) => {
                                html2canvas.default(element, {
                                    backgroundColor: null, // Transparent background if possible, or matches CSS
                                    useCORS: true, // Important for external images
                                    scale: 2 // High res
                                }).then((canvas) => {
                                    const link = document.createElement("a");
                                    link.download = `TKM-FLF-Ticket-${filmTitle}-${userName}.png`;
                                    link.href = canvas.toDataURL("image/png");
                                    link.click();
                                });
                            });
                        }
                    }}
                    className="bg-[#b00000] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(176,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:scale-105"
                >
                    Download Ticket
                </button>
            </div>
        </>
    );
}
