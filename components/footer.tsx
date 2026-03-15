import Link from "next/link"
import { FooterNewsletterForm } from "@/components/footer-newsletter-form"

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-24">
      {/* Gold rule top */}
      <div className="h-px bg-primary" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-1.5 mb-6 group" aria-label="Accueil">
              <span className="font-display text-2xl font-light tracking-[0.06em] text-primary-foreground" style={{ fontFamily: 'var(--font-display)' }}>VRAI</span>
              <span className="font-display text-2xl font-light italic tracking-[0.02em] text-primary" style={{ fontFamily: 'var(--font-display)' }}>Québec</span>
            </Link>
            <p className="text-muted-foreground text-[13px] leading-relaxed font-sans">
              Le guide de référence pour les adresses d'exception à Montréal et au Québec.
            </p>
          </div>

          {/* Découvrir */}
          <div>
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-5">Découvrir</h4>
            <ul className="space-y-3">
              {[
                { label: 'Restaurants', href: '/restaurants' },
                { label: 'Bars', href: '/bars' },
                { label: 'Agenda', href: '/agenda' },
                { label: 'Sports', href: '/sports' },
                { label: 'Voyage', href: '/voyage' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-muted-foreground hover:text-primary-foreground transition-colors font-sans">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maison */}
          <div>
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-5">Maison</h4>
            <ul className="space-y-3">
              {[
                { label: 'Adhésion', href: '/members' },
                { label: 'Publicité', href: '/advertise' },
                { label: 'Contact', href: '/contact' },
                { label: 'Conditions', href: '/legal/terms' },
                { label: 'Confidentialité', href: '/legal/privacy' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-muted-foreground hover:text-primary-foreground transition-colors font-sans">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-5">La Lettre</h4>
            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
              Recevez nos sélections exclusives chaque semaine.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground tracking-[0.1em] uppercase font-sans">
            © 2025 Vrai Québec. Tous droits réservés.
          </p>
          <a
            href="mailto:hello@vraiquebec.com"
            className="text-[11px] text-muted-foreground tracking-[0.1em] uppercase font-sans hover:text-primary transition-colors"
          >
            hello@vraiquebec.com
          </a>
        </div>
      </div>
    </footer>
  )
}
