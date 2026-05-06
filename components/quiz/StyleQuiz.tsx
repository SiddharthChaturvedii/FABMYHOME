"use client";

import { useQuizStore } from "@/store/quizStore";
import { quizOptions } from "@/data/quizOptions";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { siteContent } from "@/data/siteContent";

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
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const questions = [
    { title: "Which room are we styling?", options: quizOptions.rooms },
    { title: "What colors feel like home?", options: quizOptions.colors },
    { title: "Which texture attracts you?", options: quizOptions.textures }
  ];

  const handleOptionSelect = (label: string) => {
    setSelectedOptions(prev => ({ ...prev, [currentStep]: label }));
    if (currentStep === 0) setRoom(label);
    if (currentStep === 1) setColor(label);
    if (currentStep === 2) setTexture(label);
    setTimeout(() => nextStep(), 500);
  };

  return (
    <section id="quiz" className="py-20 bg-white flex flex-col items-center px-6 overflow-hidden border-t border-black/5 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center mb-16 max-w-3xl flex flex-col items-center"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-midnight)] mb-4 font-medium italic">
          {headline}
        </h2>
        <p className="font-sans text-[var(--color-graphite)]/80 text-xl md:text-2xl font-light">
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

      <div className="min-h-[400px] w-full max-w-7xl transition-all duration-500 mx-auto items-center flex flex-col relative px-4 md:px-0">
        {currentStep < 3 ? (
          <>
            <motion.h3 
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-black mb-12 text-center md:text-left w-full max-w-5xl"
            >
              {questions[currentStep].title}
            </motion.h3>

            <div className="w-full max-w-5xl">
              <div className={`grid md:gap-4 ${
                currentStep === 1 
                  ? "grid-cols-1 gap-1 max-w-4xl mx-auto" 
                  : "grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              }`}>
                {questions[currentStep].options.map((option, index) => (
                  <motion.div
                    key={option.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionSelect(option.label)}
                      ${selectedOptions[currentStep] === option.label 
                        ? 'border-black shadow-lg scale-[1.01]' 
                        : 'border-black/5 bg-white hover:border-black/20 hover:shadow-md'
                      }
                      flex items-center 
                      ${currentStep !== 1 
                        ? 'p-3 md:flex-col md:items-start md:p-0 md:h-[300px] lg:h-[400px] md:rounded-none' 
                        : 'p-1 h-11 md:p-2 md:h-16'
                      }
                    `}
                  >
                    <div className={`overflow-hidden shrink-0 transition-all duration-500
                      /* Mobile */
                      ${currentStep === 1 ? 'w-8 h-8' : 'w-10 h-10'}
                      /* Desktop */
                      ${currentStep !== 1 ? 'md:w-full md:h-2/3' : 'md:w-12 md:h-12 md:ml-2'}
                    `}>
                      {'image' in option ? (
                        <img 
                          src={option.image} 
                          alt={option.label} 
                          className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div 
                          className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundColor: (option as any).hex }}
                        />
                      )}
                    </div>
                    
                    <div className="flex flex-col justify-center h-full">
                      <span className={`font-sans text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] transition-colors
                        /* Mobile Label */
                        ml-6 
                        /* Desktop Label */
                        md:ml-0 ${currentStep !== 1 ? 'md:p-6' : 'md:ml-6'}
                        ${selectedOptions[currentStep] === option.label ? 'text-black font-bold' : 'text-black/80'}
                      `}>
                        {option.label}
                      </span>
                      {currentStep !== 1 && (
                        <span className="hidden md:block text-[10px] text-black/40 mt-2 font-medium tracking-widest group-hover:text-black/60 transition-colors uppercase md:px-6">
                          Select This Look
                        </span>
                      )}
                    </div>

                    {selectedOptions[currentStep] === option.label && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white"
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-2xl bg-white/40 backdrop-blur-md p-12 rounded-none shadow-xl border border-white/40"
          >
            <h3 className="font-display text-5xl text-[var(--color-midnight)] mb-6">
              Perfect.
            </h3>
            <p className="font-sans text-xl text-[var(--color-graphite)]/80 mb-10 leading-relaxed">
              We&apos;ve analyzed your selections. You lean towards a <span className="text-[var(--color-terracotta)] font-semibold">{selections.color}</span> palette with <span className="text-[var(--color-terracotta)] font-semibold">{selections.texture}</span> textures for your {selections.room}.
            </p>
            <button 
              onClick={resetQuiz}
              className="bg-transparent border border-[var(--color-graphite)]/20 text-[var(--color-graphite)] font-sans font-semibold uppercase tracking-[0.15em] px-8 py-3 rounded-none hover:bg-[var(--color-graphite)]/5 transition-all duration-300"
            >
              Retake Quiz
            </button>
          </motion.div>
        )}
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
