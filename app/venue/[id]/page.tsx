"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { RSVPModal } from "@/components/booking/RSVPModal"
import type { Place } from "@/lib/types/database"
import { MapPin, Star, Clock, Users, Music, Shirt, Calendar, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function VenuePage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [venue, setVenue] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string
    fetch(`/api/places/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(setVenue)
      .catch(() => setVenue(null))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-primary animate-pulse" />
          <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-sans">{t.venue.loading}</p>
        </div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-4">
        <p className="font-display font-light text-foreground text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          {t.venue.notFound}
        </p>
        <button onClick={() => router.push("/")} className="btn-ghost-luxury">{t.venue.backHome}</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Hero image */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-foreground">
        <Image src={venue.image} alt={venue.name} fill className="object-cover opacity-90" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-foreground/50 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-xs tracking-[0.15em] uppercase font-sans hover:bg-foreground/70 transition-colors"
          aria-label={t.venue.back}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.venue.back}
        </button>

        {/* Badges */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
          {venue.has_vip && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-[9px] tracking-[0.2em] uppercase font-sans">
              {t.venue.vipAccess}
            </span>
          )}
          {venue.is_hot && (
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-[9px] tracking-[0.2em] uppercase font-sans">
              {t.venue.trending}
            </span>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-3">{venue.type}</p>
            <h1 className="font-display font-light text-primary-foreground leading-[1.1] mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                {venue.location}, {venue.city}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-primary text-primary flex-shrink-0" />
                <span className="text-primary-foreground font-medium">{venue.rating}</span>
                <span>/ 5.0</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Main */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <p className="overline mb-4">{t.venue.about}</p>
              <div className="h-px bg-border mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed">{venue.description}</p>
            </section>

            {(venue.vibe || venue.music_genre || venue.dress_code || (venue.event_lineup && venue.event_lineup.length > 0)) && (
              <section>
                <p className="overline mb-4">{t.venue.experience}</p>
                <div className="h-px bg-border mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                  {venue.vibe && (
                    <div className="bg-surface p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans">{t.venue.ambiance}</p>
                      </div>
                      <p className="text-foreground">{venue.vibe}</p>
                    </div>
                  )}
                  {venue.music_genre && (
                    <div className="bg-surface p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Music className="w-4 h-4 text-primary" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans">{t.venue.music}</p>
                      </div>
                      <p className="text-foreground">{venue.music_genre}</p>
                    </div>
                  )}
                  {venue.dress_code && (
                    <div className="bg-surface p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Shirt className="w-4 h-4 text-primary" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans">{t.venue.dressCode}</p>
                      </div>
                      <p className="text-foreground">{venue.dress_code}</p>
                    </div>
                  )}
                  {venue.event_lineup && venue.event_lineup.length > 0 && (
                    <div className="bg-surface p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-4 h-4 text-primary" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-sans">{t.venue.artists}</p>
                      </div>
                      <ul className="space-y-1">
                        {venue.event_lineup.map((artist, idx) => (
                          <li key={idx} className="text-foreground text-sm">— {artist}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking card */}
            <div className="bg-foreground p-8 sticky top-24 relative">
              <div className="absolute inset-3 border border-primary/20 pointer-events-none" />
              <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-6">{t.venue.booking}</p>
              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">{t.venue.bookingType}</span>
                  <span className="text-primary text-xs tracking-[0.15em] uppercase font-sans">{venue.booking_type || t.venue.reserve}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">{t.venue.priceRange}</span>
                  <span className="text-primary text-xs tracking-[0.15em] uppercase font-sans">{venue.price_tier || venue.price}</span>
                </div>
              </div>
              <RSVPModal venueName={venue.name} placeId={venue.id} imageUrl={venue.image}>
                <button className="btn-luxury w-full">{t.venue.reserve}</button>
              </RSVPModal>
              <p className="text-muted-foreground text-[11px] text-center mt-4">{t.venue.instantConfirm}</p>
            </div>

            {/* Info */}
            <div className="bg-surface border border-border p-6">
              <p className="overline mb-5">{t.venue.info}</p>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.venue.location}</p>
                    <p className="text-foreground font-medium">{venue.location}, {venue.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 fill-primary" />
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{t.venue.rating}</p>
                    <p className="text-foreground font-medium">{venue.rating} / 5.0</p>
                  </div>
                </div>
                {venue.exclusive && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">{t.venue.status}</p>
                      <p className="text-primary font-medium text-xs tracking-[0.12em] uppercase">{t.venue.exclusive}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
