import { searchVenuesAction } from "@/app/actions/search"
import { createClient } from "@/lib/supabase"
import { MapPin, Clock } from "lucide-react"

const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) {
  const { q } = await searchParams
  const query = q || ""

  const { venueIds, summary } = await searchVenuesAction(query, "FR")

  let venues: any[] = []
  if (venueIds && venueIds.length > 0) {
    try {
      const supabase = createClient()
      if (supabase) {
        const { data, error } = await supabase.from("venues").select("*").in("id", venueIds)
        if (data) {
          venues = data
        }
        if (error) {
          console.error("[v0] Error fetching venues", error)
        }
      }
    } catch (e) {
      console.error("[v0] Error fetching venues", e)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
          RÉSULTATS <span className="text-primary text-glow">VRAI QUÉBEC</span>
        </h1>

        {summary && (
          <div className="bg-secondary/30 border border-primary/20 rounded-lg p-6 mb-12 backdrop-blur-sm">
            <p className="text-lg md:text-xl text-white/90 italic font-heading leading-relaxed">"{summary}"</p>
          </div>
        )}

        {venues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="group relative overflow-hidden rounded-lg bg-secondary/40 border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={venue.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={venue.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white font-heading">{venue.name}</h3>
                    {venue.price && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded uppercase border border-primary/20">
                        {venue.price}
                      </span>
                    )}
                  </div>

                  {venue.address && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span>{venue.address}</span>
                    </div>
                  )}

                  {venue.opening_hours && (
                    <div className="flex items-center gap-2 text-xs text-green-400 mb-3 font-mono uppercase">
                      <Clock className="h-3 w-3" />
                      <span>OUVERT</span>
                    </div>
                  )}

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{venue.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground/60 font-mono">
                    <span>{venue.category}</span>
                    {venue.rating && <span>{venue.rating} ★</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground font-heading">
              {query ? `Aucun spot trouvé pour "${query}". Essaye autre chose.` : "Tape ta recherche ci-dessus."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
