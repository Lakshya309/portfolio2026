"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import NewNav from "../../../components/NewNav";

export default function ContactFormPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isConsultation = type?.includes("consultation");

  return (
    <main className="bg-light_bronze text-cornsilk min-h-screen">
      {/* NAV */}
      <div className="relative z-50">
        <NewNav />
      </div>

      {/* BANNER */}
      <section className="px-6 md:px-20 pt-32 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10vw] md:text-[4.5vw] leading-none font-bosch"
        >
          Wanna hire me?
        </motion.h1>

        <p className="mt-6 max-w-2xl text-cornsilk/70 text-lg font-roboto">
          I’m actively looking for internship opportunities in{" "}
          <span className="text-cornsilk font-roboto">
            AI, Machine Learning, GenAI, and Full-Stack Development
          </span>
          . If you’re building something meaningful, I’d love to be a part of it.
        </p>
      </section>

      {/* FORM */}
      <section className="px-6 md:px-20 pb-40">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl border border-cornsilk/30 rounded-[32px] p-10 md:p-14 space-y-10"
        >
          {/* HEADER */}
          <div>
            <h2 className="text-3xl font-galgo">
              {isConsultation
                ? "Project consultation"
                : "General inquiry"}
            </h2>
            <p className="text-cornsilk/60 mt-2 font-roboto">
              {isConsultation
                ? "Tell me about your project, goals, and expectations."
                : "Let’s start a conversation."}
            </p>
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm text-cornsilk/60 font-roboto">
              Your name
            </label>
            <input
              required
              className="mt-2 w-full bg-transparent border-b border-cornsilk/40 focus:border-cornsilk outline-none py-3 font-roboto"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-cornsilk/60 font-roboto">
              Email address
            </label>
            <input
              type="email"
              required
              className="mt-2 w-full bg-transparent border-b border-cornsilk/40 focus:border-cornsilk outline-none py-3 font-roboto"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm text-cornsilk/60 font-roboto">
              {isConsultation
                ? "Project details"
                : "Your message"}
            </label>
            <textarea
              rows={4}
              placeholder={
                isConsultation
                  ? "Timeline, scope, tech stack, expectations…"
                  : "What’s on your mind?"
              }
              className="mt-2 w-full bg-transparent border-b border-cornsilk/40 focus:border-cornsilk outline-none py-3 resize-none font-roboto"
            />
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-4 border border-cornsilk/50 rounded-full px-8 py-4 text-sm font-roboto"
          >
            Send message
            <span className="text-lg">→</span>
          </motion.button>
        </motion.form>
      </section>
    </main>
  );
}
