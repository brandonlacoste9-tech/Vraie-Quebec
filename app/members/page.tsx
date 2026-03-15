'use client'

import { MainNav } from '@/components/main-nav'
import { Footer } from '@/components/footer'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Explorateur',
    price: 'Gratuit',
    description: "Pour découvrir l'essence de Vrai Québec",
    features: [
      { text: 'Accès aux fiches restaurants & bars', included: true },
      { text: 'Recherche avancée', included: true },
      { text: 'Sauvegarde de favoris', included: false },
      { text: 'Réservations prioritaires', included: false },
      { text: 'Invitations privées', included: false },
    ],
    cta: 'Commencer',
    highlight: false,
  },
  {
    name: 'Initiés',
    price: '9,99 $',
    period: '/ mois',
    description: 'Pour les connaisseurs qui veulent le meilleur',
    features: [
      { text: 'Accès aux fiches restaurants & bars', included: true },
      { text: 'Recherche avancée', included: true },
      { text: 'Sauvegarde de favoris', included: true },
      { text: 'Réservations prioritaires', included: true },
      { text: 'Invitations privées', included: false },
    ],
    cta: 'Rejoindre',
    highlight: true,
  },
  {
    name: 'Élite',
    price: '24,99 $',
    period: '/ mois',
    description: "L'expérience ultime, sans compromis",
    features: [
      { text: 'Accès aux fiches restaurants & bars', included: true },
      { text: 'Recherche avancée', included: true },
      { text: 'Sauvegarde de favoris', included: true },
      { text: 'Réservations prioritaires', included: true },
      { text: 'Invitations privées exclusives', included: true },
    ],
    cta: 'Rejoindre',
    highlight: false,
  },
]

const benefits = [
  { overline: 'Priorité', title: 'Tables garanties', body: "Réservations assurées dans les établissements les plus en demande, avec accès en avant-première." },
  { overline: 'Curation', title: 'Sélections hebdomadaires', body: "Découvrez nos adresses du moment, validées par nos experts culinaires et culturels, livrées chaque lundi." },
  { overline: 'Cercle', title: 'Événements privés', body: "Participez à nos soirées exclusives — dégustations, rencontres avec les chefs, vernissages." },
  { overline: 'Service', title: 'Concierge dédié', body: "Une équipe à votre disposition pour toutes vos questions, suggestions et demandes spéciales." },
]

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Hero — full-bleed dark */}
      <section className="full-bleed bg-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-6">Membership</p>
            <h1 className="font-display font-light text-primary-foreground leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              Le cercle des<br /><em className="italic text-primary">initiés</em>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Accédez aux meilleures tables de Montréal, aux événements privés et à une expérience culinaire hors du commun — réservé à nos membres.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=85&auto=format&fit=crop"
              alt="Expérience gastronomique exclusive"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-4 border border-primary/30 pointer-events-none" />
          </div>
        </div>
      </section>

      <div className="h-px bg-primary" />

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <p className="overline mb-4">Avantages</p>
        <h2 className="font-display font-light text-foreground mb-16" style={{ fontFamily: 'var(--font-display)' }}>Ce que vous obtenez</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-6">
              <div className="w-px bg-primary self-stretch flex-shrink-0" />
              <div>
                <p className="overline mb-2">{b.overline}</p>
                <h3 className="font-display font-light text-foreground text-2xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>{b.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="full-bleed bg-surface border-t border-b border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="overline mb-4 text-center">Tarifs</p>
          <h2 className="font-display font-light text-foreground text-center mb-16" style={{ fontFamily: 'var(--font-display)' }}>Choisissez votre accès</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {plans.map((plan) => (
              <div key={plan.name} className={`flex flex-col p-10 ${plan.highlight ? 'bg-foreground text-primary-foreground' : 'bg-surface'}`}>
                {plan.highlight && (
                  <p className="text-[9px] tracking-[0.25em] uppercase text-primary font-sans mb-4">Le plus choisi</p>
                )}
                <p className={`overline mb-3 ${plan.highlight ? 'text-primary' : ''}`}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`font-display font-light text-4xl ${plan.highlight ? 'text-primary-foreground' : 'text-foreground'}`} style={{ fontFamily: 'var(--font-display)' }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlight ? 'text-muted-foreground' : 'text-muted-foreground'}`}>{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-8">{plan.description}</p>
                <div className="h-px bg-border mb-8" />
                <ul className="space-y-4 flex-1 mb-10">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      {f.included ? (
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                          <div className="w-3 h-px bg-border" />
                        </div>
                      )}
                      <span className={`text-sm ${f.included ? (plan.highlight ? 'text-primary-foreground' : 'text-foreground') : 'text-muted-foreground'}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={plan.highlight ? 'btn-luxury' : 'btn-ghost-luxury'}>{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <p className="overline mb-4">FAQ</p>
        <h2 className="font-display font-light text-foreground mb-12" style={{ fontFamily: 'var(--font-display)' }}>Questions fréquentes</h2>
        <div className="space-y-px bg-border">
          {[
            { q: "Comment annuler mon abonnement?", a: "Vous pouvez annuler à tout moment depuis votre profil, sans frais de résiliation." },
            { q: "Les prix incluent-ils les taxes?", a: "Non — les taxes applicables seront calculées lors du paiement." },
            { q: "Puis-je changer de forfait?", a: "Oui. Tout changement est effectif immédiatement, avec ajustement au prorata." },
            { q: "Y a-t-il une période d'essai?", a: "Le plan Explorateur est toujours gratuit. Pour les plans payants, contactez-nous." },
          ].map((item) => (
            <div key={item.q} className="bg-surface hover:bg-background transition-colors p-8">
              <h3 className="font-display font-light text-foreground text-xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>{item.q}</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
