import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Sparkles, Music } from 'lucide-react';

// Dynamically import all images from assets
const imageModules = import.meta.glob('./assets/*.{jpg,jpeg,png,JPG}', { eager: true });
const images = Object.values(imageModules).map(mod => mod.default);

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generateHeart = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const left = Math.random() * 100;
      const size = Math.random() * 20 + 10;
      const duration = Math.random() * 5 + 5;

      setHearts(prev => [...prev, { id, left, size, duration }]);

      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== id));
      }, duration * 1000);
    };

    const interval = setInterval(generateHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: '100vh', x: `${heart.left}vw`, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              y: '-10vh', 
              x: `${heart.left + (Math.random() * 10 - 5)}vw`,
              scale: heart.size / 15
            }}
            transition={{ duration: heart.duration, ease: 'linear' }}
            className="absolute text-rose-500/30 drop-shadow-sm"
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-100 font-poppins text-gray-800 selection:bg-rose-300 selection:text-white">
      <FloatingHearts />
      
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center w-full max-w-3xl flex flex-col items-center mb-24"
        >
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-rose-500 mb-6"
          >
            <Heart size={64} fill="currentColor" className="drop-shadow-lg" />
          </motion.div>

          <h1 className="font-dancing text-6xl md:text-8xl font-bold text-rose-600 mb-4 drop-shadow-md tracking-wide">
            Happy Birthday, <span className="text-rose-500">Shruti</span>
          </h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-3xl text-rose-400 font-medium italic mb-12"
          >
            To my lovely Gouri ❤️
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10"
          >
            Every moment with you feels like a beautiful dream. On your special day, I wanted to create a little space just for us, filled with all the love and memories we've shared.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowGallery(true);
              setTimeout(() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }, 100);
            }}
            className="bg-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center gap-3 hover:bg-rose-600 transition-colors"
          >
            <Sparkles size={24} />
            Unveil Your Surprise
          </motion.button>
        </motion.div>

        {/* Gallery Section */}
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <div className="text-center mb-16">
              <h2 className="font-dancing text-5xl md:text-7xl text-rose-500 mb-4">Our Beautiful Moments</h2>
              <p className="text-gray-500">A million feelings in these pictures.</p>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index % 3 * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
                  className="relative group break-inside-avoid rounded-2xl overflow-hidden shadow-xl bg-white p-2 pb-6 transform transition-transform"
                >
                  <div className="overflow-hidden rounded-xl bg-rose-50">
                    <img 
                      src={src} 
                      alt={`Memory ${index + 1}`} 
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute bottom-1 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="text-rose-400" size={16} fill="currentColor" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Love Letter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-32 max-w-2xl mx-auto bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-2xl relative border border-rose-100"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-400 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                <Heart fill="white" className="text-white" size={32} />
              </div>
              
              <h3 className="font-dancing text-4xl text-rose-600 text-center mb-8 mt-4">My Dearest Gouri,</h3>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-poppins">
                <p>
                  Happy Birthday to the most amazing girl in the world! You light up my life in ways I never knew were possible.
                </p>
                <p>
                  Every time I look at you, I fall in love all over again. Your smile is my favorite view, and your happiness is my biggest priority. I hope this little surprise brings a smile to your face today.
                </p>
                <p>
                  Here's to celebrating you today, and loving you every single day.
                </p>
                <p className="text-right font-dancing text-3xl text-rose-500 pt-6">
                  Forever Yours ❤️
                </p>
              </div>
            </motion.div>
            
          </motion.div>
        )}
      </main>
      
      {/* Footer Music Note */}
      <div className="fixed bottom-4 left-4 z-50 text-rose-400 flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm border border-rose-100 shadow-sm animate-pulse-slow">
        <Stars size={16} />
        <span>Made with lots of love</span>
      </div>
    </div>
  );
}
