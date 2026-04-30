"use client";

import { useEffect, useRef } from "react";

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create floating dust particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / canvas.width - 0.5) * 2;
      mouseY = (e.clientY / canvas.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax gradient background
      const offsetX = mouseX * 15;
      const offsetY = mouseY * 15;

      const grad = ctx.createRadialGradient(
        canvas.width * 0.3 + offsetX, canvas.height * 0.4 + offsetY, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      grad.addColorStop(0, "rgba(0, 173, 181, 0.08)");
      grad.addColorStop(0.5, "rgba(0, 43, 54, 0.0)");
      grad.addColorStop(1, "rgba(0, 43, 54, 0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Warm accent glow
      const warmGrad = ctx.createRadialGradient(
        canvas.width * 0.7 + offsetX * -1, canvas.height * 0.6 + offsetY * -1, 0,
        canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.5
      );
      warmGrad.addColorStop(0, "rgba(230, 126, 34, 0.06)");
      warmGrad.addColorStop(1, "rgba(0, 43, 54, 0.0)");
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx + mouseX * 0.2;
        p.y += p.vy + mouseY * 0.2;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 230, 211, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[var(--color-midnight)]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
