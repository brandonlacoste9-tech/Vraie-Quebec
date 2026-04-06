"use client"

import Link from "next/link"
import { FooterNewsletterForm } from "@/components/footer-newsletter-form"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-0 bg-surface border-t border-border">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-14">

          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-1.5 mb-5" aria-label={t.common.ariaHome}>
              <span className="font-display text-2xl font-light tracking-[0.06em] text-foreground" style={{ fontFamily: "var(--font-display)" }}>VRAI</span>
              <span className="font-display text-2xl font-light italic tracking-[0.02em] text-primary" style={{ fontFamily: "var(--font-display)" }}>Québec</span>
            </Link>
            <p className="text-muted-foreground text-[13px] leading-relaxed font-sans max-w-[260px]">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-5">{t.footer.discover}</h4>
            <ul className="space-y-3">
              {[
                { label: t.footer.restaurants, href: "/restaurants" },
                { label: t.footer.bars, href: "/bars" },
                { label: t.footer.agenda, href: "/agenda" },
                { label: t.footer.sports, href: "/sports" },
                { label: t.footer.travel, href: "/voyage" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-sans">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-5">{t.footer.house}</h4>
            <ul className="space-y-3">
              {[
                { label: t.footer.membership, href: "/members" },
                { label: t.footer.advertise, href: "/advertise" },
                { label: t.footer.contact, href: "/contact" },
                { label: t.footer.terms, href: "/legal/terms" },
                { label: t.footer.privacy, href: "/legal/privacy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-sans">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-5">{t.footer.newsletter}</h4>
            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        <div className="h-px bg-border mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground tracking-[0.1em] uppercase font-sans">
            {t.footer.copyright}
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
