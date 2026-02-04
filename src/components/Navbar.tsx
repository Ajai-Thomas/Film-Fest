"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Adjust this threshold if needed
      const triggerPoint = window.innerHeight * 0.85;
      setDark(window.scrollY > triggerPoint);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-colors duration-500
        ${dark ? "bg-black" : "bg-accent"}
        overflow-hidden
      `}
    >
      {/* Grain overlay */}
      <div className="navbar-texture" />

      <div className="relative z-10 flex items-center justify-between px-8 py-3">
        
        {/* LOGO */}
        <Image
          src={dark ? "/FF-26(white).png" : "/FF-26.png"}
          alt="TKM FLF 26"
          width={64}
          height={20}
          priority
          className="
            select-none
            transition-opacity duration-300
          "
        />

        {/* NAV LINKS */}
        <div
          className={`
            flex gap-10
            text-[11px]
            tracking-[0.38em]
            uppercase
            font-semibold
            transition-colors duration-500
            ${dark ? "text-white" : "text-black"}
          `}
        >
          {/* Scroll to #films */}
          <a href="#films" className="hover:opacity-60 transition">Films</a>
          {/* REMOVED: Screenings Link */}
          <a href="#register" className="hover:opacity-60 transition">Register</a>
          <a href="#about" className="hover:opacity-60 transition">About</a>
        </div>
      </div>
    </nav>
  );
}