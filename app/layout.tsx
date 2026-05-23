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

export const metadata: Metadata = {
  title: "Surya Pratap Das — Software & DevOps Engineer",
  description:
    "Software and DevOps engineer. Event-driven systems, AWS infrastructure at scale, production CI/CD. Most recently at Gravitones, scaling a live streaming platform to 60–70K concurrent users.",
  openGraph: {
    title: "Surya Pratap Das — Software & DevOps Engineer",
    description:
      "Scaled a live streaming platform to 60–70K concurrent users. Kafka event-driven middleware. AWS ECS, Terraform IaC, GitHub Actions.",
    type: "website",
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
      <body className="antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
