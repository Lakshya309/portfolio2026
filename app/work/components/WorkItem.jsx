"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const WorkItem = ({ project }) => {
  return (
    <motion.div
      variants={item}
      layoutId={`project-${project.id}`}
      className="relative overflow-hidden rounded-lg group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Link href={`/work/${project.slug}`}>
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-3xl font-bold text-center">{project.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default WorkItem;
