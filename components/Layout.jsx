import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Track scroll position for navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);

            // Determine active section based on scroll position
            const sections = ['about', 'schedule', 'guides', 'venue', 'registration'];

            for (const section of sections) {
                const element = document.getElementById(section);
                if (!element) continue;

                const rect = element.getBoundingClientRect();
                const offset = 100; // Adjust based on navbar height

                if (rect.top <= offset && rect.bottom >= offset) {
                    setActiveSection(section);
                    break;
                }

                // If we're at the top of the page
                if (window.scrollY < 100) {
                    setActiveSection('');
                }

                // If we're at the bottom of the page
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                    setActiveSection('registration');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when section is clicked
    const handleNavClick = (sectionId) => {
        setIsMenuOpen(false);
        setActiveSection(sectionId.replace('#', ''));
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 bg-white shadow-sm ${isScrolled ? 'py-2' : 'py-4'}`}
        >
            <div className="container-custom flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="logo-container relative z-10"
                >
                    <Link href="/">
                        <span className="text-2xl font-bold text-primary flex items-center">
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="relative"
                            >
                                <img 
                                    src="/images/logo.png" 
                                    alt="Sanjeevani Logo" 
                                    className="h-10 w-auto"
                                />
                            </motion.span>
                        </span>
                    </Link>
                </motion.div>

                {/* Mobile menu button */}
                <div className="block md:hidden relative z-20">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        className={`focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md p-2 transition-colors ${isMenuOpen
                            ? 'bg-primary text-white'
                            : 'text-primary hover:bg-primary/5'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ?
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path> :
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            }
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                    {[
                        { name: 'About', href: '#about', id: 'about' },
                        { name: 'Schedule', href: '#schedule', id: 'schedule' },
                        { name: 'Guides', href: '#speakers', id: 'guides' },
                        { name: 'Venue', href: '#venue', id: 'venue' },
                        { name: 'Registration', href: '#registration', id: 'registration' }
                    ].map((item) => {
                        const isActive = activeSection === item.id;

                        return (
                            <motion.div
                                key={item.name}
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a
                                    href={item.href}
                                    className={`text-sm lg:text-base font-medium px-3 py-2 rounded-md transition-all duration-300 inline-block
                    ${isActive
                                            ? 'text-primary'
                                            : 'text-neutral-800 hover:text-primary hover:bg-neutral-50'
                                        }`
                                    }
                                    onClick={() => handleNavClick(item.href)}
                                >
                                    {item.name}
                                </a>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 mx-3 bg-primary"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                    <div className="pl-2 lg:pl-4">
                        <motion.a
                            href="#registration"
                            className="btn-primary text-sm lg:text-base px-5 py-2.5"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register Now
                        </motion.a>
                    </div>
                </nav>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-10 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Menu panel */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl z-20 md:hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center p-5 border-b border-neutral-100">
                                <span className="text-xl font-bold text-primary flex items-center">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="Sanjeevani Logo" 
                                        className="h-8 w-auto"
                                    />
                                </span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 focus:outline-none"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="py-5 px-2 flex-1 overflow-y-auto">
                                <ul className="space-y-1">
                                    {[
                                        { name: 'About', href: '#about', id: 'about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                        { name: 'Schedule', href: '#schedule', id: 'schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                                        { name: 'Guides', href: '#speakers', id: 'guides', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                                        { name: 'Venue', href: '#venue', id: 'venue', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
                                        { name: 'Registration', href: '#registration', id: 'registration', icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4' }
                                    ].map((item) => {
                                        const isActive = activeSection === item.id;

                                        return (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                                        ? 'bg-primary/10 text-primary font-medium'
                                                        : 'hover:bg-neutral-50 text-neutral-800'
                                                        }`}
                                                    onClick={() => handleNavClick(item.href)}
                                                >
                                                    <svg className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-neutral-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                                                    </svg>
                                                    {item.name}
                                                    {isActive && (
                                                        <span className="ml-auto">
                                                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </span>
                                                    )}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="p-5 border-t border-neutral-100 bg-neutral-50">
                                <a
                                    href="#registration"
                                    className="btn-primary w-full py-3 flex items-center justify-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Register Now
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-16 pb-8">
            <div className="container-custom">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-[100px] pb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center space-x-3 ml-5">
                            <img 
                                src="/images/logo-light.png" 
                                alt="Sanjeevani Logo" 
                                className="h-10 w-auto scale-[1.5]"
                            />
                        </div>

                        <p className="text-gray-300 leading-relaxed mt-4">
                            Follow the Path of Sanjeevani. Return not just healthier, but transformed through the ancient wisdom of Ayurveda and holistic wellness.
                        </p>

                        <div className="flex space-x-4 pt-2">
                            {[
                                { name: 'facebook', icon: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
                                { name: 'instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                                { name: 'twitter', icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                                { name: 'youtube', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' }
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-neutral-700 hover:bg-accent flex items-center justify-center transition-colors duration-300"
                                    aria-label={item.name}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d={item.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-lg font-semibold text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-accent">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {['About', 'Schedule', 'Guides', 'Venue', 'Registration'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center"
                                    >
                                        <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-lg font-semibold text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-accent">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="mt-1 mr-3 w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Location</p>
                                    <p className="text-gray-300">Solan, Himachal Pradesh</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mt-1 mr-3 w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Email</p>
                                    <a href="mailto:info@sanjeevaniworkshop.com" className="text-gray-300 hover:text-accent transition-colors">mail2movingworld@gmail.com</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mt-1 mr-3 w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Phone</p>
                                    <a href="tel:+919876543210" className="text-gray-300 hover:text-accent transition-colors">+91 85100-17177</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Organised By Column */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-lg font-semibold text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-accent">
                            Organised By
                        </h4>
                        <div className="flex flex-col">
                            <div className="bg-white p-3 rounded-lg shadow-lg w-36 h-36 flex items-center justify-center mb-4 p-0">
                                <img
                                    src="/images/moving-world.jpg"
                                    alt="Moving World Logo"
                                    className="max-w-full max-h-full object-cover scale-100 origin-center rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-white font-medium">Moving World, New Delhi</p>
                                <p className="text-gray-400 text-sm">in association with</p>
                                <p className="text-gray-300">Sewa Shikshan Sansthan, Solan, Himachal Pradesh</p>
                            </div>
                            <div className="mt-4">
                                <a
                                    href="#registration"
                                    className="inline-flex items-center text-accent hover:text-white transition-colors duration-300"
                                >
                                    <span>Register for the Workshop</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-neutral-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} Sanjeevani Workshop. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">FAQ</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Sanjeevani - Rediscovering Health, Harmony & the Vedic Way of Living</title>
                <meta name="description" content="A Transformational Wellness Retreat with Vaidya Rajesh Kapoor" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="overflow-x-hidden w-full">
                <Header />
                <main className="min-h-screen pt-16 w-full overflow-x-hidden">{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
