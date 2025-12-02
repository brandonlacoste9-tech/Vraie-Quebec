"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { UpcomingEvents } from "@/components/upcoming-events"

export default function SportsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white mb-8">
          SPORTS <span className="text-primary text-glow">MONTRÉAL</span>
        </h1>
        <UpcomingEvents filterType="sports" />
      </div>
      <Footer />
    </main>
  )
}

