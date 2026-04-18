// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove the webpack section completely
  turbopack: {}, // Add this to acknowledge Turbopack usage
};

export default nextConfig;