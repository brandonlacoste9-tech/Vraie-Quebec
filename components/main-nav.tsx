'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { label: 'Restaurants', href: '/restaurants' },
    { label: 'Bars', href: '/bars' },
    { label: 'Agenda', href: '/agenda' },
    { label: 'Sports', href: '/sports' },
    { label: 'Voyage', href: '/voyage' },
    { label: 'Publicité', href: '/advertise' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-2 font-display">
          <span className="text-2xl font-bold text-primary">VRAI</span>
          <span className="text-2xl italic text-foreground">Québec</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:bg-secondary rounded"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
