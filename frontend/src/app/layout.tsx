import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEForecast | Decentralized Energy Forecasting Platform",
  description:
    "Real-time decentralized energy forecasting and settlement platform powered by LSTM ensembles, blockchain notarization, and intuitive analytics.",
  metadataBase: new URL("https://agentic-59f2958d.vercel.app"),
  openGraph: {
    title: "DEForecast | Decentralized Energy Forecasting Platform",
    description:
      "Streaming AI forecasts, DER analytics, and blockchain settlements for decentralized grids.",
    url: "https://agentic-59f2958d.vercel.app",
    siteName: "DEForecast",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DEForecast dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@deforecast",
    site: "@deforecast",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
