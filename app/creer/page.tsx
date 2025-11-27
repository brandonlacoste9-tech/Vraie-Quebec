"use client"

import { MainNav } from "@/components/main-nav"
import { ImageCombiner } from "@/components/image-combiner"
import { ImageGenerationErrorBoundary } from "@/components/image-combiner/error-boundary"
import { useLanguage } from "@/components/language-provider"
import { UsageIndicator } from "@/components/usage-indicator" // Import UsageIndicator component

export default function CreerPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />

      <div className="relative overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent mb-2">
            {t.creer.title}
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-6">{t.creer.subtitle}</p>

          <div className="flex justify-center mb-8">
            <UsageIndicator type="image" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ImageGenerationErrorBoundary>
          <ImageCombiner />
        </ImageGenerationErrorBoundary>
      </div>
    </main>
  )
}
