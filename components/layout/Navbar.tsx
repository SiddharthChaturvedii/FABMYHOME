"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-6 md:px-12 py-6 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-white group">
          FAB<span className="text-[var(--color-terracotta)] group-hover:text-white transition-colors">MY</span>HOME
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["Shop by Space", "Shop by Mood", "Design My Room", "Free Consultation"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-[13px] font-medium uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <button className="bg-white text-black px-6 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-wider hover:bg-[var(--color-terracotta)] hover:text-white transition-all">
          Get Started
        </button>
      </div>
    </nav>
  );
}
