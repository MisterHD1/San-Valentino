import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelHeart from "./PixelHeart";

interface HeartExplosionProps {
  isActive: boolean;
  onComplete: () => void;
}

interface ExplodingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  rotation: number;
}

const HeartExplosion = ({ isActive, onComplete }: HeartExplosionProps) => {
  const [hearts, setHearts] = useState<ExplodingHeart[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate explosion hearts
      const colors = [
        "hsl(355, 65%, 70%)",
        "hsl(340, 70%, 75%)",
        "hsl(350, 60%, 80%)",
        "hsl(280, 45%, 82%)",
        "hsl(355, 55%, 65%)",
        "hsl(340, 80%, 85%)",
      ];

      const newHearts: ExplodingHeart[] = [];
      
      // Create multiple waves of hearts
      for (let wave = 0; wave < 3; wave++) {
        for (let i = 0; i < 30; i++) {
          newHearts.push({
            id: wave * 30 + i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 20 + Math.random() * 40,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: wave * 0.3 + Math.random() * 0.5,
            rotation: (Math.random() - 0.5) * 360,
          });
        }
      }

      setHearts(newHearts);

      // Trigger completion after animation
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setHearts([]);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "radial-gradient(circle at center, hsl(340 70% 95% / 0.95), hsl(350 50% 97%))"
          }}
        >
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute"
              style={{
                left: heart.x,
                top: heart.y,
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                scale: [0, 1.5, 1, 0.8, 0],
                opacity: [0, 1, 1, 0.8, 0],
                rotate: heart.rotation,
                y: [0, -50, -100],
              }}
              transition={{
                duration: 2.5,
                delay: heart.delay,
                ease: "easeOut",
              }}
            >
              <PixelHeart size={heart.size} color={heart.color} />
            </motion.div>
          ))}

          {/* Center celebration text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h1 className="romantic-title text-5xl md:text-6xl text-love glow-text text-center px-4">
              Ti Amo! 💕
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartExplosion;
