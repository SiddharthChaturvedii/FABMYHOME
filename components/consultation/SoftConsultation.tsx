"use client";

import { siteContent } from "@/data/siteContent";
import { MessageCircle, Droplet, Home } from "lucide-react";
import { motion } from "framer-motion";

const consultationOptions = [
  {
    id: "whatsapp",
    title: "WhatsApp Design Help",
    description: "Chat directly with our luxury stylists. Share photos and get instant advice.",
    icon: MessageCircle,
    color: "bg-[var(--color-cyan)] text-[var(--color-midnight)]",
  },
  {
    id: "fabric",
    title: "Free Fabric Consultation",
    description: "Unsure about textures? We'll bring luxury swatches to your doorstep.",
    icon: Droplet,
    color: "bg-[var(--color-midnight)] text-white",
  },
  {
    id: "visit",
    title: "Book Home Visit",
    description: "Full room measurement and styling. ₹500 deposit (adjusted in final bill).",
    icon: Home,
    color: "bg-[var(--color-terracotta)] text-white",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function SoftConsultation() {
  const { headline, subheadline } = siteContent.consultation;

  return (
    <section className="py-24 bg-[var(--color-alabaster)] relative overflow-hidden" id="consultation">
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {consultationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div 
                variants={cardVariants}
                key={option.id}
                className={`group relative overflow-hidden rounded-[3rem] p-12 cursor-pointer transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-[var(--color-midnight)]/10 bg-white/50 backdrop-blur-md border border-white/40 hover:bg-white/80`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12 shadow-lg ${option.id === 'whatsapp' ? 'bg-[var(--color-terracotta)] text-white' : option.id === 'fabric' ? 'bg-[var(--color-midnight)] text-white' : 'bg-[var(--color-graphite)] text-white'}`}>
                  <Icon size={32} />
                </div>
                <h3 className="font-display text-3xl text-[var(--color-midnight)] mb-6 leading-tight">{option.title}</h3>
                <p className="font-sans text-xl text-[var(--color-graphite)]/70 mb-10 leading-relaxed font-light italic">
                  {option.description}
                </p>
                <button className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-[var(--color-midnight)] group-hover:text-[var(--color-terracotta)] transition-colors border-b border-transparent group-hover:border-[var(--color-terracotta)] pb-2">
                  Learn More
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
