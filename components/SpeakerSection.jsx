import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const SpeakerSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState([false, false, false, false]);
    const timerRef = useRef(null);

    const speakerImages = [
        '/images/vaidya-rajesh.jpg',
        '/images/Crousel2.jpg',
        '/images/Crousel3.jpg',
        '/images/Crousel4.jpg',
    ];

    useEffect(() => {
        // Check if images exist
        speakerImages.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setImagesLoaded(prev => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });
            };
        });

        // Auto-slide functionality
        timerRef.current = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % speakerImages.length);
        }, 5000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const nextSlide = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % speakerImages.length);
    };

    const prevSlide = () => {
        setActiveIndex(prevIndex => (prevIndex - 1 + speakerImages.length) % speakerImages.length);
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerItems = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <section id="speakers" className="section-padding bg-white">
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 block">Expert</span>
                    <h2 className="heading-lg text-primary mb-4">Meet Your Guide</h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                        Learn from one of India's most respected Ayurvedic practitioners
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeIn}
                        className="relative order-2 md:order-1"
                    >
                        <div className="relative z-10 overflow-hidden rounded-xl">
                            {/* Carousel Container */}
                            <div className="relative h-[300px] md:h-[500px] sm:h-[400px] overflow-hidden rounded-xl">
                                {speakerImages.map((src, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-500 ${activeIndex === index
                                            ? "opacity-100 z-10"
                                            : "opacity-0 z-0"
                                            }`}
                                    >
                                        {imagesLoaded[index] ? (
                                            <motion.img
                                                src={src}
                                                alt={`Speaker image ${index + 1}`}
                                                className="w-full h-full object-cover rounded-xl shadow-lg"
                                                style={{ objectPosition: 'top center' }}
                                                initial={{ scale: 1.05, originX: 0.5, originY: 1 }}
                                                animate={{ scale: 1 }}
                                            />
                                        ) : (
                                            <div className="rounded-xl shadow-lg w-full h-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary text-lg">Loading image...</span>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-colors"
                                    aria-label="Previous slide"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-colors"
                                    aria-label="Next slide"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                                    {speakerImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2.5 h-2.5 rounded-full transition-colors ${activeIndex === index
                                                ? "bg-primary"
                                                : "bg-white/70 hover:bg-white"
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 bg-accent w-24 h-24 rounded-full opacity-20 -mr-8 -mt-8 z-0"></div>
                            <div className="absolute bottom-0 left-0 bg-secondary w-32 h-32 rounded-full opacity-20 -ml-10 -mb-10 z-0"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeIn}
                        className="order-1 md:order-2"
                    >
                        <h2 className="heading-lg text-primary mb-4">Vaidya Rajesh Kapoor</h2>
                        <p className="text-neutral-700 mb-6 leading-relaxed">
                            With over five decades of research and service, Vaidya Rajesh Kapoor is one of India's foremost Ayurvedic scholars, a torchbearer of Panchgavya healing, and a mentor to thousands across India.
                        </p>
                        <p className="text-neutral-700 mb-6 leading-relaxed">
                            Based in Solan, Himachal Pradesh, he bridges Vedic science with practical healing for modern lives. His approach combines traditional wisdom with contemporary understanding to address the root causes of modern lifestyle disorders.
                        </p>

                        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
                            <motion.div
                                className="bg-primary/10 rounded-lg p-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <a href="#registration" className="btn-primary inline-flex items-center w-full justify-center">
                                    <span>Learn with Vaidya Kapoor</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </motion.div>

                            <motion.div
                                className="bg-red-600 rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <a
                                    href="https://youtube.com/@vaidyarajeshkapoor-official?si=jAgPmjDlYJgBuVr5"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 text-white font-medium rounded-md inline-flex items-center w-full justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    <span>Watch on YouTube</span>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10"></div>
        </section>
    );
};

export default SpeakerSection;
