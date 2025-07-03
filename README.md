# Sanjeevani Workshop Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploying Only the Frontend (Static Export)

To export and deploy only the frontend as static HTML (for shared/static hosting):

1. **Build and Export the App**

    ```sh
    npm run build
    ```

    This will generate a folder called `out/` in your project root.

2. **Deploy**
   Upload the contents of the `out/` directory to your web host's public directory (e.g., `public_html`).

---

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Environment Variables Setup

### Vercel (Frontend)

You need to set up the following environment variables in your Vercel project settings:

1. `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Your Razorpay public key ID
2. `NEXT_PUBLIC_EMAILJS_USER_ID` - Your EmailJS user ID
3. `USE_PHP_BACKEND` - Set to 'true' to use the PHP backend on Render, or 'false' to use the Next.js API

To add these environment variables in Vercel:
1. Go to your Vercel project dashboard
2. Click on "Settings"
3. Select "Environment Variables"
4. Add each variable and its value
5. Deploy your project again to apply the changes

### Render.com (Backend)

You need to set up the following environment variables in your Render.com backend:

1. `RAZORPAY_KEY_SECRET` - Your Razorpay secret key
2. `RAZORPAY_KEY_ID` - Your Razorpay key ID
3. Other PHP backend specific variables

To add these environment variables in Render:
1. Go to your Render dashboard
2. Select your backend service
3. Click on "Environment"
4. Add each key-value pair
5. Click "Save Changes" and your service will restart

## CORS Configuration

This project has CORS configured for API routes. The middleware and API configuration ensure proper handling of cross-origin requests.
