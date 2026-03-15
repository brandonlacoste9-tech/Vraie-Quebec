'use client'

import Link from 'next/link'

export function MagazineMasthead() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('fr-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="border-b border-border bg-background py-8 md:py-10">
      <div className="container mx-auto px-4">
        {/* Date */}
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
          {formattedDate}
        </p>

        {/* Main Masthead */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl md:text-6xl font-display font-bold text-primary">VRAI</span>
              <span className="text-3xl md:text-4xl font-display italic text-foreground">Québec</span>
            </div>
          </Link>
        </div>

        {/* Tagline */}
        <p className="text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Votre guide éditorial pour découvrir l'essence authentique du Québec
        </p>

        {/* Horizontal Divider */}
        <div className="border-t border-border mt-8" />
      </div>
    </div>
  )
}
