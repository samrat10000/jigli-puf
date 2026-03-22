import { motion } from 'framer-motion';

const POEM_LINES = [
  "I know you don’t trust easy,",
  "and honestly… you shouldn’t.",
  "People have come, stayed just enough,",
  "and left you with questions",
  "you never deserved to ask.",
  "",
  "So when you look at me like",
  "“I’ll probably be the same,”",
  "I don’t get mad at you for that.",
  "I get it.",
  "",
  "But I’m not here for a moment.",
  "Not here for something temporary,",
  "not here to take pieces of you",
  "and disappear like nothing happened.",
  "",
  "I’m here because I choose you.",
  "Not once, not when it’s easy—",
  "but every day, even on the days",
  "you feel like you’re too much",
  "or not enough.",
  "",
  "I don’t want to fix you.",
  "I just want to stay.",
  "Long enough for you to realize",
  "you don’t have to be scared with me,",
  "long enough for your walls",
  "to feel unnecessary.",
  "",
  "And yeah, maybe I can’t prove it",
  "in one day, or one poem—",
  "but I’ll prove it in the way I stay",
  "when leaving would be easier.",
  "I’m not going anywhere."
];

export const PoemReveal: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4, ease: "easeInOut" }} // Very slow, peaceful fade-in
      className="flex flex-col items-center justify-center w-full max-w-xl mx-auto"
    >
      <div className="w-full space-y-4 text-center">
        {POEM_LINES.map((line, index) => (
          <p
            key={index}
            className={`text-lg md:text-xl font-serif text-white/90 leading-relaxed tracking-wide italic ${
              line === "" ? "h-4" : ""
            }`}
          >
            {line}
          </p>
        ))}
      </div>
      
      {/* Subtle Bottom Heart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2, delay: 3 }}
        className="mt-12 text-romantic-pink"
      >
        <div className="text-2xl animate-pulse">❤️</div>
      </motion.div>
    </motion.div>
  );
};
