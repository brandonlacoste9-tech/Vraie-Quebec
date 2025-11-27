"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { REAL_QUEBEC_DATA, Place } from "@/lib/data"
import { RSVPModal } from "@/components/booking/rsvp-modal"
import { cn } from "@/lib/utils"

export function FeaturedSpots() {
  const [spots, setSpots] = useState<Place[]>([])
  const [cityFilter, setCityFilter] = useState<'All' | 'Montreal' | 'Quebec City'>('All')
  const { t } = useLanguage()

  useEffect(() => {
    const fetchSpots = async () => {
      // For now, we prioritize our high-end curated data
      // Combine top spots from each category
      let allSpots = [
        ...REAL_QUEBEC_DATA.restaurants.filter(p => p.exclusive || p.bookingType !== 'none'),
        ...REAL_QUEBEC_DATA.nightlife.filter(p => p.exclusive || p.bookingType !== 'none'),
        ...REAL_QUEBEC_DATA.hotels.filter(p => p.exclusive || p.bookingType !== 'none'),
      ]

      if (cityFilter !== 'All') {
        allSpots = allSpots.filter(s => s.city === cityFilter)
      }

      // Randomize or sort by priority? For now, just slice
      setSpots(allSpots.slice(0, 8))
    }
    fetchSpots()
  }, [cityFilter])

  return (
    <section className="py-8" id="featured">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-gold-500 text-gold-400 font-heading uppercase rounded-none px-2">
              Vrai Québec Select
            </Badge>
            <span className="text-sm text-gold-500/80 font-heading uppercase tracking-widest">
               Members Only Access
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white">
            {t.featured.headline_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">VIP Access</span>{" "}
            {t.featured.headline_suffix}
          </h2>
        </div>
        
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
                {city === 'All' ? 'Tout' : city === 'Montreal' ? 'MTL' : 'QC'}
              </Button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {spots.length === 0
          ? // Skeleton loading state
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-[400px] bg-card/50 animate-pulse border border-border" />
            ))
          : spots.map((spot) => (
              <div
                key={spot.id}
                className={cn(
                    "group bg-black border border-white/10 hover:border-gold-500/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden",
                    spot.priceTier === 'VIP' && "ring-1 ring-gold-500/20"
                )}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {spot.priceTier === 'VIP' && (
                        <Badge className="w-fit bg-gold-500 text-black font-bold border-none font-heading uppercase rounded-none text-xs shadow-lg shadow-gold-500/20">
                            VIP Access
                        </Badge>
                    )}
                    {spot.isSponsored && (
                         <Badge className="w-fit bg-white/90 text-black font-bold border-none font-heading uppercase rounded-none text-[10px] flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Sponsored
                        </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur border border-white/20 text-white px-2 py-1 font-heading font-bold text-lg">
                    {spot.rating}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-white group-hover:text-gold-400 transition-colors">
                        {spot.name}
                      </h3>
                      <p className="text-sm text-gold-500/60 uppercase tracking-widest text-[10px]">{spot.type}</p>
                    </div>
                    <span className="text-gold-400 font-heading font-bold">{spot.priceTier || spot.price}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="h-3 w-3 mr-2 text-gold-500" />
                      {spot.location}, {spot.city}
                    </div>
                    {spot.vibe && (
                         <div className="flex items-center text-sm text-gray-400">
                            <Clock className="h-3 w-3 mr-2 text-gold-500" />
                            {spot.vibe}
                        </div>
                    )}
                  </div>

                  <div className="mt-auto flex gap-2">
                    <RSVPModal 
                        venueName={spot.name}
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
