# EmailJS Setup Guide

This guide will help you set up EmailJS to send confirmation emails after successful registration payments.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for an account.
2. Verify your email address and log in to the dashboard.

## Step 2: Create an Email Service

1. Go to the "Email Services" section in your EmailJS dashboard.
2. Click "Add New Service" and select your preferred email provider (Gmail, Outlook, etc.).
3. Follow the prompts to connect your email account.
4. Once connected, note the **Service ID** which will be used in your application.

## Step 3: Create an Email Template

1. Go to the "Email Templates" section in your EmailJS dashboard.
2. Click "Create New Template" and set up your confirmation email.
3. Use the following template variables in your design:
   - `{{to_name}}`: Customer's name
   - `{{to_email}}`: Customer's email address
   - `{{payment_id}}`: Razorpay payment ID
   - `{{order_id}}`: Razorpay order ID
   - `{{accommodation}}`: Accommodation preference
   - `{{phone}}`: Customer's phone number
   - `{{registration_date}}`: Date of registration
   - `{{special_requirements}}`: Any special requirements

4. Save your template and note the **Template ID**.

## Step 4: Set Up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_EMAILJS_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

Replace the placeholders with your actual IDs from the EmailJS dashboard.

## Step 5: Restart Your Application

After setting up the environment variables, restart your Next.js application for the changes to take effect.

## Troubleshooting

If you encounter issues with sending emails:

1. Verify your EmailJS credentials are correct
2. Check the browser console for error messages
3. Make sure your email template contains all the required variables
4. Ensure your EmailJS account has available email credits

For more information, visit the [EmailJS Documentation](https://www.emailjs.com/docs/). 