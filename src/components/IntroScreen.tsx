import { motion } from 'framer-motion';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg w-full min-h-[500px]">
      
      {/* The closed Album Cover */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
        className="album-cover w-72 h-[420px] md:w-80 md:h-[480px] relative flex flex-col items-center justify-center cursor-pointer group"
        onClick={onStart}
      >
        <div className="album-spine" />
        <div className="stitched-edge" />

        {/* The label in the center */}
        <motion.div 
          className="bg-paper py-5 px-8 shadow-md border border-black/10 -rotate-3 relative ml-6 group-hover:rotate-0 transition-transform duration-500"
        >
          {/* Tape holding the label */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-7 tape-clear rotate-4 shadow-sm" />
          
          <span className="block mb-2 text-red-ink font-marker text-xl -rotate-2">
              To my favorite person
          </span>
          <h1 className="text-4xl md:text-5xl font-handwriting font-bold text-ink leading-tight mt-2">
            Open The <br/> Album
          </h1>
        </motion.div>

        {/* A tiny handwritten hint */}
        <p className="absolute bottom-8 right-6 font-marker text-paper/80 text-xl -rotate-6 group-hover:scale-110 transition-transform">
          (Tap anywhere)
        </p>

      </motion.div>
    </div>
  );
};
