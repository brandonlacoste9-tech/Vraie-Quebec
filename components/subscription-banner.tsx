"use client"

import { Check } from "lucide-react"
import { SubscribeCheckoutButton } from "@/components/subscribe-checkout-button"
import { useUserIdentity } from "@/hooks/use-user-identity"

export function SubscriptionBanner() {
  const userId = useUserIdentity()

  return (
    <section className="relative overflow-hidden border-y border-border bg-foreground py-16 md:py-24">
      <div className="container relative z-10 px-4 text-center">
        <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-4">Adhésion</p>
        <h2 className="font-display font-light text-background text-4xl md:text-6xl mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Devenez Membre
        </h2>
        <p className="mx-auto max-w-2xl text-background/70 text-lg mb-10 font-light leading-relaxed">
          Accès privilégié aux pré-ventes, privilèges dans les établissements partenaires, et le statut Membre Vrai Québec.{" "}
          <span className="font-medium text-background">Forfaits dès 9,99 $ / mois</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-background/20 max-w-3xl mx-auto mb-10">
          {["Réservations prioritaires", "Avantages exclusifs", "Accès aux événements privés"].map((feature) => (
            <div key={feature} className="flex items-center gap-3 bg-foreground p-5">
              <div className="flex-shrink-0 h-5 w-5 border border-primary flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm text-background/80 tracking-wide">{feature}</span>
            </div>
          ))}
        </div>

        <SubscribeCheckoutButton
          userKey={userId || "guest@example.com"}
          className="inline-flex items-center justify-center px-10 h-14 bg-primary text-primary-foreground text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-[var(--primary-dark)] transition-colors"
        >
          Devenir membre — dès 9,99 $ / mois
        </SubscribeCheckoutButton>
        <p className="mt-4 text-[10px] text-background/40 uppercase tracking-wider">
          Sans engagement · Annulation à tout moment
        </p>
      </div>
    </section>
  )
}
