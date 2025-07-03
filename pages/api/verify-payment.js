import Razorpay from 'razorpay';
import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Check if we should use the PHP backend
        const useBackend = process.env.USE_PHP_BACKEND === 'true';

        if (useBackend) {
            // Forward the request to the PHP backend
            const response = await fetch('https://sanjeevani-backend-qnpf.onrender.com/verify-payment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            return res.status(200).json(data);
        } else {
            // Get the payment details from the request body
            const {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                formData
            } = req.body;

            // Verify the payment signature
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(sign)
                .digest("hex");

            if (razorpay_signature !== expectedSign) {
                return res.status(400).json({ message: 'Invalid payment signature' });
            }

            // Initialize Razorpay instance to verify payment
            const razorpay = new Razorpay({
                key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });

            // Fetch payment details
            const payment = await razorpay.payments.fetch(razorpay_payment_id);

            // Fetch order details
            const order = await razorpay.orders.fetch(razorpay_order_id);

            // Verify payment amount matches order amount
            if (payment.amount !== order.amount) {
                return res.status(400).json({ message: 'Payment amount does not match order amount' });
            }

            if (payment.status !== 'captured') {
                return res.status(400).json({ message: 'Payment not captured' });
            }

            // Here you would typically store the registration in your database
            const registrationData = {
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                amount: payment.amount,
                status: payment.status,
                userData: formData,
                createdAt: new Date(),
            };

            // TODO: Add your database logic here
            // await db.collection('registrations').add(registrationData);

            return res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
                data: registrationData
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.status(500).json({
            message: 'Error verifying payment',
            error: error.message
        });
    }
} 