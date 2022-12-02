/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/getstoragesize/",
        destination: "http://localhost:8000/api/getstoragesize/",
      },
    ];
  },
};

module.exports = nextConfig;
