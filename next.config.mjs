/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hackthenorth.com",
      },
    ],
  },
};

export default nextConfig;
