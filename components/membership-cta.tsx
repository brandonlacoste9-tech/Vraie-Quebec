'use client'

import Link from 'next/link'

interface MembershipCTAProps {
  title?: string
  description?: string
}

export function MembershipCTA({ 
  title = 'Rejoignez notre communauté',
  description = 'Devenir membre de Vrai Québec vous donne accès à des réservations prioritaires, des événements exclusifs et une expérience culinaire incomparable.' 
}: MembershipCTAProps) {
  return (
    <section className="full-bleed bg-foreground text-background py-16 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          {title}
        </h2>
        <p className="text-xl text-background/80 mb-8 leading-relaxed">
          {description}
        </p>
        <Link 
          href="/members"
          className="inline-block bg-background text-foreground px-8 py-4 font-display font-bold uppercase text-sm tracking-wider hover:bg-background/90 transition-colors"
        >
          Explorer l'adhésion →
        </Link>
      </div>
    </section>
  )
}
