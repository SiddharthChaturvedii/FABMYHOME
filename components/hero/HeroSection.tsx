"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/data/siteContent";
import { useUIStore } from "@/store/uiStore";
import { motion, AnimatePresence } from "framer-motion";
import HeroImageSequence from "./HeroImageSequence";

const ScrambleText = ({ text }: { text: string }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    let isActive = true;

    const interval = setInterval(() => {
      if (!isActive) return;

      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [text]);

  return <span>{displayText}</span>;
};

export default function HeroSection() {
  const { introStage, setIntroStage } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (introStage === 2) {
      const timer = setTimeout(() => setIntroStage(3), 2500); 
      return () => clearTimeout(timer);
    }
    if (introStage === 3) {
      const timer = setTimeout(() => setIntroStage(4), 2000); 
      return () => clearTimeout(timer);
    }
  }, [introStage, setIntroStage, mounted]);

  if (!mounted) return <div className="w-full h-screen bg-[var(--color-midnight)]" />;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[var(--color-midnight)]">
      <HeroImageSequence />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          {introStage === 2 && (
            <motion.div
              key="brand-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-[140px] text-white font-bold tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <ScrambleText text="FABMYHOME" />
              </h1>
            </motion.div>
          )}

          {introStage === 3 && (
            <motion.div
              key="tagline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center flex flex-col items-center"
            >
              <h2 className="font-display text-4xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-md">
                {siteContent.hero.headline}
              </h2>
              <div className="h-[2px] w-24 bg-[var(--color-terracotta)] mb-8" />
              <p className="font-sans text-white/80 text-lg md:text-2xl font-light tracking-[0.3em] uppercase italic drop-shadow-md">
                {siteContent.hero.subheadline}
              </p>
            </motion.div>
          )}

          {introStage === 4 && (
            <motion.div
              key="hero-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="max-w-5xl text-center flex flex-col items-center pointer-events-auto"
            >
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="font-display text-5xl md:text-8xl lg:text-[100px] text-white leading-[1] tracking-tighter drop-shadow-2xl mb-8"
              >
                {siteContent.hero.headline}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="font-sans text-white/90 text-xl md:text-2xl font-light tracking-wide mb-12 max-w-3xl mx-auto drop-shadow-md"
              >
                {siteContent.hero.subheadline}
              </motion.p>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                {siteContent.hero.ctas.map((cta, index) => {
                  let classes = "font-sans font-bold uppercase tracking-[0.2em] px-12 py-6 text-xs transition-all duration-500 rounded-full ";
                  
                  if (cta.variant === "terracotta") {
                    classes += "bg-[var(--color-terracotta)] text-white hover:scale-105 shadow-2xl shadow-black/50";
                  } else if (cta.variant === "teal-outline") {
                    classes += "border-2 border-[var(--color-cyan)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:text-white backdrop-blur-md";
                  } else {
                    classes += "text-white/80 hover:text-white hover:bg-white/10";
                  }

                  return (
                    <button 
                      key={index} 
                      className={classes}
                    >
                      {cta.label}
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
