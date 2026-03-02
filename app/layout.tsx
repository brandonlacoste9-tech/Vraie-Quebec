import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/react"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { RGBBorder } from "@/components/rgb-border" // importing the new component
import { RGBProvider } from "@/components/rgb-provider" // imported RGBProvider
import { AmbientOrbs } from "@/components/ambient-orbs" // importing AmbientOrbs
import "./globals.css"
import { Inter, Oswald, Abel as V0_Font_Abel } from "next/font/google"

// Initialize fonts
const _abel = V0_Font_Abel({ subsets: ["latin"], weight: ["400"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://vraiquebec.com"),
  title: {
    default: "Vrai Québec | La Référence Nightlife & Sorties",
    template: "%s | Vrai Québec"
  },
  description: "Le guide ultime pour Montréal et le Québec. Restos, bars, clubs, sports. C'est malade.",
  keywords: ["Montréal", "Québec", "Nightlife", "Restaurants", "Bars", "Clubs", "Sorties", "Events", "Tourisme Québec", "Sortir Montréal"],
  authors: [{ name: "Vrai Québec" }],
  creator: "Vrai Québec",
  generator: "Next.js",
  alternates: {
    canonical: '/',
    languages: {
      'fr-CA': '/fr',
      'en-CA': '/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    alternateLocales: ["en_CA"],
    url: "https://vraiquebec.com",
    title: "Vrai Québec | L'Éxpérience VIP",
    description: "Le guide exclusif pour Montréal et le Québec. Découvrez les meilleurs restos, bars, clubs et événements sportifs.",
    siteName: "Vrai Québec",
    images: [
      {
        url: "/og-image.png", // Image has been added!
        width: 1200,
        height: 630,
        alt: "Vrai Québec - Nightlife & Sorties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrai Québec | L'Éxpérience VIP",
    description: "Le guide exclusif pour Montréal et le Québec. Découvrez les meilleurs restos, bars, et clubs.",
    images: ["/og-image.png"],
    creator: "@vraiquebec",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${oswald.variable}`}
      suppressHydrationWarning
      style={{ backgroundColor: "#000000" }}
    >
      <body
        className="font-sans antialiased min-h-screen bg-black text-foreground selection:bg-primary selection:text-primary-foreground"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", var(--font-sans), sans-serif',
          fontFeatureSettings: '"kern" 1, "liga" 1',
        }}
      >
        <RGBProvider>
          <AmbientOrbs />
          <RGBBorder />
          <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <LanguageProvider>{children}</LanguageProvider>
            </ThemeProvider>
          </ErrorBoundary>
          <Analytics />
        </RGBProvider>
      </body>
    </html>
  )
}
