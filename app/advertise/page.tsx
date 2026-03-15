'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MainNav } from '@/components/main-nav'
import { Footer } from '@/components/footer'
import { Mail, Phone } from 'lucide-react'

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    inquiryType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In production, send to backend/email service
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: '',
        inquiryType: '',
        message: '',
      })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MainNav />

      {/* Hero Section */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-6">
              Advertissez avec Vrai Québec
            </h1>
            <p className="text-xl text-muted-foreground">
              Rejoignez nos partenaires pour atteindre notre audience de lecteurs engagés à la recherche des meilleures adresses.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="card-editorial p-8">
              <h2 className="text-3xl font-display font-bold mb-8">Formulaire de demande</h2>

              {submitted ? (
                <div className="bg-primary/10 border border-primary text-primary p-6 rounded">
                  <h3 className="font-bold text-lg mb-2">Merci pour votre soumission!</h3>
                  <p>Nous reviendrons vers vous sous peu pour discuter de vos options publicitaires.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Info */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nom de l'entreprise *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Votre établissement"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Personne de contact *</label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+1 (514) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Courriel *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="vous@exemple.com"
                    />
                  </div>

                  {/* Business Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Type d'établissement *</label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="bar">Bar</option>
                        <option value="club">Club</option>
                        <option value="venue">Salle d'événements</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Type de demande *</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="featured-listing">Fiche mise en avant</option>
                        <option value="sponsorship">Parrainage</option>
                        <option value="partnership">Partenariat</option>
                        <option value="consultation">Consultation</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Décrivez vos objectifs publicitaires..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 font-semibold rounded hover:bg-primary/90 transition-colors"
                  >
                    Soumettre la demande
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar - Packages & Info */}
          <div className="space-y-8">
            {/* Packages */}
            <div className="card-editorial p-6">
              <h3 className="text-2xl font-display font-bold mb-6">Forfaits publicitaires</h3>
              <div className="space-y-4">
                {[
                  { name: 'Fiche Basique', price: '$199', features: ['Logo', 'Description'] },
                  { name: 'Fiche Premium', price: '$499', features: ['Logo', 'Gallerie', 'Événements'] },
                  { name: 'Partenariat', price: 'Sur devis', features: ['Tout inclus', 'Support dédié'] },
                ].map((pkg) => (
                  <div key={pkg.name} className="border border-border p-4 rounded">
                    <h4 className="font-bold text-primary">{pkg.name}</h4>
                    <p className="text-2xl font-bold my-2">{pkg.price}</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {pkg.features.map((f) => (
                        <li key={f}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="card-editorial p-6">
              <h3 className="text-2xl font-display font-bold mb-6">Nous contacter</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Courriel</p>
                    <a href="mailto:advertise@vraiquebec.com" className="font-semibold text-primary hover:underline">
                      advertise@vraiquebec.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <a href="tel:+15141234567" className="font-semibold text-primary hover:underline">
                      +1 (514) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
