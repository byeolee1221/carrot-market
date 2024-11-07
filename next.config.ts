import type { NextConfig } from "next";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-analyzer-report.html',
        openAnalyzer: false,
      }));
    }
    return config;
  },
};

export default nextConfig;
