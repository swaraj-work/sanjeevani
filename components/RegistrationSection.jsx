import { useState } from 'react';
import { motion } from 'framer-motion';

const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accommodation: 'yes', // Default selection
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await loadRazorpay();
      if (!res) {
        setPaymentMessage('Payment gateway could not be loaded. Please try again later.');
        console.error('Razorpay SDK failed to load');
        setIsSubmitting(false);
        return;
      }

      // In a real implementation, you'd make an API call to your backend to create an order
      // For demo purposes, we'll show a success message
      setPaymentMessage('Demo registration successful! In production, payment would be processed.');

      // If you want to test the actual Razorpay integration, uncomment this code
      /*
      const options = {
        key: "rzp_test_YourTestKey", // Replace with your test key
        amount: 99900, // Amount in paise (₹999)
        currency: "INR",
        name: "Sanjeevani Workshop",
        description: "Registration Fee",
        image: "/images/logo.png", // Replace with your logo
        handler: function(response) {
          setPaymentMessage(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          accommodation: formData.accommodation
        },
        theme: {
          color: "#8B5A2B"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      */
    } catch (error) {
      setPaymentMessage('An error occurred. Please try again.');
      console.error(error);
    }

    setIsSubmitting(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="registration" className="py-20 md:py-24 relative w-full overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mt-40 -mr-40 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full -mb-48 -ml-48 z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-accent/5 rounded-full z-0"></div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1.5 bg-accent/10 rounded-full">
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">Join Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">Secure Your Spot</h2>
          <p className="text-lg md:text-xl text-neutral-800 leading-relaxed">
            Reserve your place for this transformative retreat experience in the serene Himalayas
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Registration form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="lg:col-span-7 bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden"
            >
              <div className="bg-primary/5 p-6 border-b border-neutral-100">
                <h3 className="text-2xl font-bold text-primary text-center">Register Now</h3>
              </div>

              <div className="p-6 md:p-8">
                {paymentMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-start"
                  >
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{paymentMessage}</span>
                  </motion.div>
                )}

                <form onSubmit={handlePayment} className="space-y-6">
                  <motion.div variants={fadeIn}>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="Your full name"
                      required
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div variants={fadeIn}>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-800 mb-1.5">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="your.email@example.com"
                        required
                      />
                    </motion.div>

                    <motion.div variants={fadeIn}>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-800 mb-1.5">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeIn}>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Accommodation Preference*
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="flex items-center bg-neutral-50 px-4 py-3 rounded-lg border border-neutral-300 cursor-pointer transition-all hover:bg-neutral-100">
                        <input
                          type="radio"
                          name="accommodation"
                          value="yes"
                          checked={formData.accommodation === 'yes'}
                          onChange={handleChange}
                          className="mr-3 text-primary focus:ring-primary h-4 w-4"
                        />
                        <div>
                          <span className="text-neutral-800 font-medium">Twin sharing</span>
                          <p className="text-xs text-neutral-500 mt-0.5">Includes accommodation</p>
                        </div>
                      </label>
                      <label className="flex items-center bg-neutral-50 px-4 py-3 rounded-lg border border-neutral-300 cursor-pointer transition-all hover:bg-neutral-100">
                        <input
                          type="radio"
                          name="accommodation"
                          value="no"
                          checked={formData.accommodation === 'no'}
                          onChange={handleChange}
                          className="mr-3 text-primary focus:ring-primary h-4 w-4"
                        />
                        <div>
                          <span className="text-neutral-800 font-medium">Self-arranged</span>
                          <p className="text-xs text-neutral-500 mt-0.5">No accommodation needed</p>
                        </div>
                      </label>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Special Requirements (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="Any dietary restrictions, accessibility needs, or other requirements?"
                    ></textarea>
                  </motion.div>

                  <motion.div variants={fadeIn} className="pt-2">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-5 mb-6">
                      <div className="flex items-start">
                        <div className="bg-accent/20 rounded-full p-2 mr-4 mt-1">
                          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-800 mb-1">Reservation Fee: ₹999 only</h4>
                          <p className="text-sm text-neutral-700 leading-relaxed">
                            <span className="font-medium">₹999 secures your seat</span> and grants you access to our private participant group, where exclusive discounts and offers will be revealed.
                          </p>
                          <p className="text-sm text-neutral-700 mt-2 font-medium">→ Balance payment payable later.</p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 bg-primary text-white rounded-lg font-medium text-base sm:text-lg transition-all shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : 'Reserve Your Spot Now'}
                    </motion.button>

                    <p className="text-xs text-neutral-500 text-center mt-4">
                      Limited to 50 participants | By Eligibility | By Intention
                    </p>
                  </motion.div>
                </form>
              </div>

            </motion.div>



            {/* Registration details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="lg:col-span-5 space-y-8"
            >
              <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-100">
                <div className="bg-primary/5 p-5 border-b border-neutral-100">
                  <h3 className="text-xl font-bold text-primary">Registration Fee (INR)</h3>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div className="pb-5 border-b border-neutral-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-lg text-neutral-800">With Accommodation</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary">₹22,500</span>
                          <p className="text-xs text-neutral-500">per person</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-sm text-neutral-600">Twin-sharing accommodation, all meals & workshop materials</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-sm text-neutral-600">2 nights in the retreat center</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-sm text-neutral-600">Sattvic meals throughout your stay</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pb-5 border-b border-neutral-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-lg text-neutral-800">Without Accommodation</h4>
                        </div>
                        <span className="text-2xl font-bold text-primary">₹18,500</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-sm text-neutral-600">All meals & workshop materials included</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-sm text-neutral-600">Daily access to all sessions</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-sm text-neutral-600">All meals during the workshop</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-accent">Early Bird Discount</h4>
                          <p className="text-sm text-neutral-700 mt-1">Register before 31st August</p>
                        </div>
                        <span className="text-xl font-bold text-accent">₹3,000 OFF</span>
                      </div>
                      <p className="text-sm text-neutral-700 mt-2">Limited early bird spots available. Secure yours now!</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-100">
                <div className="bg-primary/5 p-5 border-b border-neutral-100">
                  <h3 className="text-xl font-bold text-primary">What Your Registration Includes</h3>
                </div>

                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="bg-secondary/10 rounded-full p-1 mr-3 mt-0.5 h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">Seat Reservation</h4>
                        <p className="text-sm text-neutral-600 mt-0.5">Guaranteed spot in all workshop sessions</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-secondary/10 rounded-full p-1 mr-3 mt-0.5 h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">Panchgavya Healing Kit</h4>
                        <p className="text-sm text-neutral-600 mt-0.5">Take-home kit with essential formulations</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-secondary/10 rounded-full p-1 mr-3 mt-0.5 h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">Participant Community</h4>
                        <p className="text-sm text-neutral-600 mt-0.5">Access to private community group</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-secondary/10 rounded-full p-1 mr-3 mt-0.5 h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">All Workshop Materials</h4>
                        <p className="text-sm text-neutral-600 mt-0.5">Complete set of materials for all sessions</p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      <span className="font-medium">Note:</span> The reservation fee of ₹999 secures your seat and grants access to our private participant group. This amount will be adjusted in your final payment. Balance due 14 days before the event. Travel expenses not included.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-neutral-800">Have questions?</h4>
                    <p className="text-neutral-700 mt-1 text-sm">
                      Call us at <a href="tel:+919876543210" className="text-primary font-medium hover:underline">+91 98765 43210</a> or email <a href="mailto:info@sanjeevaniworkshop.com" className="text-primary font-medium hover:underline">info@sanjeevaniworkshop.com</a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
