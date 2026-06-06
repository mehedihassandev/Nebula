import { execSync } from 'child_process';

let gitCommitMsg = 'main*';
try {
  // Get short hash and commit message
  gitCommitMsg = execSync('git log -1 --pretty=format:"%h - %s"').toString().trim();
} catch (e) {
  console.warn('Could not fetch git commit message:', e.message);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GIT_COMMIT_MSG: gitCommitMsg,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
      }
    ],
  },
};

export default nextConfig;
