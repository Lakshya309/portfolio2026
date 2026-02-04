"use client";
import { motion } from "framer-motion";
import ShuffleText from "./ShuffleText";
import dynamic from "next/dynamic";

const Gradient = dynamic(() => import("./Gradient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full animate-pulse rounded-[60px]" />
  ),
});

export default function Hero() {
  const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const heroItem = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70 },
    },
  };

  return (
    <section className="min-h-screen pt-40 px-6 md:px-16 flex flex-col">
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <div className="flex flex-col md:flex-row items-baseline gap-4">
          <motion.h1
            variants={heroItem}
            className="text-[13vw] md:text-[11vw] leading-[0.8] uppercase text-[#071011]"
          >
            <ShuffleText text="Full Stack" />
          </motion.h1>
          <motion.span
            variants={heroItem}
            className="text-[#E6A835] text-xl md:text-5xl "
          >
            [2025]
          </motion.span>
        </div>
        <motion.h1
          variants={heroItem}
          className="text-[13vw] md:text-[11vw] leading-[0.8] text-[#071011] italic"
        >
          <ShuffleText text="Developer" />
        </motion.h1>
      </motion.div>

      <div className="relative mt-10 w-full h-[50vh] m-2vh md:h-[65vh] rounded-[30px] md:rounded-[60px] overflow-hidden">
        <Gradient />
      </div>
    </section>
  );
}
