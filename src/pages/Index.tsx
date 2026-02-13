import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import FloatingHeart from "@/components/FloatingHeart";
import HeartCounter from "@/components/HeartCounter";
import MessagePopup from "@/components/MessagePopup";
import ValentineQuestion from "@/components/ValentineQuestion";
import HeartExplosion from "@/components/HeartExplosion";
import FinalScreen from "@/components/FinalScreen";
import { loveMessages } from "@/data/loveMessages";
import useSoundEffects from "@/hooks/useSoundEffects";

type GamePhase = "collecting" | "question" | "explosion" | "final";

const TOTAL_HEARTS = 30;

const Index = () => {
  const [collectedHearts, setCollectedHearts] = useState<Set<number>>(new Set());
  const [currentMessage, setCurrentMessage] = useState<{ text: string; number: number } | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("collecting");
  
  const { playCollectSound, playSuccessSound, playExplosionSound, playEscapeSound } = useSoundEffects();

  const handleHeartCollect = useCallback((heartId: number) => {
    if (collectedHearts.has(heartId)) return;

    // Play collect sound
    playCollectSound();

    const newCollected = new Set(collectedHearts);
    newCollected.add(heartId);
    setCollectedHearts(newCollected);

    // Show the message for this heart
    const messageIndex = newCollected.size - 1;
    const message = loveMessages[messageIndex] || `Motivo #${newCollected.size}`;
    setCurrentMessage({ text: message, number: newCollected.size });

    // Check if all hearts are collected
    if (newCollected.size === TOTAL_HEARTS) {
      // Play success jingle
      playSuccessSound();
      // Small delay before showing the question
      setTimeout(() => {
        setGamePhase("question");
      }, 1500);
    }
  }, [collectedHearts, playCollectSound, playSuccessSound]);

  const handleCloseMessage = useCallback(() => {
    setCurrentMessage(null);
  }, []);

  const handleNoButtonEscape = useCallback(() => {
    playEscapeSound();
  }, [playEscapeSound]);

  const handleYesClick = useCallback(() => {
    playExplosionSound();
    setGamePhase("explosion");
  }, [playExplosionSound]);

  const handleExplosionComplete = useCallback(() => {
    setGamePhase("final");
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] relative overflow-hidden select-none">
      {/* Background gradient - always visible */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, hsl(35 50% 95%), hsl(350 50% 94%) 50%, hsl(280 35% 92%))"
        }}
      />

      {/* Collecting phase */}
      {gamePhase === "collecting" && (
        <>
          {/* Heart counter - fixed at top */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30">
            <HeartCounter collected={collectedHearts.size} total={TOTAL_HEARTS} />
          </div>

          {/* Title */}
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-20 text-center px-4">
            <h1 className="romantic-title text-3xl md:text-4xl text-foreground/90">
              Clicca tutti i cuori!
            </h1>
            <p className="cartoon-text text-base text-muted-foreground mt-2">
              Fatto da Christian per Manuela - San Valentino 2026 ❤️
            </p>
          </div>

          {/* Floating hearts */}
          {[...Array(TOTAL_HEARTS)].map((_, index) => (
            <FloatingHeart
              key={index}
              id={index}
              collected={collectedHearts.has(index)}
              onCollect={handleHeartCollect}
            />
          ))}
        </>
      )}

      {/* Message popup */}
      <AnimatePresence>
        {currentMessage && gamePhase === "collecting" && (
          <MessagePopup
            message={currentMessage.text}
            heartNumber={currentMessage.number}
            isVisible={true}
            onClose={handleCloseMessage}
          />
        )}
      </AnimatePresence>

      {/* Valentine question phase */}
      <ValentineQuestion
        isVisible={gamePhase === "question"}
        onYesClick={handleYesClick}
        onNoEscape={handleNoButtonEscape}
      />

      {/* Heart explosion phase */}
      <HeartExplosion
        isActive={gamePhase === "explosion"}
        onComplete={handleExplosionComplete}
      />

      {/* Final screen */}
      <FinalScreen isVisible={gamePhase === "final"} />
    </div>
  );
};

export default Index;
