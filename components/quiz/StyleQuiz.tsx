"use client";

import { useQuizStore } from "@/store/quizStore";
import { quizOptions } from "@/data/quizOptions";
import { siteContent } from "@/data/siteContent";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function StyleQuiz() {
  const { currentStep, selections, setRoom, setColor, setTexture, nextStep, prevStep, resetQuiz } = useQuizStore();
  const { headline, subheadline } = siteContent.quiz;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step-0"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
          >
            {quizOptions.rooms.map((room) => (
              <motion.button
                key={room.id}
                variants={itemVariants}
                onClick={() => { setRoom(room.id); nextStep(); }}
                className={`relative h-32 md:h-48 lg:h-80 rounded-none overflow-hidden group transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-midnight)]/20 hover:-translate-y-2 ${
                  selections.room === room.id ? "ring-2 ring-[var(--color-terracotta)]" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[var(--color-midnight)]/10 group-hover:bg-[var(--color-midnight)]/30 transition-colors z-20" />
                <img 
                  src={room.image} 
                  alt={room.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-10"
                />
                <h3 className="absolute bottom-6 left-6 text-white font-display text-2xl md:text-3xl z-30 drop-shadow-lg font-bold italic tracking-tight">
                  {room.label}
                </h3>
              </motion.button>
            ))}
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="step-1"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl"
          >
            {quizOptions.colors.map((color) => (
              <motion.button
                key={color.id}
                variants={itemVariants}
                onClick={() => { setColor(color.id); nextStep(); }}
                className={`flex items-center gap-4 p-4 group transition-all duration-300 border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/5 ${selections.color === color.id ? "bg-white border-[var(--color-terracotta)]" : "bg-white/50"}`}
              >
                <div 
                  className={`w-12 h-12 rounded-none shadow-inner transition-all duration-500 ${selections.color === color.id ? "ring-2 ring-offset-2 ring-[var(--color-terracotta)]" : ""}`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-sans text-[var(--color-graphite)] font-bold text-sm md:text-base uppercase tracking-widest">{color.label}</span>
              </motion.button>
            ))}
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step-2"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
          >
            {quizOptions.textures.map((texture) => (
              <motion.button
                key={texture.id}
                variants={itemVariants}
                onClick={() => { setTexture(texture.id); nextStep(); }}
                className={`flex items-center gap-4 p-4 group transition-all duration-300 border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/5 ${selections.texture === texture.id ? "bg-white border-[var(--color-terracotta)]" : "bg-white/50"}`}
              >
                <div className="w-16 h-16 rounded-none overflow-hidden shrink-0 border border-black/5">
                  <img 
                    src={texture.image} 
                    alt={texture.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <span className="font-sans text-[var(--color-graphite)] font-bold text-sm md:text-base uppercase tracking-widest text-left leading-tight">
                  {texture.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center text-center max-w-2xl bg-white/40 backdrop-blur-md p-12 rounded-none shadow-xl border border-white/40"
          >
            <h3 className="font-display text-5xl text-[var(--color-midnight)] mb-6">
              Your Style Profile
            </h3>
            <p className="font-sans text-xl text-[var(--color-graphite)]/80 mb-10 leading-relaxed">
              We&apos;ve analyzed your selections. You lean towards a <span className="text-[var(--color-terracotta)] font-semibold">{selections.color}</span> palette with <span className="text-[var(--color-terracotta)] font-semibold">{selections.texture}</span> textures for your {selections.room}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[var(--color-midnight)] text-white font-sans font-semibold uppercase tracking-[0.15em] px-8 py-5 rounded-none hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-midnight)]/30 transition-all duration-300">
                View Your Curated Room
              </button>
              <button 
                onClick={resetQuiz}
                className="bg-transparent border border-[var(--color-graphite)]/20 text-[var(--color-graphite)] font-sans font-semibold uppercase tracking-[0.15em] px-8 py-5 rounded-none hover:bg-[var(--color-graphite)]/5 transition-all duration-300"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        );
    }
  };

  const stepTitles = ["Which room are we styling?", "What colors feel like home?", "Which texture attracts you?", "Perfect."];

  return (
    <section id="quiz" className="py-20 bg-[var(--color-alabaster)] flex flex-col items-center px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center mb-16 max-w-3xl"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-midnight)] mb-8 font-medium italic">
          {headline}
        </h2>
        <p className="font-sans text-[var(--color-graphite)]/80 text-2xl font-light">
          {subheadline}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex gap-4 mb-20"
      >
        {[0, 1, 2].map((step) => (
          <div 
            key={step} 
            className={`h-2 transition-all duration-700 rounded-full ${
              step <= currentStep ? "bg-[var(--color-midnight)] w-16" : "bg-[var(--color-graphite)]/10 w-10"
            }`}
          />
        ))}
      </motion.div>

      <motion.h3 
        key={currentStep}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-sans text-2xl md:text-3xl text-[var(--color-graphite)] mb-12 md:mb-16 font-light tracking-wide italic"
      >
        {stepTitles[currentStep]}
      </motion.h3>

      <div className="min-h-[400px] w-full flex justify-center">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {currentStep > 0 && currentStep < 3 && (
        <button 
          onClick={prevStep}
          className="mt-20 font-sans text-sm tracking-[0.2em] uppercase text-[var(--color-graphite)]/40 hover:text-[var(--color-midnight)] transition-colors border-b border-transparent hover:border-[var(--color-midnight)] pb-1"
        >
          ← Back
        </button>
      )}
    </section>
  );
}
