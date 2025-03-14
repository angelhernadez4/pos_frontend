import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "pos-backend-3vgj.onrender.com"
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    }
};

export default nextConfig;
