"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Handle Navigation
  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    setMobileMenuOpen(false); // Close mobile menu
    if (isHomePage) {
      e.preventDefault();
      lenis?.scrollTo(targetId, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-colors duration-500
          ${dark || mobileMenuOpen ? "bg-black" : "bg-transparent"}
          overflow-hidden
        `}
      >
        <div className="navbar-texture" />

        <div className="relative z-10 flex items-center justify-between px-6 md:px-8 py-3">
          
          {/* LOGO SECTION */}
          <Link 
            href="/" 
            className="flex items-center gap-3 md:gap-5 hover:opacity-80 transition-opacity cursor-pointer relative z-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* TKM FLF Logo */}
            <Image
              src="/FF-26(white).png" 
              alt="TKM FLF 26"
              width={64}
              height={20}
              className="select-none object-contain w-12 md:w-16"
            />
            
            {/* FD Logo */}
            <Image
               src="/logo/F&D White.png" 
               alt="Film Division"
               width={48}
               height={48}
               className="select-none object-contain w-10 md:w-12"
            />
          </Link>

          {/* DESKTOP NAV LINKS (Hidden on Mobile) */}
          <div className="hidden md:flex gap-10 text-[11px] tracking-[0.38em] uppercase font-semibold text-white transition-colors duration-500">
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

          {/* MOBILE MENU TOGGLE (Visible on Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 text-white p-2 focus:outline-none"
          >
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "w-4"}`} />
              <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden"
          >
            <div className="navbar-texture opacity-30" />
            
            <div className="relative z-10 flex flex-col gap-8 text-center">
              <Link 
                href="/#films" 
                onClick={(e) => handleNavClick(e, "#films")}
                className="text-3xl font-ostwall uppercase text-white hover:text-accent transition-colors"
              >
                Films
              </Link>
              <Link 
                href="/schedule" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-3xl font-ostwall uppercase transition-colors ${pathname === "/schedule" ? "text-accent" : "text-white hover:text-accent"}`}
              >
                Schedule
              </Link>
              <Link 
                href="/#about" 
                onClick={(e) => handleNavClick(e, "#about")}
                className="text-3xl font-ostwall uppercase text-white hover:text-accent transition-colors"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}