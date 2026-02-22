"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { waterVertexShader, waterFragmentShader } from '../shaders/shader';
import { motion } from 'framer-motion';
import Splitting from 'splitting';

const VideoHero = () => {
  const mountRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    Splitting();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const videoTexture = new THREE.VideoTexture(videoRef.current);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTexture: { value: videoTexture },
      },
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.uTime.value += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (event) => {
      material.uniforms.uMouse.value.x = (event.clientX / window.innerWidth) * 2 - 1;
      material.uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const title = "John Doe";
  const subtitle = "Creative Developer";

  return (
    <section className="relative h-screen">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
        <div className="text-center text-white">
            <h1 className="text-6xl font-bosch" data-splitting>
                {title.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100, rotate: Math.random() * 360 - 180, opacity: 0 }}
                        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                        style={{ display: 'inline-block' }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </h1>
            <p className="text-xl font-roboto" data-splitting>
                {subtitle.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, rotate: Math.random() * 180 - 90, opacity: 0 }}
                        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        transition={{ delay: (title.length + index) * 0.05, duration: 0.5, ease: "easeOut" }}
                        style={{ display: 'inline-block' }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </p>
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
