import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost' ,'yt3.ggpht.com', 'google.com', 'example.com'],
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
