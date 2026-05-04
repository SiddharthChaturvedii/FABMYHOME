"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/data/siteContent";
import Navbar from "../layout/Navbar";
import HeroVideo from "./HeroVideo";
import HeroFallback from "./HeroFallback";
import LoadingCurtain from "./LoadingCurtain";
import { useUIStore } from "@/store/uiStore";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { introStage } = useUIStore();
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden bg-black">
      {/* 1. Loading Curtain */}
      <LoadingCurtain />
      
      {/* 2. Top-Level Navigation */}
      <Navbar />

      {/* 3. Main Hero Visual Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {mounted ? (
            <motion.div 
              key="hero-media"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <HeroVideo />
            </motion.div>
          ) : (
            <motion.div key="hero-fallback" className="absolute inset-0 bg-black">
              <HeroFallback />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Text & Interaction Layer */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={introStage >= 1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-start text-left"
          >
            <motion.h1 
              initial={{ y: 30, opacity: 0, filter: isLandscape ? "blur(10px)" : "none" }}
              animate={introStage >= 1 ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ 
                delay: isLandscape ? 11 : 0.2, 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="font-display text-5xl md:text-7xl lg:text-[100px] text-white leading-[0.95] tracking-tighter drop-shadow-2xl mb-8"
            >
              {siteContent.hero.headline}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={introStage >= 1 ? { y: 0, opacity: 1 } : {}}
              transition={{ 
                delay: isLandscape ? 11.4 : 0.4, 
                duration: 1 
              }}
              className="font-sans text-white/90 text-xl md:text-2xl font-light tracking-wide mb-12 max-w-2xl drop-shadow-md"
            >
              {siteContent.hero.subheadline}
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={introStage >= 1 ? { y: 0, opacity: 1 } : {}}
              transition={{ 
                delay: isLandscape ? 11.8 : 0.6, 
                duration: 1 
              }}
              className="flex flex-col sm:flex-row items-center justify-start gap-6 w-full"
            >
              {siteContent.hero.ctas.map((cta, index) => {
                let classes = "font-sans font-bold uppercase tracking-[0.2em] px-12 py-6 text-xs transition-all duration-500 rounded-none ";
                if (cta.variant === "terracotta") classes += "bg-[var(--color-terracotta)] text-white hover:scale-105 shadow-2xl";
                else if (cta.variant === "teal-outline") classes += "border-2 border-[var(--color-cyan)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:text-white backdrop-blur-md";
                else classes += "text-white/80 hover:text-white hover:bg-white/10";

                return <button key={index} className={classes}>{cta.label}</button>;
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
