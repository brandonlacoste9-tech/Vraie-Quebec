import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Ticket } from "lucide-react"

const EVENTS = [
  {
    id: 1, label: "Nightlife", title: "Igloofest 2025",
    description: "Le party le plus froid au monde. Musique électronique sous la neige avec les meilleurs DJs internationaux.",
    date: "16 — 17 Janvier", location: "Vieux-Port, Montréal", price: "$45",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=85&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2, label: "Musique", title: "Charlotte de Witte — Techno Night",
    description: "La reine de la techno de retour au Québec pour une nuit inoubliable.",
    date: "1 Mars", location: "Centre Vidéotron, Québec", price: "$85",
    image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=1200&q=85&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 3, label: "Musique", title: "Festival d'été de Québec",
    description: "Le plus grand festival de musique en plein air au Canada. Des scènes légendaires sous les étoiles des Plaines d'Abraham.",
    date: "3 — 13 Juillet", location: "Plaines d'Abraham, Québec", price: "$150 (Passe)",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=85&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 4, label: "Gastronomie", title: "Poutine Week VIP Tasting",
    description: "Dégustation des dix meilleures poutines de l'année avec accord bières artisanales.",
    date: "5 Février", location: "La Banquise, Montréal", price: "$35",
    image: "https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: 5, label: "Arts", title: "MURAL Festival",
    description: "Festival d'art urbain avec DJ sets et live painting en direct sur la rue Saint-Laurent.",
    date: "6 Juin", location: "Boul. Saint-Laurent, Montréal", price: "Entrée libre",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: 6, label: "Arts", title: "Nuit Blanche à Montréal",
    description: "Art, culture et fête toute la nuit à travers les quartiers de la ville.",
    date: "1 Mars", location: "Centre-ville, Montréal", price: "Entrée libre",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85&auto=format&fit=crop",
  },
]

export default function AgendaPage() {
  const featured = EVENTS.filter((e) => e.featured)
  const upcoming = EVENTS.filter((e) => !e.featured)

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-border">
        <p className="overline mb-4">Événements</p>
        <h1 className="font-display font-light text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Agenda</h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Festivals, concerts, galas et soirées culturelles — votre calendrier des événements d'exception à Montréal et au Québec.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-20">

        {/* Featured */}
        <section>
          <p className="overline mb-8">Coups de cœur</p>
          <div className="space-y-px bg-border">
            {featured.map((event) => (
              <article key={event.id} className="group grid grid-cols-1 md:grid-cols-5 bg-surface hover:bg-background transition-colors duration-300">
                <div className="md:col-span-2 relative aspect-[3/2] md:aspect-auto overflow-hidden bg-muted">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <p className="overline mb-4">{event.label}</p>
                    <h2 className="font-display font-light text-foreground text-2xl md:text-3xl lg:text-4xl mb-5 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                      {event.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6 py-5 border-t border-b border-border">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-light text-2xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                        {event.price}
                      </span>
                      <a href="#" className="btn-luxury text-[11px] flex items-center gap-2">
                        <Ticket className="w-3.5 h-3.5" />
                        Réserver
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="rule" />

        {/* Upcoming */}
        <section>
          <p className="overline mb-8">À venir</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {upcoming.map((event) => (
              <article key={event.id} className="group bg-surface hover:bg-background transition-colors duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="overline mb-3">{event.label}</p>
                  <h3 className="font-display font-light text-foreground text-xl md:text-2xl mb-3 leading-snug group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">{event.description}</p>
                  <div className="space-y-2 mb-5 pb-5 border-b border-border text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-light text-foreground text-lg" style={{ fontFamily: "var(--font-display)" }}>
                      {event.price}
                    </span>
                    <a href="#" className="text-[10px] tracking-[0.18em] uppercase text-primary font-sans hover:text-primary-dark transition-colors">
                      Réserver →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
