"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ProjectInfo = ({ project, active }) => {
  const containerVariants = {
    active: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    inactive: {},
  };

  const itemVariants = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    inactive: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      key={project.title}
      initial="inactive"
      animate={active ? 'active' : 'inactive'}
      variants={containerVariants}
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none font-roboto`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full px-8">
        {/* Left Column */}
        <motion.div variants={itemVariants} className="lg:w-1/2 text-center lg:text-left">
          <motion.h2
            variants={containerVariants}
            className="text-7xl md:text-9xl font-bold"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
          >
            {project.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-3xl mt-6 leading-relaxed"
          >
            {project.shortDescription}
          </motion.p>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="lg:w-1/2 text-left bg-black bg-opacity-40 backdrop-blur-lg p-10 rounded-xl pointer-events-auto">
          <motion.h3 variants={itemVariants} className="text-4xl font-bold mb-6">About</motion.h3>
          <motion.p variants={itemVariants} className="mb-8 whitespace-pre-line text-lg leading-relaxed">{project.longDescription}</motion.p>
          
          <motion.h3 variants={itemVariants} className="text-4xl font-bold mb-6">Tech Stack</motion.h3>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
            {project.keyTech.map((tech) => (
              <span key={tech} className="bg-gray-700 text-white px-5 py-3 rounded-full text-base transition-transform hover:scale-110">
                {tech}
              </span>
            ))}
          </motion.div>

          {project.url && (
            <motion.div variants={itemVariants}>
              <h3 className="text-4xl font-bold mb-4">Website</h3>
              <a
                href={`https://${project.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-200 text-2xl flex items-center gap-2"
              >
                <span>{project.url}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectInfo;
