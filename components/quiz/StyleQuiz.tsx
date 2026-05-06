"use client";

import { useQuizStore } from "@/store/quizStore";
import { quizOptions } from "@/data/quizOptions";
import { siteContent } from "@/data/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import QuizModel from "./QuizModel";

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
            className="flex flex-col gap-1.5 w-full items-start"
          >
            {quizOptions.rooms.map((room) => (
              <motion.button
                key={room.id}
                variants={itemVariants}
                onClick={() => { setRoom(room.id); nextStep(); }}
                className={`relative group transition-all duration-300 border border-black/5 hover:bg-white hover:shadow-lg ${
                  selections.room === room.id ? "bg-white border-[var(--color-terracotta)] ring-1 ring-[var(--color-terracotta)]" : "bg-white/50"
                } flex flex-row items-center gap-4 py-1 px-2 overflow-hidden w-full max-w-2xl`}
              >
                <div className="w-14 h-14 md:w-20 md:h-14 shrink-0 relative overflow-hidden rounded-none border border-black/5">
                  <img 
                    src={room.image} 
                    alt={room.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <h3 className="text-[var(--color-midnight)] font-sans text-sm md:text-base font-bold tracking-tight leading-none uppercase">
                    {room.label}
                  </h3>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                  <span className="text-[var(--color-terracotta)] text-lg">→</span>
                </div>
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
            className="flex flex-col gap-1.5 w-full items-start"
          >
            {quizOptions.colors.map((color) => (
              <motion.button
                key={color.id}
                variants={itemVariants}
                onClick={() => { setColor(color.id); nextStep(); }}
                className={`flex items-center gap-4 py-1 px-2 group transition-all duration-300 border border-black/5 hover:bg-white hover:shadow-lg w-full max-w-2xl ${selections.color === color.id ? "bg-white border-[var(--color-terracotta)] ring-1 ring-[var(--color-terracotta)]" : "bg-white/50"}`}
              >
                <div 
                  className={`w-8 h-8 md:w-10 md:h-8 rounded-none shadow-inner transition-all duration-500 shrink-0 ${selections.color === color.id ? "ring-2 ring-offset-1 ring-[var(--color-terracotta)]" : ""}`}
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex flex-col items-start text-left">
                  <span className="font-sans text-[var(--color-midnight)] font-bold text-sm uppercase tracking-widest leading-none">{color.label}</span>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                  <span className="text-[var(--color-terracotta)] text-lg">→</span>
                </div>
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
            className="flex flex-col gap-1.5 w-full items-start"
          >
            {quizOptions.textures.map((texture) => (
              <motion.button
                key={texture.id}
                variants={itemVariants}
                onClick={() => { setTexture(texture.id); nextStep(); }}
                className={`flex items-center gap-4 py-1 px-2 group transition-all duration-300 border border-black/5 hover:bg-white hover:shadow-lg w-full max-w-2xl ${selections.texture === texture.id ? "bg-white border-[var(--color-terracotta)] ring-1 ring-[var(--color-terracotta)]" : "bg-white/50"}`}
              >
                <div className="w-12 h-12 md:w-16 md:h-12 rounded-none overflow-hidden shrink-0 border border-black/5">
                  <img 
                    src={texture.image} 
                    alt={texture.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="font-sans text-[var(--color-midnight)] font-bold text-sm uppercase tracking-widest leading-none">
                    {texture.label}
                  </span>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                  <span className="text-[var(--color-terracotta)] text-lg">→</span>
                </div>
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
              <button className="bg-[var(--color-midnight)] text-white font-sans font-semibold uppercase tracking-[0.15em] px-8 py-3 rounded-none hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-midnight)]/30 transition-all duration-300">
                View Your Curated Room
              </button>
              <button 
                onClick={resetQuiz}
                className="bg-transparent border border-[var(--color-graphite)]/20 text-[var(--color-graphite)] font-sans font-semibold uppercase tracking-[0.15em] px-8 py-3 rounded-none hover:bg-[var(--color-graphite)]/5 transition-all duration-300"
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
    <section id="quiz" className="py-20 bg-white flex flex-col items-center px-6 overflow-hidden border-t border-black/5 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center mb-8 max-w-3xl flex flex-col items-center"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-midnight)] mb-4 font-medium italic">
          {headline}
        </h2>
        <p className="font-sans text-[var(--color-graphite)]/80 text-xl md:text-2xl font-light">
          {subheadline}
        </p>
      </motion.div>

      {/* Final AI Guidance Placement - Directly Above Options */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 z-20"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="px-4 py-1.5 rounded-full bg-[var(--color-midnight)]/5 border border-[var(--color-terracotta)]/30 backdrop-blur-sm shadow-sm"
        >
          <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-terracotta)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)] animate-pulse" />
            ✨ Select an option below to start your AI journey
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </span>
        </motion.div>
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

      <div className="min-h-[400px] w-full max-w-5xl transition-all duration-500 md:ml-auto md:mr-40 lg:mr-64 min-[760px]:items-start items-start flex flex-col relative">
        <motion.h3 
          key={currentStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-sans text-2xl md:text-3xl text-[var(--color-graphite)] mb-12 md:mb-16 font-light tracking-wide italic text-left w-full"
        >
          {stepTitles[currentStep]}
        </motion.h3>

        <div className="w-full flex flex-col md:flex-row items-center justify-start gap-12 lg:gap-24">
          <div className="w-full md:w-auto flex justify-start z-10">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* 3D Model - Laptop Accessory (Pillar-like styling, tucked in corner) */}
      {currentStep < 3 && (
        <div className="hidden lg:flex absolute bottom-[20px] right-[-50px] lg:right-[-80px] w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] justify-center items-center pointer-events-none z-0 drop-shadow-2xl">
          <QuizModel />
        </div>
      )}

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
