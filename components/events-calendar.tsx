'use client'

import { Calendar, MapPin } from 'lucide-react'

export interface EventListing {
  id: string
  date: string
  time: string
  title: string
  location: string
  category: string
}

interface EventsCalendarProps {
  events?: EventListing[]
  title?: string
}

export function EventsCalendar({ events = [], title = 'À l\'affiche' }: EventsCalendarProps) {
  const defaultEvents: EventListing[] = [
    {
      id: '1',
      date: 'Mercredi 19 mars',
      time: '20h00',
      title: 'Soirée Jazz électrique',
      location: 'Blue Dog, Montréal',
      category: 'Musique',
    },
    {
      id: '2',
      date: 'Jeudi 20 mars',
      time: '19h00',
      title: 'Vernissage - Art urbain',
      location: 'Galerie Arts, Montréal',
      category: 'Arts',
    },
    {
      id: '3',
      date: 'Vendredi 21 mars',
      time: '22h00',
      title: 'Dj Set - Électronique',
      location: 'Club Nuit, Montréal',
      category: 'Nightlife',
    },
    {
      id: '4',
      date: 'Samedi 22 mars',
      time: '18h00',
      title: 'Festival de Cuisine',
      location: 'Parc Lafontaine, Montréal',
      category: 'Gastronomie',
    },
  ]

  const displayEvents = events.length > 0 ? events : defaultEvents

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-display font-bold mb-12">{title}</h2>

        <div className="space-y-6">
          {displayEvents.map((event, idx) => (
            <div key={event.id} className="pb-6 border-b border-border last:border-b-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                {/* Date */}
                <div className="md:col-span-1">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-xs uppercase text-muted-foreground">{event.date}</p>
                      <p className="font-display font-bold text-lg">{event.time}</p>
                    </div>
                  </div>
                </div>

                {/* Event Info */}
                <div className="md:col-span-2">
                  <p className="text-primary text-xs uppercase tracking-widest mb-1">{event.category}</p>
                  <h3 className="text-2xl font-display font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="md:col-span-1 flex items-center justify-start md:justify-end">
                  <a href="#" className="text-primary font-semibold hover:underline text-sm">
                    Plus d'info →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
