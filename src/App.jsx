import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Sparkles, Gift } from 'lucide-react';

// Images from your assets
const images = [
    "20241015_181346.jpg", "20250126_144306.jpg", "20250803_144932.jpg", "20260207_143855.jpg", 
    "20260207_152631.jpg", "20260207_152709.jpg", "20260301_204341.jpg", "20260418_191945.jpg", 
    "20260418_192131.jpg", "20260418_192136.jpg", "IMG-20230928-WA0009.jpg", "IMG-20240910-WA0002.jpg", 
    "IMG-20240928-WA0001 (1).jpg", "IMG-20240928-WA0005 (1).jpg", "IMG-20260221-WA0005.jpg", 
    "IMG-20260221-WA0021.jpg", "IMG-20260221-WA0023.jpg", "IMG-20260512-WA0063.jpg", "Snapchat-1795217538.jpg"
].map(name => `/src/assets/${name}`); // Assuming dev server handles these

const quotes = [
    { en: "From the moment I saw you, my heart knew.", kn: "ನಾನು ನಿನ್ನನ್ನು ನೋಡಿದ ಕ್ಷಣದಿಂದ, ನನ್ನ ಹೃದಯಕ್ಕೆ ಗೊತ್ತಿತ್ತು." },
    { en: "Your smile is my favorite view in the whole world.", kn: "ನಿನ್ನ ನಗುವೇ ಈ ಪ್ರಪಂಚದಲ್ಲಿ ನನ್ನ ಅಚ್ಚುಮೆಚ್ಚಿನ ದೃಶ್ಯ." },
    { en: "Every adventure is magical when you are with me.", kn: "ನೀನು ಜೊತೆಯಲ್ಲಿದ್ದಾಗ ಪ್ರತಿಯೊಂದು ಪಯಣವೂ ಅದ್ಭುತ." },
    { en: "Lost in your eyes, where my forever begins.", kn: "ನಿನ್ನ ಕಣ್ಣುಗಳಲ್ಲಿ ಕಳೆದುಹೋಗಿರುವೆ, ಅಲ್ಲಿಂದಲೇ ನನ್ನ ಶಾಶ್ವತ ಶುರು." },
    { en: "Your laugh is the sweetest melody to my ears.", kn: "ನಿನ್ನ ನಗು ನನ್ನ ಕಿವಿಗೆ ಅತ್ಯಂತ ಸಿಹಿಯಾದ ಸಂಗೀತ." },
    { en: "Holding you feels like holding my entire world.", kn: "ನಿನ್ನನ್ನು ಅಪ್ಪಿಕೊಂಡಾಗ ಇಡೀ ಪ್ರಪಂಚವೇ ನನ್ನ ಕೈಯಲ್ಲಿದ್ದಂತೆ ಭಾಸವಾಗುತ್ತದೆ." },
    { en: "You make ordinary moments feel extraordinary.", kn: "ಸಾಮಾನ್ಯ ಕ್ಷಣಗಳನ್ನು ನೀನು ಅಸಾಮಾನ್ಯವಾಗಿಸುತ್ತೀಯ." },
    { en: "I still get butterflies every time I see you.", kn: "ನಿನ್ನನ್ನು ನೋಡಿದಾಗಲೆಲ್ಲಾ ನನ್ನೊಳಗೆ ಇಂದಿಗೂ ಅದೇ ರೋಮಾಂಚನ." },
    { en: "You are my peace, my home, and my everything.", kn: "ನೀನೇ ನನ್ನ ನೆಮ್ಮದಿ, ನನ್ನ ಮನೆ ಮತ್ತು ನನ್ನೆಲ್ಲವೂ." },
    { en: "Every memory with you is a treasure I hold dear.", kn: "ನಿನ್ನೊಂದಿಗಿನ ಪ್ರತಿಯೊಂದು ನೆನಪೂ ನನಗೆ ಅಮೂಲ್ಯವಾದ ಸಂಪತ್ತು." },
    { en: "Falling deeper in love with you every single day.", kn: "ಪ್ರತಿದಿನ ನಿನ್ನ ಮೇಲೆ ಪ್ರೀತಿ ಇನ್ನಷ್ಟು ಹೆಚ್ಚಾಗುತ್ತಿದೆ." },
    { en: "A beautiful moment frozen in time, just for us.", kn: "ನಮಗಾಗಿ ಕಾಲವೇ ನಿಂತಂತಹ ಒಂದು ಸುಂದರ ಕ್ಷಣ." },
    { en: "No matter where we are, together is my favorite place.", kn: "ನಾವು ಎಲ್ಲೇ ಇದ್ದರೂ, ನಿನ್ನ ಜೊತೆಯಲ್ಲಿರುವುದೇ ನನ್ನ ಅಚ್ಚುಮೆಚ್ಚಿನ ಜಾಗ." },
    { en: "You are the missing piece to my soul.", kn: "ನನ್ನ ಆತ್ಮಕ್ಕೆ ನೀನೇ ಆ ಕೊರತೆಯಾಗಿದ್ದ ತುಣುಕು." },
    { en: "My heart belongs completely and entirely to you.", kn: "ನನ್ನ ಹೃದಯ ಸಂಪೂರ್ಣವಾಗಿ ನಿನಗೆ ಮಾತ್ರ ಸೇರಿದೆ." },
    { en: "Through every joy and laugh, I love you more.", kn: "ಪ್ರತಿ ಸಂತೋಷ ಮತ್ತು ನಗುವಿನಲ್ಲೂ, ನಾನು ನಿನ್ನನ್ನು ಹೆಚ್ಚು ಪ್ರೀತಿಸುತ್ತೇನೆ." },
    { en: "You are my today and all of my tomorrows.", kn: "ನೀನೇ ನನ್ನ ಇವತ್ತು ಮತ್ತು ನನ್ನೆಲ್ಲಾ ನಾಳೆಗಳು." },
    { en: "Life is just a beautiful dream when you're by my side.", kn: "ನೀನು ನನ್ನ ಪಕ್ಕದಲ್ಲಿದ್ದಾಗ ಜೀವನವು ಒಂದು ಸುಂದರ ಕನಸಾಗುತ್ತದೆ." },
    { en: "To endless more memories together. Happy Birthday!", kn: "ಇದೇ ರೀತಿ ಇನ್ನಷ್ಟು ನೆನಪುಗಳು ಜೊತೆಯಾಗಲಿ. ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು!" }
];

export default function App() {
  const [slide, setSlide] = useState(-1); // -1 is Intro, 0-18 are Photos, 19 is Finale
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    if (slide < images.length) {
      setDirection(1);
      setSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    if (slide > -1) {
      setDirection(-1);
      setSlide(s => s - 1);
    }
  };

  // Calculate Days Together
  const startDate = new Date('2023-09-28');
  const today = new Date();
  const diffDays = Math.ceil(Math.abs(today - startDate) / (1000 * 60 * 60 * 24));

  // Determine Background Image
  const currentBg = slide >= 0 && slide < images.length ? images[slide] : images[0];

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      scale: 1.05,
      filter: "blur(8px)"
    })
  };

  return (
    <div className="relative w-full h-dvh bg-zinc-900 overflow-hidden font-poppins text-zinc-800">
      
      {/* Dynamic Blurred Background for Professional Immersive Vibe */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentBg}
          src={currentBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40 animate-float-slow"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + 'vw',
              top: Math.random() * 100 + 'vh',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8">
        <AnimatePresence custom={direction} mode="wait">
          
          {/* INTRO SLIDE */}
          {slide === -1 && (
            <motion.div
              key="intro"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center text-white"
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
              >
                <Gift size={64} className="text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]" />
              </motion.div>
              
              <h3 className="font-playfair italic text-2xl md:text-3xl text-zinc-300 mb-2 tracking-wide">
                A surprise for
              </h3>
              <h1 className="font-dancing text-6xl md:text-8xl text-white mb-12 drop-shadow-lg">
                Shruti <span className="text-rose-400">❤️</span>
              </h1>
              
              <button 
                onClick={nextSlide}
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-3 overflow-hidden transition-all hover:bg-white/20 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles size={20} className="text-rose-300" />
                <span className="font-medium tracking-wider uppercase text-sm">Open Digital Album</span>
              </button>
            </motion.div>
          )}

          {/* MEMORY SLIDES */}
          {slide >= 0 && slide < images.length && (
            <motion.div
              key={`slide-${slide}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg h-full max-h-[85vh] flex flex-col"
            >
              {/* Professional Glass Card */}
              <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 shadow-2xl flex flex-col gap-6 border border-white/50 relative overflow-hidden">
                
                {/* Image Container */}
                <div className="relative w-full flex-1 rounded-2xl overflow-hidden shadow-inner bg-zinc-100">
                  <img 
                    src={images[slide]} 
                    alt={`Memory ${slide + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Subtle vignette on image */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none" />
                </div>

                {/* Typography Block */}
                <div className="flex flex-col items-center justify-center text-center px-2 pb-2">
                  <Heart size={20} className="text-rose-400 mb-4 opacity-50" fill="currentColor" />
                  <p className="font-playfair italic text-xl md:text-2xl text-zinc-800 leading-snug mb-3">
                    "{quotes[slide].en}"
                  </p>
                  <p className="font-kannada text-sm md:text-base text-zinc-500 font-medium tracking-wide">
                    {quotes[slide].kn}
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {/* FINALE SLIDE */}
          {slide === images.length && (
            <motion.div
              key="finale"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl text-center bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl text-white"
            >
              <Heart size={48} className="mx-auto text-rose-400 mb-6 animate-pulse-soft" fill="currentColor" />
              <h1 className="font-dancing text-5xl md:text-7xl mb-4 drop-shadow-md">
                Happy Birthday, <br/> My Gouri
              </h1>
              
              <div className="inline-block bg-white/10 rounded-2xl px-6 py-4 mb-8 border border-white/10">
                <p className="font-poppins text-sm uppercase tracking-widest text-zinc-300 mb-1">Days since our story began</p>
                <p className="font-playfair text-4xl md:text-5xl font-semibold text-rose-300">{diffDays}</p>
              </div>

              <p className="font-playfair italic text-xl md:text-2xl leading-relaxed text-zinc-200 mb-8 px-4">
                "Thank you for every single beautiful memory we've made so far. You mean everything to me, and I can't wait to make a million more. I love you endlessly."
              </p>

              <button 
                onClick={() => { setDirection(-1); setSlide(-1); }}
                className="text-sm font-medium uppercase tracking-widest text-zinc-300 hover:text-white transition-colors pb-1 border-b border-zinc-500 hover:border-white"
              >
                Relive our memories
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Navigation Controls (Visible during Story) */}
      <AnimatePresence>
        {slide >= 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8 z-20"
          >
            <button 
              onClick={prevSlide}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20 active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Progress Dots */}
            <div className="flex gap-1.5 items-center">
              {slide < images.length ? (
                <span className="font-poppins text-xs font-medium tracking-widest text-white/70 uppercase">
                  {slide + 1} / {images.length}
                </span>
              ) : (
                <span className="font-poppins text-xs font-medium tracking-widest text-white/70 uppercase">
                  Forever
                </span>
              )}
            </div>

            <button 
              onClick={nextSlide}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20 active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
