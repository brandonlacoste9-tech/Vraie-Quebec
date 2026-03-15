"use client"

import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground min-h-[90vh] flex flex-col justify-end">
      {/* Full-bleed image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pattern-v4.png"
          alt="Vrai Québec"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
      </div>

      {/* Candlelight glow accent — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,163,94,0.08) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-20 md:pb-28 pt-40">
        {/* Eyebrow */}
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans mb-6">
          Art de vivre · Montréal · Québec
        </p>

        {/* Headline */}
        <h1
          className="font-display font-light text-background leading-[1.05] mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Le meilleur
          <br />
          <em className="text-primary not-italic">du Québec</em>
        </h1>

        {/* Sub */}
        <p className="text-background/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-light">
          Restaurants d'exception, bars de caractère, événements exclusifs. La sélection définitive pour vivre Montréal et Québec à leur meilleur.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/restaurants"
            className="inline-flex items-center justify-center px-8 h-12 bg-primary text-primary-foreground text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-[var(--primary-dark)] transition-colors"
          >
            Explorer les adresses
          </Link>
          <Link
            href="/members"
            className="inline-flex items-center justify-center px-8 h-12 border border-background/40 text-background text-[11px] tracking-[0.2em] uppercase font-sans hover:border-primary hover:text-primary transition-colors"
          >
            Accès Membre
          </Link>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="relative z-10 border-t border-background/10 bg-foreground/40 backdrop-blur-sm overflow-hidden">
        <div className="flex gap-0 whitespace-nowrap">
          <div className="flex min-w-full animate-[scrollX_30s_linear_infinite]">
            {["Gastronomie", "Cocktails", "Événements privés", "Hôtels de luxe", "Art & Culture", "Sports", "Voyage", "Vins naturels", "Terrasse", "Jazz"].map((item, i) => (
              <span key={i} className="px-8 py-3 text-[10px] tracking-[0.25em] uppercase text-background/50 border-r border-background/10 font-sans">
                {item}
              </span>
            ))}
          </div>
          <div className="flex min-w-full animate-[scrollX_30s_linear_infinite]" aria-hidden>
            {["Gastronomie", "Cocktails", "Événements privés", "Hôtels de luxe", "Art & Culture", "Sports", "Voyage", "Vins naturels", "Terrasse", "Jazz"].map((item, i) => (
              <span key={i} className="px-8 py-3 text-[10px] tracking-[0.25em] uppercase text-background/50 border-r border-background/10 font-sans">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
