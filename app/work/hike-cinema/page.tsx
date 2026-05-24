import type { Metadata } from "next";
import HikeCinemaClient from "./HikeCinemaClient";

export const metadata: Metadata = {
  title: "Gravitones × Hike Cinema",
  description:
    "Owned the backend and full AWS infrastructure for a live streaming platform inside India's Hike app. Scaled to 70K concurrent users. AWS ECS, Terraform, Widevine DRM, GitHub Actions.",
  openGraph: {
    title: "Gravitones × Hike Cinema — Surya Pratap Das",
    description:
      "Live streaming platform at scale: AWS ECS, CloudFront, MediaConvert, Terraform IaC, Widevine + FairPlay DRM, 70K concurrent users.",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://surya.in/work/hike-cinema",
  },
};

export default function HikeCinemaPage() {
  return <HikeCinemaClient />;
}
