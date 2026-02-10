"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for page navigation
import { usePathname } from "next/navigation"; // To check current page
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname(); // Get current route (e.g., "/" or "/schedule")
  const isHomePage = pathname === "/";

  // Handle Scroll Logic for background change
  useEffect(() => {
    const onScroll = () => {
      const triggerPoint = window.innerHeight * 0.85;
      setDark(window.scrollY > triggerPoint);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle Navigation
  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (isHomePage) {
      // If on Home, scroll smoothly
      e.preventDefault();
      lenis?.scrollTo(targetId, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
    // If NOT on Home, let the Link tag handle the navigation to "/"
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-colors duration-500
        ${dark || !isHomePage ? "bg-black" : "bg-transparent"} 
        /* Always black on Schedule page, transparent/black on Home */
        overflow-hidden
      `}
    >
      <div className="navbar-texture" />

      <div className="relative z-10 flex items-center justify-between px-8 py-3">
        
        {/* LOGO - Always links to Home */}
        <Link href="/">
          <Image
            src={dark || !isHomePage ? "/FF-26(white).png" : "/FF-26.png"}
            alt="TKM FLF 26"
            width={64}
            height={20}
            className="select-none hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* NAV LINKS */}
        <div
          className={`
            flex gap-10
            text-[11px]
            tracking-[0.38em]
            uppercase
            font-semibold
            transition-colors duration-500
            ${dark || !isHomePage ? "text-white" : "text-black"}
          `}
        >
          {/* FILMS LINK */}
          <Link 
            href="/#films" 
            onClick={(e) => handleNavClick(e, "#films")}
            className="hover:opacity-60 transition cursor-pointer"
          >
            Films
          </Link>
          
          {/* SCHEDULE LINK */}
          <Link 
            href="/schedule" 
            className="hover:opacity-60 transition cursor-pointer"
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