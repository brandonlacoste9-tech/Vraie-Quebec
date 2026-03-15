"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { getPlacesByCategory } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { RSVPModal } from "@/components/booking/RSVPModal"

export default function BarsPage() {
  const router = useRouter()
  const [bars, setBars] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBars = async () => {
      setLoading(true)
      try {
        const data = await getPlacesByCategory('nightlife')
        setBars(data)
      } catch (error) {
        console.error('Error fetching bars:', error)
        setBars([])
      } finally {
        setLoading(false)
      }
    }
    fetchBars()
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MainNav />
      
      {/* Hero Section */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-4">
            Bars & Clubs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explorez la vie nocturne vibrante de Montréal. Des établissements sélectionnés pour leur ambiance, leurs événements et leur musique.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-editorial h-96 animate-pulse bg-secondary" />
            ))}
          </div>
        ) : bars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bars.map((bar) => (
              <article
                key={bar.id}
                className="card-editorial group overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden bg-secondary">
                  <img
                    src={bar.image}
                    alt={bar.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold mb-2 line-clamp-2">{bar.name}</h3>
                  {bar.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{bar.location}, {bar.city}</span>
                    </div>
                  )}
                  {bar.music_genre && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Music className="h-4 w-4 text-primary" />
                      <span>{bar.music_genre}</span>
                    </div>
                  )}
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{bar.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-semibold">{bar.rating.toFixed(1)}</span>
                    </div>
                    <button
                      onClick={() => router.push(`/venue/${bar.id}`)}
                      className="text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      Découvrir →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Aucun bar trouvé. Données à venir.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

