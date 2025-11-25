"use server"

import { createClient } from "@/lib/supabase"

export async function subscribeToNewsletter(email: string, preferences?: Record<string, boolean>) {
  try {
    const supabase = createClient()

    if (!supabase) {
      return { success: false, message: "Service temporairement indisponible. Réessaye plus tard." }
    }

    const { data, error } = await supabase
      .from("email_subscribers")
      .insert({
        email,
        preferences: preferences || { events: true, venues: true, deals: true },
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return { success: true, message: "Déjà inscrit! Tu reçois déjà nos updates." }
      }
      throw error
    }

    return { success: true, message: "Bienvenue! Tu vas recevoir les meilleurs deals en premier." }
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return { success: false, message: "Erreur. Réessaye dans quelques instants." }
  }
}

export async function updatePreferences(email: string, preferences: Record<string, boolean>) {
  try {
    const supabase = createClient()

    if (!supabase) {
      return { success: false, message: "Service temporairement indisponible." }
    }

    const { error } = await supabase.from("email_subscribers").update({ preferences }).eq("email", email)

    if (error) throw error

    return { success: true, message: "Préférences mises à jour!" }
  } catch (error) {
    console.error("[v0] Preferences update error:", error)
    return { success: false, message: "Erreur. Réessaye plus tard." }
  }
}
