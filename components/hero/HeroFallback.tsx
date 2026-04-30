"use client";

import { useMemo } from "react";
import { siteContent } from "@/data/siteContent";

export default function HeroFallback() {
  const { headline, subheadline } = siteContent.hero;

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        key: i,
        width: Math.random() * 4 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 10 + 10,
      })),
    []
  );

  return (
    <div className="absolute inset-0 w-full h-full bg-[var(--color-midnight)] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-midnight)] to-[#001820] opacity-80" />
      
      {/* CSS Floating Particles (Fallback for 3D particles) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.key}
            className="absolute rounded-full bg-[var(--color-alabaster)] opacity-20"
            style={{
              width: p.width + "px",
              height: p.width + "px",
              top: p.top + "%",
              left: p.left + "%",
              animation: `float ${p.duration}s linear infinite`,
            }}
          />
        ))}
      </div>

    </div>
  );
}
