import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── GA4 Measurement ID ──────────────────────────────────────────────
// Replace with your real GA4 measurement ID (e.g. "G-ABC123XYZ")
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX";

// ── Metadata (SEO + Open Graph + Twitter) ───────────────────────────
export const metadata = {
  metadataBase: new URL("https://www.rearendclaims.com"),
  title: {
    default: "Car Accident Attorneys — Top-Rated Las Vegas Injury Lawyers",
    template: "%s | RearEndClaims",
  },
  description:
    "Top-rated Las Vegas injury lawyers. Recovering billions for accident victims. Free consultation available 24/7.",
  keywords: [
    "car accident attorney",
    "Las Vegas injury lawyer",
    "personal injury attorney",
    "rear end claims",
    "auto accident lawyer",
    "free consultation",
  ],
  authors: [{ name: "RearEndClaims" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rearendclaims.com",
    siteName: "RearEndClaims — Car Accident Attorneys",
    title: "Car Accident Attorneys — Top-Rated Las Vegas Injury Lawyers",
    description:
      "Top-rated Las Vegas injury lawyers. Recovering billions for accident victims. Free consultation available 24/7.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "RearEndClaims — Car Accident Attorneys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Accident Attorneys — Top-Rated Las Vegas Injury Lawyers",
    description:
      "Top-rated Las Vegas injury lawyers. Recovering billions for accident victims. Free consultation available 24/7.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ── Google Analytics 4 ─────────────────────────────────── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
