import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { NewsletterForm } from "@/components/newsletter-form"

// ─── Curated data (Louis Vuitton × Hermès) ───────────────────────────────────
const featured = [
  {
    id: "1",
    label: "Gastronomie",
    title: "Joe Beef",
    subtitle: "L'institution culinaire montréalaise",
    location: "Montréal, QC",
    href: "/venue/1",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "2",
    label: "Cocktails",
    title: "Bar Le Lab",
    subtitle: "L'art de la mixologie artisanale",
    location: "Le Plateau, Montréal",
    href: "/venue/2",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85&auto=format&fit=crop",
  },
  {
    id: "3",
    label: "Événement",
    title: "Festival d'été de Québec",
    subtitle: "Scènes légendaires sous les étoiles",
    location: "Plaines d'Abraham, Québec",
    href: "/agenda",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=85&auto=format&fit=crop",
  },
  {
    id: "4",
    label: "Voyage",
    title: "Auberges de l'Estrie",
    subtitle: "Retraites gastronomiques au coeur des vignobles",
    location: "Estrie, Québec",
    href: "/voyage",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop",
  },
]

const pillars = [
  {
    overline: "Table",
    title: "Restaurants",
    body: "Des tables d'exception sélectionnées par nos experts culinaires pour leur cuisine, leur service et leur atmosphère.",
    href: "/restaurants",
    cta: "Explorer les adresses",
  },
  {
    overline: "Nuit",
    title: "Bars & Clubs",
    body: "Les meilleures adresses de la vie nocturne montréalaise — cocktails de précision, terrasses et ambiances soignées.",
    href: "/bars",
    cta: "Voir les bars",
  },
  {
    overline: "Agenda",
    title: "Événements",
    body: "Festivals, galas, vernissages et soirées privées — votre agenda culturel curatif pour ne rien manquer.",
    href: "/agenda",
    cta: "Consulter l'agenda",
  },
]

const editorials = [
  {
    label: "En ce moment",
    title: "Le renouveau de la scène gastronomique à Montréal",
    excerpt: "Comment une nouvelle génération de chefs québécois réinterprète le terroir avec une élégance contemporaine.",
    href: "/restaurants",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85&auto=format&fit=crop",
  },
  {
    label: "Bars",
    title: "Whisky, ambre et ambiance feutrée",
    excerpt: "Les bars à whisky et à spiritueux qui s'imposent comme les nouvelles références de la nuit montréalaise.",
    href: "/bars",
    image: "https://images.unsplash.com/photo-1527761939622-933c972d11e1?w=800&q=85&auto=format&fit=crop",
  },
  {
    label: "Escapade",
    title: "Québec en hiver — la beauté du froid",
    excerpt: "Des auberges et refuges qui transforment la saison froide en expérience de luxe incomparable.",
    href: "/voyage",
    image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&q=85&auto=format&fit=crop",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      {/* ── HERO: full-bleed split ────────────────────────────────────────── */}
      <section className="full-bleed">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
          {/* Left: text */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-[#F4F1EC]">
            <p className="overline mb-6">Montréal · Québec · 2025</p>
            <h1
              className="font-display font-light text-[#1C1916] leading-[1.08] mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              L'art de vivre<br />
              <em className="italic text-[#B08D57]">bien</em>, au Québec.
            </h1>
            <p className="text-[#7D7468] text-lg leading-relaxed mb-12 max-w-md">
              Restaurants d'exception, bars de caractère, événements exclusifs — le guide de référence pour ceux qui exigent le meilleur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/restaurants" className="btn-luxury">
                Découvrir
              </Link>
              <Link href="/members" className="btn-ghost-luxury">
                Accès Membre
              </Link>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative min-h-[55vh] lg:min-h-0 img-zoom overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1400&q=90&auto=format&fit=crop"
              alt="Table dressée avec élégance dans un restaurant montréalais"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1C1916]/10" />
          </div>
        </div>
      </section>

      {/* ── GOLD RULE ────────────────────────────────────────────────────────── */}
      <div className="rule-accent" />

      {/* ── FEATURED FOUR: masonry-style grid ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="overline mb-3">Sélection de la rédaction</p>
            <h2 className="font-display font-light text-[#1C1916]" style={{ fontFamily: 'var(--font-display)' }}>
              En vedette
            </h2>
          </div>
          <Link href="/restaurants" className="link-luxury hidden md:inline-block">
            Tout voir
          </Link>
        </div>

        {/* Asymmetric grid: large left + 3 right */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D6D0C6]">
          {/* Large feature */}
          <Link
            href={featured[0].href}
            className="lg:col-span-2 lg:row-span-2 relative group block overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[520px] bg-[#F4F1EC]"
          >
            <img
              src={featured[0].image}
              alt={featured[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1916]/80 via-[#1C1916]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="overline text-[#B08D57] mb-2">{featured[0].label}</p>
              <h3 className="font-display font-light text-[#FAF8F5] text-3xl md:text-4xl mb-2"
                style={{ fontFamily: 'var(--font-display)' }}>
                {featured[0].title}
              </h3>
              <p className="text-[#D6D0C6] text-sm">{featured[0].subtitle}</p>
            </div>
          </Link>

          {/* 3 smaller cards */}
          {featured.slice(1).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative group block overflow-hidden aspect-square bg-[#F4F1EC]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1916]/70 via-[#1C1916]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B08D57] font-sans mb-1">{item.label}</p>
                <h3 className="font-display font-light text-[#FAF8F5] text-xl leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="rule" />
      </div>

      {/* ── THREE PILLARS ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex flex-col">
              <p className="overline mb-4">{p.overline}</p>
              <h3
                className="font-display font-light text-[#1C1916] text-3xl md:text-4xl mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {p.title}
              </h3>
              <div className="h-px bg-[#B08D57] w-10 mb-5" />
              <p className="text-[#7D7468] text-[15px] leading-relaxed flex-1">{p.body}</p>
              <Link href={p.href} className="link-luxury mt-8 inline-block">
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── DARK INTERLUDE: maison banner ────────────────────────────────────── */}
      <section className="full-bleed bg-[#1C1916] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#B08D57] font-sans mb-6">
              Membership
            </p>
            <h2
              className="font-display font-light text-[#FAF8F5] leading-[1.1] mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Le cercle des<br />
              <em className="italic text-[#B08D57]">initiés</em>
            </h2>
            <p className="text-[#9E9388] text-lg leading-relaxed mb-10 max-w-md">
              Réservations prioritaires, invitations privées, accès aux meilleures tables avant tout le monde — devenez membre et découvrez le Québec autrement.
            </p>
            <Link href="/members" className="btn-luxury">
              Rejoindre la maison
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden img-zoom">
            <img
              src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1000&q=85&auto=format&fit=crop"
              alt="Expérience exclusive Vrai Québec"
              className="w-full h-full object-cover"
            />
            {/* Gold frame accent */}
            <div className="absolute inset-4 border border-[#B08D57]/30 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STORIES ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="overline mb-3">Chroniques</p>
            <h2 className="font-display font-light text-[#1C1916]" style={{ fontFamily: 'var(--font-display)' }}>
              À lire
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D6D0C6]">
          {editorials.map((story) => (
            <Link
              key={story.title}
              href={story.href}
              className="group block bg-[#F4F1EC] hover:bg-[#FAF8F5] transition-colors duration-300"
            >
              <div className="aspect-[3/2] overflow-hidden img-zoom">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="overline mb-3">{story.label}</p>
                <h3
                  className="font-display font-light text-[#1C1916] text-xl md:text-2xl leading-snug mb-4 group-hover:text-[#B08D57] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {story.title}
                </h3>
                <p className="text-[#7D7468] text-sm leading-relaxed line-clamp-3">{story.excerpt}</p>
                <div className="mt-6 link-luxury inline-block">Lire</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA: newsletter ────────────────────────────────────────────── */}
      <section className="full-bleed bg-[#FAF8F5] border-t border-b border-[#D6D0C6] py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="overline mb-4">La Lettre Hebdomadaire</p>
          <h2
            className="font-display font-light text-[#1C1916] text-3xl md:text-4xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ne manquez rien
          </h2>
          <p className="text-[#7D7468] mb-8">
            Nos sélections exclusives, événements privés et recommandations de la semaine, directement dans votre boîte.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
