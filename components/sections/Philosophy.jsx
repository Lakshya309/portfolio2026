"use client";
import { motion } from "framer-motion";

export default function Philosophy() {
  const sentence = "I bridge the gap between technical complexity and creative elegance.";
  
  return (
    <section id="philosophy" className="min-h-[60vh] flex items-center justify-center px-6 md:px-16 py-40">
      <motion.p 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          visible: { transition: { staggerChildren: 0.02 } }
        }}
        className="text-4xl md:text-7xl uppercase leading-[0.9] max-w-6xl text-cornsilk font-roboto"
      >
        {sentence.split(" ").map((word, i) => (
          <motion.span 
            key={i}
            variants={{
              hidden: { opacity: 0.1, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="inline-block mr-[0.2em]"
          >
            {word === "complexity" ? (
              <span className="text-light_bronze font-galgo text-[7rem]">{word}</span>
              ) : word === "elegance" ? (<span className="text-light_bronze font-galgo text-[7rem]">{word}</span>):word}          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}