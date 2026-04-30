"use client";

import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/data/siteContent";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
};

export default function BundleRewards() {
  const { headline, subheadline } = siteContent.bundleRewards;
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "0px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Simulate progress filling up as user scrolls to it
      const timer = setTimeout(() => setProgress(88), 300); // 88% full
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-24 bg-[var(--color-midnight)] text-white relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-terracotta)]/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl mb-8 text-[var(--color-alabaster)]">
            {headline}
          </h2>
          <p className="font-sans text-[var(--color-alabaster)]/70 text-2xl font-light mb-20 italic">
            {subheadline}
          </p>
        </motion.div>

        {/* Dynamic Progress Bar UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
        >
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-6 md:gap-0">
            <div className="text-center md:text-left">
              <p className="font-sans text-xs text-white/40 uppercase tracking-[0.3em] mb-3">Your Curation Value</p>
              <p className="font-display text-5xl text-[var(--color-terracotta)]">₹18,500</p>
            </div>
            <div className="text-center md:text-right">
              <p className="font-sans text-lg text-white/80 font-light italic">Add ₹2,500 more to unlock your reward</p>
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full h-6 bg-white/5 rounded-full overflow-hidden mb-12 relative border border-white/5">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[var(--color-terracotta)] via-[#D4A373] to-[#EAE3D9]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Rewards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={cardVariants} className="bg-white/5 rounded-3xl p-8 border border-white/5 hover:border-[var(--color-cyan)]/40 transition-all duration-500 hover:bg-[var(--color-cyan)]/5 group hover:-translate-y-4 hover:shadow-2xl hover:shadow-[var(--color-cyan)]/20 cursor-pointer">
              <h4 className="font-display text-2xl mb-3 transition-colors group-hover:text-[var(--color-cyan)]">Extra 5% Off</h4>
              <p className="font-sans text-base text-white/50 font-light italic">Applied to your entire room bundle.</p>
            </motion.div>
            <motion.div variants={cardVariants} className="bg-[var(--color-terracotta)]/20 rounded-3xl p-8 border border-[var(--color-terracotta)]/40 relative hover:-translate-y-4 transition-transform duration-500 hover:shadow-2xl hover:shadow-[var(--color-terracotta)]/30 cursor-pointer">
              {/* Active Highlight */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-terracotta)] text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-bold shadow-lg">Unlocking Soon</div>
              <h4 className="font-display text-2xl mb-3 text-[var(--color-terracotta)]">Free Cushions</h4>
              <p className="font-sans text-base text-white/60 font-light italic">Premium velvet matching cushions.</p>
            </motion.div>
            <motion.div variants={cardVariants} className="bg-white/5 rounded-3xl p-8 border border-white/5 hover:border-[var(--color-cyan)]/40 transition-all duration-500 hover:bg-[var(--color-cyan)]/5 group hover:-translate-y-4 hover:shadow-2xl hover:shadow-[var(--color-cyan)]/20 cursor-pointer">
              <h4 className="font-display text-2xl mb-3 transition-colors group-hover:text-[var(--color-cyan)]">Stylist Session</h4>
              <p className="font-sans text-base text-white/50 font-light italic">1-on-1 session with a luxury stylist.</p>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
