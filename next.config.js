/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  serverExternalPackages: ["bcryptjs"],
};

export default nextConfig;
