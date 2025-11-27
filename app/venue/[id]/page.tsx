"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RSVPModal } from "@/components/booking/RSVPModal"
import { getPlaceById } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star, Clock, Users, Music, Shirt, Calendar, ArrowLeft, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export default function VenuePage() {
  const params = useParams()
  const router = useRouter()
  const [venue, setVenue] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVenue = async () => {
      const id = params.id as string
      setLoading(true)
      
      try {
        const place = await getPlaceById(id)
        setVenue(place)
      } catch (error) {
        console.error('Error fetching venue:', error)
        setVenue(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchVenue()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-heading font-bold text-white mb-4">Venue Not Found</h1>
        <Button onClick={() => router.push("/")} className="bg-gold-500 text-black hover:bg-gold-400">
          Return Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full hover:bg-black/70 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Badges */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {venue.priceTier === 'VIP' && (
            <Badge className="bg-gold-500 text-black font-bold border-none font-heading uppercase rounded-none shadow-lg">
              VIP Access
            </Badge>
          )}
          {venue.isSponsored && (
            <Badge className="bg-white/90 text-black font-bold border-none font-heading uppercase rounded-none flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> Sponsored
            </Badge>
          )}
          {venue.is_hot && (
            <Badge className="bg-red-500 text-white font-bold border-none font-heading uppercase rounded-none">
              🔥 Hot
            </Badge>
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">{venue.type}</p>
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase mb-4">
                  {venue.name}
                </h1>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <span>{venue.location}, {venue.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                    <span className="font-bold">{venue.rating}</span>
                  </div>
                  <div className="text-gold-400 font-bold text-xl">
                    {venue.priceTier || venue.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-white uppercase mb-4">About</h2>
              <p className="text-white/80 text-lg leading-relaxed">{venue.description}</p>
            </section>

            {/* Nightlife Specific Info */}
            {(venue.vibe || venue.musicGenre || venue.dressCode || venue.eventLineup) && (
              <section>
                <h2 className="text-2xl font-heading font-bold text-white uppercase mb-4">Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.vibe && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-gold-500" />
                        <h3 className="font-heading font-bold text-white uppercase">Vibe</h3>
                      </div>
                      <p className="text-white/80">{venue.vibe}</p>
                    </div>
                  )}
                  {venue.musicGenre && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Music className="w-5 h-5 text-gold-500" />
                        <h3 className="font-heading font-bold text-white uppercase">Music</h3>
                      </div>
                      <p className="text-white/80">{venue.musicGenre}</p>
                    </div>
                  )}
                  {venue.dressCode && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Shirt className="w-5 h-5 text-gold-500" />
                        <h3 className="font-heading font-bold text-white uppercase">Dress Code</h3>
                      </div>
                      <p className="text-white/80">{venue.dressCode}</p>
                    </div>
                  )}
                  {venue.eventLineup && venue.eventLineup.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-gold-500" />
                        <h3 className="font-heading font-bold text-white uppercase">Lineup</h3>
                      </div>
                      <ul className="text-white/80 space-y-1">
                        {venue.eventLineup.map((artist, idx) => (
                          <li key={idx}>• {artist}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Sponsored Link */}
            {venue.isSponsored && venue.adUrl && (
              <section className="bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-400 text-sm uppercase tracking-widest mb-1">Sponsored by</p>
                    <h3 className="text-2xl font-heading font-bold text-white">{venue.sponsorName}</h3>
                  </div>
                  <Button
                    onClick={() => window.open(venue.adUrl, '_blank')}
                    variant="outline"
                    className="border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black"
                  >
                    Learn More <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-heading font-bold text-white uppercase mb-4">Reserve Your Spot</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-white/80">
                  <span>Booking Type</span>
                  <span className="font-bold text-gold-400 uppercase">{venue.bookingType || 'Reservation'}</span>
                </div>
                <div className="flex items-center justify-between text-white/80">
                  <span>Price Range</span>
                  <span className="font-bold text-gold-400">{venue.priceTier || venue.price}</span>
                </div>
              </div>

              <RSVPModal venueName={venue.name} placeId={venue.id} imageUrl={venue.image}>
                <Button className="w-full bg-gold-500 text-black hover:bg-gold-400 font-heading uppercase font-bold h-12 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                  Secure VIP Access
                </Button>
              </RSVPModal>

              <p className="text-white/60 text-xs text-center mt-4">
                Instant confirmation • No booking fees
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-heading font-bold text-white uppercase mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-white/60">Location</p>
                    <p className="text-white font-semibold">{venue.location}, {venue.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-white/60">Rating</p>
                    <p className="text-white font-semibold">{venue.rating} / 5.0</p>
                  </div>
                </div>
                {venue.exclusive && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gold-500 mt-0.5" />
                    <div>
                      <p className="text-white/60">Status</p>
                      <p className="text-gold-400 font-semibold">Exclusive Access</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


