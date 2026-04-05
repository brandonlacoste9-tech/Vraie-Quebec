"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { VIPPass } from "@/components/booking/VIPPass"
import { Ticket, Clock, Settings } from "lucide-react"
import Link from "next/link"

const myPasses = [
  { id: 1, venue: "La Voûte", event: "Soirée Dégustation", date: "2026-03-29", guests: 2, tier: "VIP" as const, sponsor: "Maison Perrier-Jouët" },
  { id: 2, venue: "Le Mousso", event: "Menu Prestige", date: "2026-04-12", guests: 4, tier: "Guestlist" as const, sponsor: "Champagne Taittinger" },
]

const history = [
  { id: "h1", venue: "Toqué!", event: "Repas du Chef", date: "2026-02-14", guests: 2 },
  { id: "h2", venue: "Candide", event: "Dîner Privé", date: "2026-01-28", guests: 3 },
  { id: "h3", venue: "Joe Beef", event: "Soirée Huitres", date: "2025-12-31", guests: 6 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"wallet" | "history">("wallet")

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Profile header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-border">
        <div className="flex items-end gap-6">
          <div className="w-16 h-16 bg-foreground flex items-center justify-center flex-shrink-0" aria-hidden>
            <span className="text-primary font-display text-xl font-light" style={{ fontFamily: "var(--font-display)" }}>JT</span>
          </div>
          <div>
            <p className="overline mb-2">Mon compte</p>
            <h1 className="font-display font-light text-foreground text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Julien Tremblay
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Membre Initié · Depuis janvier 2025</p>
          </div>
          <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors" title="Paramètres">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-px bg-border w-fit mb-12">
          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-sans transition-colors ${
              activeTab === "wallet" ? "bg-foreground text-primary-foreground" : "bg-surface text-muted-foreground hover:bg-background"
            }`}
          >
            Mes laissez-passer
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-sans transition-colors ${
              activeTab === "history" ? "bg-foreground text-primary-foreground" : "bg-surface text-muted-foreground hover:bg-background"
            }`}
          >
            Historique
          </button>
        </div>

        {activeTab === "wallet" && (
          <section>
            <p className="overline mb-8 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary" />
              Laissez-passer actifs
            </p>
            {myPasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {myPasses.map((pass) => (
                  <VIPPass
                    key={pass.id}
                    guestName="Julien Tremblay"
                    venueName={pass.venue}
                    eventName={pass.event}
                    date={pass.date}
                    time="20:00"
                    ticketType={pass.tier}
                    sponsorName={pass.sponsor}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 border border-dashed border-border text-center">
                <Ticket className="w-8 h-8 text-border mx-auto mb-4" />
                <p className="text-muted-foreground mb-6">Aucun laissez-passer actif</p>
                <Link href="/agenda" className="btn-luxury">Explorer les événements</Link>
              </div>
            )}
          </section>
        )}

        {activeTab === "history" && (
          <section>
            <p className="overline mb-8 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Réservations passées
            </p>
            <div className="space-y-px bg-border">
              {history.map((item) => (
                <div key={item.id} className="bg-surface p-6 flex items-center justify-between hover:bg-background transition-colors duration-300">
                  <div>
                    <p className="font-display font-light text-foreground text-lg" style={{ fontFamily: "var(--font-display)" }}>{item.venue}</p>
                    <p className="text-muted-foreground text-sm">{item.event} · {item.guests} personne{item.guests > 1 ? "s" : ""}</p>
                  </div>
                  <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-sans">
                    {new Date(item.date).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
