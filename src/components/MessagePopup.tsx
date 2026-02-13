import { motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import PixelHeart from "./PixelHeart";

interface MessagePopupProps {
  message: string;
  heartNumber: number;
  isVisible: boolean;
  onClose: () => void;
}

const MessagePopup = ({ message, heartNumber, isVisible, onClose }: MessagePopupProps) => {
  // Auto-close after 25 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 25000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="message-popup pointer-events-auto text-center relative"
        initial={{ scale: 0.5, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: -20, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        onClick={onClose}
      >
        {/* Heart decoration */}
        <motion.div
          className="absolute -top-10 left-1 -translate-x-1/2 -translate-y-1/2"
          initial={{ y: -10000, opacity: 0, rotate: -10 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PixelHeart size={80} color="hsl(355, 75%, 60%)" glowing />
        </motion.div>

        {/* Close X button */}
        <motion.button
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-love-foreground cartoon-text"
          style={{
            background: "linear-gradient(135deg, hsl(355, 90%, 55%), hsl(340, 85%, 60%))",
            boxShadow: "0 2px 8px hsl(355 65% 60% / 0.4)"
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={16} strokeWidth={3} />
        </motion.button>

        <motion.h2
          className="cartoon-text text-3xl font-bold text-love mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          TI AMO...
        </motion.h2>

        {/* Message text */}
        <motion.p
          className="cartoon-text text-lg text-foreground leading-relaxed mt-4 px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {message}
        </motion.p>

        {/* Tap hint */}
        <motion.p
          className="text-xs text-muted-foreground/70 mt-3 cartoon-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
        
        </motion.p>

        {/* Sparkle decorations */}
        <motion.div
          className="absolute -left-2 top-1/2"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <span className="text-primary text-lg">✦</span>
        </motion.div>
        <motion.div
          className="absolute -right-2 top-1/3"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 0.8,
            delay: 0.3
          }}
        >
          <span className="text-love text-sm">✦</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MessagePopup;
