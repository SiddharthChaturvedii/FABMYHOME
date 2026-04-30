"use client";

import { siteContent } from "@/data/siteContent";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  const { headline, subheadline, cta } = siteContent.finalCta;

  return (
    <section className="relative py-32 overflow-hidden bg-[var(--color-midnight)] text-white flex items-center justify-center">
      {/* Background visual element */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-cyan)] rounded-full blur-[150px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <h2 className="font-display text-5xl md:text-7xl lg:text-[100px] mb-8 tracking-tight drop-shadow-xl">
          {headline}
        </h2>
        <p className="font-sans text-xl md:text-3xl font-light text-white/80 mb-16">
          {subheadline}
        </p>
        
        <button className="group relative inline-flex items-center gap-4 bg-[var(--color-terracotta)] text-white font-sans font-bold uppercase tracking-widest px-10 py-5 text-sm md:text-base overflow-hidden transition-all hover:-translate-y-1 hover:scale-105 shadow-2xl hover:shadow-[var(--color-terracotta)]/50 border border-transparent hover:border-white/20">
          <span className="relative z-10">{cta}</span>
          <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </motion.div>
    </section>
  );
}
