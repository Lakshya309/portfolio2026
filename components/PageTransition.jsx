'use client';

import { useEffect, useState } from 'react';

export default function PageTransition({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-1000 ${
          isLoading ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Split screen effect */}
        <div className="absolute inset-0 bg-light_bronze-500 origin-top"></div>
        <div
          className={`absolute inset-0 bg-tea_green-500 origin-bottom transition-transform duration-700 ${
            isLoading ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ transitionDelay: '0.2s' }}
        ></div>

        {/* Loading text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex gap-2 mb-4 justify-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-cornsilk-500 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                ></div>
              ))}
            </div>
            <p className="font-bosch text-cornsilk-500 text-sm tracking-widest">
              LOADING EXPERIENCE
            </p>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}