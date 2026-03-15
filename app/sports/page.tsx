"use client"

import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { RSVPModal } from "@/components/booking/RSVPModal"
import { MapPin, Star, Calendar } from "lucide-react"

const venues = [
  {
    id: "s1", label: "Hockey", name: "Centre Bell", location: "Centre-ville, Montréal",
    description: "Temple du hockey montréalais. Canadiens de Montréal, concerts majeurs et événements d'envergure internationale.",
    rating: 4.7, price: "$$$",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&q=85&auto=format&fit=crop",
    featured: true, events: ["Canadiens de Montréal", "Concerts majeurs"],
  },
  {
    id: "s3", label: "Formule 1", name: "Circuit Gilles-Villeneuve", location: "Île Notre-Dame, Montréal",
    description: "Le Grand Prix du Canada — l'événement sportif de l'année. Prestige, vitesse et glamour réunis sur l'île Notre-Dame.",
    rating: 4.9, price: "VIP",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85&auto=format&fit=crop",
    featured: true, events: ["Grand Prix du Canada 2026", "F1 Sprint"], exclusive: true,
  },
  {
    id: "s6", label: "Golf", name: "Club de golf Royal Montréal", location: "Île Bizard, Montréal",
    description: "Le plus ancien club de golf d'Amérique du Nord. Hôte de la Presidents Cup 2026 — événement rare d'une élégance absolue.",
    rating: 4.8, price: "VIP",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=85&auto=format&fit=crop",
    events: ["Presidents Cup 2026"], exclusive: true,
  },
  {
    id: "s2", label: "Soccer", name: "Stade Saputo", location: "Parc Olympique, Montréal",
    description: "CF Montréal. Ambiance festive et passionnée dans un stade à l'architecture unique au cœur du Parc Olympique.",
    rating: 4.5, price: "$$",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=1200&q=85&auto=format&fit=crop",
    events: ["CF Montréal vs Toronto FC"],
  },
  {
    id: "s5", label: "Hockey junior", name: "Centre Vidéotron", location: "Centre-ville, Québec",
    description: "Les Remparts de Québec — hockey junior passionné dans une enceinte moderne au cœur de la capitale nationale.",
    rating: 4.6, price: "$$",
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=1200&q=85&auto=format&fit=crop",
    events: ["Remparts de Québec"],
  },
  {
    id: "s4", label: "Tennis", name: "Stade IGA", location: "Outremont, Montréal",
    description: "La Coupe Rogers — l'un des tournois ATP Masters 1000. Vedettes mondiales du tennis dans un cadre intimiste.",
    rating: 4.3, price: "$",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=85&auto=format&fit=crop",
    events: ["Coupe Rogers ATP"],
  },
]

const upcoming = [
  { date: "Juin 2026", title: "Grand Prix du Canada", venue: "Circuit Gilles-Villeneuve", id: "s3", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80" },
  { date: "Sept. 2026", title: "Presidents Cup", venue: "Club de golf Royal Montréal", id: "s6", image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80" },
  { date: "Saison 2025–26", title: "Canadiens de Montréal", venue: "Centre Bell", id: "s1", image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80" },
  { date: "Été 2026", title: "Coupe Rogers ATP", venue: "Stade IGA", id: "s4", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80" },
]

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-border">
        <p className="overline mb-4">Sport & Prestige</p>
        <h1 className="font-display font-light text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Sports</h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Des arénas mythiques aux circuits de prestige — vivez les émotions du sport québécois dans les meilleures conditions.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-20">

        {/* Featured */}
        <section>
          <p className="overline mb-8">En vedette</p>
          <div className="space-y-px bg-border">
            {venues.filter((v) => v.featured).map((venue) => (
              <article key={venue.id} className="group grid grid-cols-1 md:grid-cols-5 bg-surface hover:bg-background transition-colors duration-300">
                <div className="md:col-span-2 relative aspect-[3/2] md:aspect-auto overflow-hidden bg-muted">
                  <img src={venue.image} alt={venue.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  {venue.exclusive && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-[9px] tracking-[0.2em] uppercase font-sans">Exclusif</div>
                  )}
                </div>
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <p className="overline mb-4">{venue.label}</p>
                    <h2 className="font-display font-light text-foreground text-2xl md:text-3xl lg:text-4xl mb-4 leading-snug" style={{ fontFamily: "var(--font-display)" }}>{venue.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="h-px bg-border mb-4" />
                    <p className="text-muted-foreground leading-relaxed mb-6">{venue.description}</p>
                    {venue.events && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {venue.events.map((e) => (
                          <span key={e} className="text-[10px] tracking-[0.12em] uppercase font-sans text-muted-foreground border border-border px-2 py-1">{e}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-foreground text-sm font-medium">{venue.rating}</span>
                    </div>
                    <RSVPModal venueName={venue.name} placeId={venue.id} imageUrl={venue.image}>
                      <button className="btn-luxury text-[11px]">Réserver</button>
                    </RSVPModal>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="rule" />

        {/* Grid */}
        <section>
          <p className="overline mb-8">Toutes les adresses</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {venues.filter((v) => !v.featured).map((venue) => (
              <article key={venue.id} className="group bg-surface hover:bg-background transition-colors duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={venue.image} alt={venue.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6 md:p-8">
                  <p className="overline mb-2">{venue.label}</p>
                  <h3 className="font-display font-light text-foreground text-xl md:text-2xl mb-2 leading-snug group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>{venue.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                    <span>{venue.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">{venue.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-foreground text-xs font-medium">{venue.rating}</span>
                    </div>
                    <RSVPModal venueName={venue.name} placeId={venue.id} imageUrl={venue.image}>
                      <button className="text-[10px] tracking-[0.18em] uppercase text-primary font-sans hover:text-primary-dark transition-colors">Billets →</button>
                    </RSVPModal>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="rule" />

        {/* Upcoming events */}
        <section>
          <p className="overline mb-8">Événements à venir</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {upcoming.map((ev) => (
              <div key={ev.title} className="bg-surface p-6 hover:bg-background transition-colors duration-300">
                <div className="relative aspect-[3/2] overflow-hidden bg-muted mb-5">
                  <img src={ev.image} alt={ev.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-primary font-sans mb-2">{ev.date}</p>
                <h3 className="font-display font-light text-foreground text-lg leading-snug mb-1" style={{ fontFamily: "var(--font-display)" }}>{ev.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{ev.venue}</p>
                <RSVPModal venueName={ev.title} placeId={ev.id} imageUrl={ev.image}>
                  <button className="btn-ghost-luxury text-[10px] w-full">Réserver</button>
                </RSVPModal>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
