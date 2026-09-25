import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('intro'); // 'intro' only for now

  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -50, scale: 1.05 }
  };

  return (
    <div className="relative w-full h-dvh bg-gradient-to-br from-rose-950 via-rose-900 to-pink-950 overflow-hidden font-poppins text-zinc-800 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <main className="relative z-10 w-full max-w-4xl p-6 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: INTRO */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6">
                <Heart size={80} className="text-rose-400 drop-shadow-[0_0_30px_rgba(251,113,133,0.8)]" fill="currentColor" />
              </motion.div>
              <h1 className="font-dancing text-5xl md:text-7xl text-white mb-8 drop-shadow-lg leading-tight">
                ನನ್ನ ಹೃದಯ ಬಡಿತವೇ ನೀನು... <br/> <span className="text-3xl text-rose-300 font-playfair italic mt-4 block">(You are my heartbeat...)</span>
              </h1>
              <button 
                onClick={() => setStep('question')}
                className="px-8 py-4 bg-rose-500/20 backdrop-blur-md border border-rose-300/50 rounded-full flex items-center gap-3 hover:bg-rose-500/40 hover:scale-105 transition-all shadow-[0_0_30px_rgba(225,29,72,0.4)] text-rose-50 text-xl font-semibold uppercase tracking-widest"
              >
                <Gift size={24} className="text-rose-200" />
                Open My Heart
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
