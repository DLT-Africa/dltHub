/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    trailingSlash: "true",
    reactStrictMode: true,
    images: {
        domains: ["upload.wikimedia.org", "flagcdn.com"],
      },
};

export default nextConfig;
