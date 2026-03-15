"use client"

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Votre adresse courriel"
        className="input-luxury flex-1"
        aria-label="Adresse courriel"
      />
      <button type="submit" className="btn-luxury whitespace-nowrap">
        S'inscrire
      </button>
    </form>
  )
}
