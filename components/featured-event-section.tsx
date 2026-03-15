'use client'

import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'

interface FeaturedEventProps {
  title: string
  date: string
  time: string
  location: string
  description: string
  image?: string
  attendeeCount?: number
  href: string
}

export function FeaturedEventSection({
  title,
  date,
  time,
  location,
  description,
  image,
  attendeeCount,
  href,
}: FeaturedEventProps) {
  return (
    <section className="full-bleed bg-foreground text-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          {image && (
            <div className="aspect-square overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-background/70 text-sm uppercase tracking-widest mb-4">
                À l'affiche
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-background">
                {title}
              </h2>
              <p className="text-xl text-background/80 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-4 border-t border-background/20 pt-8">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-background flex-shrink-0" />
                <div>
                  <p className="text-background/70 text-sm">Date</p>
                  <p className="font-semibold text-background">{date} à {time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-background flex-shrink-0" />
                <div>
                  <p className="text-background/70 text-sm">Lieu</p>
                  <p className="font-semibold text-background">{location}</p>
                </div>
              </div>

              {attendeeCount && (
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-background flex-shrink-0" />
                  <div>
                    <p className="text-background/70 text-sm">Participants</p>
                    <p className="font-semibold text-background">{attendeeCount}+ intéressés</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href={href}
              className="inline-block bg-background text-foreground px-8 py-4 font-display font-bold uppercase text-sm tracking-wider hover:bg-background/90 transition-colors"
            >
              Découvrir l'événement →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
