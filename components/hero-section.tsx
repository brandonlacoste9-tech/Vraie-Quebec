"use client"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export function HeroSection() {
  const { t } = useLanguage()

  const content = t.hero

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32 min-h-[85vh] flex flex-col justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 select-none bg-black">
        <Image
          src="/images/pattern-v4.png"
          alt="Vrai Quebec Background Pattern"
          fill
          className="object-cover contrast-110 brightness-100"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
      </div>

      {/* Ambient field - Subtle colored glow on top of the image */}
      {/* Reduced opacity to prevent washing out the image colors */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay">
        <div
          className="absolute top-[-10%] left-[20%] w-[28rem] h-[28rem] rounded-full blur-[80px] transition-colors duration-1000"
          style={{ backgroundColor: `hsl(var(--primary-hue), 91%, 60%)` }}
        />
        <div
          className="absolute bottom-[-10%] right-[20%] w-[28rem] h-[28rem] rounded-full blur-[80px] transition-colors duration-1000"
          style={{ backgroundColor: `hsl(var(--accent-hue), 76%, 36%)` }}
        />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-md animate-in fade-in zoom-in duration-500">
            <span className="text-xs md:text-sm font-bold text-primary tracking-widest uppercase neon-text">
              {content.badge}
            </span>
          </div>

          {/* Hero Logo with Artistic Design */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/bienvenue-logo.jpg"
              alt="Bienvenue au Vrai Quebec Logo"
              width={600}
              height={300}
              className="w-full max-w-3xl h-auto drop-shadow-2xl"
              priority
            />
          </div>

          <p className="mb-8 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium text-balance drop-shadow-md">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#featured"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 rounded-md px-8 bg-primary text-primary-foreground text-lg font-bold hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
            >
              {content.cta_primary}
            </a>
            <a
              href="https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 rounded-md px-8 bg-background/40 backdrop-blur-md border border-primary/20 text-foreground text-lg font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
            >
              {content.cta_secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 md:mt-32 overflow-hidden border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <Marquee items={content.marquee} />
      </div>
    </section>
  )
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative py-4">
      <div
        className="absolute inset-0 opacity-20"
        style={{ boxShadow: `0 0 28px hsla(var(--primary-hue),91%,60%,0.25)` }}
      />
      <div className="flex gap-8 whitespace-nowrap overflow-hidden">
        <div className="flex gap-8 min-w-full animate-[scrollX_20s_linear_infinite]">
          {[...items, ...items, ...items].map((item, i) => (
            <span
              key={i}
              className="px-6 py-2 rounded-full text-sm md:text-base font-bold tracking-widest border border-white/10 bg-white/5 backdrop-blur-md"
              style={{
                color: `hsl(var(--primary-hue), 91%, 80%)`,
                borderColor: `hsla(var(--accent-hue), 76%, 36%, 0.35)`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-8 min-w-full animate-[scrollX_20s_linear_infinite]" aria-hidden="true">
          {[...items, ...items, ...items].map((item, i) => (
            <span
              key={i}
              className="px-6 py-2 rounded-full text-sm md:text-base font-bold tracking-widest border border-white/10 bg-white/5 backdrop-blur-md"
              style={{
                color: `hsl(var(--primary-hue), 91%, 80%)`,
                borderColor: `hsla(var(--accent-hue), 76%, 36%, 0.35)`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
