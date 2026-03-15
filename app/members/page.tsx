'use client'

import Link from 'next/link'
import { MainNav } from '@/components/main-nav'
import { Footer } from '@/components/footer'
import { Check } from 'lucide-react'

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
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-6">
            Devenez Membre
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Accédez à des réservations prioritaires, des événements exclusifs et des recommandations curatoriales sélectionnées par nos experts.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card-editorial p-8">
              <h3 className="text-2xl font-display font-bold mb-3">Réservations prioritaires</h3>
              <p className="text-muted-foreground">Accès en avant-première aux meilleures tables et événements exclusifs du Québec.</p>
            </div>
            <div className="card-editorial p-8">
              <h3 className="text-2xl font-display font-bold mb-3">Recommandations personnalisées</h3>
              <p className="text-muted-foreground">Découvrez des adresses sélectionnées par nos experts culinaires et culturels.</p>
            </div>
            <div className="card-editorial p-8">
              <h3 className="text-2xl font-display font-bold mb-3">Événements exclusifs</h3>
              <p className="text-muted-foreground">Participez à nos événements privés et rencontrez les propriétaires et chefs.</p>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Pricing Plans */}
        <section className="py-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Nos forfaits</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card-editorial overflow-hidden flex flex-col ${
                  plan.popular ? 'ring-2 ring-primary md:scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-xs font-bold uppercase tracking-wider">
                    Le plus populaire
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <p className="text-4xl font-display font-bold text-primary">{plan.price}</p>
                    {plan.price !== 'Gratuit' && (
                      <p className="text-xs text-muted-foreground mt-1">Facturé mensuellement</p>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 font-semibold mb-8 transition-colors ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border'
                    }`}
                  >
                    {plan.price === 'Gratuit' ? 'Commencer gratuitement' : 'S\'abonner'}
                  </button>

                  <div className="space-y-4 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-5 h-5 border border-border rounded flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Benefits */}
        <section className="py-20">
          <h2 className="text-4xl font-display font-bold mb-12">Avantages des membres</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Accès VIP aux établissements',
                description: 'Réservations garanties dans les restaurants et bars les plus populaires, avec des tables prioritaires et des offres spéciales.',
              },
              {
                title: 'Recommandations curatoriales',
                description: 'Découvrez des adresses sélectionnées chaque semaine par nos experts culinaires et culturels.',
              },
              {
                title: 'Événements exclusifs',
                description: 'Participez à nos événements privés, dégustation, et rencontres avec les propriétaires et chefs.',
              },
              {
                title: 'Support prioritaire',
                description: 'Accès à une équipe dédiée pour vos questions et vos besoins en matière de réservations.',
              },
            ].map((benefit) => (
              <div key={benefit.title}>
                <h3 className="text-2xl font-display font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* FAQ Section */}
        <section className="py-20">
          <h2 className="text-4xl font-display font-bold mb-12">Questions fréquentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {[
              {
                q: 'Comment annuler mon abonnement?',
                a: 'Vous pouvez annuler votre abonnement à tout moment depuis votre profil. Il n\'y a aucun frais de résiliation.',
              },
              {
                q: 'Les prix incluent-ils les taxes?',
                a: 'Non, les prix affichés n\'incluent pas les taxes applicables. Les taxes seront ajoutées lors du paiement.',
              },
              {
                q: 'Dois-je avoir un abonnement pour faire une réservation?',
                a: 'Non, vous pouvez faire des réservations sans abonnement, mais les membres Insider et Élite bénéficient de priorité.',
              },
              {
                q: 'Puis-je changer de forfait?',
                a: 'Oui, vous pouvez passer à un forfait supérieur à tout moment. Le changement est effectif immédiatement.',
              },
            ].map((item, idx) => (
              <div key={idx} className="card-editorial p-6">
                <h3 className="font-display font-bold mb-3">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* CTA */}
        <section className="full-bleed bg-foreground text-background py-16 md:py-20 my-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Prêt à découvrir le Québec?
            </h2>
            <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de membres qui explorent les meilleures adresses du Québec.
            </p>
            <button className="bg-background text-foreground px-8 py-4 font-display font-bold uppercase text-sm tracking-wider hover:bg-background/90 transition-colors">
              Commencer aujourd'hui →
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
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
