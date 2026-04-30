"use client";

import { useState } from "react";
import { siteContent } from "@/data/siteContent";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VisualSearch() {
  const { headline, subheadline } = siteContent.visualSearch;
  const [isHovering, setIsHovering] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSimulateUpload = () => {
    if (isScanning || isComplete) return;
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      setIsComplete(true);
    }, 2500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white/50">
      <div className="absolute inset-0 z-0 pointer-events-none drop-shadow-sm">
        <img 
          src="/star-bg.png" 
          alt="Star Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-midnight)] mb-8">
            {headline}
          </h2>
          <p className="font-sans text-[var(--color-graphite)]/70 text-2xl font-light mb-16 max-w-2xl mx-auto italic leading-relaxed">
            {subheadline}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className={`relative w-full max-w-3xl mx-auto h-96 rounded-[3rem] border-2 border-dashed transition-all duration-700 flex flex-col items-center justify-center cursor-pointer shadow-sm ${
            isHovering ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/5 shadow-2xl shadow-black/5" : "border-[var(--color-graphite)]/20 bg-white/40 backdrop-blur-md hover:border-[var(--color-graphite)]/40"
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleSimulateUpload}
        >
          <AnimatePresence mode="wait">
            {!isScanning && !isComplete && (
              <motion.div 
                key="default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center pointer-events-none"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-inner ${
                  isHovering ? "bg-[var(--color-terracotta)] text-white" : "bg-[var(--color-alabaster)] text-[var(--color-midnight)]"
                }`}>
                  <UploadCloud size={36} />
                </div>
                <h3 className="font-sans text-3xl font-light text-[var(--color-midnight)] mb-3 tracking-wide">Drag & Drop Image Here</h3>
                <p className="font-sans text-[var(--color-graphite)]/50 text-base italic">Or click to browse from your device</p>
              </motion.div>
            )}

            {isScanning && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center w-full"
              >
                <div className="relative w-56 h-56 rounded-3xl bg-[var(--color-midnight)]/5 overflow-hidden mb-8 shadow-inner">
                  <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-1 bg-[var(--color-terracotta)] shadow-[0_0_20px_var(--color-terracotta)] z-10"
                  />
                </div>
                <h3 className="font-sans text-2xl text-[var(--color-midnight)] font-light italic animate-pulse tracking-wide">Analyzing your style story...</h3>
              </motion.div>
            )}

            {isComplete && (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-[var(--color-midnight)] text-white flex items-center justify-center mb-8 shadow-2xl shadow-black/10">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="font-display text-4xl text-[var(--color-midnight)] mb-6">Matches Found</h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsComplete(false); }}
                  className="bg-[var(--color-terracotta)] text-white font-sans font-bold uppercase tracking-[0.2em] px-12 py-5 text-xs rounded-full hover:scale-105 transition-all shadow-xl shadow-black/10"
                >
                  View Similar Items
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
