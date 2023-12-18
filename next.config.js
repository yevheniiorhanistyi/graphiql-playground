/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join('./src/', 'styles')],
    prependData: `@import "breakpoints.scss";`,
  },
};

export default nextConfig;
