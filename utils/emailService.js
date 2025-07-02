import emailjs from '@emailjs/browser';

// Initialize EmailJS with your User ID
const initEmailJS = () => {
  // Use environment variable for EmailJS user ID
  const userId = 'jTPNzgWkjtAsowb6U';
  emailjs.init(userId);
};

// Send a confirmation email after successful payment
export const sendConfirmationEmail = async (formData, paymentInfo) => {
  try {
    initEmailJS();
    
    // Create template parameters to send to EmailJS template
    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      payment_id: paymentInfo.razorpay_payment_id,
      order_id: paymentInfo.razorpay_order_id,
      accommodation: formData.accommodation === 'yes' ? 'Twin sharing accommodation' : 'Self-arranged accommodation',
      phone: formData.phone,
      registration_date: new Date().toLocaleDateString(),
      special_requirements: formData.message || 'None specified'
    };

    // Send the email using EmailJS with environment variables
    const result = await emailjs.send(
      'service_johzx7n',
      'template_fxloiva',
      templateParams
    );

    console.log('Email successfully sent!', result);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};

export default { initEmailJS, sendConfirmationEmail }; 