"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { Bell, CheckCircle2, AlertCircle } from "lucide-react"

interface NewsletterSignupProps {
  compact?: boolean
  showPreferences?: boolean
}

export function NewsletterSignup({ compact = false, showPreferences = false }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const [preferences, setPreferences] = useState({
    events: true,
    venues: true,
    deals: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setStatus({ type: null, message: "" })

    const result = await subscribeToNewsletter(email, showPreferences ? preferences : undefined)

    setStatus({
      type: result.success ? "success" : "error",
      message: result.message,
    })

    if (result.success) {
      setEmail("")
    }

    setLoading(false)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Ton email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondary border-border text-white rounded-none focus-visible:ring-primary"
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-white rounded-none font-heading uppercase"
        >
          {loading ? "..." : "Go"}
        </Button>
      </form>
    )
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-zinc-900/50 border border-primary/30 rounded-lg p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-heading text-white">Reste dans le loop</h3>
          <p className="text-sm text-gray-400">Les meilleurs événements et deals avant tout le monde.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="ton-email@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black border-white/10 text-white focus-visible:ring-primary"
          required
        />

        {showPreferences && (
          <div className="space-y-3 p-4 bg-black/30 rounded border border-white/5">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Je veux recevoir:</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={preferences.events}
                onCheckedChange={(checked) => setPreferences({ ...preferences, events: checked as boolean })}
                className="border-white/20"
              />
              <span className="text-sm text-white">Nouveaux événements et spectacles</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={preferences.venues}
                onCheckedChange={(checked) => setPreferences({ ...preferences, venues: checked as boolean })}
                className="border-white/20"
              />
              <span className="text-sm text-white">Nouveaux restos, bars et clubs</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={preferences.deals}
                onCheckedChange={(checked) => setPreferences({ ...preferences, deals: checked as boolean })}
                className="border-white/20"
              />
              <span className="text-sm text-white">Deals exclusifs et promos VIP</span>
            </label>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-heading uppercase tracking-wider"
        >
          {loading ? "Inscription..." : "M'inscrire gratuitement"}
        </Button>
      </form>

      {status.type && (
        <div
          className={`mt-4 p-3 rounded border flex items-center gap-2 text-sm ${
            status.type === "success"
              ? "bg-green-900/20 border-green-500/30 text-green-400"
              : "bg-red-900/20 border-red-500/30 text-red-400"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {status.message}
        </div>
      )}
    </div>
  )
}
