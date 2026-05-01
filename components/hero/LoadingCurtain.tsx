"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingCurtain() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const { setIntroStage } = useUIStore();

  useEffect(() => {
    // Disable browser scroll restoration so reloads always start from the top
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      setExiting(true);
      // Let the curtain lift for 0.4s before we start the video/text logic
      setTimeout(() => {
        setIntroStage(1);
      }, 400);
      
      // Completely remove curtain after animation finishes
      setTimeout(() => {
        setVisible(false);
      }, 1600);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIntroStage]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ y: 0 }}
          animate={exiting ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[var(--color-midnight)] flex flex-col items-center justify-center pointer-events-none border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Brand Logo / Text that lifts with curtain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-6xl text-white tracking-[0.3em] font-bold mb-4">
              FABMYHOME
            </h1>
            <div className="h-[2px] w-24 bg-[var(--color-terracotta)] mx-auto" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
