"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Établissement non trouvé</h1>
        <Button onClick={() => router.push("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Retour à l'accueil
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />

      {/* Hero Image */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-3 bg-background/50 backdrop-blur-sm border border-border rounded-full hover:bg-background/70 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Badges */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {venue.priceTier === 'VIP' && (
            <Badge className="bg-primary text-primary-foreground font-bold border-none">
              Accès VIP
            </Badge>
          )}
          {venue.isSponsored && (
            <Badge className="bg-primary text-primary-foreground font-bold border-none flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> Sponsorisé
            </Badge>
          )}
          {venue.is_hot && (
            <Badge className="bg-red-500 text-white font-bold border-none">
              Tendance
            </Badge>
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-primary text-sm uppercase tracking-widest mb-2">{venue.type}</p>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
                  {venue.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{venue.location}, {venue.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-bold">{venue.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">À propos</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{venue.description}</p>
              </section>

              {/* Experience Details */}
              {(venue.vibe || venue.musicGenre || venue.dressCode || venue.eventLineup) && (
                <section>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6">Expérience</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {venue.vibe && (
                      <div className="card-editorial p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <h3 className="font-display font-bold text-foreground">Ambiance</h3>
                        </div>
                        <p className="text-muted-foreground">{venue.vibe}</p>
                      </div>
                    )}
                    {venue.musicGenre && (
                      <div className="card-editorial p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Music className="w-5 h-5 text-primary" />
                          <h3 className="font-display font-bold text-foreground">Musique</h3>
                        </div>
                        <p className="text-muted-foreground">{venue.musicGenre}</p>
                      </div>
                    )}
                    {venue.dressCode && (
                      <div className="card-editorial p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Shirt className="w-5 h-5 text-primary" />
                          <h3 className="font-display font-bold text-foreground">Code vestimentaire</h3>
                        </div>
                        <p className="text-muted-foreground">{venue.dressCode}</p>
                      </div>
                    )}
                    {venue.eventLineup && venue.eventLineup.length > 0 && (
                      <div className="card-editorial p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="w-5 h-5 text-primary" />
                          <h3 className="font-display font-bold text-foreground">Artistes</h3>
                        </div>
                        <ul className="text-muted-foreground space-y-1">
                          {venue.eventLineup.map((artist, idx) => (
                            <li key={idx}>• {artist}</li>
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
              {/* Booking Card */}
              <div className="card-editorial p-8 sticky top-24">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Réserver</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Type</span>
                    <span className="font-semibold text-primary uppercase">{venue.bookingType || 'Réservation'}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Gamme tarifaire</span>
                    <span className="font-semibold text-primary">{venue.priceTier || venue.price}</span>
                  </div>
                </div>

                <RSVPModal venueName={venue.name} placeId={venue.id} imageUrl={venue.image}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase font-bold h-12 rounded-none">
                    Accès Sécurisé
                  </Button>
                </RSVPModal>

                <p className="text-muted-foreground text-xs text-center mt-4">
                  Confirmation instantanée • Pas de frais
                </p>
              </div>

              {/* Quick Info */}
              <div className="card-editorial p-6">
                <h3 className="text-lg font-display font-bold text-foreground mb-4">Informations</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Localisation</p>
                      <p className="text-foreground font-semibold">{venue.location}, {venue.city}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 fill-primary" />
                    <div>
                      <p className="text-muted-foreground">Note</p>
                      <p className="text-foreground font-semibold">{venue.rating} / 5.0</p>
                    </div>
                  </div>
                  {venue.exclusive && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Statut</p>
                        <p className="text-primary font-semibold">Accès Exclusif</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Établissement non trouvé</h1>
        <Button onClick={() => router.push("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Retour à l'accueil
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-3 bg-background/50 backdrop-blur-sm border border-border rounded-full hover:bg-background/70 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Badges */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {venue.priceTier === 'VIP' && (
            <Badge className="bg-primary text-primary-foreground font-bold border-none">
              Accès VIP
            </Badge>
          )}
          {venue.isSponsored && (
            <Badge className="bg-primary text-primary-foreground font-bold border-none flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> Sponsorisé
            </Badge>
          )}
          {venue.is_hot && (
            <Badge className="bg-red-500 text-white font-bold border-none">
              Tendance
            </Badge>
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-primary text-sm uppercase tracking-widest mb-2">{venue.type}</p>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
                  {venue.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{venue.location}, {venue.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-bold">{venue.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">À propos</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{venue.description}</p>
            </section>

            {/* Experience Details */}
            {(venue.vibe || venue.musicGenre || venue.dressCode || venue.eventLineup) && (
              <section>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">Expérience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.vibe && (
                    <div className="card-editorial p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <h3 className="font-display font-bold text-foreground">Ambiance</h3>
                      </div>
                      <p className="text-muted-foreground">{venue.vibe}</p>
                    </div>
                  )}
                  {venue.musicGenre && (
                    <div className="card-editorial p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Music className="w-5 h-5 text-primary" />
                        <h3 className="font-display font-bold text-foreground">Musique</h3>
                      </div>
                      <p className="text-muted-foreground">{venue.musicGenre}</p>
                    </div>
                  )}
                  {venue.dressCode && (
                    <div className="card-editorial p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Shirt className="w-5 h-5 text-primary" />
                        <h3 className="font-display font-bold text-foreground">Code vestimentaire</h3>
                      </div>
                      <p className="text-muted-foreground">{venue.dressCode}</p>
                    </div>
                  )}
                  {venue.eventLineup && venue.eventLineup.length > 0 && (
                    <div className="card-editorial p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-5 h-5 text-primary" />
                        <h3 className="font-display font-bold text-foreground">Artistes</h3>
                      </div>
                      <ul className="text-muted-foreground space-y-1">
                        {venue.eventLineup.map((artist, idx) => (
                          <li key={idx}>• {artist}</li>
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
            {/* Booking Card */}
            <div className="card-editorial p-8 sticky top-8">
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">Réserver</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Type</span>
                  <span className="font-semibold text-primary uppercase">{venue.bookingType || 'Réservation'}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Gamme tarifaire</span>
                  <span className="font-semibold text-primary">{venue.priceTier || venue.price}</span>
                </div>
              </div>

              <RSVPModal venueName={venue.name} placeId={venue.id} imageUrl={venue.image}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase font-bold h-12 rounded-none">
                  Accès Sécurisé
                </Button>
              </RSVPModal>

              <p className="text-muted-foreground text-xs text-center mt-4">
                Confirmation instantanée • Pas de frais
              </p>
            </div>

            {/* Quick Info */}
            <div className="card-editorial p-6">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">Informations</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Localisation</p>
                    <p className="text-foreground font-semibold">{venue.location}, {venue.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 fill-primary" />
                  <div>
                    <p className="text-muted-foreground">Note</p>
                    <p className="text-foreground font-semibold">{venue.rating} / 5.0</p>
                  </div>
                </div>
                {venue.exclusive && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Statut</p>
                      <p className="text-primary font-semibold">Accès Exclusif</p>
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


