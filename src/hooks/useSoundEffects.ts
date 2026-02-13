import { useCallback, useRef } from "react";

// Simple audio context for generating sounds
const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Cute "pop" sound for collecting hearts
  const playCollectSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Cute ascending pop sound
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
      
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.log("Audio not available");
    }
  }, [getAudioContext]);

  // Success/celebration sound
  const playSuccessSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // Play a cute jingle - 3 ascending notes
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      
      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
        oscillator.type = "sine";
        
        const startTime = ctx.currentTime + i * 0.15;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.4);
      });
    } catch (e) {
      console.log("Audio not available");
    }
  }, [getAudioContext]);

  // Button click sound
  const playClickSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not available");
    }
  }, [getAudioContext]);

  // NO button escape sound (funny)
  const playEscapeSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Descending "woosh" sound
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      oscillator.type = "sawtooth";
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio not available");
    }
  }, [getAudioContext]);

  // Explosion/celebration fanfare
  const playExplosionSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // Multiple layered sounds for explosion effect
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);

          const baseFreq = 300 + Math.random() * 600;
          oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.1);
          oscillator.type = "sine";
          
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
        }, i * 100);
      }
    } catch (e) {
      console.log("Audio not available");
    }
  }, [getAudioContext]);

  return {
    playCollectSound,
    playSuccessSound,
    playClickSound,
    playEscapeSound,
    playExplosionSound,
  };
};

export default useSoundEffects;
