'use client'

import { useState } from 'react'
import { MainNav } from '@/components/main-nav'
import { Footer } from '@/components/footer'
import { EditorialPageHeader } from '@/components/editorial-page-header'
import { Mail, TrendingUp, Users, Zap } from 'lucide-react'

const adsLinkCombined = process.env.NEXT_PUBLIC_STRIPE_ADS_PAYMENT_LINK?.trim()
const adsLinkVedette = process.env.NEXT_PUBLIC_STRIPE_ADS_PAYMENT_LINK_VEDETTE?.trim()

const packages = [
  {
    name: 'Présence',
    price: '199 $',
    period: 'fiche permanente',
    features: ['Fiche établissement complète', 'Description & photos', 'Lien de réservation direct'],
    /** Paiement: lien combiné 199 $ / 499 $ sur Stripe */
    payment: 'combined' as const,
    ctaPay: 'Payer en ligne',
    ctaFallback: 'Nous contacter',
  },
  {
    name: 'Vedette',
    price: '499 $',
    period: '/ mois',
    features: ["Tout inclus — Présence", "Mise en avant sur la page d'accueil", 'Galerie photos & événements', 'Tableau de bord analytique'],
    highlight: true,
    payment: 'vedette' as const,
    ctaPay: 'Payer — Vedette 499 $',
    ctaFallback: 'Nous contacter',
  },
  {
    name: 'Partenariat',
    price: 'Sur devis',
    period: 'solutions sur mesure',
    features: ['Campagnes éditoriales', 'Événements co-brandés', 'Support concierge dédié', 'Intégration newsletter'],
    payment: null,
    ctaPay: '',
    ctaFallback: 'Nous contacter',
  },
]

type FormData = {
  businessName: string
  contactName: string
  email: string
  phone: string
  businessType: string
  inquiryType: string
  message: string
}

const empty: FormData = { businessName: '', contactName: '', email: '', phone: '', businessType: '', inquiryType: '', message: '' }

export default function AdvertisePage() {
  const [form, setForm] = useState<FormData>(empty)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setForm(empty) }, 4000)
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <EditorialPageHeader
        overline="Partenaires"
        title="Annoncez avec nous"
        description="Rejoignez le réseau des établissements d'exception pour atteindre une audience de connaisseurs engagés et exigeants."
      />

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-16 space-y-16 md:space-y-20">

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { stat: '50 K+', label: 'Visiteurs mensuels', icon: Users },
            { stat: '200+', label: 'Partenaires actifs', icon: TrendingUp },
            { stat: '10 K+', label: 'Réservations / mois', icon: Zap },
          ].map(({ stat, label, icon: Icon }) => (
            <div key={label} className="rounded-sm ring-1 ring-border bg-surface p-10 flex flex-col gap-4 shadow-sm">
              <Icon className="w-5 h-5 text-primary" />
              <p className="font-display font-light text-foreground text-4xl" style={{ fontFamily: 'var(--font-display)' }}>{stat}</p>
              <p className="text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </section>

        {/* Packages */}
        <section>
          <p className="overline mb-4">Forfaits</p>
          <h2 className="font-display font-light text-foreground mb-12" style={{ fontFamily: 'var(--font-display)' }}>Solutions publicitaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`flex flex-col p-10 rounded-sm ring-1 ring-border shadow-sm ${pkg.highlight ? 'bg-foreground ring-primary/30' : 'bg-surface hover:ring-primary/40 transition-[box-shadow,ring-color] duration-300'}`}
              >
                {pkg.highlight && (
                  <p className="text-[9px] tracking-[0.25em] uppercase text-primary font-sans mb-4">Le plus populaire</p>
                )}
                <p className={`overline mb-3 ${pkg.highlight ? 'text-primary' : ''}`}>{pkg.name}</p>
                <p className={`font-display font-light text-3xl mb-1 ${pkg.highlight ? 'text-primary-foreground' : 'text-foreground'}`} style={{ fontFamily: 'var(--font-display)' }}>
                  {pkg.price}
                </p>
                <p className="text-xs text-muted-foreground mb-6">{pkg.period}</p>
                <div className="h-px bg-border mb-6" />
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {pkg.payment === 'combined' && adsLinkCombined && (adsLinkCombined.startsWith('https://') || adsLinkCombined.startsWith('http://')) ? (
                  <a
                    href={adsLinkCombined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pkg.highlight ? 'btn-luxury text-center' : 'btn-ghost-luxury text-center'}
                  >
                    {pkg.ctaPay}
                  </a>
                ) : pkg.payment === 'vedette' && adsLinkVedette && (adsLinkVedette.startsWith('https://') || adsLinkVedette.startsWith('http://')) ? (
                  <a
                    href={adsLinkVedette}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pkg.highlight ? 'btn-luxury text-center' : 'btn-ghost-luxury text-center'}
                  >
                    {pkg.ctaPay}
                  </a>
                ) : (
                  <a
                    href="mailto:advertise@vraiquebec.com?subject=Forfait%20publicitaire%20%E2%80%94%20Vrai%20Qu%C3%A9bec"
                    className={pkg.highlight ? 'btn-luxury text-center' : 'btn-ghost-luxury text-center'}
                  >
                    {pkg.ctaFallback}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="overline mb-4">Contact</p>
              <h2 className="font-display font-light text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>Parlons de votre projet</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Chaque partenariat est unique. Remplissez le formulaire et notre équipe vous contactera sous 48 heures pour discuter d'une solution adaptée à vos objectifs.
              </p>
              <a href="mailto:advertise@vraiquebec.com" className="flex items-center gap-3 text-primary hover:text-primary-dark transition-colors">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">advertise@vraiquebec.com</span>
              </a>
            </div>

            <div className="bg-surface rounded-sm ring-1 ring-border shadow-sm p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="h-px w-12 bg-primary mb-6" />
                  <p className="font-display font-light text-foreground text-2xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>Message reçu</p>
                  <p className="text-muted-foreground text-sm">Nous vous contacterons sous 48 heures.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Établissement *</label>
                      <input name="businessName" value={form.businessName} onChange={handleChange} required className="input-luxury" placeholder="Nom de l'établissement" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Contact *</label>
                      <input name="contactName" value={form.contactName} onChange={handleChange} required className="input-luxury" placeholder="Votre nom" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Courriel *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-luxury" placeholder="vous@etablissement.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">{"Type d'établissement"}</label>
                      <select name="businessType" value={form.businessType} onChange={handleChange} className="input-luxury">
                        <option value="">Sélectionner...</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="bar">Bar</option>
                        <option value="club">Club</option>
                        <option value="venue">{"Salle d'événements"}</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Forfait souhaité</label>
                      <select name="inquiryType" value={form.inquiryType} onChange={handleChange} className="input-luxury">
                        <option value="">Sélectionner...</option>
                        <option value="presence">Présence</option>
                        <option value="vedette">Vedette</option>
                        <option value="partnership">Partenariat</option>
                        <option value="other">À définir</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="input-luxury resize-none" placeholder="Décrivez vos objectifs..." />
                  </div>
                  <button type="submit" className="btn-luxury w-full">Soumettre la demande</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
