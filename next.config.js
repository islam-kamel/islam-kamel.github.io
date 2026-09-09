/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.BUILD_DIR || ".next",
};

module.exports = nextConfig;
