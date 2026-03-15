"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { FilterBar } from "@/components/filter-bar"
import { getPlacesByCategory } from "@/lib/data/places"
import type { Place } from "@/lib/types/database"
import { MapPin, Star, Music } from "lucide-react"

export default function BarsPage() {
  const router = useRouter()
  const [bars, setBars] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  useEffect(() => {
    getPlacesByCategory("nightlife")
      .then(setBars)
      .catch(() => setBars([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = bars.filter((b) => {
    if (!selectedFilters.length) return true
    return selectedFilters.some((f) => {
      if (f === "price-low") return b.priceTier === "$"
      if (f === "price-mid") return b.priceTier === "$$"
      if (f === "price-high") return b.priceTier === "$$$"
      if (f === "rating-high") return b.rating >= 4.5
      if (f === "trending") return b.is_hot
      if (f === "vip") return b.priceTier === "VIP"
      return true
    })
  })

  const [hero, ...rest] = filtered

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#D6D0C6]">
        <p className="overline mb-4">Vie nocturne</p>
        <h1
          className="font-display font-light text-[#1C1916] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Bars & Clubs
        </h1>
        <p className="text-[#7D7468] text-lg max-w-2xl leading-relaxed">
          Cocktails de précision, ambiances soignées et scènes musicales — la vie nocturne montréalaise dans toute son élégance.
        </p>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FilterBar onFilterChange={setSelectedFilters} />
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D6D0C6]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#E8E4DC] animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-16">
            {/* Hero featured: dark treatment for nightlife */}
            {hero && (
              <article
                className="group grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1C1916] cursor-pointer"
                onClick={() => router.push(`/venue/${hero.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && router.push(`/venue/${hero.id}`)}
                aria-label={`Voir ${hero.name}`}
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden bg-[#2A2722]">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="bg-[#1C1916] p-10 md:p-14 flex flex-col justify-center">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#B08D57] font-sans mb-4">
                    En vedette
                  </p>
                  <h2
                    className="font-display font-light text-[#FAF8F5] text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {hero.name}
                  </h2>
                  {hero.location && (
                    <div className="flex items-center gap-2 text-sm text-[#9E9388] mb-4">
                      <MapPin className="h-4 w-4 text-[#B08D57] flex-shrink-0" />
                      <span>{hero.location}, {hero.city}</span>
                    </div>
                  )}
                  {hero.musicGenre && (
                    <div className="flex items-center gap-2 text-sm text-[#9E9388] mb-6">
                      <Music className="h-4 w-4 text-[#B08D57] flex-shrink-0" />
                      <span>{hero.musicGenre}</span>
                    </div>
                  )}
                  <div className="h-px bg-[#2E2B27] mb-6" />
                  <p className="text-[#9E9388] text-base leading-relaxed line-clamp-4 mb-8">
                    {hero.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-[#B08D57] text-[#B08D57]" />
                      <span className="text-[#FAF8F5] text-sm font-medium">{hero.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#B08D57] group-hover:text-[#FAF8F5] transition-colors">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div>
                <p className="overline mb-8">Toutes les adresses</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D6D0C6]">
                  {rest.map((bar) => (
                    <article
                      key={bar.id}
                      className="group bg-[#FAF8F5] hover:bg-white transition-colors duration-300 cursor-pointer"
                      onClick={() => router.push(`/venue/${bar.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && router.push(`/venue/${bar.id}`)}
                      aria-label={`Voir ${bar.name}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
                        <img
                          src={bar.image}
                          alt={bar.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <h3
                          className="font-display font-light text-[#1C1916] text-xl md:text-2xl mb-2 group-hover:text-[#B08D57] transition-colors duration-300"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {bar.name}
                        </h3>
                        {bar.location && (
                          <div className="flex items-center gap-1.5 text-xs text-[#7D7468] mb-1">
                            <MapPin className="h-3 w-3 text-[#B08D57] flex-shrink-0" />
                            <span>{bar.location}, {bar.city}</span>
                          </div>
                        )}
                        {bar.musicGenre && (
                          <div className="flex items-center gap-1.5 text-xs text-[#7D7468] mb-4">
                            <Music className="h-3 w-3 text-[#B08D57] flex-shrink-0" />
                            <span>{bar.musicGenre}</span>
                          </div>
                        )}
                        <p className="text-[#7D7468] text-sm leading-relaxed line-clamp-2 mb-5">
                          {bar.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DC]">
                          <div className="flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-[#B08D57] text-[#B08D57]" />
                            <span className="text-[#1C1916] text-xs font-medium">{bar.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-[10px] tracking-[0.18em] uppercase text-[#B08D57] font-sans">
                            Voir →
                          </span>
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
            <p className="font-display font-light text-[#1C1916] text-2xl mb-3"
              style={{ fontFamily: "var(--font-display)" }}>
              Aucun résultat
            </p>
            <p className="text-[#7D7468] text-sm">Essayez de modifier vos filtres.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
