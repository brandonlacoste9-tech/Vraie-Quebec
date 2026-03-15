'use client'

import Link from 'next/link'
import { MainNav } from '@/components/main-nav'
import { Footer } from '@/components/footer'
import { Check, X } from 'lucide-react'

export default function MembersPage() {
  const plans = [
    {
      name: 'Explorateur',
      price: 'Gratuit',
      description: 'Accès aux listings et recommandations',
      features: [
        { name: 'Accès aux restaurants & bars', included: true },
        { name: 'Recherche avancée', included: true },
        { name: 'Sauvegarde de favoris', included: false },
        { name: 'Accès VIP prioritaire', included: false },
        { name: 'Support prioritaire', included: false },
      ],
    },
    {
      name: 'Insider',
      price: '9.99 $/mois',
      description: 'Recommandations exclusives et accès prioritaire',
      features: [
        { name: 'Accès aux restaurants & bars', included: true },
        { name: 'Recherche avancée', included: true },
        { name: 'Sauvegarde de favoris', included: true },
        { name: 'Accès VIP prioritaire', included: true },
        { name: 'Support prioritaire', included: false },
      ],
      popular: true,
    },
    {
      name: 'Élite',
      price: '24.99 $/mois',
      description: 'Expérience complète VIP avec support dédié',
      features: [
        { name: 'Accès aux restaurants & bars', included: true },
        { name: 'Recherche avancée', included: true },
        { name: 'Sauvegarde de favoris', included: true },
        { name: 'Accès VIP prioritaire', included: true },
        { name: 'Support prioritaire', included: true },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MainNav />

      {/* Hero Section */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-6">
              Adhésion Vrai Québec
            </h1>
            <p className="text-xl text-muted-foreground">
              Débloquez l'accès complet à nos recommandations curatées et à nos expériences VIP exclusives.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Why Membership Section */}
        <section className="mb-20 max-w-3xl">
          <h2 className="text-4xl font-display font-bold mb-8">Pourquoi s'abonner ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Recommandations Curatées',
                description: 'Accédez à nos sélections d\'adresses testées et approuvées par nos experts.',
              },
              {
                title: 'Accès Prioritaire',
                description: 'Réservations VIP et accès en priorité aux événements exclusifs.',
              },
              {
                title: 'Support Premium',
                description: 'Une équipe dédié e pour répondre à vos questions et suggestions.',
              },
            ].map((item, i) => (
              <div key={i} className="card-editorial p-6">
                <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans */}
        <section>
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Plans d'adhésion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`card-editorial overflow-hidden transition-all ${
                  plan.popular ? 'ring-2 ring-primary md:scale-105' : ''
                }`}
              >
                <div className="p-8">
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground px-3 py-1 inline-block text-xs font-bold rounded mb-4">
                      PLUS POPULAIRE
                    </div>
                  )}
                  <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-primary mb-6">{plan.price}</div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.included ? 'text-foreground' : 'text-muted-foreground line-through'
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {plan.name === 'Explorateur' ? (
                    <button className="w-full py-3 bg-secondary text-foreground rounded font-semibold hover:bg-secondary/80 transition-colors">
                      Accès Gratuit
                    </button>
                  ) : (
                    <button className="w-full py-3 bg-primary text-primary-foreground rounded font-semibold hover:bg-primary/90 transition-colors">
                      Choisir le plan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Questions fréquemment posées</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Puis-je annuler mon abonnement à tout moment ?',
                a: 'Oui, vous pouvez annuler votre abonnement à tout moment sans pénalité. Vous conserverez l'accès jusqu'à la fin de votre cycle de facturation.',
              },
              {
                q: 'Quels sont les moyens de paiement acceptés ?',
                a: 'Nous acceptons les cartes de crédit (Visa, Mastercard), PayPal et les virements bancaires. Vos données de paiement sont sécurisées et chiffrées.',
              },
              {
                q: 'Y a-t-il une période d'essai gratuite ?',
                a: 'Le plan Explorateur est toujours gratuit ! Pour nos plans premium, nous offrons un essai de 7 jours sans engagement.',
              },
              {
                q: 'Puis-je changer de plan ultérieurement ?',
                a: 'Bien sûr ! Vous pouvez mettre à jour ou rétrograder votre plan à tout moment. Les changements prendront effet immédiatement.',
              },
            ].map((item, i) => (
              <div key={i} className="card-editorial p-6">
                <h3 className="font-display font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 full-bleed bg-primary/10 border border-primary/20 rounded py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Prêt à rejoindre ?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Commencez dès aujourd'hui avec le plan gratuit et mettez à jour quand vous serez prêt.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 font-semibold rounded hover:bg-primary/90 transition-colors">
              Créer un compte
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
