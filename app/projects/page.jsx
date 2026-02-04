"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useAnimation, motion, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import Scene from '../../components/Scene';
import ProjectInfo from '../../components/ProjectInfo';
import { projects } from '../data';
import NewNav from '../../components/NewNav';

const ProjectsPage = () => {
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

  const numProjects = projects.length;
  const inputRange = [0];
  const backgroundColorOutputRange = ['#ccd5ae'];
  const colorOutputRange = ['#2d331a'];

  for (let i = 0; i < numProjects; i++) {
    const start = (i / numProjects) + (1 / (numProjects * 2));
    inputRange.push(start);
    backgroundColorOutputRange.push(i % 2 === 0 ? '#faedcd' : '#ccd5ae');
    colorOutputRange.push(i % 2 === 0 ? '#fefae0' : '#2d331a');
  }
  inputRange.push(1);
  backgroundColorOutputRange.push('#ccd5ae');
  colorOutputRange.push('#2d331a');


  const backgroundColor = useTransform(scrollYProgress, inputRange, backgroundColorOutputRange);
  const color = useTransform(scrollYProgress, inputRange, colorOutputRange);


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
    <>
      <NewNav />
      <motion.div
        ref={container}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { duration: 1 } },
          hidden: { opacity: 0 },
        }}
        className="relative h-[500vh] z-10"
        style={{ backgroundColor, color }}
      >
        <motion.div style={{ clipPath }} className="sticky top-0 h-screen">
          <div className="fixed top-0 left-0 w-full h-full border-[10px] border-cornsilk z-20 pointer-events-none" />
          <Scene scrollYProgress={scrollYProgress} activeIndex={activeIndex} />
          {projects.map((project, i) => (
            <ProjectInfo
              key={i}
              project={project}
              active={i === activeIndex}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProjectsPage;