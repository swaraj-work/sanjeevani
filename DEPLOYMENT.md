# Deployment Instructions for Hostinger

This guide will help you deploy your Sanjeevani Workshop frontend (static) and backend (PHP) on Hostinger.

## Prerequisites

1. A Hostinger hosting account with PHP support
2. Razorpay account with API keys
3. Node.js installed locally for building the frontend

## Step 1: Prepare Environment Variables

1. Create a `.env` file in the root directory:
```bash
cp api/.env.production .env
```

2. Update the `.env` file with your actual Razorpay credentials:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_actual_razorpay_key_id
RAZORPAY_KEY_SECRET=your_actual_razorpay_secret
```

## Step 2: Build and Export Frontend

1. Install dependencies:
```bash
npm install
```

2. Build and export the static site:
```bash
npm run build
```

This will generate an `out/` directory with your static files.

## Step 3: Install PHP Dependencies

1. Navigate to the api directory:
```bash
cd api
```

2. Install Composer dependencies:
```bash
composer install --no-dev --optimize-autoloader
```

## Step 4: Deploy to Hostinger

### Upload Frontend (Static Files)
1. Upload all contents of the `out/` directory to your domain's `public_html` folder
2. Ensure the file structure looks like:
   ```
   public_html/
   ├── index.html
   ├── _next/
   ├── images/
   └── other static files...
   ```

### Upload Backend (PHP API)
1. Create an `api/` directory in your `public_html` folder
2. Upload the following files from your local `api/` directory:
   ```
   public_html/api/
   ├── create-order.php
   ├── verify-payment.php
   ├── config.php
   ├── .htaccess
   ├── composer.json
   ├── composer.lock
   └── vendor/ (entire directory)
   ```

3. Create a `.env` file in the `public_html` directory (not in the api folder):
   ```
   public_html/.env
   ```
   With your actual environment variables.

### Final Directory Structure on Hostinger
```
public_html/
├── .env                      # Environment variables
├── index.html               # Frontend files
├── _next/                   # Next.js static assets
├── images/                  # Image assets
├── favicon.ico
├── api/                     # PHP Backend
│   ├── create-order.php
│   ├── verify-payment.php
│   ├── config.php
│   ├── .htaccess
│   ├── composer.json
│   ├── composer.lock
│   └── vendor/
└── other frontend files...
```

## Step 5: Configure PHP on Hostinger

1. In your Hostinger control panel, ensure PHP 8.0+ is selected
2. Enable the following PHP extensions (usually enabled by default):
   - curl
   - json
   - openssl

## Step 6: Test the Deployment

1. Visit your domain to see the frontend
2. Test the registration form to ensure:
   - Order creation works (calls `/api/create-order.php`)
   - Payment verification works (calls `/api/verify-payment.php`)
   - CORS headers are properly set

## API Endpoints

Your frontend will now call:
- `https://yourdomain.com/api/create-order.php` - Creates Razorpay orders
- `https://yourdomain.com/api/verify-payment.php` - Verifies payments

## Environment Variables

Make sure your `.env` file in `public_html` contains:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
```

## Troubleshooting

### CORS Issues
- Check that `.htaccess` file is uploaded to the `api/` directory
- Verify CORS headers in browser developer tools

### Payment Issues
- Verify Razorpay API keys are correct
- Check that Razorpay webhook URL (if using) points to your domain
- Test with Razorpay test keys first

### PHP Errors
- Check Hostinger error logs in the control panel
- Ensure all Composer dependencies are uploaded
- Verify PHP version is 8.0+

## Security Notes

1. Never commit real API keys to version control
2. Use Razorpay test keys for testing
3. Consider implementing rate limiting for production
4. Monitor API usage and set up alerts

## Support

If you encounter issues:
1. Check browser console for frontend errors
2. Check Hostinger error logs for PHP errors
3. Verify all files are uploaded correctly
4. Test API endpoints directly using tools like Postman
