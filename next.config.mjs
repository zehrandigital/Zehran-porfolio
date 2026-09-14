/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" is only for the Docker build (see Dockerfile). Vercel does
  // its own file tracing/packaging and this option is incompatible with it,
  // causing a missing `next-server.js.nft.json` build error.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;