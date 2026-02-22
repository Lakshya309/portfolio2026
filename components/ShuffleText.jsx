"use client";
import { useEffect, useState } from "react";

export default function ShuffleText({ textLine1 = "DEFAULT LINE 1", textLine2 = "DEFAULT LINE 2", delay = 50 }) {
  const [displayText1, setDisplayText1] = useState(textLine1);
  const [displayText2, setDisplayText2] = useState(textLine2);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
  
  useEffect(() => {
    let count1 = 0;
    let count2 = 0;
    const originalText1 = textLine1;
    const originalText2 = textLine2;

    const interval1 = setInterval(() => {
      setDisplayText1(
        originalText1
          .split("")
          .map((char, index) => {
            if (char === " ") return " "; 
            if (index < Math.floor(count1)) return originalText1[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (count1 >= originalText1.length) {
        clearInterval(interval1);
        setDisplayText1(originalText1);
      }
      count1 += 0.4; 
    }, delay);

    const interval2 = setInterval(() => {
      setDisplayText2(
        originalText2
          .split("")
          .map((char, index) => {
            if (char === " ") return " "; 
            if (index < Math.floor(count2)) return originalText2[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (count2 >= originalText2.length) {
        clearInterval(interval2);
        setDisplayText2(originalText2);
      }
      count2 += 0.4; 
    }, delay);


    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    }
  }, [textLine1, textLine2, delay]);

  return (
    <div>
      <span className="font-galgo text-black tracking-widest block">{displayText1}</span>
      <span className="font-bosch text-black tracking-widest block">{displayText2}</span>
    </div>
  );
}