/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Enable SWC minification for better performance
  swcMinify: true,

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    
    // Enable server components logging
    logging: {
      level: 'verbose'
    }
  },

  // Image optimization configuration
  images: {
    // Allowed image domains
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'supremegroup.co.in',
      'res.cloudinary.com'
    ],
    
    // Supported image formats
    formats: ['image/webp', 'image/avif'],
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Allow SVG images (with security considerations)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false
  },

  // Environment variables available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
    APP_VERSION: process.env.npm_package_version || '1.0.0'
  },

  // Public runtime configuration
  publicRuntimeConfig: {
    siteName: 'Supreme Group',
    siteUrl: process.env.SITE_URL || 'https://supremegroup.co.in'
  },

  // Server runtime configuration
  serverRuntimeConfig: {
    // Private keys (only available on server-side)
    secretKey: process.env.SECRET_KEY
  },

  // Custom headers for security and performance
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        // Cache static assets
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Cache images
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Redirects for SEO and user experience
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/contact-us',
        destination: '/#contact-section',
        permanent: true
      }
    ];
  },

  // Rewrites for clean URLs or API proxying
  async rewrites() {
    return [
      {
        source: '/api/contact',
        destination: '/api/contact-form'
      }
    ];
  },

  // Webpack configuration customization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer (only in development or when ANALYZE=true)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        openAnalyzer: true
      }));
    }

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true
          }
        }
      };
    }

    return config;
  },

  // Output configuration
  output: 'standalone',

  // Trailing slash configuration
  trailingSlash: false,

  // TypeScript configuration
  typescript: {
    // Type checking is handled by IDE and CI, skip during build for faster builds
    ignoreBuildErrors: false
  },

  // ESLint configuration
  eslint: {
    // Lint during builds
    ignoreDuringBuilds: false,
    
    // Directories to lint
    dirs: ['src', 'pages', 'components', 'lib', 'utils']
  },

  // PoweredByHeader
  poweredByHeader: false,

  // Compression
  compress: true,

  // HTTP Keep Alive
  httpAgentOptions: {
    keepAlive: true
  },

  // Development indicators
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right'
  },

  // Only for development - disable in production
  ...(process.env.NODE_ENV === 'development' && {
    // Fast refresh
    fastRefresh: true
  }),

  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Generate source maps for debugging
    productionBrowserSourceMaps: false,
    
    // Optimize fonts
    optimizeFonts: true,
    
    // Generate build ID
    generateBuildId: async () => {
      return process.env.BUILD_ID || 'supreme-group-build';
    }
  })
};

export default nextConfig;