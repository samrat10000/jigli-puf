import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundEffects } from './components/BackgroundEffects';
import { IntroScreen } from './components/IntroScreen';
import { PoemReveal } from './components/PoemReveal';

function App() {
  const [showPoem, setShowPoem] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden selection:bg-romantic-pink/30 selection:text-white">
      {/* Background is always fixed */}
      <BackgroundEffects />
      
      {/* Main scrollable container for content */}
      <main className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!showPoem ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="min-h-full w-full flex items-center justify-center p-6"
            >
              <IntroScreen onStart={() => setShowPoem(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="poem"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-full min-h-screen flex flex-col items-center py-20 px-4"
            >
              <PoemReveal />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle overlay */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-romantic-bg/80 to-transparent pointer-events-none z-20" />
    </div>
  );
}

export default App;
