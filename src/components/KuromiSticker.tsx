import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickerProps {
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'top-center';
  image: string;
  messages: string[];
}

export const KuromiSticker: React.FC<StickerProps> = ({ position, image, messages }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [randomValues] = useState(() => ({
    interval: 6000 + Math.random() * 2000,
    duration: 3 + Math.random()
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, randomValues.interval);

    return () => clearInterval(interval);
  }, [messages.length, randomValues.interval]);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'top-left': return 'top-4 left-4 flex-col-reverse';
      case 'top-right': return 'top-4 right-4 flex-col-reverse';
      case 'top-center': return 'top-4 left-1/2 -translate-x-1/2 flex-col-reverse items-center';
      default: return 'bottom-4 left-4';
    }
  };

  const isTop = position.startsWith('top');
  const isRight = position.includes('right');
  const isCenter = position.includes('center');

  return (
    <div className={`fixed ${getPositionClasses()} z-100 pointer-events-none sm:pointer-events-auto`}>
      <motion.div 
        className={`relative flex flex-col ${isCenter ? 'items-center' : (isRight ? 'items-end' : 'items-start')}`}
        initial={{ y: isTop ? -50 : 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        {/* Speech Bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, scale: 0.8, y: isTop ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: isTop ? -10 : 10 }}
            className={`mb-2 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-purple-200 min-w-[150px] max-w-[200px] relative mt-2`}
          >
            <p className="font-marker text-ink text-lg leading-tight">
              {messages[messageIndex]}
            </p>
            {/* Bubble Tail */}
            <div className={`absolute ${isTop ? '-top-2' : '-bottom-2'} ${isCenter ? 'left-1/2 -translate-x-1/2' : (isRight ? 'right-6' : 'left-6')} w-4 h-4 bg-white/90 rotate-45 border-t border-l border-purple-200 shadow-xs`} />
          </motion.div>
        </AnimatePresence>

        {/* Character Image */}
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: isRight ? [2, -2, 2] : [-2, 2, -2]
          }}
          transition={{ 
            duration: randomValues.duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-2xl"
        >
          <img 
            src={image} 
            alt="Cute Sticker" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
