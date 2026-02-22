"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { title: 'Home', href: '/', img: '/home.jpg' },
  { title: 'About', href: '/about', img: '/about.jpg' },
  { title: 'Work', href: '/work', img: '/work.jpg' },
  { title: 'Contact', href: '/contact', img: '/contact.jpg' },
];

const menuVariants = {
    hidden: {
        opacity: 0,
        clipPath: 'circle(0% at 50% 50%)',
        transition: {
            duration: 0.8,
            ease: [0.77, 0, 0.175, 1],
        },
    },
    visible: {
        opacity: 1,
        clipPath: 'circle(100% at 50% 50%)',
        transition: {
            duration: 0.8,
            ease: [0.77, 0, 0.175, 1],
        },
    },
};

const MagneticLink = ({ children, href, onMouseEnter, onMouseLeave }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) * 0.2;
        const y = (clientY - top - height / 2) * 0.2;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                handleMouseLeave();
                onMouseLeave();
            }}
            onMouseEnter={onMouseEnter}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Link href={href}>{children}</Link>
        </motion.div>
    );
};

const CreativeNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(navLinks[0].img);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8">
                <nav className="flex justify-between items-center">
                    <div className="text-7xl font-bosch">
                        <Link href="/">
                            LT
                        </Link>
                    </div>
                              <button
                                onClick={toggleMenu}
                                className="z-50 relative w-12 h-12 flex items-center justify-center"
                                aria-label="Toggle menu"
                              >
                                <motion.span
                                  className="relative block w-8 h-0.5 bg-white before:absolute before:block before:w-full before:h-full before:bg-white after:absolute after:block after:w-full after:h-full after:bg-white"
                                  animate={{
                                    backgroundColor: isOpen ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
                                  }}
                                >
                                  <motion.span
                                    className="absolute block w-full h-full bg-white"
                                    initial={false}
                                    animate={{
                                      y: isOpen ? 0 : -8,
                                      rotate: isOpen ? 45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  />
                                  <motion.span
                                    className="absolute block w-full h-full bg-white"
                                    initial={false}
                                    animate={{
                                      y: isOpen ? 0 : 8,
                                      rotate: isOpen ? -45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  />
                                </motion.span>
                              </button>                </nav>
            </header>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-black"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="flex h-full">
                            <div className="w-1/2 flex flex-col items-center justify-center space-y-12">
                                {navLinks.map((link, index) => (
                                    <MagneticLink
                                        key={link.href}
                                        href={link.href}
                                        onMouseEnter={() => setActiveImage(link.img)}
                                        onMouseLeave={() => setActiveImage(navLinks[0].img)}
                                    >
                                        <motion.div
                                            className="text-6xl font-galgo text-white"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                        >
                                            {link.title}
                                        </motion.div>
                                    </MagneticLink>
                                ))}
                            </div>
                            <div className="w-1/2 relative">
                                <AnimatePresence>
                                    <motion.div
                                        key={activeImage}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image
                                            src={activeImage}
                                            alt="Navigation"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CreativeNav;
