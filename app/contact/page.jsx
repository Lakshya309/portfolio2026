"use client";
import { motion } from "framer-motion";
import Link from "next/link";


export default function ContactPage() {
  return (
    <main className="bg-light_bronze text-tea_green-100 overflow-hidden">
      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[12vw] md:text-[6vw] leading-none font-bosch"
        >
          Let’s talk about <br />
          <span className="font-roboto tracking-tight">
            your project
          </span>
        </motion.h1>
      </section>

      {/* CARD GRID */}
      <section className="px-6 md:px-20 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactCard
            index="01"
            title="General Inquiry"
            description="Collaborations, freelance work, or simply starting a conversation."
          />

          <ContactCard
            index="02"
            title="Project Consultation"
            description="Deep dives into scope, architecture, timelines, and execution."
          />
        </div>
      </section>
    </main>
  );
}

/* ---------- Card Component ---------- */

function ContactCard({ index, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover="hover"
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative border border-cornsilk/40 rounded-[32px] p-10 min-h-[320px] flex flex-col justify-between bg-light_bronze overflow-hidden group"
    >
      {/* INDEX */}
      <span className="absolute top-6 right-8 text-[10px] tracking-[0.3em] opacity-40">
        {index}
      </span>

      {/* TITLE */}
      <motion.h3
        variants={{
          hover: { y: -6 },
        }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-galgo"
      >
        {title}
      </motion.h3>

      {/* DESCRIPTION */}
      <motion.p
        variants={{
          hover: { y: -4 },
        }}
        transition={{ duration: 0.3 }}
        className="text-tea_green-100/70 text-base max-w-md font-roboto"
      >
        {description}
      </motion.p>

      {/* CTA */}
      <motion.div
        variants={{
          hover: { x: 12 },
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4 text-sm"
      >
<Link
  href={`/contact/form?type=${title
    .toLowerCase()
    .replace(" ", "-")}`}
  className="inline-flex items-center gap-3 text-sm group"
>
  <span className="group-hover:tracking-wide transition-all">
    Start here
  </span>
  <span className="text-xl group-hover:translate-x-1 transition-transform">
    →
  </span>
</Link>

      </motion.div>

      {/* HOVER GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-cornsilk/10 rounded-[32px]" />
      </div>
    </motion.div>
  );
}
