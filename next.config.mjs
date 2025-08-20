/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Optimize images for better Lighthouse score
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
  },
  
  // Enable modern JS features
  experimental: {
    optimizeCss: true, // Optimize CSS for better performance
    scrollRestoration: true, // Improve scroll handling
  },

  // Content Security Policy for better security
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    }
  ],

  // Optimize build output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable emotion for better CSS-in-JS performance if needed later
    emotion: false,
  },

  // Enable SWC minification for better performance
  swcMinify: true,
}

export default nextConfig;