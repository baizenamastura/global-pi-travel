import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Global Pi Travel - Discover the World, Pay with Pi",
  description:
    "Global Pi Travel - Your Ultimate Travel Companion. Explore, Book, and Pay with Pi Cryptocurrency Worldwide",
  generator: "v0.app",
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
        <style>{`
html {
  font-family: Arial, sans-serif;
  --font-sans: Arial, sans-serif;
  --font-mono: 'Courier New', monospace;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
