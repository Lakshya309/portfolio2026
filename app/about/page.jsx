"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CreativeNav from "../../components/CreativeNav";
import { Timeline } from "../../components/ui/timeline";
import { projects } from "../data";
import Image from "next/image";

const AboutPage = () => {
  // GROUP PROJECTS
  const projectsByYear = projects.reduce((acc, project) => {
    acc[project.year] = acc[project.year] || [];
    acc[project.year].push(project);
    return acc;
  }, {});

  const years = Object.keys(projectsByYear).sort((a, b) => b - a);

  /* ---------------- HORIZONTAL SCROLL SETUP ---------------- */
  const horizontalRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  /* ---------------- TIMELINE DATA ---------------- */
  const timelineData = years.map((year) => ({
    title: year,
    content: (
      <div className="space-y-12">
        {projectsByYear[year].map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-cornsilk rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl text-tea_green-100 uppercase mb-2 font-galgo">
              {project.title}
            </h3>

            <p className="text-sm md:text-base text-tea_green-100/70 leading-relaxed mb-6 font-roboto">
              {project.longDescription}
            </p>

            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              className="rounded-2xl object-cover w-full"
            />
          </motion.div>
        ))}
      </div>
    ),
  }));

  return (
    <div className="bg-tea_green-100 text-cornsilk selection:bg-light_bronze selection:text-tea_green-100">
      <CreativeNav />

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[12vw] md:text-[8vw] leading-none font-bosch">
            MY
            <br />
            <span className="text-light_bronze">JOURNEY</span>
          </h1>

          <p className="max-w-xl mt-8 text-cornsilk/70 uppercase text-sm tracking-widest font-roboto">
            From experiments to systems — this is how I build, break, and scale.
          </p>
        </motion.div>
      </section>

      {/* ================= HORIZONTAL SCROLL ================= */}
      <section ref={horizontalRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-16 h-full items-center px-24"
          >
            {years.map((year) => (
              <div
                key={year}
                className="min-w-[60vw] bg-cornsilk text-tea_green-100 rounded-[48px] p-16"
              >
                <span className="text-[10vw] text-light_bronze opacity-20">
                  {year}
                </span>

                <h2 className="text-4xl uppercase mb-6 font-galgo">
                  Work in {year}
                </h2>

                <p className="text-tea_green-100/70 max-w-md font-roboto">
                  {projectsByYear[year].length} major builds focusing on
                  architecture, performance, and UX systems.
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="bg-papaya_whip text-tea_green-100 py-32">
        <Timeline data={timelineData} />
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="py-40 px-6 md:px-24 bg-tea_green-100 text-cornsilk">
        <motion.blockquote
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl max-w-4xl leading-tight font-galgo"
        >
          I don’t just ship features.
          <br />
          <span className="text-light_bronze font-bosch">
            I design systems that evolve.
          </span>
        </motion.blockquote>
      </section>
    </div>
  );
};

export default AboutPage;
