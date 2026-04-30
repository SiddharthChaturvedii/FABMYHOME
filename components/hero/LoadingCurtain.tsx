"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";

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
      setIntroStage(1); // Start Brand Animation
    }, 1200);
    const removeTimer = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(timer); clearTimeout(removeTimer); };
  }, [setIntroStage]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-midnight)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <h1
        className={`font-display text-4xl md:text-6xl font-bold text-[var(--color-alabaster)] tracking-tight transition-all duration-500 ${
          exiting ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        FABMYHOME
      </h1>
    </div>
  );
}
