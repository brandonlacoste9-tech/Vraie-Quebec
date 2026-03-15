"use client"

import { useState } from "react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { Bell, CheckCircle2, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface NewsletterSignupProps {
  compact?: boolean
  showPreferences?: boolean
}

export function NewsletterSignup({ compact = false, showPreferences = false }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })
  const [preferences, setPreferences] = useState({ events: true, venues: true, deals: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setStatus({ type: null, message: "" })
    const result = await subscribeToNewsletter(email, showPreferences ? preferences : undefined)
    setStatus({ type: result.success ? "success" : "error", message: result.message })
    if (result.success) setEmail("")
    setLoading(false)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          placeholder="Votre courriel..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-luxury flex-1"
          required
        />
        <button type="submit" disabled={loading} className="btn-luxury">
          {loading ? "..." : "Go"}
        </button>
      </form>
    )
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-surface border border-border p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 border border-border flex items-center justify-center">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-light text-foreground text-xl" style={{ fontFamily: "var(--font-display)" }}>
            Restez informé
          </h3>
          <p className="text-sm text-muted-foreground">Les meilleures adresses avant tout le monde.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="votre@courriel.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-luxury w-full"
          required
        />

        {showPreferences && (
          <div className="space-y-3 p-4 bg-muted border border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] mb-2">Je veux recevoir :</p>
            {[
              { key: "events", label: "Nouveaux événements et spectacles" },
              { key: "venues", label: "Nouveaux restos, bars et clubs" },
              { key: "deals", label: "Offres exclusives et avantages VIP" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={preferences[key as keyof typeof preferences]}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, [key]: checked as boolean })}
                  className="border-border"
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-luxury w-full">
          {loading ? "Inscription..." : "M'inscrire"}
        </button>
      </form>

      {status.type && (
        <div className={`mt-4 p-3 border flex items-center gap-2 text-sm ${
          status.type === "success"
            ? "bg-primary/5 border-primary/20 text-primary"
            : "bg-destructive/10 border-destructive/20 text-destructive"
        }`}>
          {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {status.message}
        </div>
      )}
    </div>
  )
}
