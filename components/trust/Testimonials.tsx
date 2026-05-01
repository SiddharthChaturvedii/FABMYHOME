"use client";

import { motion } from "framer-motion";

const testimonials = [
  "FabMyHome completely transformed my living room in minutes. Truly magical! — Priya S.",
  "The AI-matching is scary accurate. It found the perfect curtains for my bedroom. — Rahul M.",
  "Minimal effort, maximum aesthetic. This is the future of interior design. — Ananya K.",
  "I saved weeks of hunting for the right furniture. Exceptional experience. — Vikram D.",
  "Finally, a tool that understands my style better than I do! — Sarah J.",
  "The 30-second promise is real. I had a full room concept in under a minute. — Deepa R.",
  "Premium quality, premium tech. Highly recommended for busy homeowners. — Arjun P.",
  "This is basically a personal interior designer in your pocket. — Meera V.",
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-black overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-center">
          Testimonies
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1: Right to Left */}
        <div className="marquee-container">
          <div className="marquee-content">
            {[...testimonials, ...testimonials].map((text, i) => (
              <div 
                key={i} 
                className="glass px-10 py-6 rounded-2xl text-xl font-medium text-white/90"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Faster) */}
        <div className="marquee-container">
          <div className="marquee-content" style={{ animationDuration: '30s' }}>
            {[...testimonials, ...testimonials].map((text, i) => (
              <div 
                key={i} 
                className="glass px-10 py-6 rounded-2xl text-xl font-medium text-white/90"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Right to Left (Slower) */}
        <div className="marquee-container">
          <div className="marquee-content" style={{ animationDuration: '50s' }}>
            {[...testimonials, ...testimonials].map((text, i) => (
              <div 
                key={i} 
                className="glass px-10 py-6 rounded-2xl text-xl font-medium text-white/90"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
