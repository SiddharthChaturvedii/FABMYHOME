"use client";

import { useState } from "react";
import { siteContent } from "@/data/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const products = [
  {
    id: "curtain",
    name: "Beige Linen Curtain",
    suggestions: [
      { id: "c1", label: "Matching Cushions", delay: 0.1 },
      { id: "c2", label: "Complementary Upholstery", delay: 0.3 },
      { id: "c3", label: "Coordinated Bedding", delay: 0.5 },
      { id: "c4", label: "Wallpaper Suggestion", delay: 0.7 },
      { id: "c5", label: "Recommended Rug", delay: 0.9 },
    ]
  },
  {
    id: "sofa",
    name: "Velvet Emerald Sofa",
    suggestions: [
      { id: "s1", label: "Brass Floor Lamp", delay: 0.1 },
      { id: "s2", label: "Marble Coffee Table", delay: 0.3 },
      { id: "s3", label: "Textured Throw Blanket", delay: 0.5 },
      { id: "s4", label: "Geometric Area Rug", delay: 0.7 },
      { id: "s5", label: "Monochrome Wall Art", delay: 0.9 },
    ]
  },
  {
    id: "table",
    name: "Oak Dining Table",
    suggestions: [
      { id: "t1", label: "Upholstered Dining Chairs", delay: 0.1 },
      { id: "t2", label: "Linen Table Runner", delay: 0.3 },
      { id: "t3", label: "Ceramic Vase Set", delay: 0.5 },
      { id: "t4", label: "Pendant Lighting", delay: 0.7 },
      { id: "t5", label: "Woven Placemats", delay: 0.9 },
    ]
  }
];

export default function CompleteTheLook() {
  const { headline, subheadline } = siteContent.completeLook;
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleSelection = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const renderSuggestions = (suggestions: typeof products[0]["suggestions"]) => (
    <>
      {suggestions.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 30, transition: { delay: (suggestions.length - index) * 0.03, duration: 0.2 } }}
          transition={{ delay: item.delay * 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="bg-white px-6 py-3 shadow-xl shadow-black/5 flex items-center gap-4 rounded-full border border-white w-fit transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-terracotta)]/20 cursor-pointer group">
            <div className="w-2 h-2 rounded-full bg-[var(--color-terracotta)] transition-transform duration-300 group-hover:scale-150" />
            <span className="font-sans font-medium text-base text-[var(--color-midnight)] tracking-wide">{item.label}</span>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-6"
      >
        <button className="bg-[var(--color-midnight)] text-white font-sans font-bold uppercase tracking-[0.2em] px-8 py-4 text-xs rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-midnight)]/30 transition-all shadow-xl shadow-black/10">
          View Full Room Set
        </button>
      </motion.div>
    </>
  );

  return (
    <section className="pt-0 pb-48 bg-white relative overflow-visible">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-[var(--color-midnight)] mb-4">
            {headline}
          </h2>
          <p className="font-sans text-[var(--color-graphite)]/70 text-xl font-light mb-8 italic max-w-lg">
            {subheadline}
          </p>
          
          <div className="flex flex-col gap-4">
            {products.map((product, index) => {
              const isActive = activeId === product.id;
              const isLastItem = index === products.length - 1;
              
              return (
                <div key={product.id} className="relative w-full">
                  <div 
                    className={`bg-white/40 backdrop-blur-xl p-6 shadow-xl shadow-black/5 border rounded-[2rem] w-full max-w-lg transition-all duration-500 cursor-pointer relative z-10 ${
                      isActive ? "border-[var(--color-midnight)] shadow-2xl scale-[1.02] bg-white/70" : "border-white/20 hover:-translate-y-1 hover:shadow-black/10"
                    }`}
                    onClick={() => toggleSelection(product.id)}
                  >
                    <p className={`font-sans text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors ${isActive ? 'text-[var(--color-terracotta)] font-bold' : 'text-[var(--color-graphite)]/50'}`}>
                      {isActive ? "Active Selection" : "Select Item"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl text-[var(--color-midnight)]">{product.name}</span>
                      <button 
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ml-4 ${
                          isActive ? "bg-[var(--color-midnight)] text-white shadow-lg rotate-45" : "bg-[var(--color-terracotta)]/20 text-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)] hover:text-white hover:scale-110 hover:shadow-[var(--color-terracotta)]/30"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelection(product.id);
                        }}
                      >
                        <Plus size={20} className="transition-transform duration-500" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div 
                        key={`${product.id}-desktop`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute left-[100%] ml-8 lg:ml-16 w-max hidden lg:flex flex-col gap-4 z-0 pointer-events-auto ${
                          isLastItem ? "bottom-0" : "top-[15%] -translate-y-1/2"
                        }`}
                      >
                        {renderSuggestions(product.suggestions)}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div 
                        key={`${product.id}-mobile`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden flex flex-col gap-4 pt-6 pl-4 overflow-hidden"
                      >
                        {renderSuggestions(product.suggestions)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="hidden lg:flex absolute top-[-10%] right-[6%] w-1/3 h-full justify-center items-start pointer-events-none z-0 drop-shadow-2xl">
          <img 
            src="/pillar.png" 
            alt="Decorative Pillar" 
            className="object-contain h-full max-h-[950px] transform -translate-y-12"
          />
        </div>

        {/* The right column is now structurally empty on desktop, acting purely as reserved grid space for the absolute positioned lists */}
        <div className="hidden lg:block"></div>
      </div>
    </section>
  );
}
