"use client"

import { useState } from "react"
import { VIPPass } from "@/components/booking/VIPPass"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, CreditCard, LogOut, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function ProfilePage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("wallet")

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 p-[2px]">
               <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                 <img src="https://github.com/shadcn.png" alt="User" className="w-full h-full object-cover opacity-90" />
               </div>
            </div>
            <div>
               <h1 className="text-3xl md:text-4xl font-heading font-bold uppercase text-white">Julien Tremblay</h1>
               <div className="flex items-center gap-2 mt-1">
                  <span className="text-gold-400 font-bold uppercase tracking-widest text-sm">VIP Member</span>
                  <span className="text-white/30 text-xs">|</span>
                  <span className="text-white/50 text-sm">Montreal, QC</span>
               </div>
            </div>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" /> Settings
             </Button>
             <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/30">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
             </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1">
             <TabsTrigger value="wallet" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-heading uppercase">
                <CreditCard className="w-4 h-4 mr-2" /> My Wallet
             </TabsTrigger>
             <TabsTrigger value="favorites" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-heading uppercase">
                <Star className="w-4 h-4 mr-2" /> Favorites
             </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Active Pass */}
                <VIPPass 
                    eventName="Saturday Night Live" 
                    venueName="New City Gas" 
                    date="2025-02-24" 
                    time="10:00 PM" 
                    guestName="Julien Tremblay" 
                    ticketType="VIP" 
                    sponsorName="Videotron"
                    className="transform hover:-translate-y-2 transition-transform duration-300"
                />
                 <VIPPass 
                    eventName="Grand Prix Party" 
                    venueName="Ritz-Carlton" 
                    date="2025-06-15" 
                    time="08:00 PM" 
                    guestName="Julien Tremblay" 
                    ticketType="Guestlist" 
                    sponsorName="Moët & Chandon"
                    className="transform hover:-translate-y-2 transition-transform duration-300 opacity-90"
                />
             </div>
             
             {/* Empty State / Upsell */}
             <div className="mt-12 p-8 rounded-xl border border-dashed border-white/10 text-center">
                <p className="text-white/50 mb-4">Want more exclusive access?</p>
                <Button className="bg-transparent border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black uppercase font-bold">
                   Browse Events
                </Button>
             </div>
          </TabsContent>

          <TabsContent value="favorites">
             <div className="text-center py-12 text-white/50">
                <p>No favorites yet. Start exploring!</p>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


import { useState } from "react"
import { useUserIdentity } from "@/hooks/use-user-identity"
import { VIPPass } from "@/components/booking/vip-pass"
import { Button } from "@/components/ui/button"
import { Wallet, CreditCard, Star, Ticket } from "lucide-react"

export default function ProfilePage() {
  const { identity } = useUserIdentity()
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
            {identity?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-3xl font-oswald font-bold text-white uppercase">{identity?.name || "User"}</h1>
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
                                        userName={identity?.name || "Guest User"}
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

