import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MagazineMasthead } from "@/components/magazine-masthead"
import { BreakingTicker } from "@/components/breaking-ticker"
import { EditorialGrid } from "@/components/editorial-grid"
import { FeaturedEventSection } from "@/components/featured-event-section"

export default function Home() {
  // Sample data - in production this would come from a database
  const featuredStories = [
    {
      id: "1",
      title: "Le restaurant de l'année à Montréal",
      description: "Découvrez l'adresse qui révolutionne la scène culinaire montréalaise avec une cuisine audacieuse et des saveurs authentiques.",
      category: "Restaurants",
      image: "/images/restaurant-featured.jpg",
      href: "/venue/1",
      size: "large" as const,
    },
    {
      id: "2",
      title: "Bars branchés du centre-ville",
      description: "Les meilleures adresses pour des cocktails artisanaux et une ambiance unique en plein cœur de la ville.",
      category: "Bars",
      image: "/images/bar-1.jpg",
      href: "/bars",
    },
    {
      id: "3",
      title: "Festival de musique d'été",
      description: "Une célébration musicale à ne pas manquer avec les meilleurs artistes de la région.",
      category: "Événements",
      image: "/images/event-1.jpg",
      href: "/agenda",
    },
    {
      id: "4",
      title: "Guide des terrasses",
      description: "Explorez les plus belles terrasses pour profiter de l'été québécois en toute détente.",
      category: "Sorties",
      image: "/images/terrace.jpg",
      href: "/restaurants",
    },
    {
      id: "5",
      title: "Voyage gourmand en Estrie",
      description: "Une escapade délicieuse à travers les vignobles et auberges de la région.",
      category: "Voyage",
      image: "/images/voyage-1.jpg",
      href: "/voyage",
      size: "large" as const,
    },
  ]

  const breakingNews = [
    "Accès exclusif: Les meilleures réservations de la semaine",
    "Tendance: La scène des bars branchés du plateau",
    "À découvrir: Nouvelle galerie et événement culturel",
  ]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MainNav />
      <MagazineMasthead />
      <BreakingTicker items={breakingNews} />

      {/* Editorial Hero Section */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-6">
              Découvrez le Québec
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Votre guide éditorial des meilleures adresses pour restaurants, bars, événements et sorties à Montréal et partout au Québec. Des recommandations curatoriales pour vivre authentiquement.
            </p>
            <a href="/restaurants" className="inline-block bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors">
              Explorer →
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20 space-y-20">
        {/* Featured Editorial Grid */}
        <EditorialGrid 
          items={featuredStories}
          title="En vedette"
        />

        <div className="divider" />

        {/* Featured Event */}
        <FeaturedEventSection
          title="Festival de Musique Montréal"
          date="15-17 Août"
          time="20h00"
          location="Parc Jean-Drapeau"
          description="Trois jours d'expérience musicale immersive avec les meilleurs artistes québécois et internationaux. Une célébration de la culture et de la musique en direct."
          attendeeCount={5000}
          href="/agenda"
          image="/images/festival.jpg"
        />

        <div className="divider" />

        {/* VIP Access Section */}
        <section>
          <h2 className="text-4xl font-display font-bold mb-12">Accès VIP</h2>
          <div className="full-bleed bg-primary/10">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-editorial p-8">
                  <h3 className="text-2xl font-display font-bold mb-3">Réservations prioritaires</h3>
                  <p className="text-muted-foreground mb-4">Accès en avant-première aux meilleures tables et événements exclusifs du Québec.</p>
                  <a href="/members" className="text-primary font-semibold hover:underline">Devenir membre →</a>
                </div>
                <div className="card-editorial p-8">
                  <h3 className="text-2xl font-display font-bold mb-3">Sélection curatoriale</h3>
                  <p className="text-muted-foreground mb-4">Découvrez nos recommandations hebdomadaires sélectionnées par nos experts culinaires et culturels.</p>
                  <a href="/restaurants" className="text-primary font-semibold hover:underline">Voir les sélections →</a>
                </div>
                <div className="card-editorial p-8">
                  <h3 className="text-2xl font-display font-bold mb-3">Événements exclusifs</h3>
                  <p className="text-muted-foreground mb-4">Participez à nos événements privés et rencontrez les propriétaires et chefs de Vrai Québec.</p>
                  <a href="/agenda" className="text-primary font-semibold hover:underline">Consulter l'agenda →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Membership CTA */}
        <section className="full-bleed bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Rejoignez notre communauté
            </h2>
            <p className="text-xl text-background/80 mb-8 leading-relaxed">
              Devenir membre de Vrai Québec vous donne accès à des réservations prioritaires, des événements exclusifs et une expérience culinaire incomparable.
            </p>
            <a 
              href="/members"
              className="inline-block bg-background text-foreground px-8 py-4 font-display font-bold uppercase text-sm tracking-wider hover:bg-background/90 transition-colors"
            >
              Explorer l'adhésion →
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
