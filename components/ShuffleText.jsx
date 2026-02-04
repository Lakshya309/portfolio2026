"use client";
import { useEffect, useState } from "react";

export default function ShuffleText({ text = "Developer | Engineer | Designer", delay = 50 }) {
  const [displayText, setDisplayText] = useState(text);
  // Using a cleaner character set to avoid weird rendering issues
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
  
  useEffect(() => {
    let count = 0;
    const originalText = text;
    
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " "; // Don't shuffle spaces
            if (index < Math.floor(count)) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (count >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
      }
      count += 0.4; 
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  // Explicitly set the text color here to override selection styles
  return <span className="text-black tracking-widest inline-block">{displayText}</span>;
}