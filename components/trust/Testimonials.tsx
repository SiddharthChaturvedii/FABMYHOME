"use client";

import { motion } from "framer-motion";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function Testimonials() {
  return (
    <section className="min-h-screen w-full bg-[#FAFAFA] flex flex-col justify-center overflow-hidden border-y border-black/5 relative py-20">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-4 relative z-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-center text-black uppercase"
        >
          Testimonials
        </motion.h2>
      </div>

      <div className="relative z-10 w-full mt-4">
        <StaggerTestimonials />
      </div>

      {/* Decorative Brand Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[var(--color-terracotta)]/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
