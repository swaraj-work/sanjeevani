import Razorpay from 'razorpay';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Create order
        const order = await razorpay.orders.create({
            amount: 100, // ₹1 in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                ...req.body.formData
            }
        });

        return res.status(200).json({
            orderId: order.id
        });
    } catch (error) {
        console.error('Order creation error:', error);
        return res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
} 