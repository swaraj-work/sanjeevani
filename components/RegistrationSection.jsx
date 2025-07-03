import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { sendConfirmationEmail } from '../utils/emailService';

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
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const messageRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const verifyPayment = async (response, formData) => {
    try {
      console.log('Verifying payment:', response);

      // const res = await fetch('http://localhost:8000/verify-payment.php', {
      const res = await fetch('https://sanjeevani-backend-qnpf.onrender.com/verify-payment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          formData
        }),
      });

      const data = await res.json();
      console.log('Verification response:', data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment verification failed');
      }
      
      // Send confirmation email
      try {
        await sendConfirmationEmail(formData, {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id
        });
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Continue with success flow even if email fails
      }

      setMessageType('success');
      setPaymentMessage('Registration successful! You will receive a confirmation email shortly.');
      scrollToMessage();
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error('Payment verification error:', error);
      setMessageType('error');
      setPaymentMessage('Payment verification failed. Please contact support if payment was deducted.');
      scrollToMessage();
      setIsSubmitting(false);
      return false;
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      script.onload = () => resolve(true);
      script.onerror = () => {
        document.body.removeChild(script);
        resolve(false);
      };
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentMessage('');

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setMessageType('error');
      setPaymentMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      scrollToMessage();
      return;
    }

    try {
      console.log('Creating order with form data:', formData);

      // Create order first
      // const orderRes = await fetch('http://localhost:8000/create-order.php', {
      const orderRes = await fetch('https://sanjeevani-backend-qnpf.onrender.com/create-order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (!orderRes.ok) {
        const errorText = await orderRes.text();
        console.error('Order creation error response:', errorText);
        throw new Error('Failed to create order');
      }

      const orderData = await orderRes.json();
      console.log('Order created:', orderData);

      if (!orderData.orderId) {
        console.error('Invalid order data:', orderData);
        throw new Error('Invalid order data received');
      }

      // Load Razorpay
      const res = await loadRazorpay();
      if (!res) {
        setMessageType('error');
        setPaymentMessage('Payment gateway could not be loaded. Please try again later.');
        console.error('Razorpay SDK failed to load');
        setIsSubmitting(false);
        scrollToMessage();
        return;
      }

      console.log('Razorpay object available:', !!window.Razorpay);

      const options = {
        // key: "rzp_live_1j9gDh1eamAJx7", // Using the live key directly
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount || 100, // ₹1 in paise for testing
        currency: orderData.currency || "INR",
        name: "Sanjeevani Workshop",
        description: "Workshop Registration Fee",
        order_id: orderData.orderId,
        handler: async function (response) {
          console.log('Payment successful:', response);
          await verifyPayment(response, formData);
          // Ensure state is reset even if verifyPayment doesn't complete properly
          setIsSubmitting(false);
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
          color: "#4B6F44"
        },
        modal: {
          ondismiss: function () {
            console.log('Checkout form closed by user');
            setIsSubmitting(false);
            // Optionally add a message that payment was canceled
            setMessageType('error');
            setPaymentMessage('Payment process was canceled. Please try again if you wish to register.');
            scrollToMessage();
          }
        }
      };

      console.log('Razorpay options:', options);

      try {
        const paymentObject = new window.Razorpay(options);
        
        // Handle payment failure
        paymentObject.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          setMessageType('error');
          setPaymentMessage(`Payment failed: ${response.error?.description || 'Unknown error'}`);
          setIsSubmitting(false);
          scrollToMessage();
        });
        
        // Reset state when modal is closed without completing payment
        paymentObject.on('modal.closed', function() {
          console.log('Payment modal closed without completion');
          setIsSubmitting(false);
        });
        
        paymentObject.open();
      } catch (err) {
        console.error('Razorpay initialization error:', err);
        setMessageType('error');
        setPaymentMessage(`Payment gateway error: ${err.message}`);
        setIsSubmitting(false);
        scrollToMessage();
      }

    } catch (error) {
      console.error('Payment process error:', error);
      setMessageType('error');
      setPaymentMessage(`An error occurred: ${error.message}`);
      scrollToMessage();
      setIsSubmitting(false);
    }
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
              className="lg:col-span-7 bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden h-full"
            >
              <div className="bg-primary/5 p-6 border-b border-neutral-100">
                <h3 className="text-2xl font-bold text-primary text-center">Register Now</h3>
                <p className="text-center mt-2 text-neutral-600">Registration Fee: ₹1</p>
              </div>

              <div className="p-6 md:p-8 lg:p-10 min-h-[650px] flex flex-col">
                {paymentMessage && (
                  <motion.div
                    ref={messageRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg border flex items-start ${messageType === 'success'
                      ? 'bg-green-50 text-green-700 border-green-100'
                      : 'bg-red-50 text-red-700 border-red-100'
                      }`}
                  >
                    <svg
                      className={`w-5 h-5 mr-3 mt-0.5 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {messageType === 'success' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                    <span>{paymentMessage}</span>
                  </motion.div>
                )}

                <form onSubmit={handlePayment} className="flex flex-col h-full justify-between">
                  <div className="space-y-10">
                                      <motion.div variants={fadeIn} className="space-y-1">
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-800 mb-2">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-neutral-50 hover:bg-white"
                        placeholder="Your full name"
                        required
                      />
                    </motion.div>

                                      <motion.div variants={fadeIn} className="space-y-1">
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-800 mb-2">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-neutral-50 hover:bg-white"
                        placeholder="your.email@example.com"
                        required
                      />
                    </motion.div>

                    <motion.div variants={fadeIn} className="space-y-1">
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-800 mb-2">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-neutral-50 hover:bg-white"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </motion.div>

                                      <motion.div variants={fadeIn} className="space-y-2">
                      <label className="block text-sm font-medium text-neutral-800 mb-3">
                        Accommodation Preference*
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="flex items-center bg-neutral-50 px-5 py-4 rounded-lg border border-neutral-300 cursor-pointer transition-all hover:bg-white hover:border-primary/50">
                          <input
                            type="radio"
                            name="accommodation"
                            value="yes"
                            checked={formData.accommodation === 'yes'}
                            onChange={handleChange}
                            className="mr-3 text-primary focus:ring-primary h-5 w-5"
                          />
                          <div>
                            <span className="text-neutral-800 font-medium">Twin sharing</span>
                            <p className="text-sm text-neutral-500 mt-0.5">Includes accommodation</p>
                          </div>
                        </label>
                        <label className="flex items-center bg-neutral-50 px-5 py-4 rounded-lg border border-neutral-300 cursor-pointer transition-all hover:bg-white hover:border-primary/50">
                          <input
                            type="radio"
                            name="accommodation"
                            value="no"
                            checked={formData.accommodation === 'no'}
                            onChange={handleChange}
                            className="mr-3 text-primary focus:ring-primary h-5 w-5"
                          />
                          <div>
                            <span className="text-neutral-800 font-medium">Self-arranged</span>
                            <p className="text-sm text-neutral-500 mt-0.5">No accommodation needed</p>
                          </div>
                        </label>
                      </div>
                    </motion.div>

                  <motion.div variants={fadeIn} className="space-y-1">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-800 mb-2">
                      Special Requirements (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-5 py-4 text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-neutral-50 hover:bg-white"
                      placeholder="Any dietary restrictions, accessibility needs, or other requirements?"
                    ></textarea>
                  </motion.div>

                  </div>
                  
                  <motion.div variants={fadeIn} className="mt-10 md:mt-20">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full btn-primary flex items-center justify-center py-4 text-lg ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>Pay Rs 1 & Block Your Seat for Exclusive Discounts</>
                      )}
                    </button>
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
              className="lg:col-span-5 space-y-8 flex flex-col justify-between"
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
                      <span className="font-medium">Note:</span> The reservation fee of ₹1 secures your seat and grants access to our private participant group. This amount will be adjusted in your final payment. Balance due 14 days before the event. Travel expenses not included.
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
