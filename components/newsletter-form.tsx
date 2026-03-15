"use client"

import { useState } from "react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-[#B08D57] text-sm tracking-[0.1em] uppercase font-sans">
        Merci — vous êtes inscrit.
      </p>
    )
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse courriel"
        className="input-luxury flex-1"
        aria-label="Adresse courriel"
        required
      />
      <button type="submit" className="btn-luxury whitespace-nowrap">
        S'inscrire
      </button>
    </form>
  )
}
