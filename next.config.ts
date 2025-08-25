import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Đặt ở cấp cao nhất, không nằm trong webpack
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
