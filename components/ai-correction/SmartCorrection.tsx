"use client";

import { useState, useRef } from "react";
import { siteContent } from "@/data/siteContent";
import { MoveHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function SmartCorrection() {
  const { headline, subheadline } = siteContent.aiCorrection;
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handlePointerDown = () => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchmove", handleDrag, { passive: false });
    document.addEventListener("mouseup", handlePointerUp);
    document.addEventListener("touchend", handlePointerUp);
  };

  const handlePointerUp = () => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("mouseup", handlePointerUp);
    document.removeEventListener("touchend", handlePointerUp);
  };

  return (
    <section className="py-24 bg-[var(--color-alabaster)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-midnight)] mb-8">
            {headline}
          </h2>
          <p className="font-sans text-[var(--color-graphite)]/70 text-2xl font-light italic leading-relaxed">
            {subheadline}
          </p>
        </motion.div>

        {/* Before / After Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto h-[50vh] md:h-[75vh] rounded-[3rem] overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-black/10 border border-white/20 transition-shadow duration-500 hover:shadow-black/20"
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        >
          {/* "After" Image (Background - Good Design) */}
          <div 
            className="absolute inset-0 bg-[#D4C3B3] flex items-center justify-end pr-12 md:pr-32"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            {/* Soft accent gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent" />
            <div className="text-right z-10">
              <h3 className="font-display text-4xl md:text-6xl text-[var(--color-midnight)] mb-4">Harmonious</h3>
              <p className="font-sans text-[var(--color-midnight)]/70 text-xl max-w-xs ml-auto italic">
                AI balanced the heavy velvet with soft linen and muted tones.
              </p>
            </div>
          </div>

          {/* "Before" Image (Foreground - Bad Design, clipped) */}
          <div 
            className="absolute inset-0 bg-[#A63A28] flex items-center justify-start pl-12 md:pl-32"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            {/* Harsh accent pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 6px)" }} />
            <div className="text-left z-10">
              <h3 className="font-display text-4xl md:text-6xl text-white mb-4">Clashing</h3>
              <p className="font-sans text-white/70 text-xl max-w-xs italic">
                Heavy floral patterns clashing with intense velvet textures.
              </p>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-sm cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[var(--color-midnight)] shadow-2xl border-4 border-[var(--color-alabaster)] hover:scale-125 transition-transform"
            >
              <MoveHorizontal size={28} />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
