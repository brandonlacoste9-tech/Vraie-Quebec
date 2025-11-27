"use client"

import { useState } from "react"
import { VIPPass } from "@/components/booking/VIPPass"
import { Button } from "@/components/ui/button"
import { Settings, CreditCard, LogOut, Star, Ticket } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"wallet" | "history">("wallet")

  // Mock data for wallet items
  const myPasses = [
    {
        id: 1,
        venue: "La Voûte",
        event: "Saturday Night Live",
        date: "2025-11-29",
        guests: 4,
        tier: "VIP",
        sponsor: "Grey Goose"
    },
    {
        id: 2,
        venue: "New City Gas",
        event: "Martin Garrix",
        date: "2025-12-15",
        guests: 2,
        tier: "Guestlist",
        sponsor: "Videotron"
    }
  ]

  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-20 h-20 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center text-3xl font-heading font-bold text-gold-400">
            JT
          </div>
          <div>
            <h1 className="text-3xl font-oswald font-bold text-white uppercase">Julien Tremblay</h1>
            <p className="text-zinc-400">Member since 2025</p>
          </div>
        </div>

        <div className="flex gap-8 border-b border-white/10 mb-8">
          <button 
            onClick={() => setActiveTab("wallet")}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "wallet" ? "text-gold-400 border-b-2 border-gold-400" : "text-zinc-500 hover:text-white"}`}
          >
            My Wallet
          </button>
           <button 
            onClick={() => setActiveTab("history")}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === "history" ? "text-gold-400 border-b-2 border-gold-400" : "text-zinc-500 hover:text-white"}`}
          >
            History
          </button>
        </div>

        {activeTab === "wallet" && (
            <div className="space-y-12">
                {/* Active Passes Section */}
                <section>
                    <h2 className="text-xl font-oswald text-white uppercase mb-6 flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-gold-500" />
                        Active Passes
                    </h2>
                    
                    {myPasses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {myPasses.map((pass) => (
                                <div key={pass.id} className="relative group">
                                    <VIPPass
                                        userName="Julien Tremblay"
                                        venueName={pass.venue}
                                        eventName={pass.event}
                                        date={pass.date}
                                        guests={pass.guests}
                                        tier={pass.tier as any}
                                        sponsorName={pass.sponsor}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white/5 rounded-lg border border-dashed border-white/10">
                            <p className="text-zinc-500 mb-4">No active passes found.</p>
                            <Button className="bg-gold-500 text-black hover:bg-gold-400">Explore Events</Button>
                        </div>
                    )}
                </section>
            </div>
        )}
      </div>
    </div>
  )
}
