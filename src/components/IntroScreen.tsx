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
        <span className="block mb-4 text-white/60 tracking-[0.2em] font-light uppercase text-xs animate-pulse">
            For you, always
        </span>
        
        <h1 className="text-3xl md:text-5xl font-light mb-8 tracking-wide text-white drop-shadow-sm font-serif italic">
          A heartfelt letter
        </h1>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 0, 127, 1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-10 py-3 font-light text-white transition-all duration-300 bg-romantic-pink/80 rounded-full focus:outline-none backdrop-blur-sm"
        >
          <span className="relative flex items-center tracking-widest text-sm uppercase">
            Begin the story
            <Heart className="ml-3 w-4 h-4 fill-white group-hover:scale-110 transition-transform duration-300" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};
