import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const SpeakerSection = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Check if image exists
        const img = new Image();
        img.src = '/images/vaidya-rajesh.jpg';
        img.onload = () => setImageLoaded(true);
    }, []);

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
                            {imageLoaded ? (
                                <motion.img
                                    src="/images/vaidya-rajesh.jpg"
                                    alt="Vaidya Rajesh Kapoor"
                                    className="w-full h-auto rounded-xl shadow-lg transform transition-transform duration-500"
                                    initial={{ scale: 1.05 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.03 }}
                                />
                            ) : (
                                <div className="rounded-xl shadow-lg w-full aspect-[3/4] bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary text-lg">Loading image...</span>
                                </div>
                            )}

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 bg-accent w-24 h-24 rounded-full opacity-20 -mr-8 -mt-8 z-0"></div>
                            <div className="absolute bottom-0 left-0 bg-secondary w-32 h-32 rounded-full opacity-20 -ml-10 -mb-10 z-0"></div>
                        </div>

                        {/* <div className="bg-white shadow-md rounded-lg p-5 absolute bottom-6 right-0 md:right-6 z-20 max-w-[220px] transform rotate-2">
                    <p className="italic text-sm text-neutral-600">
                    "Ancient wisdom and modern science are not contradictory, but complementary pathways to wellness."
                    </p>
                    <p className="text-primary font-semibold text-right mt-2">- Vaidya Rajesh</p>
                    </div> */}
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

                        <motion.div
                            className="mt-8 bg-primary/10 rounded-lg p-1 inline-block"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <a href="#registration" className="btn-primary inline-flex items-center">
                                <span>Learn with Vaidya Kapoor</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10"></div>
        </section>
    );
};

export default SpeakerSection;
