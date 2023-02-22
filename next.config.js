const { query } = require("express");

/**
 * @type {import('next').NextConfig}
 *  */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      //pages
      {
        source: "/storage",
        destination: "/storage/내_드라이브",
      },
      {
        source: "/home",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
