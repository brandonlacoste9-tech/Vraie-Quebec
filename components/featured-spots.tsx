"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Star, Ticket } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { RSVPModal } from "@/components/booking/RSVPModal"
import { cn } from "@/lib/utils"
import { getQuebecDataWithMinCounts, type QuebecVenue } from "@/lib/data/cached-quebec-loader"

// Get data immediately from cache/fallback
const CACHED_DATA = getQuebecDataWithMinCounts(12, 6)

interface FilterOption {
  value: string;
  label: string;
}

interface FeaturedSpotsProps {
  title?: string;
  spots?: any[];
  showFilter?: boolean;
  filterOptions?: FilterOption[];
}

export function FeaturedSpots({ title, spots: propSpots, showFilter = false, filterOptions }: FeaturedSpotsProps = {}) {
  const router = useRouter()
  const [cityFilter, setCityFilter] = useState<'All' | 'Montreal' | 'Quebec City'>('All')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const { t } = useLanguage()

  // Filter spots based on city and category
  const activeSpots = useMemo(() => {
    let filtered = propSpots || CACHED_DATA.venues

    if (cityFilter !== 'All' && !propSpots) {
      filtered = (filtered as QuebecVenue[]).filter(s => s.city === cityFilter)
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((s: any) => {
        const type = (s.type || '').toLowerCase()
        const cat = (s.category || '').toLowerCase()
        const target = categoryFilter.toLowerCase()
        return type.includes(target) || cat.includes(target)
      })
    }

    return propSpots ? filtered : filtered.slice(0, 8)
  }, [cityFilter, categoryFilter, propSpots])

  const defaultCategories = [
    { id: 'all', label: 'Tous' },
    { id: 'restaurant', label: 'Restos' },
    { id: 'hotel', label: 'Hôtels' },
    { id: 'bar', label: 'Bars' },
    { id: 'cafe', label: 'Cafés' },
    { id: 'attraction', label: 'Attractions' },
    { id: 'church', label: 'Églises' },
    { id: 'museum', label: 'Musées' },
  ]

  const activeCategories = filterOptions ? filterOptions.map(opt => ({ id: opt.value, label: opt.label })) : defaultCategories

  return (
    <section className="py-8" id="featured">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-gold-500 text-gold-400 font-heading uppercase rounded-none px-2">
              Sélection Vrai Québec
            </Badge>
            <span className="text-sm text-gold-500/80 font-heading uppercase tracking-widest">
              Accès Membres
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white">
            {title ? (
              <>{title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">{title.split(' ').slice(1).join(' ')}</span></>
            ) : (
              <>{t.featured.headline_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">VIP Access</span> {t.featured.headline_suffix}</>
            )}
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {!propSpots && (
            <div className="flex gap-2">
              {['All', 'Montreal', 'Quebec City'].map(city => (
                <Button
                  key={city}
                  variant={cityFilter === city ? "default" : "outline"}
                  className={cn(
                    "font-heading uppercase rounded-none text-xs font-bold h-8 transition-all",
                    cityFilter === city ? "bg-gold-500 text-black hover:bg-gold-400" : "border-white/20 text-white hover:border-gold-500 hover:text-gold-400 bg-transparent"
                  )}
                  onClick={() => setCityFilter(city as any)}
                >
                  {city === 'All' ? 'Tous' : city === 'Montreal' ? 'Montréal' : 'Québec'}
                </Button>
              ))}
            </div>
          )}

          {(showFilter || !propSpots) && (
            <div className="flex gap-1 flex-wrap">
              {activeCategories.map(cat => (
                <Button
                  key={cat.id}
                  variant={categoryFilter === cat.id ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "font-heading uppercase rounded-none text-[10px] font-bold h-6 px-2 transition-all",
                    categoryFilter === cat.id ? "bg-primary text-white" : "border-white/10 text-white/60 hover:border-primary/50 hover:text-primary bg-transparent"
                  )}
                  onClick={() => setCategoryFilter(cat.id)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeSpots.map((spot) => (
          <div
            key={spot.id}
            className={cn(
              "group leather-card border border-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden",
              (spot.isFeatured || spot.is_hot) && "leather-card-elevated stitched ring-1 ring-primary/20"
            )}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={spot.image}
                alt={spot.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {(spot.isFeatured || spot.is_hot) && (
                  <Badge className="w-fit bg-gold-500 text-black font-bold border-none font-heading uppercase rounded-none text-xs shadow-lg shadow-gold-500/20">
                    VIP Access
                  </Badge>
                )}
                <Badge className="w-fit bg-white/10 text-white font-bold border-none font-heading uppercase rounded-none text-[10px]">
                  {spot.type || spot.category}
                </Badge>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur border border-white/20 text-white px-2 py-1 font-heading font-bold text-lg">
                {spot.rating}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-white/5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-gold-400 transition-colors">
                    {spot.name}
                  </h3>
                  <p className="text-sm text-gold-500/60 uppercase tracking-widest text-[10px]">{spot.category || spot.type}</p>
                </div>
                <span className="text-gold-400 font-heading font-bold">{spot.priceDisplay || spot.price}</span>
              </div>

              <div className="space-y-2 mb-6">
                {(spot.neighborhood?.fr || spot.location) && (
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="h-3 w-3 mr-2 text-gold-500" />
                    {spot.neighborhood?.fr || spot.location}, {spot.city}
                  </div>
                )}
                {spot.hours && (
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-3 w-3 mr-2 text-gold-500" />
                    {spot.hours.fr}
                  </div>
                )}
              </div>

              <div className="mt-auto flex gap-2">
                <RSVPModal
                  venueName={spot.name}
                  placeId={spot.id}
                  imageUrl={spot.image}
                >
                  <Button
                    className="flex-1 bg-gold-500 text-black hover:bg-gold-400 font-heading uppercase text-xs font-bold rounded-none h-8 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]"
                  >
                    {t.featured.reserve}
                  </Button>
                </RSVPModal>
                <Button
                  variant="outline"
                  onClick={() => window.open(spot.website || `https://www.google.com/search?q=${encodeURIComponent(spot.name + ' ' + spot.city)}`, '_blank')}
                  className="flex-1 border-white/20 text-white hover:border-gold-500 hover:text-gold-400 font-heading uppercase text-xs font-bold rounded-none h-8 bg-transparent"
                >
                  {t.featured.details}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
