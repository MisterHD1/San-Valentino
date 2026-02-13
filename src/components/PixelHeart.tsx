import { motion } from "framer-motion";

interface PixelHeartProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  glowing?: boolean;
}

// Perfect pixel art heart - clean 13x12 grid
const PixelHeart = ({ size = 32, color = "currentColor", className = "", onClick, style, glowing = false }: PixelHeartProps) => {
  const highlightColor = "rgba(255, 255, 255, 0.5)";
  const shadowColor = "rgba(0, 0, 0, 0.15)";

  return (
    <motion.svg
      width={size}
      height={size * (12/13)}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-heart ${className}`}
      onClick={onClick}
      style={{
        ...style,
        filter: glowing 
          ? `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color}) drop-shadow(0 0 20px ${color})` 
          : `drop-shadow(0 2px 4px rgba(0,0,0,0.2))`
      }}
      whileHover={onClick ? { scale: 1.2, rotate: [0, -8, 8, 0] } : undefined}
      whileTap={onClick ? { scale: 0.85 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Row 0 - top bumps */}
      <rect x="1" y="0" width="1" height="1" fill={color} />
      <rect x="2" y="0" width="1" height="1" fill={color} />
      <rect x="3" y="0" width="1" height="1" fill={color} />
      <rect x="9" y="0" width="1" height="1" fill={color} />
      <rect x="10" y="0" width="1" height="1" fill={color} />
      <rect x="11" y="0" width="1" height="1" fill={color} />
      
      {/* Row 1 */}
      <rect x="0" y="1" width="1" height="1" fill={color} />
      <rect x="1" y="1" width="1" height="1" fill={highlightColor} />
      <rect x="2" y="1" width="1" height="1" fill={highlightColor} />
      <rect x="3" y="1" width="1" height="1" fill={color} />
      <rect x="4" y="1" width="1" height="1" fill={color} />
      <rect x="8" y="1" width="1" height="1" fill={color} />
      <rect x="9" y="1" width="1" height="1" fill={color} />
      <rect x="10" y="1" width="1" height="1" fill={color} />
      <rect x="11" y="1" width="1" height="1" fill={color} />
      <rect x="12" y="1" width="1" height="1" fill={color} />
      
      {/* Row 2 */}
      <rect x="0" y="2" width="1" height="1" fill={color} />
      <rect x="1" y="2" width="1" height="1" fill={highlightColor} />
      <rect x="2" y="2" width="1" height="1" fill={color} />
      <rect x="3" y="2" width="1" height="1" fill={color} />
      <rect x="4" y="2" width="1" height="1" fill={color} />
      <rect x="5" y="2" width="1" height="1" fill={color} />
      <rect x="6" y="2" width="1" height="1" fill={color} />
      <rect x="7" y="2" width="1" height="1" fill={color} />
      <rect x="8" y="2" width="1" height="1" fill={color} />
      <rect x="9" y="2" width="1" height="1" fill={color} />
      <rect x="10" y="2" width="1" height="1" fill={color} />
      <rect x="11" y="2" width="1" height="1" fill={color} />
      <rect x="12" y="2" width="1" height="1" fill={color} />
      
      {/* Row 3 */}
      <rect x="0" y="3" width="1" height="1" fill={color} />
      <rect x="1" y="3" width="1" height="1" fill={color} />
      <rect x="2" y="3" width="1" height="1" fill={color} />
      <rect x="3" y="3" width="1" height="1" fill={color} />
      <rect x="4" y="3" width="1" height="1" fill={color} />
      <rect x="5" y="3" width="1" height="1" fill={color} />
      <rect x="6" y="3" width="1" height="1" fill={color} />
      <rect x="7" y="3" width="1" height="1" fill={color} />
      <rect x="8" y="3" width="1" height="1" fill={color} />
      <rect x="9" y="3" width="1" height="1" fill={color} />
      <rect x="10" y="3" width="1" height="1" fill={color} />
      <rect x="11" y="3" width="1" height="1" fill={color} />
      <rect x="12" y="3" width="1" height="1" fill={shadowColor} />
      
      {/* Row 4 */}
      <rect x="1" y="4" width="1" height="1" fill={color} />
      <rect x="2" y="4" width="1" height="1" fill={color} />
      <rect x="3" y="4" width="1" height="1" fill={color} />
      <rect x="4" y="4" width="1" height="1" fill={color} />
      <rect x="5" y="4" width="1" height="1" fill={color} />
      <rect x="6" y="4" width="1" height="1" fill={color} />
      <rect x="7" y="4" width="1" height="1" fill={color} />
      <rect x="8" y="4" width="1" height="1" fill={color} />
      <rect x="9" y="4" width="1" height="1" fill={color} />
      <rect x="10" y="4" width="1" height="1" fill={color} />
      <rect x="11" y="4" width="1" height="1" fill={shadowColor} />
      
      {/* Row 5 */}
      <rect x="2" y="5" width="1" height="1" fill={color} />
      <rect x="3" y="5" width="1" height="1" fill={color} />
      <rect x="4" y="5" width="1" height="1" fill={color} />
      <rect x="5" y="5" width="1" height="1" fill={color} />
      <rect x="6" y="5" width="1" height="1" fill={color} />
      <rect x="7" y="5" width="1" height="1" fill={color} />
      <rect x="8" y="5" width="1" height="1" fill={color} />
      <rect x="9" y="5" width="1" height="1" fill={color} />
      <rect x="10" y="5" width="1" height="1" fill={shadowColor} />
      
      {/* Row 6 */}
      <rect x="3" y="6" width="1" height="1" fill={color} />
      <rect x="4" y="6" width="1" height="1" fill={color} />
      <rect x="5" y="6" width="1" height="1" fill={color} />
      <rect x="6" y="6" width="1" height="1" fill={color} />
      <rect x="7" y="6" width="1" height="1" fill={color} />
      <rect x="8" y="6" width="1" height="1" fill={color} />
      <rect x="9" y="6" width="1" height="1" fill={shadowColor} />
      
      {/* Row 7 */}
      <rect x="4" y="7" width="1" height="1" fill={color} />
      <rect x="5" y="7" width="1" height="1" fill={color} />
      <rect x="6" y="7" width="1" height="1" fill={color} />
      <rect x="7" y="7" width="1" height="1" fill={color} />
      <rect x="8" y="7" width="1" height="1" fill={shadowColor} />
      
      {/* Row 8 */}
      <rect x="5" y="8" width="1" height="1" fill={color} />
      <rect x="6" y="8" width="1" height="1" fill={color} />
      <rect x="7" y="8" width="1" height="1" fill={shadowColor} />
      
      {/* Row 9 - tip */}
      <rect x="6" y="9" width="1" height="1" fill={color} />
    </motion.svg>
  );
};

export default PixelHeart;
