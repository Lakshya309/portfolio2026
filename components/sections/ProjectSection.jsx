"use client";
import { motion } from 'framer-motion';
import { projects } from '../../app/data';
import ProjectCard from '../ProjectCard';

const ProjectSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      id="projects"
      className="px-6 md:px-16 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <h2 className="text-7xl font-galgo tracking-wide text-center text-cornsilk mb-12">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectSection;