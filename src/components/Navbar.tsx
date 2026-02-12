"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Handle Scroll Logic (Transparent -> Black)
  useEffect(() => {
    const onScroll = () => {
      const triggerPoint = window.innerHeight * 0.85;
      setDark(window.scrollY > triggerPoint);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle Smooth Scroll Navigation
  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (isHomePage) {
      e.preventDefault();
      lenis?.scrollTo(targetId, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-colors duration-500
        ${dark ? "bg-black" : "bg-transparent"}
        overflow-hidden
      `}
    >
      {/* Grain overlay */}
      <div className="navbar-texture" />

      <div className="relative z-10 flex items-center justify-between px-8 py-3">
        
        {/* LOGO SECTION */}
        <Link 
          href="/" 
          className="flex items-center gap-5 hover:opacity-80 transition-opacity cursor-pointer"
        >
          {/* TKM FLF Logo */}
          <Image
            src="/FF-26(white).png" 
            alt="TKM FLF 26"
            width={64}
            height={20}
            className="select-none object-contain"
          />
          
          {/* FD Logo - SIZE INCREASED */}
          <Image
             src="/logo/F&D White.png" 
             alt="Film Division"
             width={48} /* Changed from 32 */
             height={48} /* Changed from 32 */
             className="select-none object-contain"
          />
        </Link>

        {/* NAV LINKS */}
        <div
          className="
            flex gap-10
            text-[11px]
            tracking-[0.38em]
            uppercase
            font-semibold
            transition-colors duration-500
            text-white
          "
        >
          <Link 
            href="/#films" 
            onClick={(e) => handleNavClick(e, "#films")}
            className="hover:opacity-60 transition cursor-pointer"
          >
            Films
          </Link>
          
          <Link 
            href="/schedule" 
            className={`
              transition cursor-pointer
              /* Active State: Bright Red if on Schedule page */
              ${pathname === "/schedule" ? "text-accent opacity-100" : "hover:opacity-60"}
            `}
          >
            Schedule
          </Link>
          
          <Link 
            href="/#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="hover:opacity-60 transition cursor-pointer"
          >
            About
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}