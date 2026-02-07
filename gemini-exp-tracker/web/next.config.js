/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    config.module.rules.push({
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-expo'],
      },
      include: [
        /node_modules\/react-native-reanimated/,
        /node_modules\/react-native-web/,
      ],
    });
    return config;
  },
  experimental: {
    optimizePackageImports: [
      'react-native-reanimated',
      'react-native-web',
    ],
  },
  // Add any other necessary Next.js configurations here
};

module.exports = nextConfig;