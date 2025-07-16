import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const targetRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  const images = [
    "/images/vaidya-rajesh.jpg",
    "/images/heroCrousel/hero1.jpg",
    "/images/heroCrousel/hero2.jpg",
    "/images/Crousel3.jpg",
    "/images/heroCrousel/hero4.jpg",
  ];

  // Detect window size and if we're in desktop mode on small screens
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Detect desktop mode on small screen (if width is > 992px but physical viewport is smaller)
      const isSmallScreenDesktopMode = window.innerWidth > 992 &&
        (window.screen.width < 768 || window.visualViewport?.width < 768);
      setIsDesktopMode(isSmallScreenDesktopMode);
    };

    // Set initially
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {/* Desktop Layout - Only show on large screens and not in desktop mode on mobile */}
      {!isDesktopMode && (
        <div className="hidden lg:block min-h-[95vh] object-contain">
          <div className="absolute ml-0 mr-[30%] inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                {index === currentImageIndex && (
                  <Image
                    src={image}
                    alt={`Carousel Image ${index + 1}`}
                    fill
                    className="object-cover object-center scale-[1.006]"
                    priority={index === 0}
                  />
                )}
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
                  <motion.div variants={item} className="flex justify-end mb-10 mt-[-2rem]">
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

                  {/* Seats left badge - Desktop */}
                  <motion.div
                    variants={item}
                    className="flex justify-end mt-5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                      delay: 1.2
                    }}
                  >
                    <div className="bg-red-600 text-white px-4 py-1.5 rounded-full inline-flex items-center text-sm font-bold shadow-lg">
                      <span className="inline-block h-3 w-3 bg-white rounded-full animate-pulse mr-2"></span>
                      Only 60 seats left
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Special layout for desktop mode on mobile */}
      {isDesktopMode && (
        <div className="block min-h-screen bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center">
              {/* Top section with logo and image side by side */}
              <div className="flex flex-col md:flex-row items-center w-full mb-8">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <div className="relative w-full h-64 overflow-hidden rounded-xl">
                    <Image
                      src={images[currentImageIndex]}
                      alt="Featured Image"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <div className="relative w-48 h-16">
                    <Image
                      src="/images/logo.png"
                      alt="Sanjeevani Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="w-full max-w-2xl mx-auto text-center space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Rediscovering Health & Harmony
                  <span className="block mt-2 text-2xl text-[#8a9c4a]">The Vedic Way of Living</span>
                </h1>

                <p className="text-lg text-gray-700">
                  A Transformational Wellness Retreat with
                </p>

                <div className="inline-block bg-primary text-white px-5 py-2 rounded-full text-base font-semibold">
                  Vaidya Rajesh Kapoor
                </div>

                {/* Info bar */}
                <div className="bg-gray-700 text-white rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lime-400 font-semibold text-xs mb-1">Location</p>
                      <p className="text-sm">Solan, HP</p>
                    </div>
                    <div>
                      <p className="text-lime-400 font-semibold text-xs mb-1">Dates</p>
                      <p className="text-sm">10-12 Oct 2025</p>
                    </div>
                    <div>
                      <p className="text-lime-400 font-semibold text-xs mb-1">Format</p>
                      <p className="text-sm">Residential</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#registration"
                    className="bg-[#d0e49b] hover:bg-lime-300 text-gray-900 px-6 py-3 rounded-full text-center font-semibold transition-all duration-300 shadow-md"
                  >
                    Reserve Your Spot Now
                  </a>
                  <a
                    href="#about"
                    className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3 rounded-full text-center font-semibold transition-all duration-300"
                  >
                    Learn More
                  </a>
                </div>

                {/* Seats left badge */}
                <div className="flex justify-center mt-4">
                  <div className="bg-red-600 text-white px-4 py-1.5 rounded-full inline-flex items-center text-sm font-bold shadow-lg">
                    <span className="inline-block h-3 w-3 bg-white rounded-full animate-pulse mr-2"></span>
                    Only 60 seats left
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout - Only show if not in desktop mode */}
      {!isDesktopMode && (
        <div className="lg:hidden relative">
          {/* Background Image Carousel - Full height */}
          <div className="relative z-0 overflow-hidden w-full h-full">
            <div className="relative h-screen w-full overflow-hidden">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${currentImageIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                  <Image
                    src={src}
                    alt={`Carousel Image ${index + 1}`}
                    fill
                    className="w-full h-auto object-cover"
                    style={{ objectPosition: 'center top' }}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
          </div>

          {/* White Card - Overlapping from bottom */}
          <div className="relative w-[150vw] ml-[-25vw] mt-[-35vh] flex justify-center">
            <motion.div
              className="bg-white rounded-t-[50%] border-[#d0e49b] border-t-8 shadow-2xl px-6 pt-8 pb-8 mx-auto"
              style={{
                marginTop: '-40px',
                width: 'calc(100% - 20px)',
                maxWidth: '600px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                className="flex justify-center mb-4"
              >
                <div className="relative w-40 h-12 sm:w-48 sm:h-16">
                  <Image
                    src="/images/logo.png"
                    alt="Sanjeevani Logo"
                    fill
                    className="object-contain "
                    priority
                  />
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                className="text-center px-20"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item} className="space-y-3 sm:space-y-4">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    Rediscovering Health & Harmony
                  </h1>
                  <h2 className="text-lg sm:text-xl font-bold text-[#8a9c4a]">
                    The Vedic Way of Living
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700">
                    A Transformational Wellness Retreat with
                  </p>
                  <div className="inline-block bg-[#d0e49b] text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    Vaidya Rajesh Kapoor
                  </div>
                </motion.div>

                {/* Info bar */}
                <motion.div
                  variants={item}
                  className="bg-gray-700 text-white rounded-lg p-3 mt-4 sm:mt-6"
                >
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
                    <div>
                      <p className="text-lime-400 font-semibold mb-1">Location</p>
                      <p>Solan, HP</p>
                    </div>
                    <div>
                      <p className="text-lime-400 font-semibold mb-1">Dates</p>
                      <p>10-12 Oct 2025</p>
                    </div>
                    <div>
                      <p className="text-lime-400 font-semibold mb-1">Format</p>
                      <p>Residential</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={item}
                className="flex flex-col px-20 space-y-3 sm:space-y-4 mt-6 sm:mt-8"
              >
                <motion.a
                  href="#registration"
                  className="bg-[#d0e49b] hover:bg-lime-300 text-gray-900 px-4 py-3 sm:px-6 sm:py-3 rounded-full text-center text-sm sm:text-base font-semibold transition-all duration-300 shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reserve Your Spot Now
                </motion.a>
                <motion.a
                  href="#about"
                  className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-4 py-3 sm:px-6 sm:py-3 rounded-full text-center text-sm sm:text-base font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.a>

                {/* Seats left badge - Mobile */}
                <motion.div
                  className="flex justify-center mt-4 sm:mt-5 mb-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    delay: 1.2
                  }}
                >
                  <div className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full inline-flex items-center text-xs sm:text-sm font-bold shadow-lg">
                    <span className="inline-block h-2 w-2 sm:h-3 sm:w-3 bg-white rounded-full animate-pulse mr-1 sm:mr-2"></span>
                    Only 60 seats left
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;