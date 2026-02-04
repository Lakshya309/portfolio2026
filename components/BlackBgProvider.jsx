"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BlackBgProvider = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['#ccd5ae', '#faedcd', '#faedcd', '#ccd5ae']
  );

  return (
    <div ref={containerRef}>
      <motion.div style={{ backgroundColor }} className="relative">
        {children}
      </motion.div>
    </div>
  );
};

export default BlackBgProvider;
