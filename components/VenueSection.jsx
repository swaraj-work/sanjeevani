import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const VenueSection = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

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
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section id="venue" className="section-padding relative">
            <div className="absolute inset-0 z-0"
                style={{
                    backgroundColor: "#4B6F44",
                    backgroundAttachment: { md: "fixed" },
                }}
            />

            <div className="container-custom relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                    className="text-center text-white mb-16"
                >
                    <span className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 block">Location</span>
                    <h2 className="heading-lg mb-4">Venue</h2>
                    <h3 className="text-2xl font-medium mb-4">Solan, Himachal Pradesh</h3>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed">
                        A pristine retreat nestled in the lap of the Himalayas, this serene venue offers
                        breathtaking mountain views, fresh alpine air and soulful experiences away from urban chaos.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerItems}
                        className="backdrop-blur-sm bg-white/10 p-6 md:p-8 rounded-xl border border-white/20 text-white"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            Retreat Features
                        </h3>

                        <ul className="space-y-4">
                            {[
                                "Himalayan mountain views and fresh air",
                                "Eco-friendly accommodations with modern amenities",
                                "Peaceful meditation and yoga spaces",
                                "Organic garden and indigenous herb collection",
                                "Nature trails for morning and evening walks",
                                "Traditional kitchen for Sattvic food preparation"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start"
                                    variants={fadeIn}
                                >
                                    <svg className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="leading-relaxed">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-white/20">
                            <p className="italic text-white/80 text-sm">
                                "The energy of this place is rejuvenating. You'll feel the difference from the moment you arrive."
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeIn}
                        className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d930.452041345134!2d77.15124481557064!3d30.93299488453805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1751992238784!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full border-0 rounded-xl"
                            allowFullScreen=""
                            loading="lazy"
                            title="Pinned Map"
                            style={{ filter: "grayscale(20%) contrast(1.2)" }}
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span className="text-white font-medium">Solan, Himachal Pradesh</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mt-16 text-center text-white"
                >
                    <h3 className="text-xl font-bold mb-6">Who Should Attend</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                        {[
                            { title: "Wellness Seekers", icon: "❤️" },
                            { title: "Yoga Enthusiasts", icon: "🧘" },
                            { title: "Ayurveda Students", icon: "📚" },
                            { title: "Therapists & Healers", icon: "✨" },
                            { title: "Entrepreneurs", icon: "💼" },
                            { title: "Educators", icon: "🎓" },
                            { title: "Farmers", icon: "🌾" },
                            { title: "Spiritual Seekers", icon: "🕉️" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="backdrop-blur-sm bg-white/10 rounded-lg p-4 border border-white/20"
                            >
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <h4 className="text-sm sm:text-base font-medium">{item.title}</h4>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-lg mt-8 max-w-xl mx-auto font-light italic">
                        Anyone seeking holistic, transformative healing and a deeper connection with ancient wisdom
                    </p>
                </motion.div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
        </section>
    );
};

export default VenueSection;
