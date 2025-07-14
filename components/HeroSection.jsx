import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const targetRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/heroCrousel/vaidya-rajesh.jpg",
    "/images/heroCrousel/Crousel2.jpg",
    "/images/heroCrousel/Crousel3.jpg",
    "/images/heroCrousel/Crousel4.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section
      ref={targetRef}
      className="relative overflow-hidden"
      id="home"
    >
      <div className="hidden lg:block min-h-[95vh] object-contain">
        <div className="absolute ml-0 mr-[30%] inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src={image}
                alt={`Carousel Image ${index + 1}`}
                fill
                className="object-cover object-center scale-[1.006]"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 h-screen flex items-center">
          <div className="w-1/2"></div>
          <div className="w-1/2 h-full flex items-center justify-end relative">
            <div className="h-[120vh] ml-[3rem] flex justify-end inset-0 bg-white bg-opacity-100 rounded-l-[50%] shadow-2xl border-[#d0e49b] border-[10px] scale-105 overflow-hidden">
              <motion.div
                className="relative z-10 h-full flex flex-col justify-center px-16 py-12"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item} className="flex justify-end mb-8">
                  <div className="relative w-72 h-24">
                    <Image
                      src="/images/logo.png"
                      alt="Sanjeevani Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                <motion.div variants={item} className="text-right space-y-6">
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-9">
                    Rediscovering Health & Harmony<br />
                    <span className="block text-3xl">The Vedic Way of Living</span>
                  </h1>
                  <p className="text-xl font-[2rem] text-gray-700">
                    A Transformational Wellness Retreat with
                  </p>
                  <div className="inline-block bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold">
                    Vaidya Rajesh Kapoor
                  </div>
                </motion.div>
                <motion.div variants={item} className="bg-gray-700 bg-opacity-70 text-white rounded-2xl p-4 mt-8">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lime-400 font-semibold mb-1">Location</p>
                      <p className="text-sm">Solan, HP</p>
                    </div>
                    <div>
                      <p className="text-lime-400 font-semibold mb-1">Dates</p>
                      <p className="text-sm">10-12 October 2025</p>
                    </div>
                    <div>
                      <p className="text-lime-400 font-semibold mb-1">Format</p>
                      <p className="text-sm">Residential Workshop</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={item} className="flex space-x-4 justify-end mt-8">
                  <motion.a
                    href="#registration"
                    className="bg-[#d0e49b] hover:bg-lime-300 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reserve Your Spot Now
                  </motion.a>
                  <motion.a
                    href="#about"
                    className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative h-[125vh]">
        {/* Background Image */}
        <div className="absolute inset-0 mb-[45vh]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src={image}
                alt={`Carousel Image ${index + 1}`}
                fill
                className="object-cover scale-100"
                style={{ objectPosition: 'top' }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* White Card Container */}
        <div className="relative top-[27vh] z-10 px-4 ml-[-1rem] mr-[-1rem] flex flex-col justify-end items-center min-h-screen">
          <motion.div
            className="bg-white rounded-t-[50%] border-[#d0e49b] border-[5px] px-[30vw] w-[150vw] shadow-2xl p-6 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <motion.div
              variants={item}
              initial="hidden"
              animate="show"
              className="flex justify-center mb-6 mt-5"
            >
              <div className="relative w-48 h-16">
                <Image
                  src="/images/logo.png"
                  alt="Sanjeevani Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="text-center"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item} className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  Rediscovering Health & Harmony
                </h1>
                <h2 className="text-xl font-bold text-[#8a9c4a] mb-2">
                  The Vedic Way of Living
                </h2>
                <p className="text-gray-700">
                  A Transformational Wellness Retreat with
                </p>
                <div className="inline-block bg-[#d0e49b] text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                  Vaidya Rajesh Kapoor
                </div>
              </motion.div>

              {/* Info bar */}
              <motion.div
                variants={item}
                className="bg-gray-700 text-white rounded-xl p-3 mt-6"
              >
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="px-5">
                    <p className="text-lime-400 font-semibold text-xs mb-1">Location</p>
                    <p className="text-sm">Solan, HP</p>
                  </div>
                  <div className="px-3">
                    <p className="text-lime-400 font-semibold text-xs mb-1">Dates</p>
                    <p className="text-sm">10-12 Oct 2025</p>
                  </div>
                  <div className="px-5">
                    <p className="text-lime-400 font-semibold text-xs mb-1">Format</p>
                    <p className="text-sm text-right">Residential Workshop</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <div className="flex mt-10 flex-col space-y-3">
              <motion.a
                href="#registration"
                className="bg-[#d0e49b] hover:bg-lime-300 text-gray-900 px-6 py-3 rounded-full text-center font-semibold transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reserve Your Spot Now
              </motion.a>
              <motion.a
                href="#about"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3 rounded-full text-center font-semibold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;