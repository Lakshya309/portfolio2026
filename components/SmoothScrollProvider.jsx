"use client";
import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
