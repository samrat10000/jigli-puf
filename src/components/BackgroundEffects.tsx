import { useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  const [hearts] = useState(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 20,
      size: 10 + Math.random() * 15,
    }))
  );

  const [petals] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 15,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
      sway: 20 + Math.random() * 50,
    }))
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-romantic-bg">
      {/* Vaporwave Sun with Bloom */}
      <motion.div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-romantic-pink blur-[1px] shadow-[0_0_60px_rgba(255,0,127,0.4)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      {/* Retro VHS Scanlines / Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Hearts (Deeper Layer) */}
      {hearts.map((heart) => (
        <div 
          key={`heart-${heart.id}`}
          className="heart-particle opacity-40 text-romantic-pink"
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

      {/* Falling Sakura Petals (Foreground Layer) */}
      {petals.map((petal) => (
        <motion.div
          key={`petal-${petal.id}`}
          initial={{ y: -50, x: petal.left, opacity: 0, rotate: petal.rotation }}
          animate={{ 
            y: "110vh", 
            x: `calc(${petal.left} + ${petal.sway}px)`,
            opacity: [0, 1, 1, 0],
            rotate: petal.rotation + 360
          }}
          transition={{ 
            duration: petal.duration, 
            repeat: Infinity, 
            delay: petal.delay,
            ease: "linear"
          }}
          className="absolute pointer-events-none select-none"
          style={{ width: petal.size, height: petal.size }}
        >
          <svg viewBox="0 0 100 100" fill="#ffd1dc" className="w-full h-full drop-shadow-sm">
            <path d="M50 0 C60 20 80 30 100 50 C80 70 60 80 50 100 C40 80 20 70 0 50 C20 30 40 20 50 0" />
          </svg>
        </motion.div>
      ))}

      {/* Subtle Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};
