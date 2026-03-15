"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { VIPPass } from "@/components/booking/VIPPass"
import { Ticket, Clock, Settings } from "lucide-react"
import Link from "next/link"

const myPasses = [
  {
    id: 1,
    venue: "La Voûte",
    event: "Soirée Dégustation",
    date: "2026-03-29",
    guests: 2,
    tier: "VIP" as const,
    sponsor: "Maison Perrier-Jouët",
  },
  {
    id: 2,
    venue: "Le Mousso",
    event: "Menu Prestige",
    date: "2026-04-12",
    guests: 4,
    tier: "Guestlist" as const,
    sponsor: "Champagne Taittinger",
  },
]

const history = [
  { id: "h1", venue: "Toqué!", event: "Repas du Chef", date: "2026-02-14", guests: 2 },
  { id: "h2", venue: "Candide", event: "Dîner Privé", date: "2026-01-28", guests: 3 },
  { id: "h3", venue: "Joe Beef", event: "Soirée Huitres", date: "2025-12-31", guests: 6 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"wallet" | "history">("wallet")

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      {/* Profile header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#D6D0C6]">
        <div className="flex items-end gap-6">
          <div
            className="w-16 h-16 bg-[#1C1916] flex items-center justify-center flex-shrink-0"
            aria-hidden
          >
            <span className="text-[#B08D57] font-display text-xl font-light" style={{ fontFamily: "var(--font-display)" }}>
              JT
            </span>
          </div>
          <div>
            <p className="overline mb-2">Mon compte</p>
            <h1
              className="font-display font-light text-[#1C1916] text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Julien Tremblay
            </h1>
            <p className="text-[#7D7468] text-sm mt-1">Membre Initié · Depuis janvier 2025</p>
          </div>
          <button className="ml-auto text-[#7D7468] hover:text-[#1C1916] transition-colors" title="Paramètres">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-px bg-[#D6D0C6] w-fit mb-12">
          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-sans transition-colors ${
              activeTab === "wallet" ? "bg-[#1C1916] text-[#FAF8F5]" : "bg-[#FAF8F5] text-[#7D7468] hover:bg-[#F4F1EC]"
            }`}
          >
            Mes laissez-passer
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-sans transition-colors ${
              activeTab === "history" ? "bg-[#1C1916] text-[#FAF8F5]" : "bg-[#FAF8F5] text-[#7D7468] hover:bg-[#F4F1EC]"
            }`}
          >
            Historique
          </button>
        </div>

        {activeTab === "wallet" && (
          <section>
            <p className="overline mb-8 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#B08D57]" />
              Laissez-passer actifs
            </p>

            {myPasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {myPasses.map((pass) => (
                  <VIPPass
                    key={pass.id}
                    userName="Julien Tremblay"
                    venueName={pass.venue}
                    eventName={pass.event}
                    date={pass.date}
                    guests={pass.guests}
                    tier={pass.tier}
                    sponsorName={pass.sponsor}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 border border-dashed border-[#D6D0C6] text-center">
                <Ticket className="w-8 h-8 text-[#D6D0C6] mx-auto mb-4" />
                <p className="text-[#7D7468] mb-6">Aucun laissez-passer actif</p>
                <Link href="/agenda" className="btn-luxury">
                  Explorer les événements
                </Link>
              </div>
            )}
          </section>
        )}

        {activeTab === "history" && (
          <section>
            <p className="overline mb-8 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B08D57]" />
              Réservations passées
            </p>

            <div className="space-y-px bg-[#D6D0C6]">
              {history.map((item) => (
                <div key={item.id} className="bg-[#FAF8F5] p-6 flex items-center justify-between hover:bg-white transition-colors duration-300">
                  <div>
                    <p
                      className="font-display font-light text-[#1C1916] text-lg"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.venue}
                    </p>
                    <p className="text-[#7D7468] text-sm">{item.event} · {item.guests} personne{item.guests > 1 ? "s" : ""}</p>
                  </div>
                  <p className="text-[10px] tracking-[0.14em] uppercase text-[#7D7468] font-sans">
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
