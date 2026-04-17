/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/cart/:path*',
        destination: 'https://lattente-5.myshopify.com/cart/:path*',
        permanent: false,
      },
      {
        source: '/checkouts/:path*',
        destination: 'https://lattente-5.myshopify.com/checkouts/:path*',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
