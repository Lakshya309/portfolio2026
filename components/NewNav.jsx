"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Projects', href: '/projects' },
  { title: 'Contact', href: '/contact' },
]

const menuVariants = {
  hidden: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    x: '0%',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

const linkContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const NewNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8">
        <nav className="flex justify-between items-center">
          <div className="text-7xl font-bosch">
            <Link href="/">
              LT
            </Link>
          </div>
          <div className="hidden md:flex space-x-12 items-center font-bold tracking-widest font-galgo text-4xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                {link.title}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="z-50 relative w-8 h-8"
              aria-label="Toggle menu"
            >
              <div className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'transform -rotate-45' : ''}`} />
              <div className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'transform rotate-45' : ''}`} />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full space-y-12"
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navLinks.map((link, index) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="text-4xl font-galgo text-white"
                    onClick={toggleMenu}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NewNav