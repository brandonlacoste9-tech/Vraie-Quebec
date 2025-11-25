"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock } from "lucide-react"
import Image from "next/image" // Import Next.js Image component
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase"
import { useLanguage } from "@/components/language-provider"

// Helper interface for database rows
interface Venue {
  id: string
  name: string
  description: string
  category: string
  rating: number
  image_url: string
  price: string
  location: string
  status: string
  tags: string[]
  review_count: number
}

const MOCK_SPOTS: Venue[] = [
  {
    id: "1",
    name: "LE SAINT-SULPICE",
    description: "Luxury hotel in Old Montreal",
    category: "HOTEL",
    rating: 4.8,
    image_url: "/luxury-hotel-montreal.jpg",
    price: "$$$",
    location: "Old Montreal",
    status: "Open Now",
    tags: ["LUXURY", "HISTORIC"],
    review_count: 120,
  },
  {
    id: "2",
    name: "LA BANQUISE",
    description: "Famous poutine spot",
    category: "RESTAURANT",
    rating: 4.5,
    image_url: "/poutine-restaurant.jpg",
    price: "$",
    location: "Plateau",
    status: "Open 24/7",
    tags: ["CASUAL", "ICONIC"],
    review_count: 5000,
  },
  {
    id: "3",
    name: "NOTRE-DAME BASILICA",
    description: "Historic basilica",
    category: "ATTRACTION",
    rating: 4.9,
    image_url: "/notre-dame-basilica-montreal.jpg",
    price: "$$",
    location: "Old Montreal",
    status: "Open Now",
    tags: ["CULTURE", "MUST-SEE"],
    review_count: 3500,
  },
  {
    id: "4",
    name: "MOUNT ROYAL",
    description: "Large park with city views",
    category: "PARK",
    rating: 4.9,
    image_url: "/mount-royal-park-montreal.jpg",
    price: "Free",
    location: "Montreal",
    status: "Open Now",
    tags: ["NATURE", "VIEWS"],
    review_count: 4200,
  },
]

export function FeaturedSpots() {
  const [spots, setSpots] = useState<Venue[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    const fetchSpots = async () => {
      const supabase = createClient()

      if (!supabase) {
        console.log("[v0] Supabase client not available, using mock data")
        setSpots(MOCK_SPOTS)
        return
      }

      try {
        const { data, error } = await supabase.from("venues").select("*").limit(4)
        if (data && data.length > 0) {
          setSpots(data)
        } else {
          // Fallback to mock data if no data returned or error
          console.log("[v0] No data from Supabase or empty, using mock data")
          setSpots(MOCK_SPOTS)
        }
        if (error) {
          console.error("Error fetching spots:", error)
          setSpots(MOCK_SPOTS)
        }
      } catch (err) {
        console.error("Exception fetching spots:", err)
        setSpots(MOCK_SPOTS)
      }
    }
    fetchSpots()
  }, [])

  return (
    <section className="py-8" id="featured">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-primary text-primary font-heading uppercase rounded-none px-2">
              {t.featured.badge}
            </Badge>
            <span className="text-sm text-muted-foreground font-heading uppercase">{t.featured.subtitle}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white">
            {t.featured.headline_prefix} <span className="text-primary">{t.featured.headline_highlight}</span>{" "}
            {t.featured.headline_suffix}
          </h2>
        </div>
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-black font-heading uppercase rounded-none bg-transparent"
        >
          {t.featured.view_all}
        </Button>
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
                className="group bg-card border border-border hover:border-primary transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={spot.image_url || "/placeholder.svg"}
                    alt={spot.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {spot.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        className="w-fit bg-black/80 backdrop-blur border border-white/20 text-white font-heading uppercase rounded-none text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-primary text-white px-2 py-1 font-heading font-bold text-lg">
                    {spot.rating}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-white group-hover:text-primary transition-colors">
                        {spot.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{spot.category}</p>
                    </div>
                    <span className="text-white font-heading font-bold">{spot.price}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="h-3 w-3 mr-2 text-primary" />
                      {spot.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-3 w-3 mr-2 text-primary" />
                      {spot.status}
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Button
                      className="flex-1 bg-white text-black hover:bg-gray-200 font-heading uppercase text-xs font-bold rounded-none h-8"
                      onClick={() => window.open("https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00", "_blank")}
                    >
                      {t.featured.reserve}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-border text-white hover:border-primary hover:text-primary font-heading uppercase text-xs font-bold rounded-none h-8 bg-transparent"
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
