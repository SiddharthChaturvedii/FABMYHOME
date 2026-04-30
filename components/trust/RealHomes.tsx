"use client";

import { realHomes } from "@/data/trustProjects";
import { siteContent } from "@/data/siteContent";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function RealHomes() {
  const { headline, subheadline } = siteContent.trust;

  return (
    <section className="py-24 bg-[var(--color-alabaster)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-midnight)] mb-8">
            {headline}
          </h2>
          <p className="font-sans text-[var(--color-graphite)]/70 text-2xl font-light italic leading-relaxed">
            {subheadline}
          </p>
        </motion.div>

        {/* Masonry Layout Mock (CSS Columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {realHomes.map((home, index) => (
            <motion.div
              key={home.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.05 
              }}
              className={`relative break-inside-avoid rounded-[2.5rem] overflow-hidden group bg-white shadow-xl shadow-black/5 ${home.height} hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 cursor-pointer`}
            >
              {/* Image */}
              <img 
                src={home.image} 
                alt={home.style}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[var(--color-midnight)]/10 group-hover:bg-transparent transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="flex items-center gap-2 text-white/80 font-sans text-xs uppercase tracking-[0.2em] mb-3 transition-transform duration-500 group-hover:-translate-y-2">
                  <MapPin size={16} className="text-[var(--color-terracotta)]" />
                  <span>{home.location}</span>
                </div>
                <h3 className="font-display text-3xl text-white leading-tight transition-transform duration-500 group-hover:-translate-y-2">{home.style}</h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
