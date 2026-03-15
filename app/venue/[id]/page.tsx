"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { RSVPModal } from "@/components/booking/RSVPModal"
import { getPlaceById } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star, Clock, Users, Music, Shirt, Calendar, ArrowLeft } from "lucide-react"

export default function VenuePage() {
  const params = useParams()
  const router = useRouter()
  const [venue, setVenue] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string
    getPlaceById(id)
      .then(setVenue)
      .catch(() => setVenue(null))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-[#B08D57] animate-pulse" />
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#7D7468] font-sans">Chargement</p>
        </div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#F4F1EC] flex flex-col items-center justify-center gap-6 p-4">
        <p
          className="font-display font-light text-[#1C1916] text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Établissement introuvable
        </p>
        <button onClick={() => router.push("/")} className="btn-ghost-luxury">
          Retour à l'accueil
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      {/* ── Hero image ─────────────────────────────────────────────────── */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-[#1C1916]">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1916] via-[#1C1916]/20 to-transparent" />

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-[#1C1916]/50 backdrop-blur-sm border border-[#FAF8F5]/20 text-[#FAF8F5] text-xs tracking-[0.15em] uppercase font-sans hover:bg-[#1C1916]/70 transition-colors"
          aria-label="Retour"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour
        </button>

        {/* Badges */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
          {venue.priceTier === "VIP" && (
            <span className="px-3 py-1 bg-[#B08D57] text-[#FAF8F5] text-[9px] tracking-[0.2em] uppercase font-sans">
              Accès VIP
            </span>
          )}
          {venue.is_hot && (
            <span className="px-3 py-1 bg-[#7A3B1E] text-[#FAF8F5] text-[9px] tracking-[0.2em] uppercase font-sans">
              Tendance
            </span>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#B08D57] font-sans mb-3">
              {venue.type}
            </p>
            <h1
              className="font-display font-light text-[#FAF8F5] leading-[1.1] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#9E9388]">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                {venue.location}, {venue.city}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#B08D57] text-[#B08D57] flex-shrink-0" />
                <span className="text-[#FAF8F5] font-medium">{venue.rating}</span>
                <span>/ 5.0</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Main */}
          <div className="lg:col-span-2 space-y-16">

            {/* Description */}
            <section>
              <p className="overline mb-4">À propos</p>
              <div className="h-px bg-[#D6D0C6] mb-8" />
              <p className="text-[#7D7468] text-lg leading-relaxed">{venue.description}</p>
            </section>

            {/* Experience details */}
            {(venue.vibe || venue.musicGenre || venue.dressCode || (venue.eventLineup && venue.eventLineup.length > 0)) && (
              <section>
                <p className="overline mb-4">Expérience</p>
                <div className="h-px bg-[#D6D0C6] mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D6D0C6]">
                  {venue.vibe && (
                    <div className="bg-[#FAF8F5] p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-4 h-4 text-[#B08D57]" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans">Ambiance</p>
                      </div>
                      <p className="text-[#1C1916]">{venue.vibe}</p>
                    </div>
                  )}
                  {venue.musicGenre && (
                    <div className="bg-[#FAF8F5] p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Music className="w-4 h-4 text-[#B08D57]" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans">Musique</p>
                      </div>
                      <p className="text-[#1C1916]">{venue.musicGenre}</p>
                    </div>
                  )}
                  {venue.dressCode && (
                    <div className="bg-[#FAF8F5] p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Shirt className="w-4 h-4 text-[#B08D57]" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans">Code vestimentaire</p>
                      </div>
                      <p className="text-[#1C1916]">{venue.dressCode}</p>
                    </div>
                  )}
                  {venue.eventLineup && venue.eventLineup.length > 0 && (
                    <div className="bg-[#FAF8F5] p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-4 h-4 text-[#B08D57]" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-[#7D7468] font-sans">Artistes</p>
                      </div>
                      <ul className="space-y-1">
                        {venue.eventLineup.map((artist, idx) => (
                          <li key={idx} className="text-[#1C1916] text-sm">— {artist}</li>
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
            <div className="bg-[#1C1916] p-8 sticky top-24">
              {/* Gold frame */}
              <div className="absolute inset-3 border border-[#B08D57]/20 pointer-events-none" />

              <p className="text-[10px] tracking-[0.22em] uppercase text-[#B08D57] font-sans mb-6">
                Réservation
              </p>

              <div className="space-y-4 mb-6 pb-6 border-b border-[#2E2B27]">
                <div className="flex items-center justify-between">
                  <span className="text-[#9E9388] text-sm">Type</span>
                  <span className="text-[#B08D57] text-xs tracking-[0.15em] uppercase font-sans">
                    {venue.bookingType || "Réservation"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9E9388] text-sm">Gamme</span>
                  <span className="text-[#B08D57] text-xs tracking-[0.15em] uppercase font-sans">
                    {venue.priceTier || venue.price}
                  </span>
                </div>
              </div>

              <RSVPModal venueName={venue.name} placeId={venue.id} imageUrl={venue.image}>
                <button className="btn-luxury w-full">
                  Réserver
                </button>
              </RSVPModal>

              <p className="text-[#6B6460] text-[11px] text-center mt-4">
                Confirmation instantanée · Sans frais
              </p>
            </div>

            {/* Info */}
            <div className="bg-[#FAF8F5] border border-[#D6D0C6] p-6">
              <p className="overline mb-5">Informations</p>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B08D57] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#7D7468] text-xs mb-1">Localisation</p>
                    <p className="text-[#1C1916] font-medium">{venue.location}, {venue.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-[#B08D57] mt-0.5 flex-shrink-0 fill-[#B08D57]" />
                  <div>
                    <p className="text-[#7D7468] text-xs mb-1">Note</p>
                    <p className="text-[#1C1916] font-medium">{venue.rating} / 5.0</p>
                  </div>
                </div>
                {venue.exclusive && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#B08D57] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#7D7468] text-xs mb-1">Statut</p>
                      <p className="text-[#B08D57] font-medium text-xs tracking-[0.12em] uppercase">Accès Exclusif</p>
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
