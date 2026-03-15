"use client"

import { useState } from "react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-surface border border-border p-8 md:p-12 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="h-px bg-primary w-10 mx-auto mb-6" />
          <p className="font-display font-light text-foreground text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Message reçu
          </p>
          <p className="text-muted-foreground text-sm">Nous vous répondrons dans les 48 heures.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border p-8 md:p-12">
      <p className="font-display font-light text-foreground text-2xl mb-8" style={{ fontFamily: "var(--font-display)" }}>
        Formulaire de contact
      </p>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Nom</label>
          <input type="text" className="input-luxury" placeholder="Votre nom" />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Courriel *</label>
          <input type="email" required className="input-luxury" placeholder="vous@exemple.com" />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Type de demande</label>
          <select className="input-luxury">
            <option value="">Sélectionner...</option>
            <option value="publicite">Publicité & Partenariat</option>
            <option value="support">Support & Réservations</option>
            <option value="suggestion">Suggestion éditoriale</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans mb-2">Message</label>
          <textarea rows={5} className="input-luxury resize-none" placeholder="Votre message..." />
        </div>
        <button type="submit" className="btn-luxury w-full">Envoyer</button>
      </form>
    </div>
  )
}
