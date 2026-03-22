import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block mb-6 text-white/50 tracking-[0.5em] font-light uppercase text-[9px] animate-pulse font-romantic">
            Personal digital archive
        </span>
        
        <h1 className="text-5xl md:text-7xl font-header font-bold mb-12 tracking-tighter text-white drop-shadow-xl uppercase">
          For You
        </h1>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 0, 127, 0.9)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-12 py-4 font-romantic text-white transition-all duration-500 bg-romantic-pink/40 rounded-sm focus:outline-none backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Animated Background Shine */}
          <motion.div 
            className="absolute inset-0 bg-white/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          
          <span className="relative flex items-center tracking-[0.3em] text-[10px] uppercase font-bold">
            Explore
            <Heart className="ml-4 w-3.5 h-3.5 fill-white group-hover:scale-125 transition-transform duration-500" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};
