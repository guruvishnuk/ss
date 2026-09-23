import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Sparkles, Gift } from 'lucide-react';

// Images
const images = [
    "20241015_181346.jpg", "20250126_144306.jpg", "20250803_144932.jpg", "20260207_143855.jpg", 
    "20260207_152631.jpg", "20260207_152709.jpg", "20260301_204341.jpg", "20260418_191945.jpg", 
    "20260418_192131.jpg", "20260418_192136.jpg", "IMG-20230928-WA0009.jpg", "IMG-20240910-WA0002.jpg", 
    "IMG-20240928-WA0001 (1).jpg", "IMG-20240928-WA0005 (1).jpg", "IMG-20260221-WA0005.jpg", 
    "IMG-20260221-WA0021.jpg", "IMG-20260221-WA0023.jpg", "IMG-20260512-WA0063.jpg", "Snapchat-1795217538.jpg"
].map(name => `/src/assets/${name}`);

// Quotes
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
      }].slice(-25)); // Keep max 25 hearts to prevent lag
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
  const [slide, setSlide] = useState(-1);
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

  const startDate = new Date('2023-09-28');
  const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24));
  const currentBg = slide >= 0 && slide < images.length ? images[slide] : images[0];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0, scale: 0.95, filter: "blur(10px)" }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: (dir) => ({ zIndex: 0, x: dir < 0 ? 50 : -50, opacity: 0, scale: 1.05, filter: "blur(10px)" })
  };

  return (
    <div className="relative w-full h-dvh bg-gradient-to-br from-rose-950 via-rose-900 to-pink-950 overflow-hidden font-poppins text-zinc-800">
      
      {/* Immersive Valentine's Background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentBg}
          src={currentBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover blur-[50px] scale-125 saturate-150"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      {/* Floating Love Effects */}
      <ValentineEffects />

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
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
              >
                <Heart size={80} className="text-rose-400 drop-shadow-[0_0_30px_rgba(251,113,133,0.8)]" fill="currentColor" />
              </motion.div>
              
              <h3 className="font-playfair italic text-2xl md:text-3xl text-rose-200 mb-2 tracking-wide">
                A Valentine's surprise for
              </h3>
              <h1 className="font-dancing text-6xl md:text-8xl text-white mb-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                My Gouri <span className="text-rose-400">❤️</span>
              </h1>
              
              <button 
                onClick={nextSlide}
                className="group relative px-10 py-5 bg-rose-500/20 backdrop-blur-md border border-rose-300/50 rounded-full flex items-center gap-3 overflow-hidden transition-all hover:bg-rose-500/40 hover:scale-105 shadow-[0_0_30px_rgba(225,29,72,0.4)]"
              >
                <Sparkles size={24} className="text-rose-200" />
                <span className="font-semibold tracking-widest uppercase text-sm md:text-base text-rose-50">Open Our Story</span>
              </button>
            </motion.div>
          )}

          {/* SIDE-BY-SIDE MEMORY SLIDES */}
          {slide >= 0 && slide < images.length && (
            <motion.div
              key={`slide-${slide}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl h-full max-h-[85vh] md:max-h-[75vh] flex flex-col"
            >
              {/* Romantic Glass Card - Side by Side on Desktop */}
              <div className="flex-1 bg-white/95 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] p-3 sm:p-6 shadow-[0_20px_60px_rgba(225,29,72,0.3)] flex flex-col md:flex-row gap-4 md:gap-8 border border-white/80 relative overflow-hidden">
                
                {/* Left Side: Uncropped Image with Blurred Fill */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full rounded-2xl md:rounded-3xl overflow-hidden bg-rose-50 flex items-center justify-center group shadow-inner">
                  {/* Blurred Background to fill empty space seamlessly */}
                  <img src={images[slide]} className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-125 saturate-150" alt="" />
                  
                  {/* Perfect Uncropped Image */}
                  <img 
                    src={images[slide]} 
                    alt={`Memory ${slide + 1}`} 
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Romantic Glow Overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,228,230,0.5)] z-20 pointer-events-none rounded-2xl md:rounded-3xl" />
                </div>

                {/* Right Side: Typography & Quotes */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center text-center px-4 py-6 md:p-10 relative">
                  
                  {/* Decorative faint background heart */}
                  <Heart size={200} className="absolute text-rose-50 opacity-[0.03] rotate-12" fill="currentColor" />

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col items-center justify-center z-10"
                  >
                    <Heart size={28} className="text-rose-400 mb-6 animate-pulse" fill="#fb7185" />
                    
                    <p className="font-playfair italic text-2xl md:text-4xl text-rose-950 leading-snug mb-6 drop-shadow-sm">
                      "{quotes[slide].en}"
                    </p>
                    
                    <div className="w-12 h-[2px] bg-rose-300 rounded-full mb-6" />
                    
                    <p className="font-kannada text-base md:text-xl text-rose-800 font-medium tracking-wide leading-relaxed">
                      {quotes[slide].kn}
                    </p>
                  </motion.div>

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
              className="w-full max-w-xl text-center bg-white/10 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_0_50px_rgba(225,29,72,0.4)] text-white relative overflow-hidden"
            >
              <Heart size={64} className="mx-auto text-rose-400 mb-6 animate-pulse" fill="currentColor" />
              <h1 className="font-dancing text-6xl md:text-8xl mb-4 drop-shadow-lg text-rose-100">
                Happy Birthday, <br/> My Love
              </h1>
              
              <div className="inline-block bg-rose-950/40 rounded-3xl px-8 py-5 mb-8 border border-rose-300/30 shadow-inner mt-4">
                <p className="font-poppins text-xs md:text-sm uppercase tracking-widest text-rose-200 mb-2">Days loving you</p>
                <p className="font-playfair text-5xl md:text-6xl font-bold text-rose-50 drop-shadow-md">{diffDays}</p>
              </div>

              <p className="font-playfair italic text-xl md:text-2xl leading-relaxed text-rose-100/90 mb-10 px-2 md:px-8">
                "Thank you for every single beautiful memory we've made so far. You mean everything to me, and I can't wait to make a million more. I love you endlessly."
              </p>

              <button 
                onClick={() => { setDirection(-1); setSlide(-1); }}
                className="text-sm md:text-base font-semibold uppercase tracking-widest text-rose-200 hover:text-white transition-colors pb-1 border-b border-rose-400 hover:border-white"
              >
                Relive our memories
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <AnimatePresence>
        {slide >= 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center items-center gap-6 md:gap-10 z-20"
          >
            <button 
              onClick={prevSlide}
              className="p-4 md:p-5 rounded-full bg-rose-950/40 backdrop-blur-xl text-rose-100 hover:bg-rose-800/60 hover:text-white transition-all border border-rose-300/30 shadow-lg active:scale-95"
            >
              <ChevronLeft size={28} />
            </button>
            
            {/* Progress Dots */}
            <div className="flex gap-1.5 items-center">
              {slide < images.length ? (
                <span className="font-poppins text-sm md:text-base font-medium tracking-[0.2em] text-rose-200/90 uppercase bg-rose-950/40 px-6 py-2 rounded-full border border-rose-300/20 backdrop-blur-md">
                  {slide + 1} <span className="text-rose-400/50 mx-2">/</span> {images.length}
                </span>
              ) : (
                <span className="font-poppins text-sm md:text-base font-medium tracking-[0.2em] text-rose-200/90 uppercase bg-rose-950/40 px-6 py-2 rounded-full border border-rose-300/20 backdrop-blur-md">
                  Forever
                </span>
              )}
            </div>

            <button 
              onClick={nextSlide}
              className="p-4 md:p-5 rounded-full bg-rose-950/40 backdrop-blur-xl text-rose-100 hover:bg-rose-800/60 hover:text-white transition-all border border-rose-300/30 shadow-lg active:scale-95"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
