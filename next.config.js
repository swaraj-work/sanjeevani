/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    }
};

module.exports = {
    output: 'export',
}

export default nextConfig;
