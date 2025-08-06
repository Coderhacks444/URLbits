/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,       // Good: catches bugs in dev
  swcMinify: true,             // Good: makes JS smaller
  trailingSlash: true,         // Optional: adds '/' at end of URLs
  images: {
    unoptimized: true          // Good if you're deploying statically or not using image optimization
  },
  basePath: process.env.NODE_ENV === 'production' ? '/URLbits' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/URLbits/' : '',
}

module.exports = nextConfig;
