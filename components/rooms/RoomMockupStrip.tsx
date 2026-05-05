"use client";

import { useRef } from "react";
import { presetRooms } from "@/data/rooms";
import { siteContent } from "@/data/siteContent";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RoomMockupStrip() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { headline, subheadline } = siteContent.rooms;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      
      // Calculate next position with boundary checks
      let scrollTo;
      if (direction === 'left') {
        scrollTo = Math.max(0, scrollLeft - clientWidth);
      } else {
        scrollTo = Math.min(scrollWidth - clientWidth, scrollLeft + clientWidth);
      }
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    show: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 20 
      } 
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-black/5">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-midnight)] mb-8">
          {headline}
        </h2>
        <p className="font-sans text-[var(--color-graphite)]/70 text-2xl font-light max-w-3xl mx-auto italic">
          {subheadline}
        </p>

        <div className="flex justify-center gap-4 mt-12">
          <button 
            onClick={() => scroll('left')}
            className="w-16 h-16 rounded-none bg-white border border-black shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group z-30"
          >
            <ChevronLeft size={28} className="transition-transform group-hover:-translate-x-1" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-16 h-16 rounded-none bg-white border border-black shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group z-30"
          >
            <ChevronRight size={28} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>

      {/* Horizontal Swipe Container */}
      <motion.div 
        ref={scrollContainerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px" }}
        className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-16 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {presetRooms.map((room) => (
          <motion.div 
            key={room.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="relative flex-none w-[90vw] md:w-[85vw] lg:w-[35vw] h-[60vh] md:h-[75vh] snap-center group rounded-[2.5rem] overflow-hidden bg-[var(--color-graphite)] shadow-2xl shadow-black/10 transition-all duration-700 hover:shadow-black/20"
          >
            {/* Image rendered underneath gradient */}
            <img 
              src={room.image} 
              alt={room.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundColor: room.color }}
            />
            
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14 transition-all duration-500 group-hover:pb-16">
              <h3 className="font-display text-3xl md:text-5xl text-white mb-8 leading-tight">
                {room.name}
              </h3>
              
              {/* Mandatory CTA: Shop This Entire Look */}
              <button className="bg-white/20 hover:bg-[var(--color-terracotta)] backdrop-blur-xl text-white font-sans font-bold uppercase tracking-[0.2em] px-10 py-5 text-xs rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg">
                Shop This Look
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
