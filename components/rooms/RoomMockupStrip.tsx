"use client";

import { useState } from "react";
import { presetRooms } from "@/data/rooms";
import { siteContent } from "@/data/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RoomMockupStrip() {
  const { headline, subheadline } = siteContent.rooms;
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % presetRooms.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + presetRooms.length) % presetRooms.length);
  };

  return (
    <section className="py-24 bg-[#eef7f7] overflow-hidden border-t border-black/5 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center relative z-10"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-[#124444] mb-8">
          {headline}
        </h2>
        <p className="font-sans text-[#124444]/60 text-2xl font-light max-w-3xl mx-auto italic">
          {subheadline}
        </p>
      </motion.div>

      {/* Floating Navigation Buttons - Centered Vertically on Carousel */}
      <div className="absolute inset-x-0 top-[65%] -translate-y-1/2 flex justify-between px-4 md:px-12 pointer-events-none z-40">
        <button 
          onClick={prev}
          className="w-14 h-14 md:w-20 md:h-20 bg-white/20 hover:bg-white backdrop-blur-3xl border border-white/30 text-[#124444] shadow-2xl flex items-center justify-center transition-all duration-500 group pointer-events-auto active:scale-95"
        >
          <ChevronLeft size={32} className="transition-transform group-hover:-translate-x-1" />
        </button>
        <button 
          onClick={next}
          className="w-14 h-14 md:w-20 md:h-20 bg-white/20 hover:bg-white backdrop-blur-3xl border border-white/30 text-[#124444] shadow-2xl flex items-center justify-center transition-all duration-500 group pointer-events-auto active:scale-95"
        >
          <ChevronRight size={32} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Center-Anchored Carousel Container */}
      <div className="relative h-[65vh] md:h-[75vh] w-full flex items-center justify-center">
        <motion.div 
          className="flex items-center gap-6 md:gap-12 px-[10vw]"
          animate={{ 
            x: `calc((${activeIndex} * -38vw) + (0vw))` 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 70, 
            damping: 15,
            mass: 0.8
          }}
        >
          {presetRooms.map((room, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div 
                key={room.id}
                animate={{ 
                  scale: isActive ? 1.05 : 0.85,
                  opacity: isActive ? 1 : 0.4,
                  rotateY: isActive ? 0 : index < activeIndex ? 15 : -15,
                  z: isActive ? 100 : 0
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex-none w-[75vw] md:w-[65vw] lg:w-[35vw] h-[55vh] md:h-[70vh] group rounded-[3rem] overflow-hidden bg-[var(--color-graphite)] shadow-2xl transition-all duration-700 ${
                  isActive ? "shadow-black/20" : "shadow-black/5"
                }`}
              >
                {/* Image */}
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
                  style={{ backgroundColor: room.color }}
                />
                
                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Content */}
                <div className={`absolute bottom-0 left-0 right-0 p-10 md:p-14 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <h3 className="font-display text-3xl md:text-5xl text-white mb-8 leading-tight">
                    {room.name}
                  </h3>
                  
                  <button className="bg-white/20 hover:bg-[var(--color-terracotta)] backdrop-blur-xl text-white font-sans font-bold uppercase tracking-[0.2em] px-10 py-5 text-xs rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg">
                    Shop This Look
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Background decoration to anchor the center */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80vh] bg-gradient-to-r from-[#eef7f7] via-transparent to-[#eef7f7] pointer-events-none z-20" />
    </section>
  );
}
