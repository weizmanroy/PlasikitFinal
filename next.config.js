// next.config.js

const nextConfig = {
  images: {
    domains: [
      "cdn.myminifactory.com",
      "www.nationalgeographic.com",
      "cdn.mos.cms.futurecdn.net",
      "cdn.thingiverse.com",
      "www.thesprucepets.com",
      "cdn.britannica.com",
      "upload.wikimedia.org",
      "blenderartists.org",
      "pic2-cdn.creality.com",
    ],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;