"use client"

import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { NewsletterForm } from "@/components/newsletter-form"
import { useLanguage } from "@/components/language-provider"

const featured = [
  {
    id: "1", label: "Gastronomie", title: "Joe Beef",
    subtitle: "L'institution culinaire montréalaise", location: "Montréal, QC", href: "/venue/rest-mtl-1",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=90&auto=format&fit=crop",
  },
  {
    id: "2", label: "Cocktails", title: "Bar Le Lab",
    subtitle: "L'art de la mixologie artisanale", location: "Le Plateau, Montréal", href: "/venue/bar-mtl-1",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: "3", label: "Événement", title: "Festival d'été de Québec",
    subtitle: "Scènes légendaires sous les étoiles", location: "Plaines d'Abraham, Québec", href: "/agenda",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=90&auto=format&fit=crop",
  },
  {
    id: "4", label: "Voyage", title: "Auberges de l'Estrie",
    subtitle: "Retraites gastronomiques au cœur des vignobles", location: "Estrie, Québec", href: "/voyage",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=90&auto=format&fit=crop",
  },
]

export default function HomePage() {
  const { t, language } = useLanguage()

  const pillars = [
    {
      number: "01",
      overline: t.home.pillarsRestaurantsOverline,
      title: t.home.pillarsRestaurantsTitle,
      body: t.home.pillarsRestaurantsBody,
      href: "/restaurants",
      cta: t.home.pillarsRestaurantsCta,
    },
    {
      number: "02",
      overline: t.home.pillarsBarsOverline,
      title: t.home.pillarsBarsTitle,
      body: t.home.pillarsBarsBody,
      href: "/bars",
      cta: t.home.pillarsBarsCta,
    },
    {
      number: "03",
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
      title: language === "FR"
        ? "Le renouveau de la scène gastronomique à Montréal"
        : "The Revival of Montreal's Culinary Scene",
      excerpt: language === "FR"
        ? "Comment une nouvelle génération de chefs québécois réinterprète le terroir avec une élégance contemporaine."
        : "How a new generation of Quebec chefs is reinterpreting local cuisine with contemporary elegance.",
      href: "/restaurants",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=90&auto=format&fit=crop",
    },
    {
      label: language === "FR" ? "Bars" : "Bars",
      title: language === "FR"
        ? "Whisky, ambre et ambiance feutrée"
        : "Whisky, Amber, and Intimate Vibes",
      excerpt: language === "FR"
        ? "Les bars à whisky et spiritueux qui s'imposent comme les nouvelles références de la nuit montréalaise."
        : "The whisky and spirits bars becoming the new benchmarks of Montreal nightlife.",
      href: "/bars",
      image: "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=900&q=90&auto=format&fit=crop",
    },
    {
      label: language === "FR" ? "Escapade" : "Getaway",
      title: language === "FR"
        ? "Québec en hiver — la beauté du froid"
        : "Quebec in Winter — The Beauty of the Cold",
      excerpt: language === "FR"
        ? "Des auberges et refuges qui transforment la saison froide en expérience de luxe incomparable."
        : "Inns and lodges that transform the cold season into an incomparable luxury experience.",
      href: "/voyage",
      image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=900&q=90&auto=format&fit=crop",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* ── CINEMATIC HERO ────────────────────────────────────────────────── */}
      <section className="full-bleed relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1800&q=92&auto=format&fit=crop"
          alt={language === "FR" ? "Table dressée dans un restaurant montréalais d'exception" : "Elegantly set table in a Montreal restaurant"}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layered gradient — bottom heavy, keeps top of image visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C09]/92 via-[#0E0C09]/45 to-[#0E0C09]/12" />

        {/* Subtle side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0C09]/30 via-transparent to-transparent" />

        {/* Content — anchored to bottom */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 pb-20 md:pb-28">

          {/* Thin gold rule above headline */}
          <div className="w-10 h-px bg-primary mb-10" />

          <p className="overline text-primary mb-6 opacity-0 animate-fade-up delay-1">
            {t.home.tagline}
          </p>

          <h1
            className="font-display font-light text-white leading-[1.0] mb-8 max-w-5xl opacity-0 animate-fade-up delay-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.home.headline}
            <br />
            <em className="italic text-primary">{t.home.headlineHighlight}</em>
            {language === "FR" ? ", au Québec." : ", in Quebec."}
          </h1>

          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-12 max-w-xl font-sans opacity-0 animate-fade-up delay-3">
            {t.home.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-4">
            <Link href="/restaurants" className="btn-luxury">
              {t.home.ctaPrimary}
            </Link>
            <Link href="/members" className="btn-ghost-light">
              {t.home.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-5">
          <div className="w-px h-12 bg-primary/50" />
          <span className="text-white/40 text-[8px] tracking-[0.28em] uppercase font-sans rotate-90 origin-center translate-y-6">
            {language === "FR" ? "Défiler" : "Scroll"}
          </span>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ──────────────────────────────────────────────── */}
      <div className="full-bleed bg-foreground py-4 overflow-hidden">
        <div className="flex items-center animate-scroll-x whitespace-nowrap gap-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8">
              <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground font-sans">
                {language === "FR" ? "Gastronomie" : "Gastronomy"}
              </span>
              <span className="text-primary text-xs">·</span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground font-sans">
                {language === "FR" ? "Cocktails" : "Cocktails"}
              </span>
              <span className="text-primary text-xs">·</span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground font-sans">
                {language === "FR" ? "Événements" : "Events"}
              </span>
              <span className="text-primary text-xs">·</span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground font-sans">
                {language === "FR" ? "Voyage & Séjours" : "Travel & Stays"}
              </span>
              <span className="text-primary text-xs">·</span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground font-sans">
                Montréal · Québec
              </span>
              <span className="text-primary text-xs">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED GRID ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-36">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="overline mb-4">{t.home.featuredOverline}</p>
            <h2
              className="font-display font-light text-foreground leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.home.featuredTitle}
            </h2>
          </div>
          <Link href="/restaurants" className="link-luxury hidden md:inline-block">
            {t.home.viewAll}
          </Link>
        </div>

        {/* 2-column editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {/* Hero card — tall, spanning full left column */}
          <Link
            href={featured[0].href}
            className="relative group block overflow-hidden aspect-[3/4] md:aspect-auto md:min-h-[680px] bg-background"
          >
            <img
              src={featured[0].image}
              alt={featured[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="overline text-primary mb-3">{featured[0].label}</p>
              <h3
                className="font-display font-light text-white text-4xl md:text-5xl leading-[1.05] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featured[0].title}
              </h3>
              <p className="text-white/55 text-sm font-sans">{featured[0].subtitle}</p>
            </div>
          </Link>

          {/* Right column — two stacked cards */}
          <div className="flex flex-col gap-px">
            {featured.slice(1, 3).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="relative group block overflow-hidden aspect-[4/3] bg-background flex-1"
                style={{ minHeight: "340px" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[9px] tracking-[0.24em] uppercase text-primary font-sans mb-2">
                    {item.label}
                  </p>
                  <h3
                    className="font-display font-light text-white text-2xl md:text-3xl leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom wide card */}
        <div className="mt-px">
          <Link
            href={featured[3].href}
            className="relative group block overflow-hidden bg-background"
            style={{ height: "280px" }}
          >
            <img
              src={featured[3].image}
              alt={featured[3].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/30 to-transparent" />
            <div className="absolute inset-0 flex items-end md:items-center p-8 md:p-12">
              <div>
                <p className="text-[9px] tracking-[0.24em] uppercase text-primary font-sans mb-3">
                  {featured[3].label}
                </p>
                <h3
                  className="font-display font-light text-white text-3xl md:text-4xl leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featured[3].title}
                </h3>
                <p className="text-white/50 text-sm mt-2 font-sans">{featured[3].subtitle}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="rule-accent" />
      </div>

      {/* ── THREE PILLARS ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-36">
        <div className="mb-20">
          <p className="overline mb-4">{language === "FR" ? "Notre Expertise" : "Our Expertise"}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col bg-background p-8 md:p-10 lg:p-12">
              <span className="pillar-number mb-4">{p.number}</span>
              <p className="overline mb-4">{p.overline}</p>
              <div className="w-8 h-px bg-primary mb-6" />
              <h3
                className="font-display font-light text-foreground text-3xl md:text-4xl leading-[1.1] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed flex-1 mb-10">
                {p.body}
              </p>
              <Link href={p.href} className="link-luxury inline-block">
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEMBERS INTERLUDE ──────────────────────────────────────────────── */}
      <section className="full-bleed relative overflow-hidden bg-foreground">
        {/* Faint gold accent — top left corner */}
        <div
          className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 0% 0%, rgba(196,153,90,0.08) 0%, transparent 65%)"
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 md:py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
          {/* Text */}
          <div>
            <p className="text-[9px] tracking-[0.26em] uppercase text-primary font-sans mb-8">
              {t.home.membershipOverline}
            </p>

            <h2
              className="font-display font-light text-white leading-[1.08] mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.home.membershipTitle}
              <br />
              <em className="italic text-primary">{t.home.membershipHighlight}</em>
            </h2>

            {/* Gold rule */}
            <div className="w-12 h-px bg-primary mb-10" />

            <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-md">
              {t.home.membershipDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/members" className="btn-luxury">
                {t.home.membershipCta}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative img-zoom">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1000&q=90&auto=format&fit=crop"
                alt={language === "FR" ? "Expérience exclusive Vrai Québec" : "Exclusive Vrai Quebec experience"}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gold frame inset */}
            <div className="absolute inset-5 border border-primary/25 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STORIES ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-36">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="overline mb-4">{t.home.editorialOverline}</p>
            <h2
              className="font-display font-light text-foreground leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.home.editorialTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {editorials.map((story, i) => (
            <Link
              key={story.title}
              href={story.href}
              className="group block bg-background hover:bg-surface transition-colors duration-400"
            >
              <div className="aspect-[4/3] overflow-hidden img-zoom">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 md:p-9">
                <p className="overline mb-4">{story.label}</p>
                <div className="w-6 h-px bg-primary mb-5" />
                <h3
                  className="font-display font-light text-foreground text-2xl md:text-3xl leading-[1.15] mb-5 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {story.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-7">
                  {story.excerpt}
                </p>
                <span className="link-luxury inline-block">{t.home.editorialRead}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────────────────────── */}
      <section className="full-bleed border-t border-border py-24 md:py-32">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="overline mb-6">{t.home.newsletterOverline}</p>
          <div className="w-px h-10 bg-primary mx-auto mb-6" />
          <h2
            className="font-display font-light text-foreground text-4xl md:text-5xl leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.home.newsletterTitle}
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-10">
            {t.home.newsletterDescription}
          </p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
