import { useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  const [doodles] = useState(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: `${5 + Math.random() * 90}vw`,
      y: `${5 + Math.random() * 90}vh`,
      rotate: `${Math.random() * 80 - 40}deg`,
      icon: ['⭐', '❤️', '♪', '🌸', '✨', '💭', '🎀', '☁️', '🌙'][i % 9],
      scale: 0.7 + Math.random() * 0.6,
      duration: 4 + Math.random() * 4
    }))
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Hand-drawn doodles scattered on the kraft paper */}
      {doodles.map((doodle) => (
        <motion.div
          key={doodle.id}
          className="absolute text-ink opacity-30 font-marker text-3xl"
          style={{ left: doodle.x, top: doodle.y }}
          animate={{ 
            y: [0, -20, 0], 
            rotate: [doodle.rotate, `calc(${doodle.rotate} + 10deg)`, doodle.rotate],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: doodle.duration, repeat: Infinity, ease: "easeInOut" }}
        >
          {doodle.icon}
        </motion.div>
      ))}
      
      {/* Soft purplish radial gradient to give it that "cute" glow */}
      <div className="absolute inset-0 bg-radial-gradient from-fuchsia-100/30 to-purple-200/20" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] contrast-150 brightness-150" />
    </div>
  );
};
