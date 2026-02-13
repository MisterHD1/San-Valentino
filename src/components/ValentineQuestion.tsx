import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelHeart from "./PixelHeart";

interface ValentineQuestionProps {
  isVisible: boolean;
  onYesClick: () => void;
  onNoEscape?: () => void;
}

const ValentineQuestion = ({ isVisible, onYesClick, onNoEscape }: ValentineQuestionProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 60;
    
    // Calculate random position within safe bounds
    const maxX = Math.min(container.width - buttonWidth, window.innerWidth - buttonWidth - 40);
    const maxY = Math.min(container.height - buttonHeight, window.innerHeight - buttonHeight - 200);
    
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoAttempts(prev => prev + 1);
    
    // Play escape sound
    onNoEscape?.();
  };

  // Reset position when becoming visible
  useEffect(() => {
    if (isVisible) {
      setNoButtonPosition({ x: 0, y: 0 });
      setNoAttempts(0);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glowing background */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, hsl(340 70% 95% / 0.9), hsl(350 50% 97% / 0.95))"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Decorative hearts */}
          <motion.div
            className="absolute top-20 left-10"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -15 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <PixelHeart size={48} color="hsl(280, 55%, 72%)" glowing />
          </motion.div>
          
          <motion.div
            className="absolute top-32 right-8"
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: 15 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <PixelHeart size={40} color="hsl(355, 75%, 60%)" />
          </motion.div>

          {/* Main question */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 10 }}
            >
              <PixelHeart size={80} color="hsl(355, 75%, 60%)" glowing />
            </motion.div>

            <h1 className="romantic-title text-4xl md:text-5xl text-foreground mb-2 glow-text leading-tight">
            Manuela, quest'anno,
            </h1>
            <h1 className="romantic-title text-4xl md:text-5xl text-foreground glow-text leading-tight">
              Vuoi essere il mio San Valentino?
            </h1>
          </motion.div>

          {/* Buttons container */}
          <motion.div
            className="relative z-10 flex flex-col sm:flex-row gap-4 mt-12 items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {/* YES Button */}
            <motion.button
              className="valentine-button-yes min-w-[160px]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={onYesClick}
            >
              <span className="text-2xl font-semibold">Sì! ♥</span>
            </motion.button>

            {/* NO Button - escapes on hover/touch */}
            <motion.button
              className="valentine-button-no min-w-[120px] relative"
              animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
              transition={{ type: "spring", damping: 12, stiffness: 180 }}
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              style={{ touchAction: "none" }}
            >
              <span className="text-xl font-medium">
                {noAttempts > 3 ? "NO???" : "No"}
              </span>
            </motion.button>
          </motion.div>

          {noAttempts > 2 && (
            <motion.p
              className="relative z-10 mt-6 text-muted-foreground text-2xl cartoon-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {noAttempts > 5 ? "Oh ma davvero fai" : "Vaffanculo"}
            </motion.p>
          )}
        </motion.div>
      )}
      
    </AnimatePresence>
  );
};

export default ValentineQuestion;
