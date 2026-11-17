import type { MetadataRoute } from "next";

// Bump when page content changes; `new Date()` would change on every build.
const LAST_UPDATED = new Date("2026-11-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://surya.in",
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://surya.in/work/hike-cinema",
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
