/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 100],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
