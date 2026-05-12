"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/data/siteContent";
import Navbar from "../layout/Navbar";
import HeroVideo from "./HeroVideo";
import LoadingCurtain from "./LoadingCurtain";
import { useUIStore } from "@/store/uiStore";

export default function HeroSection() {
  const { introStage } = useUIStore();
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <HeroVideo />
        </motion.div>
      </div>

      {/* 4. Text & Interaction Layer */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="w-full md:w-1/2 max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={introStage >= 2 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start text-left"
          >
            <motion.h1 
              initial={{ y: 30, opacity: 0, filter: isLandscape ? "blur(10px)" : "none" }}
              animate={introStage >= 2 ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ 
                delay: 0.1,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="font-display text-5xl md:text-7xl lg:text-[100px] text-white leading-[0.95] tracking-tighter drop-shadow-2xl mb-8"
            >
              {siteContent.hero.headline}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={introStage >= 2 ? { y: 0, opacity: 1 } : {}}
              transition={{ 
                delay: 0.3,
                duration: 0.8
              }}
              className="font-sans text-white/90 text-xl md:text-2xl font-light tracking-wide mb-12 max-w-2xl drop-shadow-md"
            >
              {siteContent.hero.subheadline}
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={introStage >= 2 ? { y: 0, opacity: 1 } : {}}
              transition={{ 
                delay: 0.5,
                duration: 0.8
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
            >
              {siteContent.hero.ctas.map((cta, index) => {
                let classes = "font-sans font-bold uppercase tracking-[0.2em] px-4 md:px-7 py-4 text-[10px] md:text-xs transition-all duration-500 rounded-none text-center w-full flex items-center justify-center ";
                if (cta.variant === "terracotta") classes += "bg-[var(--color-terracotta)] text-white hover:scale-105 shadow-2xl";
                else if (cta.variant === "teal-outline") classes += "border-2 border-[var(--color-cyan)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:text-white backdrop-blur-md";
                else classes += "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10";
                
                if (index === 0) classes += " md:col-span-2";

                return <button key={index} className={classes}>{cta.label}</button>;
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
