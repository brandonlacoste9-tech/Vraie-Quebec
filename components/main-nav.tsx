'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Restaurants', href: '/restaurants' },
  { label: 'Bars', href: '/bars' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Sports', href: '/sports' },
  { label: 'Voyage', href: '/voyage' },
  { label: 'Publicité', href: '/advertise' },
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-[#F4F1EC]/97 backdrop-blur-sm border-b border-[#D6D0C6] shadow-[0_1px_0_#D6D0C6]'
          : 'bg-[#F4F1EC] border-b border-[#D6D0C6]'
      }`}
    >
      {/* Top micro-bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-2 border-b border-[#D6D0C6]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#7D7468] font-sans">
          Art de vivre · Montréal · Québec
        </p>
        <Link
          href="/members"
          className="text-[10px] tracking-[0.2em] uppercase text-[#B08D57] font-sans hover:text-[#8C6D3F] transition-colors"
        >
          Accès Membre
        </Link>
      </div>

      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5" aria-label="Vrai Québec — Accueil">
          <span
            className="font-display text-2xl font-light tracking-[0.06em] text-[#1C1916]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            VRAI
          </span>
          <span
            className="font-display text-2xl font-light italic tracking-[0.02em] text-[#B08D57]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Québec
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link-luxury">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="/members" className="hidden md:inline-flex btn-luxury text-[11px]">
          Réserver
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#1C1916]"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-[#D6D0C6] bg-[#F4F1EC]">
          <nav className="flex flex-col px-6 py-6 gap-1" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 border-b border-[#E8E4DC] text-[11px] tracking-[0.2em] uppercase font-sans text-[#1C1916] hover:text-[#B08D57] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/members"
              onClick={() => setIsOpen(false)}
              className="mt-4 btn-luxury text-center"
            >
              Accès Membre
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
