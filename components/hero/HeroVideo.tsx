"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/uiStore";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { introStage } = useUIStore();
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Trigger video play on curtain lift
  useEffect(() => {
    if (introStage >= 1 && videoRef.current) {
      videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [introStage]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[var(--color-midnight)]">
      <video
        ref={videoRef}
        key={isLandscape ? "laptop" : "mobile"}
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-80"
        style={{ filter: "brightness(0.9) contrast(1.1)" }}
      >
        <source 
          src={isLandscape ? "/hero-laptop.mp4" : "/hero-mobile.mp4"} 
          type="video/mp4" 
        />
      </video>
      {/* Subtle overlay to help text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-midnight)]/40" />
    </div>
  );
}
