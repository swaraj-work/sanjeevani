import Razorpay from 'razorpay';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
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

            let data;
            try {
                data = await response.json();
            } catch (e) {
                console.error('Error parsing response from PHP backend:', e);
                // If can't parse JSON, return text
                const textData = await response.text();
                return res.status(response.status).json({ 
                    success: false,
                    message: 'Invalid JSON response from backend', 
                    rawResponse: textData
                });
            }

            // Ensure response has success field
            if (!data.hasOwnProperty('success')) {
                data.success = response.ok;
            }
            
            return res.status(response.ok ? 200 : 400).json(data);
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
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency
            });
        }
    } catch (error) {
        console.error('Order creation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
} 