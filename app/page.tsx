"use client"

import Image from "next/image"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { NewsletterForm } from "@/components/newsletter-form"
import { useLanguage } from "@/components/language-provider"

const featured = [
  {
    id: "1", label: "Gastronomie", title: "Joe Beef",
    subtitle: "L'institution culinaire montréalaise", location: "Montréal, QC", href: "/venue/rest-mtl-1",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "2", label: "Cocktails", title: "Bar Le Lab",
    subtitle: "L'art de la mixologie artisanale", location: "Le Plateau, Montréal", href: "/venue/bar-mtl-1",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85&auto=format&fit=crop",
  },
  {
    id: "3", label: "Événement", title: "Festival d'été de Québec",
    subtitle: "Scènes légendaires sous les étoiles", location: "Plaines d'Abraham, Québec", href: "/agenda",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=85&auto=format&fit=crop",
  },
  {
    id: "4", label: "Voyage", title: "Auberges de l'Estrie",
    subtitle: "Retraites gastronomiques au coeur des vignobles", location: "Estrie, Québec", href: "/voyage",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop",
  },
]

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=90&auto=format&fit=crop"

export default function HomePage() {
  const { t, language } = useLanguage()

  const marqueeItems =
    language === "FR"
      ? [
          "Gastronomie",
          "Cocktails",
          "Agenda",
          "Hôtels",
          "Culture",
          "Sports",
          "Voyage",
          "Vins",
          "Terrasses",
          "Jazz",
        ]
      : [
          "Dining",
          "Cocktails",
          "Events",
          "Hotels",
          "Culture",
          "Sports",
          "Travel",
          "Wine",
          "Patios",
          "Jazz",
        ]

  const pillars = [
    {
      overline: t.home.pillarsRestaurantsOverline,
      title: t.home.pillarsRestaurantsTitle,
      body: t.home.pillarsRestaurantsBody,
      href: "/restaurants",
      cta: t.home.pillarsRestaurantsCta,
    },
    {
      overline: t.home.pillarsBarsOverline,
      title: t.home.pillarsBarsTitle,
      body: t.home.pillarsBarsBody,
      href: "/bars",
      cta: t.home.pillarsBarsCta,
    },
    {
      overline: t.home.pillarsAgendaOverline,
      title: t.home.pillarsAgendaTitle,
      body: t.home.pillarsAgendaBody,
      href: "/agenda",
      cta: t.home.pillarsAgendaCta,
    },
  ]

  const editorials = [
    {
      label: language === "FR" ? "En ce moment" : "Right Now",
      title: language === "FR" ? "Le renouveau de la scène gastronomique à Montréal" : "The Revival of Montreal's Culinary Scene",
      excerpt: language === "FR"
        ? "Comment une nouvelle génération de chefs québécois réinterprète le terroir avec une élégance contemporaine."
        : "How a new generation of Quebec chefs is reinterpreting local cuisine with contemporary elegance.",
      href: "/restaurants",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85&auto=format&fit=crop",
    },
    {
      label: language === "FR" ? "Bars" : "Bars",
      title: language === "FR" ? "Whisky, ambre et ambiance feutrée" : "Whisky, Amber, and Intimate Vibes",
      excerpt: language === "FR"
        ? "Les bars à whisky et à spiritueux qui s'imposent comme les nouvelles références de la nuit montréalaise."
        : "The whisky and spirits bars that are becoming the new benchmarks of Montreal nightlife.",
      href: "/bars",
      image: "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=800&q=85&auto=format&fit=crop",
    },
    {
      label: language === "FR" ? "Escapade" : "Getaway",
      title: language === "FR" ? "Québec en hiver — la beauté du froid" : "Quebec in Winter — The Beauty of the Cold",
      excerpt: language === "FR"
        ? "Des auberges et refuges qui transforment la saison froide en expérience de luxe incomparable."
        : "Inns and lodges that transform the cold season into an incomparable luxury experience.",
      href: "/voyage",
      image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&q=85&auto=format&fit=crop",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Hero — full viewport, editorial overlay */}
      <section className="full-bleed relative min-h-[100svh] flex flex-col">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt={language === "FR" ? "Table dressée avec élégance dans un restaurant montréalais" : "Elegantly set table in a Montreal restaurant"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/40" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-t from-foreground/92 via-foreground/40 to-foreground/30"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/15 to-transparent hidden lg:block"
            aria-hidden
          />
        </div>

        <div className="relative z-[1] flex-1 flex flex-col justify-end max-w-7xl w-full mx-auto px-6 md:px-8 pb-14 md:pb-20 pt-36 md:pt-44">
          <p className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-primary font-sans mb-5">
            {t.home.tagline}
          </p>
          <h1
            className="font-display font-light text-white leading-[1.06] max-w-4xl mb-8"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.75rem, 7vw, 5.75rem)" }}
          >
            {t.home.headline}
            <br />
            <em className="italic text-primary font-light">{t.home.headlineHighlight}</em>
            {language === "FR" ? ", au Québec." : ", in Quebec."}
          </h1>
          <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mb-10 font-light">
            {t.home.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/restaurants" className="btn-luxury">
              {t.home.ctaPrimary}
            </Link>
            <Link
              href="/members"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/35 text-white text-[11px] tracking-[0.2em] uppercase font-sans rounded-[var(--radius)] hover:border-primary hover:text-primary transition-colors"
            >
              {t.home.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative z-[1] border-t border-white/10 bg-foreground/45 backdrop-blur-md overflow-hidden">
          <div className="flex gap-0 whitespace-nowrap">
            <div className="flex min-w-full animate-[scrollX_36s_linear_infinite]">
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className="px-8 py-3.5 text-[10px] tracking-[0.26em] uppercase text-white/45 border-r border-white/10 font-sans"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex min-w-full animate-[scrollX_36s_linear_infinite]" aria-hidden>
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className="px-8 py-3.5 text-[10px] tracking-[0.26em] uppercase text-white/45 border-r border-white/10 font-sans"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-border relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-px bg-secondary" />
      </div>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <p className="overline mb-3">{t.home.featuredOverline}</p>
            <h2 className="font-display font-light text-foreground text-3xl md:text-4xl lg:text-5xl max-w-xl" style={{ fontFamily: "var(--font-display)" }}>
              {t.home.featuredTitle}
            </h2>
          </div>
          <Link href="/restaurants" className="link-luxury shrink-0">
            {t.home.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <Link
            href={featured[0].href}
            className="lg:col-span-2 lg:row-span-2 group relative block overflow-hidden rounded-sm min-h-[320px] lg:min-h-[520px] ring-1 ring-border bg-background shadow-sm"
          >
            <Image
              src={featured[0].image}
              alt={featured[0].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="overline text-primary mb-2">{featured[0].label}</p>
              <h3 className="font-display font-light text-white text-3xl md:text-4xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {featured[0].title}
              </h3>
              <p className="text-white/70 text-sm">{featured[0].subtitle}</p>
            </div>
          </Link>

          {featured.slice(1).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative group block overflow-hidden rounded-sm aspect-[4/3] md:aspect-square ring-1 ring-border bg-background shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-[9px] tracking-[0.22em] uppercase text-primary font-sans mb-1">{item.label}</p>
                <h3 className="font-display font-light text-white text-xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="rule" />
      </div>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-14">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex flex-col border-l-2 border-secondary/35 pl-6 md:pl-8">
              <span className="text-[11px] font-mono text-muted-foreground tabular-nums mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="overline mb-4">{p.overline}</p>
              <h3 className="font-display font-light text-foreground text-2xl md:text-3xl mb-5" style={{ fontFamily: "var(--font-display)" }}>
                {p.title}
              </h3>
              <div className="h-px bg-primary w-10 mb-5" />
              <p className="text-muted-foreground text-[15px] leading-relaxed flex-1">{p.body}</p>
              <Link href={p.href} className="link-luxury mt-8 inline-block">
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section className="full-bleed bg-foreground py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-6">{t.home.membershipOverline}</p>
            <h2 className="font-display font-light text-primary-foreground leading-[1.1] mb-8 text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              {t.home.membershipTitle}
              <br />
              <em className="italic text-primary">{t.home.membershipHighlight}</em>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
              {t.home.membershipDescription}
            </p>
            <Link href="/members" className="btn-luxury">
              {t.home.membershipCta}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm ring-1 ring-primary/25 img-zoom">
            <Image
              src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1000&q=85&auto=format&fit=crop"
              alt={language === "FR" ? "Expérience exclusive Vrai Québec" : "Exclusive Vrai Quebec experience"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-4 border border-primary/35 pointer-events-none rounded-sm" />
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="mb-12 md:mb-14">
          <p className="overline mb-3">{t.home.editorialOverline}</p>
          <h2 className="font-display font-light text-foreground text-3xl md:text-4xl lg:text-5xl max-w-2xl" style={{ fontFamily: "var(--font-display)" }}>
            {t.home.editorialTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {editorials.map((story) => (
            <Link
              key={story.title}
              href={story.href}
              className="group flex flex-col rounded-sm ring-1 ring-border bg-surface overflow-hidden shadow-sm hover:ring-primary/40 transition-[box-shadow,ring-color] duration-300"
            >
              <div className="aspect-[3/2] overflow-hidden relative img-zoom">
                <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <p className="overline mb-3">{story.label}</p>
                <h3
                  className="font-display font-light text-foreground text-xl md:text-2xl leading-snug mb-4 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {story.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">{story.excerpt}</p>
                <div className="mt-6 link-luxury inline-block">{t.home.editorialRead}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="full-bleed border-y border-border bg-surface py-20 md:py-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="overline mb-4">{t.home.newsletterOverline}</p>
          <h2 className="font-display font-light text-foreground text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {t.home.newsletterTitle}
          </h2>
          <p className="text-muted-foreground mb-8">{t.home.newsletterDescription}</p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
