import { motion } from 'framer-motion';

const AboutSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="section-padding bg-neutral-50 w-full overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 block">About The Workshop</span>
          <h2 className="heading-lg text-primary mb-6">Discover the Ancient Science of Self-Healing</h2>
          <p className="text-lg text-neutral-700 leading-relaxed">
            In a world burdened by modern ailments, distractions, and stress, ancient India holds the key to healing.
            Join renowned Ayurvedic expert Vaidya Rajesh Kapoor for this 2-day immersive journey into self-healing, 
            lifestyle transformation, and ancient Indian wisdom — blending Ayurveda, Panchgavya, Yoga and Indigenous Nutrition.
          </p>
          <p className="text-lg font-medium text-primary mt-6">
            This is more than a workshop. It's a homecoming to nature, tradition and the self.
          </p>
        </motion.div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8 text-neutral-800">What You'll Learn & Experience</h3>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                title: "Panchgavya Healing",
                description: "The Science of Indigenous Cows and their gifts for human wellness and healing",
                icon: "🐄",
                color: "bg-amber-50"
              },
              {
                title: "Ayurveda for Healing",
                description: "Ancient wisdom for managing modern lifestyle disorders and achieving balance",
                icon: "🌿",
                color: "bg-green-50"
              },
              {
                title: "Indigenous Agriculture",
                description: "Zero-Chemical Nutrition and sustainable farming techniques for optimal health",
                icon: "🌱",
                color: "bg-lime-50"
              },
              {
                title: "Yogic Detox",
                description: "Pranayama, elemental healing techniques and purification practices",
                icon: "🧘‍♂️",
                color: "bg-blue-50"
              },
              {
                title: "Vedic Fire Rituals",
                description: "Experience the transformative power of Agnihotra and guided meditation",
                icon: "🔥",
                color: "bg-orange-50"
              },
              {
                title: "Sattvic Experience",
                description: "Desi herb tastings, traditional meals and culinary wisdom for vitality",
                icon: "🍲",
                color: "bg-yellow-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`${item.color} p-6 sm:p-8 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 card-hover border border-slate-100`}
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h4 className="text-xl font-semibold text-neutral-800 mb-3">{item.title}</h4>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12 p-6 rounded-lg bg-secondary/10 max-w-2xl mx-auto"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L13.414 4 14 4.586a1 1 0 01-1.414 1.414L11.586 5 11 4.414A1 1 0 0112 3zm0 10a1 1 0 01.707.293l.707.707 1.414-1.414.586-.586a1 1 0 111.414 1.414l-.586.586-2.414 2.414a1 1 0 01-1.414 0l-2.414-2.414a1 1 0 010-1.414l.586-.586A1 1 0 0112 13z" clipRule="evenodd" />
              </svg>
              <span className="text-secondary font-semibold text-lg">Special Takeaway</span>
            </div>
            <p className="text-neutral-700">Each participant will receive their own <strong>Panchgavya Healing Kit</strong> with essential items for continuing the practices at home.</p>
          </motion.div>
          
          <motion.div 
            className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a href="#registration" className="btn-primary">
              Secure Your Spot Now
            </a>
            {/* <a href="#schedule" className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors">
              View Full Schedule →
            </a> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 