"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Search, ShoppingBag, User } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const navItems = [
  {
    title: "Shop by Space",
    description: "Curated collections for every corner of your home.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
    links: [
      { label: "Living Room", href: "#living" },
      { label: "Bedroom", href: "#bedroom" },
      { label: "Home Office", href: "#office" },
      { label: "Dining Area", href: "#dining" },
    ],
  },
  {
    title: "Shop by Mood",
    description: "Furniture that speaks your emotional language.",
    image: "https://images.unsplash.com/photo-1616489953149-755e74c0e927?q=80&w=600&auto=format&fit=crop",
    links: [
      { label: "Minimalist", href: "#minimal" },
      { label: "Earthy & Warm", href: "#earthy" },
      { label: "Modern Classic", href: "#classic" },
      { label: "Bold & Vibrant", href: "#bold" },
    ],
  },
  {
    title: "Design Services",
    description: "Expert AI-powered design consultations.",
    image: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=600&auto=format&fit=crop",
    links: [
      { label: "AI Room Scan", href: "#scan" },
      { label: "Style Quiz", href: "#quiz" },
      { label: "Expert Consult", href: "#consult" },
      { label: "Pro Moodboards", href: "#moodboards" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-6 md:px-12 py-5 ${
        scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-white group">
          FAB<span className="text-[var(--color-terracotta)] group-hover:text-white transition-colors">MY</span>HOME
        </Link>

        {/* Central Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <HoverCard key={item.title} openDelay={0} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="group flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white cursor-pointer transition-colors">
                  {item.title}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 opacity-50" />
                </div>
              </HoverCardTrigger>

              <HoverCardContent 
                align="start" 
                sideOffset={25}
                className="glass overflow-hidden border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-32 w-full object-cover brightness-75 transition-transform duration-700 hover:scale-110"
                  />
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-[13px] font-bold text-white mb-1 uppercase tracking-widest">{item.title}</p>
                      <p className="text-[11px] leading-relaxed text-white/50 font-medium">
                        {item.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 border-t border-white/10 pt-4">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-[12px] text-white/60 transition-all hover:text-white hover:translate-x-1 py-0.5"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
          <Link href="#blog" className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
            Blog
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-6 text-white/70">
          {[
            { icon: Search, label: "Search" },
            { icon: ShoppingBag, label: "Cart" },
            { icon: User, label: "Profile" }
          ].map(({ icon: Icon, label }, i) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.15, color: "#fff" }}
              whileTap={{ scale: 0.9 }}
              className="p-2 transition-colors relative group"
            >
              <Icon className="h-5 w-5 stroke-[1.5]" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
}
