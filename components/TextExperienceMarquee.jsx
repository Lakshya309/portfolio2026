"use client";
import { motion } from "framer-motion";

const TechExperienceMarquee = () => {
    const tech = ["NEXT.JS", "FASTAPI", "PYTORCH", "FLUTTER", "PGVECTOR", "KAFKA", "SUPABASE"];
    return (
      <div className="py-12 bg-papaya_whip overflow-hidden whitespace-normal flex border-y border-light_bronze/30">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-20 pr-20"
        >
          {[...tech, ...tech].map((item, i) => (
            <span key={i} className="text-7xl text-light_bronze cursor-default">
              {item}
            </span>
          ))}
        </motion.div>
        <style jsx>{`
          .stroke-text { -webkit-text-stroke: 1px #d4a373; }
        `}</style>
      </div>
    );
  };

  export default TechExperienceMarquee;