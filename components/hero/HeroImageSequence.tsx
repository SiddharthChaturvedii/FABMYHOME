"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/uiStore";

const TOTAL_FRAMES = 192;

export default function HeroImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { introStage, setIntroStage } = useUIStore();
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const hasStartedPreload = useRef(false);

  // Preload images — runs exactly once
  useEffect(() => {
    if (hasStartedPreload.current) return;
    hasStartedPreload.current = true;

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/hero-frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES * 0.8) {
          setImagesPreloaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES * 0.8) {
          setImagesPreloaded(true);
        }
      };

      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Handle Canvas Resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-draw last drawn frame if resize happens
      const ctx = canvas.getContext("2d");
      const img = imagesRef.current[TOTAL_FRAMES - 1]; // Fallback to last frame
      if (ctx && img && img.complete && img.naturalWidth > 0 && introStage > 1) {
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [introStage]);

  // Play animation when introStage is 1
  useEffect(() => {
    // Only play if stage 1 AND images are ready
    if (introStage !== 1 || !imagesPreloaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentFrame = 0;
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const fpsInterval = 1000 / fps;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = time - lastTime;

      if (elapsed > fpsInterval) {
        lastTime = time - (elapsed % fpsInterval);

        const img = imagesRef.current[currentFrame];
        if (img && img.complete && img.naturalWidth > 0) {
          const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
          const newWidth = img.width * ratio;
          const newHeight = img.height * ratio;
          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        }

        currentFrame++;

        if (currentFrame >= TOTAL_FRAMES) {
          cancelAnimationFrame(animationFrameId);
          setIntroStage(2); // Move to Brand Animation
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [introStage, imagesPreloaded, setIntroStage]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 ${
          introStage >= 1 ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Dark overlay to ensure text remains readable */}
      <div 
        className={`absolute inset-0 bg-black/40 z-0 transition-opacity duration-2000 ${
          introStage >= 2 ? "opacity-100" : "opacity-0"
        }`} 
      />
    </>
  );
}
