'use client'

import { useState } from 'react'
import { MainNav } from '@/components/main-nav'
import { Footer } from '@/components/footer'
import { Mail, TrendingUp, Users, Zap } from 'lucide-react'

const packages = [
  {
    name: 'Présence',
    price: '199 $',
    period: 'fiche permanente',
    features: ['Fiche établissement complète', 'Description & photos', 'Lien de réservation direct'],
  },
  {
    name: 'Vedette',
    price: '499 $',
    period: '/ mois',
    features: ["Tout inclus — Présence", "Mise en avant sur la page d'accueil", 'Galerie photos & événements', 'Tableau de bord analytique'],
    highlight: true,
  },
  {
    name: 'Partenariat',
    price: 'Sur devis',
    period: 'solutions sur mesure',
    features: ['Campagnes éditoriales', 'Événements co-brandés', 'Support concierge dédié', 'Intégration newsletter'],
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

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-border">
        <p className="overline mb-4">Partenaires</p>
        <h1 className="font-display font-light text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Annoncez avec nous
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Rejoignez le réseau des établissements d'exception pour atteindre une audience de connaisseurs engagés et exigeants.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-20">

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { stat: '50 K+', label: 'Visiteurs mensuels', icon: Users },
            { stat: '200+', label: 'Partenaires actifs', icon: TrendingUp },
            { stat: '10 K+', label: 'Réservations / mois', icon: Zap },
          ].map(({ stat, label, icon: Icon }) => (
            <div key={label} className="bg-surface p-10 flex flex-col gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`flex flex-col p-10 ${pkg.highlight ? 'bg-foreground' : 'bg-surface'}`}>
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
                <button className={pkg.highlight ? 'btn-luxury' : 'btn-ghost-luxury'}>Nous contacter</button>
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

            <div className="bg-surface border border-border p-8 md:p-10">
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
