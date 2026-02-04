"use client";
import { motion } from "framer-motion";


export default function Footer() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-cornsilk text-tea_green-100 px-6 md:px-20 py-16 overflow-hidden rounded-t-[64px]"
    >
      {/* BACKGROUND WORD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[28vw] tracking-tight text-light_bronze">
          CONNECT
        </span>
      </motion.div>

      {/* HEADER GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-7"
        >
          <h2
            className={`font-bosch text-5xl md:text-6xl uppercase leading-tight`}
          >
            Ready to <br />
            <span className="text-light_bronze font-galgo">d’Cypher</span>
            <br />
            the next build?
          </h2>
        </motion.div>

        {/* RIGHT META */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="md:col-span-5 flex flex-col items-end justify-between text-[10px] uppercase tracking-[0.3em]"
        >
          <span className="opacity-70">New Delhi, India</span>
          <span className="opacity-50">Available Worldwide</span>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.a
        href="mailto:lakshya.tekwani0309@gmail.com"
        initial="rest"
        whileHover="hover"
        className="relative z-10 mt-28 block"
      >
        <motion.div
          variants={{
            rest: { scale: 1, letterSpacing: "-0.05em" },
            hover: {
              scale: 1.07,
              letterSpacing: "0em",
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
          className="flex items-center gap-10"
        >
          <span className="text-[12vw] font-bosch md:text-[8vw] uppercase leading-none">
            Say Hello
          </span>

          <motion.span
            variants={{
              rest: { x: 0 },
              hover: { x: 24 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl text-light_bronze"
          >
            →
          </motion.span>
        </motion.div>
      </motion.a>

      {/* LINKS */}
      <div className="relative z-10 mt-10 flex flex-wrap gap-12 text-3xl uppercase tracking-wide font-galgo">
        {[
          ["LinkedIn", "https://linkedin.com/in/lakshyatekwani"],
          ["GitHub", "https://github.com/Lakshya309"],
          ["Resume", "#"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="group relative"
          >
            {label}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-light_bronze transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* FOOTER BAR */}
      <div className="relative z-10 mt-28 pt-8 border-t border-tea_green-100/20 flex justify-between items-end">
        <p className="text-[10px] uppercase tracking-widest opacity-40">
          Designed & Developed by Lakshya © 2025
        </p>

        <div className="flex items-center gap-6">
          <motion.div
            animate={{ width: ["32px", "72px", "32px"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-[2px] bg-light_bronze"
          />
          <span className="text-[10px] uppercase tracking-widest">
            Full Stack Engineer
          </span>
        </div>
      </div>
    </section>
  );
}
