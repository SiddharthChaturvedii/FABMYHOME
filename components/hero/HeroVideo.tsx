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

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[var(--color-midnight)]">
      <video
        ref={videoRef}
        key={isLandscape ? "laptop" : "mobile"}
        autoPlay // Required by browsers to allow playback
        muted    // Required by browsers to allow playback
        loop
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          introStage >= 1 ? "opacity-80" : "opacity-0"
        }`}
        style={{ filter: "brightness(0.9) contrast(1.1)" }}
      >
        <source 
          src={isLandscape ? "/hero-laptop.mp4" : "/hero-mobile.mp4"} 
          type="video/mp4" 
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-midnight)]/40" />
    </div>
  );
}
