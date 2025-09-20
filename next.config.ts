import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost' ,'yt3.ggpht.com', 'google.com', 'example.com', 'i.pravatar.cc'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sdmntpraustraliaeast.oaiusercontent.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: 'https',
        hostname: 'your-service.onrender.com', // domain API/DB trả ảnh
        pathname: '/uploads/*',               // hoặc '/*' nếu không chắc
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config; // BẮT BUỘC
  }
};

export default nextConfig;
