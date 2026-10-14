import type { NextConfig } from "next";

// Slugs of the two write-ups that used to live under /research-work. Listed
// explicitly (not as a wildcard) because /public/research-work/ still holds
// their image files, and a wildcard redirect would swallow those requests.
const MOVED_WRITE_UPS = ["mill-software-bill-verification", "mock-test-question-extraction"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // "Research Work" is now "Case Studies".
      { source: "/research-work", destination: "/case-studies", permanent: true },
      ...MOVED_WRITE_UPS.map((slug) => ({
        source: `/research-work/${slug}`,
        destination: `/case-studies/${slug}`,
        permanent: true,
      })),
      // Resources has one section for now, so its index is the tools hub.
      { source: "/resources", destination: "/resources/tools", permanent: false },
      // The generic Document AI walkthrough was replaced by industry-specific case studies.
      { source: "/case-studies/document-ai", destination: "/case-studies", permanent: false },
    ];
  },
};

export default nextConfig;
