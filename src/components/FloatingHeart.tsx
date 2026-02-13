import { motion } from "framer-motion";
import { useMemo } from "react";
import PixelHeart from "./PixelHeart";

interface FloatingHeartProps {
  id: number;
  collected: boolean;
  onCollect: (id: number) => void;
}

const FloatingHeart = ({ id, collected, onCollect }: FloatingHeartProps) => {
  // Memoize random values so they don't change on re-renders
  const heartProps = useMemo(() => {
    const randomX = Math.random() * 75 + 12.5; // 12.5-87.5% from left (safer margins)
    const randomDelay = Math.random() * 6; // 0-6s delay (faster start)
    const randomDuration = 10 + Math.random() * 6; // 10-16s duration (slightly faster)
    const randomDrift = (Math.random() - 0.5) * 80; // -40px to 40px drift (more movement)
    const randomRotation = (Math.random() - 0.5) * 40; // -20 to 20 degrees
    const randomSize = 44 + Math.random() * 28; // 44-72px size (bigger!)
    
    // Bright red and pink only
    const colors = [
      "hsl(350, 90%, 55%)", // bright red
      "hsl(340, 85%, 60%)", // hot pink
      "hsl(355, 95%, 50%)", // vivid red
      "hsl(330, 90%, 62%)", // magenta pink
      "hsl(345, 88%, 58%)", // rose red
      "hsl(335, 85%, 65%)", // bright pink
    ];
    const randomColor = colors[id % colors.length];

    return {
      randomX,
      randomDelay,
      randomDuration,
      randomDrift,
      randomRotation,
      randomSize,
      randomColor,
    };
  }, [id]);

  if (collected) {
    return null;
  }

  return (
    <motion.div
      className="fixed cursor-pointer select-none touch-none z-10"
      style={{
        left: `${heartProps.randomX}%`,
        bottom: "-80px",
      }}
      initial={{ 
        y: 0, 
        opacity: 0,
        scale: 0.6
      }}
      animate={{
        y: [0, -window.innerHeight - 120],
        x: [
          0, 
          heartProps.randomDrift * 0.3, 
          heartProps.randomDrift * 0.7, 
          heartProps.randomDrift, 
          heartProps.randomDrift * 0.7, 
          heartProps.randomDrift * 0.3, 
          0
        ],
        rotate: [
          0, 
          heartProps.randomRotation * 0.5, 
          heartProps.randomRotation, 
          heartProps.randomRotation * 0.5, 
          0, 
          -heartProps.randomRotation * 0.5, 
          0
        ],
        opacity: [0, 0.9, 1, 1, 1, 0.9, 0],
        scale: [0.6, 1, 1.05, 1, 1.05, 1, 0.6]
      }}
      transition={{
        duration: heartProps.randomDuration,
        delay: heartProps.randomDelay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.08, 0.25, 0.5, 0.75, 0.92, 1]
      }}
      onClick={() => onCollect(id)}
      whileTap={{ scale: 1.3 }}
    >
      <PixelHeart 
        size={heartProps.randomSize} 
        color={heartProps.randomColor}
        className="drop-shadow-lg hover:drop-shadow-2xl transition-all duration-150"
        glowing // All hearts glow now
      />
    </motion.div>
  );
};

export default FloatingHeart;
