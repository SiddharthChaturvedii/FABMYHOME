"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/uiStore";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { introStage, setIntroStage } = useUIStore();
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Control video playback based on introStage
  useEffect(() => {
    if (videoRef.current) {
      if (introStage >= 1) {
        // Play only after the curtain rises
        videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
      } else {
        // Make sure it's paused and at the beginning while the curtain is down
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [introStage, isLandscape]);

  const revealCopy = () => {
    if (introStage < 2) {
      setIntroStage(2);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      // Pause right before the end to prevent the iOS play button from appearing
      if (videoRef.current.currentTime > 0 && videoRef.current.currentTime >= videoRef.current.duration - 0.1) {
        videoRef.current.pause();
        revealCopy();
      }
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black pointer-events-none">
      <video
        ref={videoRef}
        key={isLandscape ? "laptop" : "mobile"}
        muted
        loop={false}
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        onTimeUpdate={handleTimeUpdate}
        onEnded={revealCopy}
        className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-1000 ${
          introStage >= 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "opacity" }}
      >
        <source 
          src={isLandscape ? "/new laptop video.mp4" : "/new phone tablet video.mp4"} 
          type="video/mp4" 
        />
      </video>
      
      {/* Subtle overlay only at the very bottom for CTA contrast */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
