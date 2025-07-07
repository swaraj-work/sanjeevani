/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export",
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    env: {
        // Set this to 'true' to use the PHP backend, or 'false' to use the Next.js API
        USE_PHP_BACKEND: 'true',
    },
};

export default nextConfig;
