import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/react"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google"

// Initialize fonts for editorial magazine
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://vraiquebec.com"),
  title: {
    default: "Vrai Québec | Votre Guide Éditorial",
    template: "%s | Vrai Québec"
  },
  description: "Le guide éditorial ultime pour Montréal et le Québec. Découvrez les meilleures adresses.",
  keywords: ["Montréal", "Québec", "Restaurants", "Bars", "Événements", "Sorties", "Tourisme Québec"],
  authors: [{ name: "Vrai Québec" }],
  creator: "Vrai Québec",
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: "https://vraiquebec.com",
    title: "Vrai Québec | Votre Guide Éditorial",
    description: "Le guide éditorial ultime pour Montréal et le Québec.",
    siteName: "Vrai Québec",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrai Québec | Votre Guide Éditorial",
    creator: "@vraiquebec",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground"
        style={{
          fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontFeatureSettings: '"kern" 1, "liga" 1',
        }}
      >
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
