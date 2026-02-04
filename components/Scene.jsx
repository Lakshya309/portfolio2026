"use client";
import { Canvas } from '@react-three/fiber';
import { projects } from '../app/data';
import ProjectImage from './ProjectImage';

const Scene = ({ scrollYProgress, activeIndex }) => {
  return (
    <Canvas>
      <SceneContent scrollYProgress={scrollYProgress} activeIndex={activeIndex} />
    </Canvas>
  );
};

const SceneContent = ({ scrollYProgress, activeIndex }) => {
  return (
    <>
      {projects.map((project, i) => (
        <ProjectImage
          key={i}
          i={i}
          project={project}
          activeIndex={activeIndex}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </>
  );
};

export default Scene;
