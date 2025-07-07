import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(true); // Default to true to show something immediately

  // No useEffect needed with this approach

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section
      className="relative min-h-[95vh] flex items-center justify-center text-white overflow-hidden bg-[#e7e6db] w-full"
      id="hero"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url("/images/hero-bg.jpg")'
        }}
      ></div>

      {/* Optional overlay for mobile devices to ensure readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-0"></div>

      <motion.div
        className="container-custom text-center relative z-10 px-4 sm:px-6 py-20 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="mb-4 flex justify-center"
          variants={item}
        >
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72">
            {/* Logo with enhanced glow effect */}
            <div className="logo-glow-container">
              <Image
                src="/images/logo.png"
                alt="Sanjeevani Logo"
                fill
                sizes="(max-width: 640px) 12rem, (max-width: 768px) 15rem, 18rem"
                priority
                className="logo-glow object-contain"
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-100 mb-6 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Rediscovering Health, Harmony & the Vedic Way of Living
          </p>
        </motion.div>

        <motion.div variants={item}>
          <p className="text-lg md:text-2xl mb-8 text-gray-200">
            A Transformational Wellness Retreat with Vaidya Rajesh Kapoor
          </p>
        </motion.div>

        <motion.div
          className="mb-10 p-4 sm:p-5 bg-black/40 backdrop-blur-sm inline-block rounded-lg max-w-xl mx-auto"
          variants={item}
        >
          <p className="text-base sm:text-lg md:text-xl">
            <span className="block sm:inline">Solan, HP</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">10–12 October 2025</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Residential Workshop</span>
          </p>
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.a
            href="#registration"
            className="btn-accent text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve Your Spot Now
          </motion.a>

          <motion.a
            href="#about"
            className="text-white bg-transparent border-2 border-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-[0.85rem] rounded-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-0 right-0 text-center z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="cursor-pointer"
        >
          <a href="#about" aria-label="Scroll down">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
};

export default HeroSection; 