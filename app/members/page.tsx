'use client'

import { MainNav } from '@/components/main-nav'
import { Footer } from '@/components/footer'
import { Check } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export default function MembersPage() {
  const { t } = useLanguage()

  const plans = [
    {
      name: t.members.explorer,
      price: t.members.explorerPrice,
      description: t.members.explorerDesc,
      features: [
        { text: t.members.featureAccess, included: true },
        { text: t.members.featureSearch, included: true },
        { text: t.members.featureFavorites, included: false },
        { text: t.members.featurePriority, included: false },
        { text: t.members.featurePrivate, included: false },
      ],
      cta: t.members.start,
      highlight: false,
    },
    {
      name: t.members.insiders,
      price: t.members.insidersPrice,
      period: t.members.insidersPeriod,
      description: t.members.insidersDesc,
      features: [
        { text: t.members.featureAccess, included: true },
        { text: t.members.featureSearch, included: true },
        { text: t.members.featureFavorites, included: true },
        { text: t.members.featurePriority, included: true },
        { text: t.members.featurePrivate, included: false },
      ],
      cta: t.members.join,
      highlight: true,
    },
    {
      name: t.members.elite,
      price: t.members.elitePrice,
      period: t.members.elitePeriod,
      description: t.members.eliteDesc,
      features: [
        { text: t.members.featureAccess, included: true },
        { text: t.members.featureSearch, included: true },
        { text: t.members.featureFavorites, included: true },
        { text: t.members.featurePriority, included: true },
        { text: t.members.featurePrivate, included: true },
      ],
      cta: t.members.join,
      highlight: false,
    },
  ]

  const benefits = [
    { overline: t.members.priority, title: t.members.priorityTitle, body: t.members.priorityBody },
    { overline: t.members.curation, title: t.members.curationTitle, body: t.members.curationBody },
    { overline: t.members.circle, title: t.members.circleTitle, body: t.members.circleBody },
    { overline: t.members.service, title: t.members.serviceTitle, body: t.members.serviceBody },
  ]

  const faqs = [
    { q: t.members.faqCancel, a: t.members.faqCancelAnswer },
    { q: t.members.faqTaxes, a: t.members.faqTaxesAnswer },
    { q: t.members.faqChange, a: t.members.faqChangeAnswer },
    { q: t.members.faqTrial, a: t.members.faqTrialAnswer },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Hero — full-bleed dark */}
      <section className="full-bleed bg-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-6">{t.members.overline}</p>
            <h1 className="font-display font-light text-primary-foreground leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              {t.members.title}<br /><em className="italic text-primary">{t.members.highlight}</em>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              {t.members.description}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=85&auto=format&fit=crop"
              alt="Exclusive dining experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-4 border border-primary/30 pointer-events-none" />
          </div>
        </div>
      </section>

      <div className="h-px bg-primary" />

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <p className="overline mb-4">{t.members.benefits}</p>
        <h2 className="font-display font-light text-foreground mb-16" style={{ fontFamily: 'var(--font-display)' }}>{t.members.benefitsTitle}</h2>
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
          <p className="overline mb-4 text-center">{t.members.pricing}</p>
          <h2 className="font-display font-light text-foreground text-center mb-16" style={{ fontFamily: 'var(--font-display)' }}>{t.members.pricingTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {plans.map((plan) => (
              <div key={plan.name} className={`flex flex-col p-10 ${plan.highlight ? 'bg-foreground text-primary-foreground' : 'bg-surface'}`}>
                {plan.highlight && (
                  <p className="text-[9px] tracking-[0.25em] uppercase text-primary font-sans mb-4">{t.members.mostPopular}</p>
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
        <p className="overline mb-4">{t.members.faq}</p>
        <h2 className="font-display font-light text-foreground mb-12" style={{ fontFamily: 'var(--font-display)' }}>{t.members.faqTitle}</h2>
        <div className="space-y-px bg-border">
          {faqs.map((item) => (
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
