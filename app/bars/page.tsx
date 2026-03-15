"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { FilterBar } from "@/components/filter-bar"
import { useEffect, useState } from "react"
import { getPlacesByCategory } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star, Music } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BarsPage() {
  const router = useRouter()
  const [bars, setBars] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

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

  const filteredBars = bars.filter(bar => {
    if (selectedFilters.length === 0) return true
    
    return selectedFilters.some(filter => {
      switch (filter) {
        case 'price-low':
          return bar.priceTier === '$'
        case 'price-mid':
          return bar.priceTier === '$$'
        case 'price-high':
          return bar.priceTier === '$$$'
        case 'rating-high':
          return bar.rating >= 4.5
        case 'trending':
          return bar.is_hot
        case 'vip':
          return bar.priceTier === 'VIP'
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
            Bars & Clubs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explorez la vie nocturne vibrante de Montréal. Des établissements sélectionnés pour leur ambiance, leurs événements et leur musique.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar onFilterChange={setSelectedFilters} />

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-editorial h-96 animate-pulse bg-secondary" />
            ))}
          </div>
        ) : filteredBars.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Row */}
            {filteredBars[0] && (
              <article className="card-editorial group overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 aspect-square md:aspect-auto md:h-80 overflow-hidden bg-secondary">
                    <img
                      src={filteredBars[0].image}
                      alt={filteredBars[0].name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <p className="text-primary text-sm uppercase tracking-widest mb-3">En vedette</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                      {filteredBars[0].name}
                    </h2>
                    {filteredBars[0].location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{filteredBars[0].location}, {filteredBars[0].city}</span>
                      </div>
                    )}
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                      {filteredBars[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="font-semibold">{filteredBars[0].rating.toFixed(1)}</span>
                      </div>
                      <button
                        onClick={() => router.push(`/venue/${filteredBars[0].id}`)}
                        className="text-primary font-semibold hover:text-primary/80 transition-colors"
                      >
                        Découvrir →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Grid of remaining bars */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8">Autres adresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBars.slice(1).map((bar) => (
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
                      <h3 className="text-xl font-display font-bold mb-2 line-clamp-2">{bar.name}</h3>
                      {bar.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{bar.location}, {bar.city}</span>
                        </div>
                      )}
                      {bar.musicGenre && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Music className="h-4 w-4 text-primary" />
                          <span>{bar.musicGenre}</span>
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{bar.description}</p>
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
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Aucun bar trouvé avec ces filtres. Essayez de modifier vos critères.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

