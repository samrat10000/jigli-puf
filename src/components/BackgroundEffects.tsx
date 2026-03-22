import { useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  const [hearts] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 20,
      size: 10 + Math.random() * 20,
    }))
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-romantic-bg">
      {/* Vaporwave Sun */}
      <motion.div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-romantic-pink blur-[2px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Retro VHS Scanlines / Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div 
          key={heart.id}
          className="heart-particle opacity-60 text-romantic-pink"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Subtle Bottom Gradient for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};
