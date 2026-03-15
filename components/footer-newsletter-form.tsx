"use client"

import { useState } from "react"

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-[#B08D57] text-[12px] tracking-[0.1em] uppercase font-sans">
        Merci — vous êtes inscrit.
      </p>
    )
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@courriel.com"
        className="input-luxury bg-[#2A2722] border-[#3A3630] text-[#FAF8F5] placeholder-[#6B6460] text-[13px]"
        aria-label="Adresse courriel"
        required
      />
      <button type="submit" className="btn-luxury text-[11px] w-full">
        S'inscrire
      </button>
    </form>
  )
}
