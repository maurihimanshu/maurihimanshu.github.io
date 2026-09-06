import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const InteractiveBackground: React.FC = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [smoothPos, setSmoothPos] = useState({ x: -200, y: -200 });
  const [isActive, setIsActive] = useState(false);
  const targetPosRef = useRef({ x: -200, y: -200 });

  const smoothPosRef = useRef({ x: -200, y: -200 });
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Set initial position based on window viewport
    const initialPos = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    targetPosRef.current = initialPos;
    smoothPosRef.current = initialPos;
    setMousePos(initialPos);
    setSmoothPos(initialPos);

    const step = () => {
      const dx = targetPosRef.current.x - smoothPosRef.current.x;
      const dy = targetPosRef.current.y - smoothPosRef.current.y;
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        smoothPosRef.current = targetPosRef.current;
        setSmoothPos(targetPosRef.current);
        animIdRef.current = null;
        return;
      }
      const nextPos = {
        x: smoothPosRef.current.x + dx * 0.1,
        y: smoothPosRef.current.y + dy * 0.1,
      };
      smoothPosRef.current = nextPos;
      setSmoothPos(nextPos);
      animIdRef.current = requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (animIdRef.current === null) {
        animIdRef.current = requestAnimationFrame(step);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsActive(true);
      startAnimation();
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(Number(animIdRef.current));
    };
  }, []);

  // Calculate parallax offsets for ambient floating orbs
  const winWidth = window.innerWidth > 0 ? window.innerWidth : 1;
  const winHeight = window.innerHeight > 0 ? window.innerHeight : 1;
  const parallaxX = (mousePos.x / winWidth - 0.5) * 40;
  const parallaxY = (mousePos.y / winHeight - 0.5) * 40;

  return (
    <div
      data-testid="interactive-background"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-opacity duration-700"
      aria-hidden="true"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        data-testid="cursor-spotlight"
        className="absolute inset-0 transition-opacity duration-500 will-change-transform"
        style={{
          opacity: isActive ? 1 : 0.65,
          background:
            theme === 'dark'
              ? `radial-gradient(650px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(6, 182, 212, 0.09), rgba(59, 130, 246, 0.04), transparent 70%)`
              : `radial-gradient(650px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(14, 165, 233, 0.10), rgba(99, 102, 241, 0.05), transparent 70%)`,
        }}
      />

      {/* Floating Interactive Ambient Orb 1 (Top Left / Cyan-Sky) */}
      <div
        data-testid="ambient-orb-1"
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl transition-transform duration-300 ease-out will-change-transform"
        style={{
          top: '10%',
          left: '15%',
          transform: `translate3d(${parallaxX * 1.5}px, ${parallaxY * 1.5}px, 0)`,
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0) 70%)'
              : 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(14, 165, 233, 0) 70%)',
        }}
      />

      {/* Floating Interactive Ambient Orb 2 (Bottom Right / Indigo-Emerald) */}
      <div
        data-testid="ambient-orb-2"
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl transition-transform duration-300 ease-out will-change-transform"
        style={{
          bottom: '10%',
          right: '10%',
          transform: `translate3d(${-parallaxX * 1.2}px, ${-parallaxY * 1.2}px, 0)`,
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.06) 50%, transparent 70%)',
        }}
      />

      {/* Interactive Fintech Grid Layer Illuminating Under Cursor */}
      <div
        data-testid="interactive-grid"
        className="absolute inset-0 bg-grid-pattern opacity-60 light:opacity-40"
        style={{
          maskImage: `radial-gradient(750px circle at ${smoothPos.x}px ${smoothPos.y}px, black 30%, rgba(0,0,0,0.2) 70%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(750px circle at ${smoothPos.x}px ${smoothPos.y}px, black 30%, rgba(0,0,0,0.2) 70%, transparent 100%)`,
        }}
      />
    </div>
  );
};
