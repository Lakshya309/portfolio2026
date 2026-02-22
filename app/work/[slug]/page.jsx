"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const works = [
    {
      id: 1,
      title: 'Echoes of Tomorrow',
      slug: 'echoes-of-tomorrow',
      imageUrl: '/work1.jpg',
      description: 'This is a description for Echoes of Tomorrow.',
    },
    {
      id: 2,
      title: 'The Crimson Bloom',
      slug: 'the-crimson-bloom',
      imageUrl: '/work2.jpg',
      description: 'This is a description for The Crimson Bloom.',
    },
    {
      id: 3,
      title: 'Celestial Navigation',
      slug: 'celestial-navigation',
      imageUrl: '/work3.jpg',
      description: 'This is a description for Celestial Navigation.',
    },
    {
      id: 4,
      title: 'Whispers in the Static',
      slug: 'whispers-in-the-static',
      imageUrl: '/work4.jpg',
      description: 'This is a description for Whispers in the Static.',
    },
  ];

const WorkPage = ({ params }) => {
    const work = works.find((p) => p.slug === params.slug);

  if (!work) {
    return <div>Work not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div layoutId={`work-${work.id}`}>
        <h1 className="text-5xl font-bold text-center mb-12">{work.title}</h1>
        <div className="relative w-full h-[500px] mb-8">
          <Image
            src={work.imageUrl}
            alt={work.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg">{work.description}</p>
        </div>
      </motion.div>
      <div className="text-center mt-12">
        <Link href="/work" className="text-lg font-bold hover:underline">
          Back to Work
        </Link>
      </div>
    </div>
  );
};

export default WorkPage;
