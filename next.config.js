/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/page",
  //       destination: "/",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
