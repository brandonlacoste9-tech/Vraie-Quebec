"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { getPlacesByCategory } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { RSVPModal } from "@/components/booking/RSVPModal"

export default function RestaurantsPage() {
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)
      try {
        const data = await getPlacesByCategory('restaurant')
        setRestaurants(data)
      } catch (error) {
        console.error('Error fetching restaurants:', error)
        setRestaurants([])
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white mb-8">
          RESTAURANTS <span className="text-primary text-glow">MONTRÉAL</span>
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-secondary/50 animate-pulse border border-border" />
            ))}
          </div>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group bg-secondary/40 border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white font-heading">{restaurant.name}</h3>
                    {restaurant.price_tier && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded uppercase">
                        {restaurant.price_tier}
                      </span>
                    )}
                  </div>
                  {restaurant.location && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span>{restaurant.location}, {restaurant.city}</span>
                    </div>
                  )}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{restaurant.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gold-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{restaurant.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex gap-2">
                      <RSVPModal venueName={restaurant.name} placeId={restaurant.id} imageUrl={restaurant.image}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-heading uppercase text-xs">
                          Réserver
                        </Button>
                      </RSVPModal>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/venue/${restaurant.id}`)}
                        className="border-white/20 text-white hover:border-primary hover:text-primary font-heading uppercase text-xs"
                      >
                        Détails
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground font-heading">
              Aucun restaurant trouvé. Les données seront bientôt disponibles!
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

