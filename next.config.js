
  /**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}
 
module.exports = nextConfig