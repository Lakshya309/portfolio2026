'use client';

import { useEffect, useRef, useState } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth follow for outer cursor
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;

      // Faster follow for dot
      const dotDx = mouseX - dotX;
      const dotDy = mouseY - dotY;
      dotX += dotDx * 0.3;
      dotY += dotDy * 0.3;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }

      if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Outer cursor */}
      <div
        ref={cursorRef}
        className={`hidden lg:block fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-colors duration-300 ${
            isHovering ? 'border-light_bronze-500' : 'border-tea_green-300'
          }`}
        ></div>
      </div>

      {/* Dot cursor */}
      <div
        ref={cursorDotRef}
        className={`hidden lg:block fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] transition-all duration-200 ${
          isHovering ? 'scale-0' : 'scale-100'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-colors duration-300 ${
            isHovering ? 'bg-light_bronze-500' : 'bg-tea_green-300'
          }`}
        ></div>
      </div>
    </>
  );
}