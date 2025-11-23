"use client"

import { useLanguage } from "./language-provider"
import { Sparkles, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export function PromoBanner() {
  const { t } = useLanguage()

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 border-2 border-primary/30 rounded-xl p-8 shadow-[0_0_50px_rgba(var(--primary),0.3)]">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-3 py-1 rounded-full mb-3">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs font-bold uppercase text-primary">{t.promo.badge}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
            {t.promo.title}
          </h3>
          <p className="text-gray-300 mb-4">{t.promo.description}</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
            {t.promo.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-gray-400">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold uppercase tracking-wider shadow-xl"
          >
            <Link href="/creer">
              {t.promo.cta}
              <Sparkles className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
