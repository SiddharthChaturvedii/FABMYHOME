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

    // Force play on mount/update
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }

    return () => window.removeEventListener("resize", checkOrientation);
  }, [isLandscape]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black pointer-events-none">
      <video
        ref={videoRef}
        key={isLandscape ? "laptop" : "mobile"}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={() => videoRef.current?.play()}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          introStage >= 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "opacity" }}
      >
        <source 
          src={isLandscape ? "/hero-laptop.mp4" : "/hero-mobile.mp4"} 
          type="video/mp4" 
        />
      </video>
      
      {/* Subtle overlay only at the very bottom for CTA contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
