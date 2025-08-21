/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images by default
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable page speed improvements
  poweredByHeader: false,
  compress: true,

  // Modern JavaScript features
  experimental: {
    // Enable modern webpack optimizations
    optimizeCss: true,
    // Support for server actions (useful for contact form)
    serverActions: true,
  },

  // Content Security Policy
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],

  // Webpack configuration for optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize packages with ESM
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    }

    return config
  },
}

export default nextConfig