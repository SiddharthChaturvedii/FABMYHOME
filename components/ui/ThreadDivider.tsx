"use client";

import { motion } from "framer-motion";

export default function ThreadDivider() {
  return (
    <div className="w-full flex justify-center items-center py-10 overflow-hidden bg-transparent">
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex items-center justify-center max-w-5xl w-full px-6"
      >
        {/* Left Thread Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--color-terracotta)]/40 to-[var(--color-terracotta)]" />
        
        {/* The Knot / Needle Accent */}
        <div className="flex items-center justify-center mx-4 relative group">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="w-3 h-3 rounded-full bg-[var(--color-terracotta)] shadow-[0_0_15px_rgba(230,126,34,0.6)]" 
          />
          {/* Subtle Glow */}
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--color-terracotta)] blur-sm opacity-50 animate-pulse" />
        </div>

        {/* Right Thread Line */}
        <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-[var(--color-terracotta)]/40 to-[var(--color-terracotta)]" />
      </motion.div>
    </div>
  );
}
