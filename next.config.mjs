/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'stepup-store.s3.me-central-1.amazonaws.com', // ✅ Added S3 bucket
            },
        ],
    },
};

export default nextConfig;
