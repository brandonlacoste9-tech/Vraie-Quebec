"use client"

import Link from "next/link"
import { FooterNewsletterForm } from "@/components/footer-newsletter-form"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Champagne gold top rule */}
      <div className="h-px bg-primary" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-12">

        {/* Top section — brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">

          {/* Brand — wider column */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-baseline gap-2 mb-8 group"
              aria-label="Home"
            >
              <span
                className="font-display text-2xl font-light tracking-[0.08em] text-primary-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                VRAI
              </span>
              <span className="text-primary-foreground/30 text-sm font-light mb-0.5">·</span>
              <span
                className="font-display text-2xl font-light italic tracking-[0.03em] text-primary"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Québec
              </span>
            </Link>

            <p className="text-muted-foreground text-[13px] leading-relaxed font-sans max-w-xs mb-8">
              {t.footer.tagline}
            </p>

            {/* Email */}
            <a
              href="mailto:hello@vraiquebec.com"
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-sans"
            >
              hello@vraiquebec.com
            </a>
          </div>

          {/* Spacer on desktop */}
          <div className="hidden md:block md:col-span-1" />

          {/* Discover */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] tracking-[0.26em] uppercase text-primary font-sans mb-6">
              {t.footer.discover}
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: t.footer.restaurants, href: '/restaurants' },
                { label: t.footer.bars,        href: '/bars' },
                { label: t.footer.agenda,      href: '/agenda' },
                { label: t.footer.sports,      href: '/sports' },
                { label: t.footer.travel,      href: '/voyage' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[12px] text-muted-foreground hover:text-primary-foreground transition-colors duration-300 font-sans tracking-wide"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* House */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] tracking-[0.26em] uppercase text-primary font-sans mb-6">
              {t.footer.house}
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: t.footer.membership, href: '/members' },
                { label: t.footer.advertise,  href: '/advertise' },
                { label: t.footer.contact,    href: '/contact' },
                { label: t.footer.terms,      href: '/legal/terms' },
                { label: t.footer.privacy,    href: '/legal/privacy' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[12px] text-muted-foreground hover:text-primary-foreground transition-colors duration-300 font-sans tracking-wide"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-[9px] tracking-[0.26em] uppercase text-primary font-sans mb-6">
              {t.footer.newsletter}
            </h4>
            <p className="text-[12px] text-muted-foreground mb-5 leading-relaxed font-sans">
              {t.footer.newsletterDesc}
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-border mb-10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[10px] text-muted-foreground tracking-[0.16em] uppercase font-sans">
            {t.footer.copyright}
          </p>
          <p className="text-[10px] text-muted-foreground tracking-[0.1em] uppercase font-sans">
            {language === 'FR'
              ? 'Guide éditorial indépendant · Montréal, Québec'
              : 'Independent editorial guide · Montreal, Quebec'}
          </p>
        </div>
      </div>
    </footer>
  )
}
