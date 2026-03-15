import { searchVenuesAction } from "@/app/actions/search"
import { createClient } from "@/lib/supabase"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"

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
        const { data } = await supabase.from("venues").select("*").in("id", venueIds)
        if (data) venues = data
      }
    } catch (e) {
      // no-op — fallback to empty
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#D6D0C6]">
        <p className="overline mb-4">Recherche</p>
        <h1
          className="font-display font-light text-[#1C1916] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {query ? `« ${query} »` : "Rechercher"}
        </h1>
        {summary && (
          <p className="text-[#7D7468] text-lg max-w-2xl leading-relaxed italic" style={{ fontFamily: "var(--font-display)" }}>
            {summary}
          </p>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {venues.length > 0 ? (
          <>
            <p className="overline mb-8">{venues.length} résultat{venues.length > 1 ? "s" : ""}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D6D0C6]">
              {venues.map((venue) => (
                <article key={venue.id} className="group bg-[#FAF8F5] hover:bg-white transition-colors duration-300">
                  {venue.image_url && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
                      <img
                        src={venue.image_url}
                        alt={venue.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <p className="overline mb-2">{venue.category}</p>
                    <h2
                      className="font-display font-light text-[#1C1916] text-xl md:text-2xl mb-2 leading-snug group-hover:text-[#B08D57] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {venue.name}
                    </h2>
                    {venue.address && (
                      <div className="flex items-center gap-1.5 text-xs text-[#7D7468] mb-3">
                        <MapPin className="h-3 w-3 text-[#B08D57] flex-shrink-0" />
                        <span>{venue.address}</span>
                      </div>
                    )}
                    {venue.description && (
                      <p className="text-[#7D7468] text-sm leading-relaxed line-clamp-2 mb-4">
                        {venue.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DC]">
                      {venue.rating && (
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-[#B08D57] text-[#B08D57]" />
                          <span className="text-[#1C1916] text-xs font-medium">{venue.rating}</span>
                        </div>
                      )}
                      <Link href={`/venue/${venue.id}`} className="link-luxury text-[10px]">
                        Voir la fiche →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="py-24 text-center">
            <p
              className="font-display font-light text-[#1C1916] text-3xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {query
                ? `Aucun résultat pour « ${query} »`
                : "Saisissez votre recherche"}
            </p>
            <p className="text-[#7D7468] mb-8">
              Essayez «{"\u00a0"}Montréal gastronomie{"\u00a0"}» ou «{"\u00a0"}bar à cocktails Québec{"\u00a0"}»
            </p>
            <Link href="/" className="link-luxury">
              Retour à l'accueil →
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
