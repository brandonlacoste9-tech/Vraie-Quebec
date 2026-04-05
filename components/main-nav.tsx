'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NightToggle } from '@/components/night-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/components/language-provider'

export function MainNav() {
  const { t, language } = useLanguage()

  const navLinks = [
    { label: t.nav.eat,    href: '/restaurants' },
    { label: t.nav.drink,  href: '/bars' },
    { label: t.nav.todo,   href: '/agenda' },
    { label: t.nav.sports, href: '/sports' },
    { label: language === 'FR' ? 'Voyage'     : 'Travel',    href: '/voyage' },
    { label: language === 'FR' ? 'Publicité'  : 'Advertise', href: '/advertise' },
  ]

  const [isOpen, setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-background/98 backdrop-blur-md border-b border-border shadow-[0_1px_0_var(--border)]'
          : 'bg-background border-b border-border'
      }`}
    >
      {/* ── Top micro-bar ─────────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center justify-between px-8 py-2.5 border-b border-border">
        <p className="text-[9px] tracking-[0.26em] uppercase text-muted-foreground font-sans">
          {language === 'FR'
            ? 'Guide éditorial · Art de vivre · Montréal · Québec'
            : 'Editorial Guide · Art of Living · Montreal · Quebec'}
        </p>
        <Link
          href="/members"
          className="text-[9px] tracking-[0.26em] uppercase text-primary font-sans hover:text-primary-dark transition-colors duration-300"
        >
          {language === 'FR' ? 'Accès Membre' : 'Member Access'}
        </Link>
      </div>

      {/* ── Main bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 md:px-8 h-[4.5rem] md:h-20">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-2"
          aria-label="Vrai Québec — Accueil"
        >
          <span
            className="font-display text-[1.6rem] font-light tracking-[0.08em] text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            VRAI
          </span>
          <span className="text-border text-sm font-light mb-0.5">·</span>
          <span
            className="font-display text-[1.6rem] font-light italic tracking-[0.03em] text-primary"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Québec
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-9"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link-luxury">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          <NightToggle />
          <div className="w-px h-4 bg-border mx-1" />
          <Link href="/members" className="btn-luxury text-[10px] py-3 px-5">
            {language === 'FR' ? 'Réserver' : 'Reserve'}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <NightToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground ml-1"
            aria-label={isOpen
              ? (language === 'FR' ? 'Fermer le menu' : 'Close menu')
              : (language === 'FR' ? 'Ouvrir le menu' : 'Open menu')}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav
            className="flex flex-col px-6 py-8 gap-0"
            aria-label="Navigation mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-4 border-b border-border text-[10px] tracking-[0.22em] uppercase font-sans text-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/members"
              onClick={() => setIsOpen(false)}
              className="mt-8 btn-luxury text-center"
            >
              {language === 'FR' ? 'Accès Membre' : 'Member Access'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
