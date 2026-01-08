import type React from "react"
import type { Metadata, Viewport } from "next"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

export const metadata: Metadata = {
  title: "Global Pi Travel - Discover the World, Pay with Pi",
  description:
    "Global Pi Travel - Your Ultimate Travel Companion. Explore, Book, and Pay with Pi Cryptocurrency Worldwide. Find hotels, flights, tours, and merchants accepting Pi Network payments globally.",
  generator: "v0.app",
  keywords: [
    "Pi Network",
    "Pi cryptocurrency",
    "travel with Pi",
    "Pi payment",
    "global travel",
    "Pi merchants",
    "blockchain travel",
    "crypto travel",
    "Pi hotels",
    "Pi flights",
  ],
  authors: [{ name: "Global Pi Travel" }],
  openGraph: {
    title: "Global Pi Travel - Pay with Pi Worldwide",
    description:
      "Explore the world and pay with Pi cryptocurrency. Connect with travelers and merchants accepting Pi payments globally.",
    url: "https://globalpitravel3684.pinet.com",
    siteName: "Global Pi Travel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Pi Travel - Pay with Pi Worldwide",
    description: "Your ultimate travel companion powered by Pi Network. Explore, book, and pay with Pi worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c4a6e" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="pi-network-domain-verification"
          content="1858fd2ac308ac4c9748631e40ede9813422228bc09065b535fcd70d70a71df2086531d702932cd5cbebdffa958ca2f84d6a7e81347337a56e90f1bec7ecedce"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.piConfig = {
                apiKey: 'pyrd9grcke0xc1umvdzzt8lgyrbcnozdy6upuvf649iqrwpl5ueueuwtenyez5wo',
                domain: 'https://globalpitravel3684.pinet.com',
                sandboxMode: true
              };
              
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  if (window.Pi && window.Pi.init) {
                    try {
                      window.Pi.init({ 
                        version: '2.0',
                        sandbox: true
                      });
                    } catch (error) {
                      // Pi SDK initialization error handled gracefully
                    }
                  }
                });
              }
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style>{`
html {
  font-family: Arial, sans-serif;
  --font-sans: Arial, sans-serif;
  --font-mono: 'Courier New', monospace;
}
        `}</style>
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
