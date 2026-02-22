'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScrollable = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollable) * 100;

      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Horizontal progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-tea_green-700">
        <div
          className="h-full bg-gradient-to-r from-light_bronze-500 via-papaya_whip-400 to-light_bronze-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Circular progress indicator */}
      <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
        <div className="relative w-14 h-14">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="#e9edc9"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
            {/* Progress circle */}
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="#d4a373"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bosch text-xs text-tea_green-200 font-semibold">
              {Math.round(scrollProgress)}
            </span>
          </div>
        </div>

        {/* Back to top button */}
        {scrollProgress > 20 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-light_bronze-500 rounded-full text-cornsilk-900 opacity-0 hover:opacity-100 transition-opacity duration-300 group"
            aria-label="Back to top"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}