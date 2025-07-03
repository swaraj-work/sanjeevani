import Razorpay from 'razorpay';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Check if we should use the PHP backend or create the order directly
        const useBackend = process.env.USE_PHP_BACKEND === 'true';
        
        if (useBackend) {
            // Forward the request to the PHP backend
            const response = await fetch('https://sanjeevani-backend-qnpf.onrender.com/create-order.php', {
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
            // Create order directly with Razorpay
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
        }
    } catch (error) {
        console.error('Order creation error:', error);
        return res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
} 