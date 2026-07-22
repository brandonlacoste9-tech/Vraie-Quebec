"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { EditorialPageHeader } from "@/components/editorial-page-header"
import { FilterBar } from "@/components/filter-bar"
import { AdBanner } from "@/components/ad-unit"
import { getPlacesByCategory } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function RestaurantsPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  useEffect(() => {
    getPlacesByCategory("restaurant")
      .then(setRestaurants)
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = restaurants.filter((r) => {
    if (!selectedFilters.length) return true
    return selectedFilters.some((f) => {
      if (f === "price-low")   return r.price_tier === "$"
      if (f === "price-mid")   return r.price_tier === "$$" || r.price_tier === "$$$"
      if (f === "price-high")  return r.price_tier === "$$$$"
      if (f === "rating-high") return r.rating >= 4.7
      if (f === "trending")    return r.is_hot === true
      if (f === "vip")         return r.has_vip === true
      return true
    })
  })

  const [hero, ...rest] = filtered

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <EditorialPageHeader
        overline={t.restaurants.overline}
        title={t.restaurants.title}
        description={t.restaurants.description}
      />

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-2">
        <FilterBar onFilterChange={setSelectedFilters} />
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-sm bg-muted animate-pulse ring-1 ring-border" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-16">
            {/* Hero featured */}
            {hero && (
              <article
                className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden ring-1 ring-border shadow-sm cursor-pointer bg-background"
                onClick={() => router.push(`/venue/${hero.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && router.push(`/venue/${hero.id}`)}
                aria-label={`Voir ${hero.name}`}
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden bg-muted">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="bg-surface p-10 md:p-14 flex flex-col justify-center border-t border-border md:border-t-0 md:border-l border-border">
                  <p className="overline mb-4">{t.restaurants.editorsPick}</p>
                  <h2 className="font-display font-light text-foreground text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {hero.name}
                  </h2>
                  {hero.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{hero.location}, {hero.city}</span>
                    </div>
                  )}
                  <div className="h-px bg-border mb-6" />
                  <p className="text-muted-foreground text-base leading-relaxed line-clamp-4 mb-8">{hero.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-foreground font-medium text-sm">{hero.rating.toFixed(1)}</span>
                    </div>
                    <span className="link-luxury group-hover:text-primary">{t.restaurants.discover}</span>
                  </div>
                </div>
              </article>
            )}

            <AdBanner />

            {/* Grid */}
            {rest.length > 0 && (
              <div>
                <p className="overline mb-8">{t.restaurants.allVenues}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {rest.map((place) => (
                    <article
                      key={place.id}
                      className="group rounded-sm ring-1 ring-border bg-surface overflow-hidden shadow-sm hover:ring-primary/40 transition-[box-shadow,ring-color] duration-300 cursor-pointer"
                      onClick={() => router.push(`/venue/${place.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && router.push(`/venue/${place.id}`)}
                      aria-label={`Voir ${place.name}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <h3 className="font-display font-light text-foreground text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                          {place.name}
                        </h3>
                        {place.location && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                            <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                            <span>{place.location}, {place.city}</span>
                          </div>
                        )}
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">{place.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                            <span className="text-foreground text-xs font-medium">{place.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-[10px] tracking-[0.18em] uppercase text-primary font-sans">{t.restaurants.view} →</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="font-display font-light text-foreground text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>{t.restaurants.noResults}</p>
            <p className="text-muted-foreground text-sm">{t.restaurants.noResultsDesc}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
