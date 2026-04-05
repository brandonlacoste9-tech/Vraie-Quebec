import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import Script from "next/script"
import "./globals.css"
import { Cormorant_Garamond, Plus_Jakarta_Sans, DM_Mono } from "next/font/google"
// Cormorant Garamond — editorial display
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})
const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
})
export const metadata: Metadata = {
  metadataBase: new URL("https://vraiquebec.com"),
  title: {
    default: "Vrai Québec | L'Art de Vivre",
    template: "%s | Vrai Québec"
  },
  description: "Le guide de référence pour les adresses d'exception à Montréal et au Québec. Restaurants, bars, événements et expériences exclusives.",
  keywords: ["Montréal", "Québec", "Gastronomie", "Restaurants", "Bars", "Événements", "Art de vivre"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F1EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0C0A" },
  ],
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
      className={[cormorant.variable, plusJakarta.variable, dmMono.variable].join(" ")}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
      >
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="vraiquebec-theme" disableTransitionOnChange={false}>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4276130467303652"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
