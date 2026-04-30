"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { useUIStore } from "@/store/uiStore";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { introStage } = useUIStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 w-[95%] max-w-7xl rounded-full ${
          introStage < 4 ? "-translate-y-32 opacity-0" : "translate-y-0 opacity-100"
        } ${
          isScrolled
            ? "bg-[var(--color-midnight)]/80 backdrop-blur-xl py-4 shadow-2xl shadow-black/20 border border-white/10 top-4"
            : "bg-transparent py-6 top-6"
        }`}
      >
        <div className="px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`font-display text-2xl font-bold tracking-[0.1em] transition-colors text-white`}
          >
            FABMYHOME
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navigation.mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 ${
                  item.highlight
                    ? "text-[var(--color-terracotta)] hover:text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white hover:scale-110 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-midnight)] transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-center px-8 gap-8">
          {navigation.mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-display text-3xl font-bold ${
                item.highlight ? "text-[var(--color-terracotta)]" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
