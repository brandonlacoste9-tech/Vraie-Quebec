"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"

export function NewsletterForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-primary text-sm tracking-[0.1em] uppercase font-sans">
        {t.newsletter.thanks}
      </p>
    )
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.newsletter.placeholder}
        className="input-luxury flex-1"
        aria-label={t.newsletter.placeholder}
        required
      />
      <button type="submit" className="btn-luxury whitespace-nowrap">
        {t.newsletter.subscribe}
      </button>
    </form>
  )
}
