"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05, rotateY: 10, transition: { duration: 0.3 } }}
      className="bg-cornsilk rounded-lg shadow-lg overflow-hidden group"
    >
      <div className="relative">
        <img src={project.image} alt={project.title} className="w-full h-100 object-cover" />
        <div className="absolute inset-0 bg-tea_green-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/projects/${project.slug}`} className="text-tea_green text-lg font-bold hover:underline">
            View Project
          </Link>
        </div>
      </div>
      <div className="p-6">
        <h3 className={`text-2xl font-bold text-tea_green-900`}>{project.title}</h3>
        <p className="text-tea_green-300 mt-2">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.keyTech.map((tech, index) => (
            <span key={index} className="bg-beige text-tea_green-900 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
