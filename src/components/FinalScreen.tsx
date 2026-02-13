import { motion } from "framer-motion";
import PixelHeart from "./PixelHeart";
import coupleImage from "/images/img2.jpeg";

// PLACEHOLDER: Replace this with your pixel art image path
// Example: import coupleImage from "@/assets/couple-pixel-art.png";
const COUPLE_IMAGE_PLACEHOLDER = coupleImage;

const FINAL_MESSAGE = "16 mesi che mi dici sì";

interface FinalScreenProps {
  isVisible: boolean;
}

const FinalScreen = ({ isVisible }: FinalScreenProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(35 50% 95%), hsl(350 50% 94%), hsl(280 35% 92%))"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative floating hearts in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <PixelHeart 
              size={16 + (i % 3) * 8} 
              color={i % 2 === 0 ? "hsl(355 65% 70% / 0.3)" : "hsl(280 45% 82% / 0.3)"} 
            />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Image container */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", damping: 15 }}
        >
          {/* Heart frame decoration */}
          <div className="absolute -top-4 -left-4 z-20">
            <PixelHeart size={32} color="hsl(355, 65%, 70%)" />
          </div>
          <div className="absolute -top-4 -right-4 z-20">
            <PixelHeart size={32} color="hsl(340, 70%, 75%)" />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
            <PixelHeart size={40} color="hsl(355, 65%, 70%)" className="animate-pulse-soft" />
          </div>

          {/* Image placeholder / actual image */}
          <div 
            className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 10px 40px hsl(355 65% 70% / 0.3), 0 0 60px hsl(340 70% 75% / 0.2)",
              border: "4px solid hsl(350 50% 90%)",
            }}
          >
            {COUPLE_IMAGE_PLACEHOLDER ? (
              <img 
                src={COUPLE_IMAGE_PLACEHOLDER} 
                alt="Noi due" 
                className="w-full h-full object-cover pixel-heart"
              />
            ) : (
              // Placeholder design when no image is provided
              <div 
                className="w-full h-full flex flex-col items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(350 60% 92%), hsl(340 70% 88%), hsl(280 40% 90%))"
                }}
              >
                <div className="flex gap-2 mb-4">
                  <PixelHeart size={48} color="hsl(355, 65%, 70%)" />
                  <PixelHeart size={48} color="hsl(340, 70%, 75%)" />
                </div>
                <p className="cartoon-text text-2xl text-muted-foreground text-center px-4">
                  La nostra foto qui
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2 cartoon-text">
                  (pixel art)
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Final message */}
        <motion.h2
          className="romantic-title text-3xl md:text-4xl text-foreground text-center glow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {FINAL_MESSAGE}
        </motion.h2>

        {/* Additional optional text */}
        <motion.p
          className="mt-4 text-lg md:text-xl text-muted-foreground text-center max-w-xs cartoon-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Anche se al momento non stiamo vicini, volevo comunque farti qualcosa. Buon San Valentino 2026 amore mio, il nostro secondo insieme. 
          Grazie di avermi scelto. Ti amo!
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default FinalScreen;
