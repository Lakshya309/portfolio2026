"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Services() {
  /* ---------- CURSOR TRACKING ---------- */
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const inverseX = useTransform(mouseX, (v) => v * -0.15);
  const inverseY = useTransform(mouseY, (v) => v * -0.15);

  /* ---------- VARIANTS ---------- */
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const ctaWord = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.08,
      y: -6,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="services"
      className="px-6 md:px-16 py-24 bg-tea_green"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[85vh]">

        {/* ---------- MAIN BENTO ---------- */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-8 bg-tea_green-900 rounded-[48px] p-12 relative overflow-hidden"
        >
          <h3 className="text-beige md:text-7xl uppercase leading-none">
            Creative <br /> Architecture
          </h3>

          <p className="text-beige max-w-sm uppercase font-bold text-s mt-6">
            Systems engineered for scale, performance & motion.
          </p>

          {/* Always rotating plus */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -right-10 text-[18vw] text-cornsilk/10 select-none"
          >
            +
          </motion.div>
        </motion.div>

        {/* ---------- MOTION DESIGN ---------- */}
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          variants={fadeUp}
          className="md:col-span-4 bg-light_bronze rounded-[48px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          {/* Circle */}
          <motion.div
            style={{ x: inverseX, y: inverseY }}
            className="w-24 h-24 border-4 border-tea_green-900 rounded-full absolute"
          />

          {/* Plus */}
          <motion.div
            style={{ x: inverseY, y: inverseX }}
            className="absolute text-5xl text-tea_green-900"
          >
            +
          </motion.div>

          <h3 className="relative z-10 text-tea_green-900 text-9xl uppercase">
            Motion Design
          </h3>
        </motion.div>

        {/* ---------- FULL STACK / KINETIC TYPOGRAPHY ---------- */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-4 border-2 border-tea_green-900 rounded-[48px] p-10 flex items-end overflow-hidden"
        >
          <motion.h3
            animate={{ backgroundPositionX: ["0%", "200%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="text-9xl font-semibold uppercase bg-gradient-to-r from-tea_green-900 via-light_bronze to-tea_green-900 bg-[length:200%] bg-clip-text text-transparent"
          >
            Full Stack Strategy
          </motion.h3>
        </motion.div>

        {/* ---------- CTA ---------- */}
        <motion.div
          variants={fadeUp}
          initial="rest"
          whileHover="hover"
          className="md:col-span-8 bg-tea_green-900 rounded-[48px] p-14 text-light_bronze cursor-pointer overflow-hidden"
        >
          <motion.div variants={{ hover: { transition: { staggerChildren: 0.08 } } }}>
            {["Ready", "To", "Scale?"].map((word) => (
              <motion.h2
                key={word}
                variants={ctaWord}
                className="text-7xl md:text-6xl uppercase leading-tight"
              >
                {word}
              </motion.h2>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}
