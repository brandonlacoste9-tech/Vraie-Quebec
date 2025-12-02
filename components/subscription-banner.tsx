import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export function SubscriptionBanner() {
  return (
    <section className="relative overflow-hidden border-y border-primary/30 leather-card-elevated stitched py-16 md:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <h2 className="font-heading text-4xl md:text-6xl font-black uppercase text-white mb-6">
          DEVIENS UN <span className="text-primary neon-text">VIP</span>
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-300 mb-10 font-light">
          Accès exclusif aux pré-ventes, rabais dans les restos, et le statut officiel "Vrai Québec". Juste{" "}
          <span className="font-bold text-white">6 piastres</span> par mois.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
          {["Réservations prioritaires", "Rabais exclusifs (20% off)", "Accès aux événements privés"].map((feature) => (
            <div key={feature} className="flex items-center gap-3 leather-card p-3 border border-border">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-200 uppercase font-heading tracking-wide">{feature}</span>
            </div>
          ))}
        </div>

        <Link href="https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00" target="_blank">
          <Button
            size="lg"
            className="h-14 px-10 bg-primary hover:bg-primary/90 text-white font-heading uppercase text-xl tracking-widest rounded-none shadow-[0_0_30px_-5px_rgba(0,68,255,0.5)] hover:shadow-[0_0_50px_-5px_rgba(0,68,255,0.7)] transition-all scale-100 hover:scale-105"
          >
            S'abonner pour 6$ / mois
          </Button>
        </Link>
        <p className="mt-4 text-xs text-muted-foreground uppercase tracking-wider">
          Annule quand tu veux • Pas de niaisage
        </p>
      </div>
    </section>
  )
}
