"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { FilterBar } from "@/components/filter-bar"
import { useEffect, useState } from "react"
import { getPlacesByCategory } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RestaurantsPage() {
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

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

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedFilters.length === 0) return true
    
    return selectedFilters.some(filter => {
      switch (filter) {
        case 'price-low':
          return restaurant.priceTier === '$'
        case 'price-mid':
          return restaurant.priceTier === '$$'
        case 'price-high':
          return restaurant.priceTier === '$$$'
        case 'rating-high':
          return restaurant.rating >= 4.5
        case 'trending':
          return restaurant.is_hot
        case 'vip':
          return restaurant.priceTier === 'VIP'
        default:
          return true
      }
    })
  })

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MainNav />
      
      {/* Hero Section */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-4">
            Restaurants
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explorez les meilleures tables de Montréal et du Québec. Des établissements culinaires sélectionnés pour leur excellence et leur atmosphère unique.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar onFilterChange={setSelectedFilters} />

      {/* Results Section */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-editorial h-96 animate-pulse bg-secondary" />
            ))}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Row */}
            {filteredRestaurants[0] && (
              <article className="card-editorial group overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 aspect-square md:aspect-auto md:h-80 overflow-hidden bg-secondary">
                    <img
                      src={filteredRestaurants[0].image}
                      alt={filteredRestaurants[0].name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <p className="text-primary text-sm uppercase tracking-widest mb-3">En vedette</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                      {filteredRestaurants[0].name}
                    </h2>
                    {filteredRestaurants[0].location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{filteredRestaurants[0].location}, {filteredRestaurants[0].city}</span>
                      </div>
                    )}
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                      {filteredRestaurants[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="font-semibold">{filteredRestaurants[0].rating.toFixed(1)}</span>
                      </div>
                      <button
                        onClick={() => router.push(`/venue/${filteredRestaurants[0].id}`)}
                        className="text-primary font-semibold hover:text-primary/80 transition-colors"
                      >
                        Découvrir →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Grid of remaining restaurants */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8">Autres adresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRestaurants.slice(1).map((restaurant) => (
                  <article
                    key={restaurant.id}
                    className="card-editorial group overflow-hidden"
                  >
                    <div className="aspect-video w-full overflow-hidden bg-secondary">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold mb-2 line-clamp-2">{restaurant.name}</h3>
                      {restaurant.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{restaurant.location}, {restaurant.city}</span>
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{restaurant.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-primary text-primary" />
                          <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
                        </div>
                        <button
                          onClick={() => router.push(`/venue/${restaurant.id}`)}
                          className="text-primary font-semibold hover:text-primary/80 transition-colors"
                        >
                          Découvrir →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Aucun restaurant trouvé avec ces filtres. Essayez de modifier vos critères.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

