import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Stars, Gift } from 'lucide-react';

// Temporary default image for testing
const defaultImage = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1920&q=80";

// Valentine's Floating Hearts Effect
const ValentineEffects = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generateHeart = () => {
      setHearts(prev => [...prev, {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 25 + 15,
        duration: Math.random() * 6 + 6
      }].slice(-25));
    };
    const interval = setInterval(generateHeart, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: '100vh', x: `${h.left}vw`, scale: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0], 
              y: '-10vh', 
              x: `${h.left + (Math.random() * 20 - 10)}vw`,
              rotate: [0, 45, -45, 0]
            }}
            transition={{ duration: h.duration, ease: "linear" }}
            className="absolute text-rose-500/60 drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]"
          >
            <Heart size={h.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState('intro'); // 'intro', 'question', 'reveal'

  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -50, scale: 1.05 }
  };

  return (
    <div className="relative w-full h-dvh bg-gradient-to-br from-rose-950 via-rose-900 to-pink-950 overflow-hidden font-poppins text-zinc-800 flex items-center justify-center">
      <ValentineEffects />
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

          {/* STEP 3: REVEAL */}
          {step === 'reveal' && (
            <motion.div
              key="reveal"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={{ duration: 1 }}
              className="w-full max-w-5xl bg-white/95 backdrop-blur-3xl rounded-[3rem] p-4 shadow-[0_20px_60px_rgba(225,29,72,0.4)] flex flex-col md:flex-row border border-rose-200 overflow-hidden"
            >
              <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden relative group shadow-inner bg-rose-50 flex items-center justify-center">
                <img src={defaultImage} className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-125 saturate-150" alt="" />
                <img 
                  src={defaultImage} 
                  className="relative z-10 w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" 
                  alt="My Love" 
                />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,228,230,0.5)] z-20 pointer-events-none rounded-2xl" />
              </div>

              <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-8 md:p-12 relative">
                <Heart size={200} className="absolute text-rose-50 opacity-10 rotate-12" fill="currentColor" />
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>
                  <Stars size={48} className="text-rose-400 mb-6 drop-shadow-md" />
                </motion.div>

                <h1 className="font-kannada text-2xl md:text-3xl text-rose-900 font-bold leading-relaxed mb-6 z-10 relative">
                  ನೀನು ಇಲ್ಲದೆ ನನ್ನ ಜೀವನ ಅಪೂರ್ಣ. ನೀನೇ ನನ್ನ ಪ್ರಪಂಚ! ಐ ಲವ್ ಯು ಚಿನ್ನ! ❤️
                </h1>
                
                <div className="w-16 h-[2px] bg-rose-300 rounded-full mb-6 z-10" />
                
                <p className="font-playfair italic text-xl md:text-2xl text-rose-700 leading-relaxed z-10 relative">
                  "My life is incomplete without you. You are my entire world. I love you!"
                </p>

                <button 
                  onClick={() => setStep('intro')}
                  className="mt-12 text-sm uppercase tracking-widest text-rose-400 font-semibold border-b border-rose-200 hover:text-rose-600 hover:border-rose-400 transition-colors z-10"
                >
                  Read Again
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
