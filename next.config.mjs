// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.myminifactory.com",
      "www.nationalgeographic.com",
      "cdn.mos.cms.futurecdn.net",
      "cdn.thingiverse.com", // Add this line
    ],
  },
};

export default nextConfig;
