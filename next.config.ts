import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost' ,'yt3.ggpht.com', 'google.com', 'example.com', 'i.pravatar.cc',"tttn-clinic-management-be.onrender.com"],
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
        protocol: "https",
        hostname: "tttn-clinic-management-be.onrender.com",
        pathname: "/uploads/**",
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
