import { TiltCard } from "@/components/ui/tilt-card";
import ScrollFloat from "@/components/ui/ScrollFloat";

const testimonials = [
  // ... (existing testimonials)
];

export default function Testimonials() {
  return (
    <section className="h-screen w-full bg-[#124444] flex flex-col justify-center overflow-hidden border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-20">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=20%'
          stagger={0.03}
          containerClassName="flex justify-center"
          textClassName="text-5xl md:text-8xl font-display font-black tracking-tighter text-center text-white uppercase"
        >
          Testimonials
        </ScrollFloat>
      </div>

      <div className="flex flex-col gap-10 relative z-10">
        {/* Row 1: Right to Left */}
        <div className="marquee-container group">
          <div className="marquee-content py-4 group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((text, i) => (
              <TiltCard 
                key={`r1-${i}`}
                tiltLimit={20}
                className="glass px-10 py-10 rounded-[32px] w-[450px] flex-shrink-0 cursor-default"
              >
                <div className="relative z-20">
                  <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed italic">
                    "{text.split(' — ')[0]}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[var(--color-terracotta)]" />
                    <span className="text-sm font-bold uppercase tracking-widest text-white/50">
                      {text.split(' — ')[1]}
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Faster Offset) */}
        <div className="marquee-container group">
          <div className="marquee-content py-4 group-hover:[animation-play-state:paused]" style={{ animationDuration: '35s' }}>
            {[...testimonials, ...testimonials].reverse().map((text, i) => (
              <TiltCard 
                key={`r2-${i}`}
                tiltLimit={20}
                className="glass px-10 py-10 rounded-[32px] w-[450px] flex-shrink-0 cursor-default"
              >
                <div className="relative z-20">
                  <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed italic">
                    "{text.split(' — ')[0]}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[var(--color-terracotta)]" />
                    <span className="text-sm font-bold uppercase tracking-widest text-white/50">
                      {text.split(' — ')[1]}
                    </span>
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
