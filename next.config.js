/** @type {import('next').NextConfig} */

const nextConfig = {
  
  reactStrictMode: true,
  images: {
    domains: ["demoapi.remis.ng", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig
