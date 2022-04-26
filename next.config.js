/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GH_ACCESS_TOKEN: process.env.GH_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
