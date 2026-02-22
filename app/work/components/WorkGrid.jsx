"use client"
import React from 'react';
import WorkItem from './WorkItem';
import { motion } from 'framer-motion';

const works = [
  {
    id: 1,
    title: 'Echoes of Tomorrow',
    slug: 'echoes-of-tomorrow',
    imageUrl: '/work1.jpg',
  },
  {
    id: 2,
    title: 'The Crimson Bloom',
    slug: 'the-crimson-bloom',
    imageUrl: '/work2.jpg',
  },
  {
    id: 3,
    title: 'Celestial Navigation',
    slug: 'celestial-navigation',
    imageUrl: '/work3.jpg',
  },
  {
    id: 4,
    title: 'Whispers in the Static',
    slug: 'whispers-in-the-static',
    imageUrl: '/work4.jpg',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const WorkGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {works.map((work) => (
        <WorkItem key={work.id} project={work} />
      ))}
    </motion.div>
  );
};

export default WorkGrid;
