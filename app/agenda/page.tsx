"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Ticket } from "lucide-react"
import Link from "next/link"

// Mock data for events (concerts, festivals, tickets) with real places in Montreal & Quebec
const EVENTS = [
  {
    id: 1,
    title: "Igloofest 2025",
    description: "Le party le plus froid au monde. Musique électronique sous la neige.",
    date: "16-17 Janvier",
    location: "Vieux-Port, Montréal",
    price: "$45",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    category: "Nightlife",
    featured: true,
  },
  {
    id: 2,
    title: "Charlotte de Witte - Techno Night",
    description: "La reine de la techno de retour au Québec pour une nuit inoubliable.",
    date: "1 Mars",
    location: "Centre Vidéotron, Québec",
    price: "$85",
    image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=800",
    category: "Music",
    featured: true,
  },
  {
    id: 3,
    title: "Poutine Week VIP Tasting",
    description: "Dégustation des 10 meilleures poutines de l'année avec accord bières.",
    date: "5 Février",
    location: "La Banquise, Montréal",
    price: "$35",
    image: "https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=800",
    category: "Food",
  },
  {
    id: 4,
    title: "MURAL Festival",
    description: "Festival d'art urbain avec DJ sets et live painting en direct sur la rue.",
    date: "6 Juin",
    location: "Boul. Saint-Laurent, Montréal",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800",
    category: "Arts",
  },
  {
    id: 5,
    title: "Festival d'été de Québec (FEQ)",
    description: "Le plus grand festival de musique en plein air au Canada. Des scènes incroyables.",
    date: "3-13 Juillet",
    location: "Plaines d'Abraham, Québec",
    price: "$150 (Passe)",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    category: "Music",
    featured: true,
  },
  {
    id: 6,
    title: "Nuit Blanche à Montréal",
    description: "Art, culture et fête toute la nuit à travers la ville.",
    date: "1 Mars",
    location: "Centre-ville, Montréal",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    category: "Arts",
  },
]

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MainNav />

      {/* Hero Section */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-4">
            Agenda & Événements
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Découvrez les événements incontournables de Montréal et du Québec. Concerts, festivals, expositions et bien plus encore.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Featured Events */}
        <section className="mb-20">
          <h2 className="text-4xl font-display font-bold mb-12">Coups de cœur</h2>
          <div className="space-y-8">
            {EVENTS.filter(e => e.featured).map(event => (
              <article key={event.id} className="card-editorial overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 aspect-square md:aspect-auto md:h-80 overflow-hidden bg-secondary">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <p className="text-primary text-sm uppercase tracking-widest mb-3">{event.category}</p>
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                      {event.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 pb-6 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-semibold">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-semibold">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{event.price}</span>
                      <a href="#" className="text-primary font-semibold hover:underline flex items-center gap-2">
                        <Ticket className="w-4 h-4" />
                        Réserver →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* All Events */}
        <section>
          <h2 className="text-4xl font-display font-bold mb-12">Tous les événements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.filter(e => !e.featured).map(event => (
              <article key={event.id} className="card-editorial group overflow-hidden">
                <div className="aspect-video w-full overflow-hidden bg-secondary">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-primary text-xs uppercase tracking-widest mb-2">{event.category}</p>
                  <h3 className="text-xl font-display font-bold mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{event.description}</p>
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{event.price}</span>
                    <a href="#" className="text-primary font-semibold hover:underline text-sm">
                      Réserver →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
