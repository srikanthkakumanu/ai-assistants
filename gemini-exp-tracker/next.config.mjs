/** @type {import('next').NextConfig} */
const nextConfig = {
  // The `transpilePackages` option is needed to tell Next.js to compile
  // modules from `node_modules`. This is required for many React Native
  // libraries that are not published as pre-transpiled code.
  transpilePackages: [
    'react-native',
    'react-native-web',
    'react-native-reanimated',
  ],

  // Enable the new caching and Partial Prerendering (PPR) model in Next.js 16.
  // The experimental `ppr` flag is deprecated and should not be used.
  cacheComponents: true,

  reactStrictMode: true,

  // This allows the Next.js server to act as a proxy for API requests.
  // In a containerized environment, the frontend (running in the browser)
  // cannot directly access the API service by its internal name (e.g., 'api-service').
  // Instead, the frontend makes requests to its own backend (e.g., '/api/expenses'),
  // and the Next.js server forwards them to the actual API service.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.INTERNAL_API_URL}/:path*`,
      },
    ];
  },

  webpack: (config) => {
    // Aliasing react-native to react-native-web is a common practice for web compatibility.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };

    // Prefer .web.js extensions for web-specific implementations.
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    return config;
  },
};

export default nextConfig;
