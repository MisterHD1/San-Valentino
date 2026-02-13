import { motion } from "framer-motion";
import PixelHeart from "./PixelHeart";

interface HeartCounterProps {
  collected: number;
  total: number;
}

const HeartCounter = ({ collected, total }: HeartCounterProps) => {
  const progress = collected / total;
  
  return (
    <motion.div 
      className="heart-counter flex items-center gap-3"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 15 }}
    >
      <motion.div
        animate={{ 
          scale: collected > 0 ? [1, 1.3, 1] : 1,
          rotate: collected > 0 ? [0, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.3 }}
        key={collected}
      >
        <PixelHeart 
          size={28} 
          color={progress > 0.5 ? "hsl(355, 75%, 60%)" : "hsl(340, 80%, 65%)"} 
          glowing={progress > 0.8}
        />
      </motion.div>
      
      <div className="flex flex-col items-start">
        <motion.span 
          className="cartoon-text text-xl font-semibold text-foreground leading-none"
          key={collected}
          initial={{ scale: 1.2, color: "hsl(355, 75%, 60%)" }}
          animate={{ scale: 1, color: "hsl(350, 40%, 20%)" }}
          transition={{ duration: 0.3 }}
        >
          {collected} / {total}
        </motion.span>
        <span className="text-xs text-muted-foreground cartoon-text">
          {collected === total ? "Completo! 🎉" : "cuori raccolti"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden ml-2">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(340, 80%, 65%), hsl(355, 75%, 60%))"
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", damping: 15 }}
        />
      </div>
    </motion.div>
  );
};

export default HeartCounter;
