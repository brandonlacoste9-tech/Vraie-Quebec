"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Ticket, Music, Utensils, Moon, Palette } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { NewsletterSignup } from "@/components/newsletter-signup"

// Mock data for events
const EVENTS = [
  {
    id: 1,
    title: "Igloofest 2025",
    description: "Le party le plus froid au monde. Musique électronique sous la neige.",
    date: "2025-01-16",
    location: "Vieux-Port, Montréal",
    price: "$45",
    image: "/igloofest-montreal-crowd-neon.jpg",
    category: "Nightlife",
    featured: true,
  },
  {
    id: 2,
    title: "Jazz Fest: After Hours",
    description: "Sessions de jam exclusives avec des légendes du jazz dans un club secret.",
    date: "2025-06-28",
    location: "Secret Location, Plateau",
    price: "$80",
    image: "/jazz-club-montreal-moody.jpg",
    category: "Music",
    featured: true,
  },
  {
    id: 3,
    title: "Poutine Week VIP Tasting",
    description: "Dégustation des 10 meilleures poutines de l'année avec accord bières.",
    date: "2025-02-05",
    location: "La Banquise, Montréal",
    price: "$35",
    image: "/gourmet-poutine-montreal.jpg",
    category: "Food",
    featured: false,
  },
  {
    id: 4,
    title: "MURAL Festival Opening",
    description: "Lancement du festival d'art urbain avec DJ sets et live painting.",
    date: "2025-06-06",
    location: "Boul. Saint-Laurent",
    price: "Gratuit",
    image: "/mural-festival-montreal-street-art.jpg",
    category: "Arts",
    featured: false,
  },
  {
    id: 5,
    title: "Osheaga 2025 - Weekend 1",
    description: "Le plus gros festival de musique au Canada. Lineup surprise.",
    date: "2025-08-01",
    location: "Parc Jean-Drapeau",
    price: "$320",
    image: "/osheaga-festival-crowd-summer.jpg",
    category: "Music",
    featured: true,
  },
  {
    id: 6,
    title: "Nuit Blanche à Montréal",
    description: "Art, culture et fête toute la nuit à travers la ville.",
    date: "2025-03-01",
    location: "Centre-ville, Montréal",
    price: "Gratuit",
    image: "/nuit-blanche-montreal-lights.jpg",
    category: "Arts",
    featured: false,
  },
]

export default function AgendaPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("All")

  const categories = [
    { id: "All", label: t.agenda.filterAll, icon: null },
    { id: "Music", label: t.agenda.filterMusic, icon: Music },
    { id: "Nightlife", label: t.agenda.filterNightlife, icon: Moon },
    { id: "Arts", label: t.agenda.filterArts, icon: Palette },
    { id: "Food", label: t.agenda.filterFood, icon: Utensils },
  ]

  const filteredEvents = filter === "All" ? EVENTS : EVENTS.filter((e) => e.category === filter)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNav />

      {/* Hero Header */}
      <div className="relative py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-purple-900/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 bg-primary text-white border-none px-3 py-1 text-xs uppercase tracking-widest">
            {t.agenda.title}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
            VRAI<span className="text-primary">PULSE</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.agenda.subtitle}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-4 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                filter === cat.id
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.icon && <cat.icon className="w-4 h-4" />}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-16">
          <NewsletterSignup showPreferences />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.2)] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Featured Badge */}
                {event.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {t.agenda.featured}
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {event.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate max-w-[150px]">{event.location}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">{event.description}</p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <div className="text-lg font-bold text-white">{event.price}</div>
                  <Button
                    asChild
                    size="sm"
                    className="bg-white text-black hover:bg-primary hover:text-white border-none"
                  >
                    <Link href="https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00" target="_blank">
                      <Ticket className="w-4 h-4 mr-2" />
                      {t.agenda.buyTickets}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
