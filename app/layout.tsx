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
import { Inter, Oswald, Abel as V0_Font_Abel } from 'next/font/google'

// Initialize fonts
const _abel = V0_Font_Abel({ subsets: ['latin'], weight: ["400"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
})

export const metadata: Metadata = {
  title: "Vrai Québec | La Référence Nightlife & Sorties",
  description: "Le guide ultime pour Montréal et le Québec. Restos, bars, clubs, sports. C'est malade.",
  keywords: ["Montréal", "Québec", "Nightlife", "Restaurants", "Bars", "Clubs", "Sorties", "Events"],
  generator: "v0.app",
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
      <body className="font-sans antialiased min-h-screen bg-black text-foreground selection:bg-primary selection:text-primary-foreground">
        <RGBProvider>
          <AmbientOrbs /> {/* added AmbientOrbs */}
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
