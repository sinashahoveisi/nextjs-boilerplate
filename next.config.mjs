import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  //   disable: process.env.NODE_ENV === 'development',
  disable: true,
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    disableDevLogs: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({url: {pathname}}) => pathname.startsWith('/api/'),
        handler: 'NetworkFirst',
        options: {
          cacheName: 'apis',
          expiration: {
            maxEntries: 16,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      }
    ]
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true, // Enable SWC minification for improved performance
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development' // Remove console.log in production
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.web.com',
        pathname: '**'
      }
    ]
  }
};

export default withPWA(nextConfig);
