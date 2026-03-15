"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, Star } from "lucide-react"
import { RSVPModal } from "@/components/booking/RSVPModal"
import { getQuebecDataWithMinCounts, type QuebecVenue } from "@/lib/data/cached-quebec-loader"

const CACHED_DATA = getQuebecDataWithMinCounts(12, 6)

interface FilterOption {
  value: string
  label: string
}

interface FeaturedSpotsProps {
  title?: string
  spots?: any[]
  showFilter?: boolean
  filterOptions?: FilterOption[]
}

export function FeaturedSpots({ title, spots: propSpots, showFilter = false, filterOptions }: FeaturedSpotsProps = {}) {
  const router = useRouter()
  const [cityFilter, setCityFilter] = useState<"All" | "Montreal" | "Quebec City">("All")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const activeSpots = useMemo(() => {
    let filtered = propSpots || CACHED_DATA.venues

    if (cityFilter !== "All" && !propSpots) {
      filtered = (filtered as QuebecVenue[]).filter((s) => s.city === cityFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((s: any) => {
        const type = (s.type || "").toLowerCase()
        const cat = (s.category || "").toLowerCase()
        const target = categoryFilter.toLowerCase()
        return type.includes(target) || cat.includes(target)
      })
    }

    return propSpots ? filtered : filtered.slice(0, 8)
  }, [cityFilter, categoryFilter, propSpots])

  const defaultCategories = [
    { id: "all", label: "Tous" },
    { id: "restaurant", label: "Restos" },
    { id: "hotel", label: "Hôtels" },
    { id: "bar", label: "Bars" },
    { id: "cafe", label: "Cafés" },
    { id: "attraction", label: "Attractions" },
    { id: "museum", label: "Musées" },
  ]

  const activeCategories = filterOptions
    ? filterOptions.map((opt) => ({ id: opt.value, label: opt.label }))
    : defaultCategories

  return (
    <section className="py-8" id="featured">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <p className="overline mb-3">Sélection Vrai Québec</p>
          <h2
            className="font-display font-light text-[#1C1916] text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title || "Adresses d'exception"}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {/* City filter */}
          {!propSpots && (
            <div className="flex gap-px bg-[#D6D0C6]">
              {(["All", "Montreal", "Quebec City"] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`px-4 py-2 text-[10px] tracking-[0.18em] uppercase font-sans transition-colors ${
                    cityFilter === city
                      ? "bg-[#1C1916] text-[#FAF8F5]"
                      : "bg-[#FAF8F5] text-[#7D7468] hover:bg-[#F4F1EC]"
                  }`}
                >
                  {city === "All" ? "Tous" : city === "Montreal" ? "Montréal" : "Québec"}
                </button>
              ))}
            </div>
          )}

          {/* Category filter */}
          {(showFilter || !propSpots) && (
            <div className="flex gap-px flex-wrap bg-[#D6D0C6]">
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 text-[9px] tracking-[0.18em] uppercase font-sans transition-colors ${
                    categoryFilter === cat.id
                      ? "bg-[#B08D57] text-[#FAF8F5]"
                      : "bg-[#FAF8F5] text-[#7D7468] hover:bg-[#F4F1EC]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D6D0C6]">
        {activeSpots.map((spot) => (
          <article
            key={spot.id}
            className="group bg-[#FAF8F5] hover:bg-white transition-colors duration-300 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
              <Image
                src={spot.image}
                alt={spot.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {(spot.isFeatured || spot.is_hot) && (
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#B08D57] text-[#FAF8F5] text-[9px] tracking-[0.18em] uppercase font-sans">
                  VIP
                </div>
              )}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#1C1916]/70 px-2 py-1 backdrop-blur-sm">
                <Star className="w-3 h-3 fill-[#B08D57] text-[#B08D57]" />
                <span className="text-[#FAF8F5] text-[11px] font-sans">{spot.rating}</span>
              </div>
            </div>

            <div className="p-5 md:p-6 flex flex-col flex-1">
              <p className="overline mb-2">{spot.type || spot.category}</p>
              <h3
                className="font-display font-light text-[#1C1916] text-lg md:text-xl mb-2 leading-snug group-hover:text-[#B08D57] transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {spot.name}
              </h3>
              {(spot.neighborhood?.fr || spot.location) && (
                <div className="flex items-center gap-1.5 text-xs text-[#7D7468] mb-4">
                  <MapPin className="h-3 w-3 text-[#B08D57] flex-shrink-0" />
                  <span>{spot.neighborhood?.fr || spot.location}, {spot.city}</span>
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
                <span className="text-sm text-[#1C1916] font-medium">{spot.priceDisplay || spot.price}</span>
                <RSVPModal venueName={spot.name} placeId={spot.id} imageUrl={spot.image}>
                  <button className="text-[10px] tracking-[0.18em] uppercase text-[#B08D57] font-sans hover:text-[#8C6D3F] transition-colors">
                    Réserver →
                  </button>
                </RSVPModal>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
