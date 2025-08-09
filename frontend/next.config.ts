import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**',
      },
      
      // Add other domains as needed
    ],
  },
  
};

export default nextConfig;
