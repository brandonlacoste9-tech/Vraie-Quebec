"use client"

import { Calendar, MapPin, Ticket } from "lucide-react"
import Link from "next/link"
import { RSVPModal } from "@/components/booking/RSVPModal"

const events = [
  {
    id: 1,
    title: "Canadiens vs Leafs",
    date: "SAM 14 MARS",
    time: "19:00",
    venue: "Centre Bell, Montréal",
    image: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=800",
    category: "Sports",
    price: "Dès 145$",
  },
  {
    id: 2,
    title: "Charlotte de Witte Night",
    date: "VEN 1 MARS",
    time: "22:00",
    venue: "Centre Vidéotron, Québec",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    category: "Techno",
    price: "Dès 85$",
  },
  {
    id: 3,
    title: "Igloofest Final Week",
    date: "SAM 8 FÉV",
    time: "18:00",
    venue: "Vieux-Port, Montréal",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    category: "Festival",
    price: "Sold Out",
  },
]

interface UpcomingEventsProps {
  filterType?: "sports" | "techno" | "festival" | "all"
}

export function UpcomingEvents({ filterType = "all" }: UpcomingEventsProps) {
  const filteredEvents = filterType === "all"
    ? events
    : events.filter((e) => {
        if (filterType === "sports") return e.category === "Sports"
        if (filterType === "techno") return e.category === "Techno"
        if (filterType === "festival") return e.category === "Festival"
        return true
      })

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display font-light text-foreground text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Événements à venir
        </h2>
        <Link href="/agenda" className="link-luxury text-[11px]">
          Voir l'agenda
        </Link>
      </div>

      <div className="space-y-px bg-border">
        {filteredEvents.length > 0 ? filteredEvents.map((event) => (
          <div key={event.id} className="group flex flex-col md:flex-row bg-surface hover:bg-surface-raised transition-colors overflow-hidden">
            <div
              className="md:w-1/4 h-48 md:h-auto bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
              style={{ backgroundImage: `url('${event.image}')` }}
            />
            <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(event.title + " " + event.venue)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-6 flex-1"
              >
                <div className="flex flex-col items-center justify-center border border-border p-3 w-20 h-20 text-center flex-shrink-0">
                  <span className="text-primary font-sans font-medium text-xs uppercase leading-none tracking-[0.1em]">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-foreground font-display font-light text-3xl leading-none my-1" style={{ fontFamily: "var(--font-display)" }}>
                    {event.date.split(" ")[1]}
                  </span>
                  <span className="text-muted-foreground text-[10px] uppercase leading-none tracking-[0.1em]">
                    {event.date.split(" ")[2]}
                  </span>
                </div>
                <div>
                  <span className="text-primary text-[10px] font-sans uppercase tracking-[0.18em] mb-2 block">
                    {event.category}
                  </span>
                  <h3 className="font-display font-light text-foreground text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {event.venue}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {event.time}
                    </div>
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em]">À partir de</p>
                  <p className="text-xl font-display font-light text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    {event.price}
                  </p>
                </div>
                <RSVPModal venueName={event.title} placeId={event.id.toString()} imageUrl={event.image}>
                  <button className="btn-luxury flex items-center gap-2">
                    <Ticket className="w-3.5 h-3.5" />
                    Réserver
                  </button>
                </RSVPModal>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 bg-surface">
            <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
              Aucun événement {filterType !== "all" ? filterType : ""} à l'horizon
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
