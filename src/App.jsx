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

          {/* STEP 2: QUESTION */}
          {step === 'question' && (
            <motion.div
              key="question"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_0_50px_rgba(225,29,72,0.3)] flex flex-col items-center w-full max-w-2xl"
            >
              <h2 className="font-kannada text-3xl md:text-4xl text-rose-50 font-bold mb-4 leading-relaxed">
                ನೀನು ನನ್ನ ಜೀವನಕ್ಕೆ ಎಷ್ಟು ಮುಖ್ಯ ಗೊತ್ತಾ?
              </h2>
              <p className="font-playfair italic text-xl text-rose-200 mb-10">
                (Do you know how important you are to my life?)
              </p>

              <div className="flex flex-col gap-4 w-full">
                {[
                  { kn: "ನನಗೆ ಗೊತ್ತು", en: "I know" },
                  { kn: "ಹೇಳು ಕೇಳೋಣ", en: "Tell me, let's hear it" },
                  { kn: "ನೀನೇ ನನ್ನ ಸರ್ವಸ್ವ", en: "You are my everything" }
                ].map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => setStep('reveal')}
                    className="w-full py-4 px-6 bg-rose-950/40 hover:bg-rose-800/60 border border-rose-300/30 rounded-2xl text-rose-50 text-lg md:text-xl font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-between items-center group"
                  >
                    <span>{opt.kn}</span>
                    <span className="text-rose-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">{opt.en}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
