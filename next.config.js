/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? ".next_prod" : ".next",
};

module.exports = nextConfig;
