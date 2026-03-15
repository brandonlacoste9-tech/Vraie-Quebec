"use client"

export function ContactForm() {
  return (
    <div className="bg-[#FAF8F5] border border-[#D6D0C6] p-8 md:p-12">
      <p
        className="font-display font-light text-[#1C1916] text-2xl mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Formulaire de contact
      </p>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans mb-2">
            Nom
          </label>
          <input
            type="text"
            className="input-luxury"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans mb-2">
            Courriel *
          </label>
          <input
            type="email"
            required
            className="input-luxury"
            placeholder="vous@exemple.com"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans mb-2">
            Type de demande
          </label>
          <select className="input-luxury">
            <option value="">Sélectionner...</option>
            <option value="publicite">Publicité & Partenariat</option>
            <option value="support">Support & Réservations</option>
            <option value="suggestion">Suggestion éditoriale</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans mb-2">
            Message
          </label>
          <textarea
            rows={5}
            className="input-luxury resize-none"
            placeholder="Votre message..."
          />
        </div>
        <button type="submit" className="btn-luxury w-full">
          Envoyer
        </button>
      </form>
    </div>
  )
}
