"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useAnimation, motion, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import Scene from '../Scene';
import ProjectInfo from '../ProjectInfo';
import { projects } from '../../app/data';
import Link from 'next/link';

const ProjectReel = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const inView = useInView(container, { once: true, amount: 0.2 });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [
      'inset(0% 0% 100% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(100% 0% 0% 0%)',
    ]
  );

  const discoverOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const newIndex = Math.floor(latest * projects.length);
      if (newIndex !== activeIndex && newIndex < projects.length) {
        setActiveIndex(newIndex);
      }
    });
  }, [scrollYProgress, activeIndex]);

  return (
    <motion.div
      ref={container}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { duration: 1 } },
        hidden: { opacity: 0 },
      }}
      className="relative h-[500vh] z-10"
    >
      <motion.div style={{ clipPath }} className="sticky top-0 h-screen">
        <Scene scrollYProgress={scrollYProgress} activeIndex={activeIndex} />
        {projects.map((project, i) => (
          <ProjectInfo
            key={i}
            project={project}
            active={i === activeIndex}
          />
        ))}
        <motion.div
          style={{ opacity: discoverOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Link href="/projects" className="text-black text-2xl hover:underline">
            Discover More
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectReel;
