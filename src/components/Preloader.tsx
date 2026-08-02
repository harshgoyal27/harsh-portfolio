import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING CORE REGISTERS...');

  // Lock scrolling during loading
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Programmatic organic count-up trigger
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Stuttering progress steps for premium realistic system loads
      const increment = Math.floor(Math.random() * 14) + 4;
      current = Math.min(current + increment, 100);
      setProgress(current);

      // VLSI compiler status updates
      if (current < 20) {
        setStatusText('INITIALIZING RTL SHADERS...');
      } else if (current < 45) {
        setStatusText('CONNECTING WebGL THREE.JS PORTS...');
      } else if (current < 70) {
        setStatusText('MAPPING PHASOR BOHEMIA NODES...');
      } else if (current < 90) {
        setStatusText('CALIBRATING SILICON CLOCK REGISTERS...');
      } else if (current < 100) {
        setStatusText('FINALIZING SYSTEM REVEALS...');
      } else {
        setStatusText('CORE SYSTEM ACTIVE');
        clearInterval(interval);
        setTimeout(onComplete, 800); // Hold for 800ms at 100% for full reveal impact
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -100, // Elegant push-up exit animation
        transition: { 
          duration: 1.0, 
          ease: [0.16, 1, 0.3, 1] // Custom Apple-ease
        } 
      }}
      className="fixed inset-0 w-full h-full bg-[#050508] z-[999] flex flex-col items-center justify-center select-none"
    >
      
      {/* 1. Silicon core spinning geometric assembly */}
      <div className="relative w-28 h-28 flex items-center justify-center mb-8">
        
        {/* Pulsing outer boundary */}
        <div 
          className="absolute inset-0 border border-orange-500/10 rounded-full animate-ping opacity-25" 
          style={{ animationDuration: '3.5s' }} 
        />
        
        {/* Rotating outer frame layer */}
        <div 
          className="absolute w-20 h-20 border border-orange-500/25 rounded-2xl rotate-45 animate-spin" 
          style={{ animationDuration: '12s' }} 
        />
        
        <div 
          className="absolute w-16 h-16 border border-white/5 rounded-full rotate-12 animate-spin" 
          style={{ animationDuration: '8s', animationDirection: 'reverse' }} 
        />

        {/* Microchip Silicon Core */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-400 shadow-[0_0_35px_rgba(249,115,22,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] flex flex-col items-center justify-center text-[#050508] relative z-10 border border-orange-500/20">
          <span className="font-mono font-black text-[9px] tracking-tight leading-none">VLSI</span>
          <span className="font-mono font-bold text-[7px] tracking-tight mt-[1px]">CORE</span>
        </div>
        
      </div>

      {/* 2. Massive, elegant percentage count */}
      <div className="flex items-baseline relative z-10">
        <span 
          className="font-black tracking-tighter text-white leading-none font-sans"
          style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}
        >
          {String(progress).padStart(2, '0')}
        </span>
        <span className="text-orange-500 font-bold ml-1 text-2xl tracking-wide font-mono">%</span>
      </div>

      {/* 3. Sleek glowing progress timeline bar */}
      <div className="w-64 h-[1px] bg-white/10 rounded-full overflow-hidden mt-6 relative z-10">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_10px_rgba(249,115,22,0.6)] rounded-full transition-all duration-150 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 4. Compiler register statuses */}
      <div className="h-6 flex items-center justify-center mt-5">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#D7E2EA]/40 text-center uppercase">
          {statusText}
        </span>
      </div>

    </motion.div>
  );
}
