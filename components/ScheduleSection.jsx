import { motion } from 'framer-motion';
import { useState } from 'react';

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(1);

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

  const scheduleData = {
    day1: [
      {description: 'Receiving of guest 02.00 p. m. onwards'},
      {description: 'Welcome drink on arrival'},
      {description: 'Heritage Garden tour at sharp 05.00 p. m.'},
      {description: 'Satvik Dinner 07.00 p.m.'},
      {description: 'Prelude of next two days programs 08.00 p.m.'}
    ],
    day2: [
      { event: "Sunrise Yoga & Pranayama", description: "Begin your journey with grounding yoga and breath work" },
      { event: "Vedic Inauguration Ceremony", description: "Traditional opening ritual to set intentions" },
      { event: "Panchgavya Deep Dive Session", description: "Learn the science and application of cow-derived healing elements" },
      { event: "Sattvic Lunch & Rest", description: "Nourishing meal prepared with traditional ingredients" },
      { event: "Herb Walk & Indigenous Plant Knowledge", description: "Discover medicinal plants in their natural habitat" },
      { event: "Ayurvedic Healing Tools Workshop", description: "Hands-on practice with traditional healing implements" },
      { event: "Yogic Detox Practices", description: "Learn purification techniques from the yoga tradition" },
      { event: "Group Reflection Circle & Dinner", description: "Share insights while enjoying a traditional dinner" }
    ],
    day3: [
      { event: "Agnihotra (Vedic Fire Ritual)", description: "Participate in the ancient sunrise fire ceremony" },
      { event: "Panchbhoota Meditation", description: "Connect with the five elements through guided meditation" },
      { event: "Ayurvedic Cooking Workshop", description: "Learn to prepare healing foods and herbal formulations" },
      { event: "Communal Lunch & Sharing", description: "Enjoy the fruits of your cooking workshop" },
      { event: "Indigenous Farming Dialogue", description: "Sustainable agriculture practices for health and wellness" },
      { event: "Healing Circle & Group Practice", description: "Collaborative healing techniques and knowledge sharing" },
      { event: "Closing Ceremony & Certificate Distribution", description: "Celebrate your journey and accomplishments" },
      { event: "Celebration Dinner", description: "Final gathering with special traditional feast" }
    ]
  };

  return (
    <section id="schedule" className="section-padding bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 block">Program</span>
          <h2 className="heading-lg text-primary mb-4">Retreat Schedule</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            A carefully crafted journey through ancient wisdom and modern healing practices
          </p>
        </motion.div>

        {/* Day selector - visible on mobile and tablet */}
        <div className="relative mb-8 lg:hidden">
          <div className="flex rounded-lg overflow-hidden border border-primary/20 mb-6">
            <button
              onClick={() => setActiveDay(1)}
              className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeDay === 1 ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-primary/5'}`}
            >
              Day 1
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeDay === 2 ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-secondary/5'}`}
            >
              Day 2
            </button>
            <button
              onClick={() => setActiveDay(3)}
              className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeDay === 3 ? 'bg-secondary  text-white' : 'bg-white text-secondary hover:bg-secondary/5'}`}
            >
              Day 3
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/*Day 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className={`bg-white rounded-xl shadow-soft overflow-hidden ${activeDay === 1 ? 'block' : 'lg:block hidden'}`}
          >
            <div className="bg-secondary text-white p-5 md:p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold">Day 1: Pravesh – Arrival & Orientation</h3>
                <span className="bg-white text-secondary text-sm font-bold px-3 py-1 text-center rounded-full">11 Oct</span>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <motion.ul
                className="space-y-6"
                variants={staggerItems}
              >
                {scheduleData.day1.map((item, index) => (
                  <motion.li key={index} variants={fadeIn} className="flex flex-col md:flex-row border-b border-neutral-100 pb-4">
                    <div className="flex-1">
                      <p className="text-base font-semibold text-neutral-800 mt-1">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
          {/* Day 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className={`bg-white rounded-xl shadow-soft overflow-hidden ${activeDay === 2 ? 'block' : 'lg:block hidden'}`}
          >
            <div className="bg-primary text-white p-5 md:p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold">Day 2: Swāsthya – Returning to Health</h3>
                <span className="bg-white text-primary text-sm font-bold px-3 py-1 text-center rounded-full">12 Oct</span>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <motion.ul
                className="space-y-6"
                variants={staggerItems}
              >
                {scheduleData.day2.map((item, index) => (
                  <motion.li key={index} variants={fadeIn} className="flex flex-col md:flex-row border-b border-neutral-100 pb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-800">{item.event}</h4>
                      <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Day 3 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className={`bg-white rounded-xl shadow-soft overflow-hidden ${activeDay === 3 ? 'block' : 'lg:block hidden'}`}
          >
            <div className="bg-secondary text-white p-5 md:p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold">Day 3: Jeevanam – Awakening Life</h3>
                <span className="bg-white text-secondary text-sm font-bold px-3 py-1 text-center rounded-full">13 Oct</span>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <motion.ul
                className="space-y-6"
                variants={staggerItems}
              >
                {scheduleData.day3.map((item, index) => (
                  <motion.li key={index} variants={fadeIn} className="flex flex-col md:flex-row border-b border-neutral-100 pb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-800">{item.event}</h4>
                      <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-20 pt-10 border-t border-neutral-200"
        >
          <h3 className="text-xl font-bold mb-6 text-center text-neutral-800">Retreat Inclusions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { title: "Eco-Stay & All Meals", description: "Sattvic vegetarian cuisine prepared with organic ingredients", icon: "🏡" },
              { title: "Ayurvedic Herb Kit", description: "Personal kit with Panchgavya essentials and medicinal herbs", icon: "🌿" },
              { title: "Sanjeevani Journal", description: "Beautiful handmade journal for personal reflections and notes", icon: "📔" },
              { title: "Participation Certificate", description: "Official documentation signed by Vaidya Rajesh Kapoor", icon: "🎓" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-3 mx-auto">{item.icon}</div>
                <h4 className="text-lg font-semibold text-neutral-800 mb-2">{item.title}</h4>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="#registration"
              className="btn-primary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Reserve Your Place</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleSection;
