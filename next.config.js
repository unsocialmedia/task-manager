/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_USERNAME: process.env.API_USERNAME,
    API_PASSWORD: process.env.API_PASSWORD,
  },
};

module.exports = nextConfig;
