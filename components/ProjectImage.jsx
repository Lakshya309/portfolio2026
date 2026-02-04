"use client";
import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { vertexShader, fragmentShader } from '../shaders/shader';
import { projects } from '../app/data';
import * as THREE from 'three';

const ImageMaterial = shaderMaterial(
  {
    uProgress: 0.0,
    uStrength: 0.0,
    uOpacity: 1.0,
    uTexture: null,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
  },
  vertexShader,
  fragmentShader
);

extend({ ImageMaterial });

const ProjectImage = ({ project, i, activeIndex, scrollYProgress }) => {
  const texture = useTexture(project.image);
  const ref = useRef();
  const meshRef = useRef();
  const { viewport } = useThree();

  const numProjects = projects.length;
  const progress = scrollYProgress;

  const color = new THREE.Color(project.color);

  useFrame(() => {
    const cardProgress = progress.get() * numProjects - i;
    const easedProgress = Math.max(0, Math.min(1, 1 - Math.abs(cardProgress)));

    ref.current.uProgress = easedProgress;
    ref.current.uStrength = activeIndex === i ? Math.sin(easedProgress * Math.PI) * 0.5 : 0;
    ref.current.uOpacity = Math.max(0, Math.min(1, 1 - Math.abs(cardProgress) * 2));
    ref.current.uColor = color;
    
    meshRef.current.position.z = -i + (activeIndex === i ? 0.1 : 0);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <imageMaterial
        ref={ref}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
};

export default ProjectImage;
