"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";

const testimonials = [
  "FabMyHome completely transformed my living room in minutes. Truly magical! — Priya S.",
  "The AI-matching is scary accurate. It found the perfect curtains for my bedroom. — Rahul M.",
  "Minimal effort, maximum aesthetic. This is the future of interior design. — Ananya K.",
  "I saved weeks of hunting for the right furniture. Exceptional experience. — Vikram D.",
  "Finally, a tool that understands my style better than I do! — Sarah J.",
  "The 30-second promise is real. I had a full room concept in under a minute. — Deepa R.",
];

export default function Testimonials() {
  return (
    <section className="h-screen w-full bg-white flex flex-col justify-center overflow-hidden border-y border-black/5 relative">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-16 relative z-20 pt-12 md:pt-0">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-center text-black uppercase"
        >
          Testimonials
        </motion.h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-10 relative z-10">
        {/* Row 1: Right to Left */}
        <div className="marquee-container group">
          <div className="marquee-content py-6 group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((text, i) => (
              <TiltCard 
                key={`r1-${i}`}
                tiltLimit={35}
                scale={1.1}
                className="bg-white px-8 md:px-10 py-10 md:py-12 rounded-[32px] md:rounded-[40px] w-[85vw] md:w-[500px] flex-shrink-0 cursor-default shadow-xl shadow-black/5 border border-black/5"
              >
                <div className="relative z-20">
                  <p className="text-base md:text-xl font-medium text-black/80 leading-relaxed italic">
                    "{text.split(' — ')[0]}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black/30">
                    {text.split(' — ')[1]}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Faster Offset) */}
        <div className="marquee-container group">
          <div className="marquee-content py-6 group-hover:[animation-play-state:paused]" style={{ animationDuration: '35s' }}>
            {[...testimonials, ...testimonials].reverse().map((text, i) => (
              <TiltCard 
                key={`r2-${i}`}
                tiltLimit={35}
                scale={1.1}
                className="bg-white px-8 md:px-10 py-10 md:py-12 rounded-[32px] md:rounded-[40px] w-[85vw] md:w-[500px] flex-shrink-0 cursor-default shadow-xl shadow-black/5 border border-black/5"
              >
                <div className="relative z-20">
                  <p className="text-base md:text-xl font-medium text-black/80 leading-relaxed italic">
                    "{text.split(' — ')[0]}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black/30">
                    {text.split(' — ')[1]}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Brand Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[var(--color-terracotta)]/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
