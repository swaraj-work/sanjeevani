import { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ScheduleSection from '../components/ScheduleSection';
import VenueSection from '../components/VenueSection';
import RegistrationSection from '../components/RegistrationSection';
import SpeakerSection from '../components/SpeakerSection';

export default function Home() {
    useEffect(() => {
        // Add smooth scrolling for anchor links with offset for fixed header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                if (!target) return;

                // Update URL hash without scrolling
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }

                let headerOffset = 80; // Default offset

                // Adjust offset based on screen size
                if (window.innerWidth < 768) {
                    headerOffset = 60;
                }

                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });

        // Add intersection observer for sections to update active section in URL
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -80% 0px', // Consider element in view when it's 80px below the top
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id && id !== 'hero') { // Skip updating for hero section
                        if (history.replaceState) {
                            history.replaceState(null, null, `#${id}`);
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });

        // Handle direct navigation to anchor links
        const handleHashChange = () => {
            if (window.location.hash) {
                const targetId = window.location.hash;
                const target = document.querySelector(targetId);

                if (target) {
                    setTimeout(() => {
                        let headerOffset = 80;
                        if (window.innerWidth < 768) {
                            headerOffset = 60;
                        }

                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        };

        window.addEventListener('load', handleHashChange);
        return () => {
            window.removeEventListener('load', handleHashChange);
            sectionObserver.disconnect();
        };
    }, []);

    return (
        <Layout>
        <Head>
        <title>Sanjeevani Workshop - Rediscovering Health, Harmony & the Vedic Way of Living</title>
        <meta name="description" content="Join renowned Ayurvedic expert Vaidya Rajesh Kapoor for a 2-day immersive journey into self-healing, lifestyle transformation, and ancient Indian wisdom." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanjeevaniworkshop.com/" />
        <meta property="og:title" content="Sanjeevani Workshop - Rediscovering Vedic Wellness" />
        <meta property="og:description" content="A Transformational Wellness Retreat with Vaidya Rajesh Kapoor" />
        <meta property="og:image" content="/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sanjeevaniworkshop.com/" />
        <meta property="twitter:title" content="Sanjeevani Workshop - Rediscovering Vedic Wellness" />
        <meta property="twitter:description" content="A Transformational Wellness Retreat with Vaidya Rajesh Kapoor" />
        <meta property="twitter:image" content="/images/og-image.jpg" />
        </Head>

        <div className="w-full overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <ScheduleSection />
        <SpeakerSection />
        <VenueSection />
        <RegistrationSection />
        </div>
        </Layout>
    );
}
