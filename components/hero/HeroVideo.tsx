"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/uiStore";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { introStage } = useUIStore();
  const [isLandscape, setIsLandscape] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Force play on mount/update and reset video state
  useEffect(() => {
    setVideoEnded(false);
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }
  }, [isLandscape]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black pointer-events-none">
      {/* Background Image preloads and is always there. Uncovered when video ends. */}
      <img
        src={isLandscape ? "/laptop last frame.jpeg" : "/mobile last frame.jpeg"}
        alt="Hero Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          introStage >= 1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Video is removed from DOM when ended to prevent iOS play button overlay */}
      {!videoEnded && (
        <video
          ref={videoRef}
          key={isLandscape ? "laptop" : "mobile"}
          autoPlay
          muted
          loop={false}
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onEnded={() => setVideoEnded(true)}
          onLoadedMetadata={() => videoRef.current?.play()}
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
      )}
      
      {/* Subtle overlay only at the very bottom for CTA contrast */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
