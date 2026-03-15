"use client"

import { useLanguage } from "./language-provider"
import { Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

export function PromoBanner() {
  const { t } = useLanguage()

  return (
    <div className="relative overflow-hidden border border-border bg-surface p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 border border-primary flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-sans mb-2 block">
            {t.promo?.badge ?? "Nouveau"}
          </span>
          <h3 className="font-display font-light text-foreground text-2xl md:text-3xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {t.promo?.title ?? "Créer avec l'IA"}
          </h3>
          <p className="text-muted-foreground mb-4">{t.promo?.description}</p>

          {t.promo?.features && (
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {t.promo.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <Link href="/creer" className="btn-luxury inline-flex items-center gap-2">
            {t.promo?.cta ?? "Essayer"}
            <Sparkles className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
