import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://surya.in";
const TITLE = "Surya Pratap Das — Software & DevOps Engineer";
const DESCRIPTION =
  "Software and DevOps engineer. Event-driven systems, AWS infrastructure at scale, production CI/CD. Most recently at Gravitones, scaling a live streaming platform to 60–70K concurrent users.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Surya Pratap Das",
  },
  description: DESCRIPTION,
  keywords: [
    "Software Engineer",
    "DevOps Engineer",
    "Backend Developer",
    "Node.js",
    "AWS",
    "Kafka",
    "Terraform",
    "TypeScript",
    "Surya Pratap Das",
    "Bhubaneswar",
    "Bangalore",
  ],
  authors: [{ name: "Surya Pratap Das", url: SITE_URL }],
  creator: "Surya Pratap Das",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Surya Pratap Das",
    title: TITLE,
    description:
      "Scaled a live streaming platform to 60–70K concurrent users. Kafka event-driven middleware. AWS ECS, Terraform IaC, GitHub Actions.",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@SuryaPratapDas4",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Surya Pratap Das",
  url: SITE_URL,
  jobTitle: "Software & DevOps Engineer",
  description: DESCRIPTION,
  knowsAbout: [
    "Node.js", "TypeScript", "Kafka", "AWS", "Terraform",
    "Docker", "PostgreSQL", "Redis", "Elasticsearch", "GitHub Actions",
  ],
  sameAs: [
    "https://github.com/suryapratap-1",
    "https://linkedin.com/in/suryapratapdas",
    "https://x.com/SuryaPratapDas4",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
