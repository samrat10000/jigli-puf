import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const MESSAGE_LINES = [
  "Wishing you a very cute cute nd happy happy birthday",
  "to myyy cutu babbyy my girlfriend my wifiiyyy ...",
  "I know I am not with you on your special day",
  "but your place in my heart will always be special...",
  "and even if I have to fight the whole world for you...",
  "I will fight and in the end I will be with you..",
  "more than a sista to me.. you are my friend",
  "my bestest friend ...ever .. you my first love ..",
  "We have spent so much time together",
  "and made so many memories...",
  "I hope you will always remember them..",
  "nd ik you will always keep smiling",
  "remembering the moment we create ...",
  "I hope we'll meet soon.. I miss you a lot..",
  "I hope the coming years in your life bring happiness",
  "and you remain happy forever. I always wish this...",
  "Iloveyou so much kashu.. ❤️😚"
];

export const PoemReveal: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}bg-music.m4a`);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("Playback error:", e));
    } else {
      audioRef.current.pause();
    }

    let frameId: number;
    const step = () => {
      if (audioRef.current && audioRef.current.duration) {
        setProgress(audioRef.current.currentTime / audioRef.current.duration);
      }
      frameId = requestAnimationFrame(step);
    };

    if (isPlaying) {
      frameId = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Tape sizing logic (left spool empties out, right spool fills up over the song)
  const leftSpoolSize = 90 - (progress * 50);
  const rightSpoolSize = 30 + (progress * 50);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center w-full max-w-6xl mx-auto py-10 px-4 z-10 gap-10 lg:gap-16"
    >
      {/* Decorative Stickers throughout the page */}
      <motion.div 
        animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-[10%] text-4xl pointer-events-none z-20 opacity-80"
      >✨</motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-20 right-[5%] text-5xl pointer-events-none z-20 opacity-80"
      >🌸</motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/2 left-4 text-3xl pointer-events-none z-20 opacity-70"
      >💕</motion.div>

      {/* Left Column: The Note */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        {/* Ripped/Grid paper message block */}
        <motion.div 
          initial={{ rotate: -1, y: 20 }}
          animate={{ y: 0 }}
          className="relative bg-grid-paper p-8 pb-10 mb-4 w-full max-w-xl -rotate-2 shadow-xl"
        >
          {/* Decorative Washi Tape bits */}
          <div className="absolute -top-3 right-8 w-24 h-8 bg-romantic-pink/30 backdrop-blur-xs rotate-[5deg] border border-white/20 shadow-xs" />
          <div className="absolute -bottom-3 left-8 w-20 h-7 bg-romantic-bg/40 backdrop-blur-xs rotate-[-4deg] border border-white/20 shadow-xs" />
          <div className="absolute top-1/2 -right-4 w-12 h-6 bg-yellow-200/40 rotate-85 border border-white/10 shadow-xs" />

          <h2 className="text-[2.75rem] leading-none font-handwriting font-bold text-ink mb-6 text-center underline decoration-red-ink/40 decoration-4 underline-offset-4">
            Happy Birthday!
          </h2>

          <div className="w-full space-y-3 text-left px-4 md:px-8">
            {MESSAGE_LINES.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="text-2xl font-marker text-ink leading-tight"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column: Polaroid & Music */}
      <div className="w-full lg:w-1/2 flex flex-col items-center space-y-12 lg:pt-10">
        {/* High Quality Polaroid */}
        <motion.div
           initial={{ opacity: 0, x: 30, rotate: 10 }}
           animate={{ opacity: 1, x: 0, rotate: 3 }}
           transition={{ delay: 1.2, type: 'spring', stiffness: 80 }}
           className="relative polaroid w-72 rotate-3 hover:scale-105 transition-transform duration-500 hover:rotate-0"
        >
          <div className="absolute -top-4 right-1/2 translate-x-1/2 w-16 h-6 tape-clear -rotate-2" />
          <div className="absolute top-2 -left-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-xl rotate-[-15deg]">🎀</div>
          
          <div className="w-full h-80 bg-gray-200 overflow-hidden relative border border-gray-100 flex items-center justify-center polaroid-gloss">
             <img 
                 src={`${import.meta.env.BASE_URL}sister.jpg`}
                 alt="My Sister" 
                 className="w-full h-full object-cover"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none"><rect fill="%23f0f0f0" width="200" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23888888">Add "sister.jpg" to public/</text></svg>';
                 }}
             />
          </div>
          <p className="mt-4 text-center font-marker text-3xl text-ink leading-none">
              My Everything! ❤️
          </p>
        </motion.div>

        {/* Ultra Realistic Cassette Tape Player */}
        <motion.div
          initial={{ y: 50, opacity: 0, rotate: -5 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 1.8, type: 'spring' }}
          className="relative -rotate-1 group"
        >
          {/* Small music note stickers */}
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-8 -left-2 text-2xl">🎵</motion.span>
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute -top-10 right-4 text-xl">🎶</motion.span>

        <div className="w-[330px] h-[210px] bg-[#b490c6] rounded-[16px] shadow-[0_15px_35px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.4),inset_0_-5px_15px_rgba(0,0,0,0.15)] p-[14px] relative border-2 border-[#9a73ac] overflow-hidden">
          
          {/* Transparent Plastic Highlight */}
          <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none rounded-[14px]" />

          {/* Phillips Screws in corners */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full bg-[#845f96] shadow-inner flex items-center justify-center text-[11px] text-[#553663] font-bold rotate-15 leading-none pb-px">+</div>
          <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-[#845f96] shadow-inner flex items-center justify-center text-[11px] text-[#553663] font-bold -rotate-25 leading-none pb-px">+</div>
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full bg-[#845f96] shadow-inner flex items-center justify-center text-[11px] text-[#553663] font-bold rotate-42 leading-none pb-px">+</div>
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-[#845f96] shadow-inner flex items-center justify-center text-[11px] text-[#553663] font-bold -rotate-12 leading-none pb-px">+</div>

          {/* Main Sticker/Label Area */}
          <div className="w-full h-[120px] bg-[#f0ebd8] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_0_15px_rgba(0,0,0,0.08)] border border-[#d3cbb4] relative flex flex-col items-center pt-2">
            
            {/* Vintage Color Bands */}
            <div className="absolute top-0 left-0 w-full h-4 bg-[#8cc084] rounded-t-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] opacity-80" />
            <div className="absolute top-5 left-0 w-full h-1 bg-[#d38b6d] shadow-[0_1px_2px_rgba(0,0,0,0.1)] opacity-80" />
            <span className="absolute top-0 left-4 font-bold text-[10px] text-white my-0.5">A</span>

            <div className="w-full px-5 mt-6 flex justify-between items-start z-20">
              <span className="font-handwriting text-[3.8rem] tracking-tighter text-ink font-bold leading-none -ml-1">music</span>
              <div className="flex flex-col items-end pt-1">
                <span className="font-marker text-xl leading-[0.9] text-ink">songs i had</span>
                <span className="font-marker text-xl leading-[0.9] text-ink">on repeat</span>
              </div>
            </div>
          </div>

          {/* Center Tape Viewer Window */}
          <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[210px] h-[65px] bg-[#9372a3] shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),0_1px_1px_rgba(255,255,255,0.3)] rounded-[20px] p-[3px] z-10">
             <div className="w-full h-full bg-[#111] rounded-[17px] relative overflow-hidden flex items-center justify-between px-7 shadow-[inset_0_5px_15px_rgba(0,0,0,1)]">
                
                {/* Background Magnetic Tape representing track time (Unspooling) */}
                <div 
                   className="absolute left-[44px] -translate-x-1/2 bg-[#2a2a2a] rounded-full border border-[#444] shadow-[0_0_5px_rgba(0,0,0,0.8)] z-0 transition-all duration-800 ease-linear overflow-hidden" 
                   style={{ width: leftSpoolSize, height: leftSpoolSize }}
                >
                   {/* Striping to simulate tape layers */}
                   <div className="absolute inset-0 rounded-full border border-white/5 m-1" />
                   <div className="absolute inset-0 rounded-full border border-white/5 m-2" />
                </div>
                
                <div 
                   className="absolute right-[44px] translate-x-1/2 bg-[#2a2a2a] rounded-full border border-[#444] shadow-[0_0_5px_rgba(0,0,0,0.8)] z-0 transition-all duration-800 ease-linear overflow-hidden" 
                   style={{ width: rightSpoolSize, height: rightSpoolSize }}
                >
                   <div className="absolute inset-0 rounded-full border border-white/5 m-1" />
                   <div className="absolute inset-0 rounded-full border border-white/5 m-2" />
                </div>
                
                {/* Left Spool Gear */}
                <div className={`w-[32px] h-[32px] rounded-full bg-[#e6e2d3] flex items-center justify-center z-10 border border-[#bbaea8] shadow-[0_2px_5px_rgba(0,0,0,0.8)] ${isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s', animationTimingFunction: 'linear'}}>
                   <div className="w-[12px] h-[12px] rounded-full bg-[#1b1b1b] shadow-inner" />
                   {/* 6 Prongs inside the 80s tape reel */}
                   {[0, 60, 120].map((deg) => (
                      <div key={deg} className={`absolute w-[4px] h-[32px] bg-transparent flex items-center justify-between`} style={{ transform: `rotate(${deg}deg)` }}>
                         <div className="w-[4px] h-[6px] bg-[#1b1b1b]" />
                         <div className="w-[4px] h-[6px] bg-[#1b1b1b]" />
                      </div>
                   ))}
                </div>
                
                {/* Right Spool Gear */}
                <div className={`w-[32px] h-[32px] rounded-full bg-[#e6e2d3] flex items-center justify-center z-10 border border-[#bbaea8] shadow-[0_2px_5px_rgba(0,0,0,0.8)] ${isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s', animationTimingFunction: 'linear', animationDirection: 'reverse'}}>
                   <div className="w-[12px] h-[12px] rounded-full bg-[#1b1b1b] shadow-inner" />
                   {[0, 60, 120].map((deg) => (
                      <div key={deg} className={`absolute w-[4px] h-[32px] bg-transparent flex items-center justify-between`} style={{ transform: `rotate(${deg}deg)` }}>
                         <div className="w-[4px] h-[6px] bg-[#1b1b1b]" />
                         <div className="w-[4px] h-[6px] bg-[#1b1b1b]" />
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Bottom trapezoid area for read heads */}
          <div className="absolute bottom-0 left-[12%] w-[76%] h-[32px] bg-[#9c78b0] rounded-t-[5px] shadow-[inset_0_5px_10px_rgba(0,0,0,0.15)] flex justify-between px-6 items-center">
              <div className="w-3 h-3 rounded-full bg-black/40" />
              <div className="w-3 h-3 rounded-full bg-black/40" />
          </div>
        </div>

        {/* Swinging Keychain hanging from the bottom-left corner */}
        <motion.div 
          animate={{ 
            rotate: [-15, 15, -15],
            originY: 0
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -bottom-px -left-8 w-[280px] h-[280px] z-10 pointer-events-none drop-shadow-2xl"
        >
          {/* The invisible "string" or chain */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2.5px] h-20 bg-ink/30" />
          <img 
              src={`${import.meta.env.BASE_URL}Picsart_26-03-22_22-58-25-218 (1).png`}
              alt="Keychain" 
              className="w-full h-full object-contain mt-10" 
          />
        </motion.div>

        {/* Floating Player Controls outside the physical cassette */}
        <div className="flex justify-center mt-8 z-30 relative gap-6">
          <button 
              className={`flex items-center justify-center bg-paper text-ink rounded-full p-2 shadow-md opacity-50 pointer-events-none`}
           >
              <div className="w-4 h-4 bg-ink rounded-sm" /> {/* Stop button icon */}
          </button>
          
          <button 
              onClick={togglePlay}
              className={`flex items-center justify-center bg-ink text-white rounded-full p-[18px] shadow-xl hover:scale-110 active:scale-95 transition-all outline-none border-[3px] border-paper ${isPlaying ? 'bg-red-ink! scale-110 shadow-[0_0_25px_rgba(193,58,58,0.6)] border-red-ink/20!' : ''}`}
           >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>
          
          <button 
              className={`flex items-center justify-center bg-paper text-ink rounded-full p-2 shadow-md opacity-50 pointer-events-none`}
           >
              <Play size={20} fill="currentColor" /> {/* Forward button icon */}
          </button>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
};
