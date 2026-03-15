"use client"

import Link from "next/link"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">VRAI</span>
              <span className="text-2xl font-display italic">Québec</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Le guide éditorial de référence pour découvrir l'essence authentique du Québec.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-bold text-foreground mb-6">Découvrir</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/restaurants" className="text-muted-foreground hover:text-primary transition-colors">Restaurants</Link></li>
              <li><Link href="/bars" className="text-muted-foreground hover:text-primary transition-colors">Bars</Link></li>
              <li><Link href="/agenda" className="text-muted-foreground hover:text-primary transition-colors">Agenda</Link></li>
              <li><Link href="/sports" className="text-muted-foreground hover:text-primary transition-colors">Sports</Link></li>
              <li><Link href="/voyage" className="text-muted-foreground hover:text-primary transition-colors">Voyage</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="font-display font-bold text-foreground mb-6">Affaires</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/members" className="text-muted-foreground hover:text-primary transition-colors">Adhésion</Link></li>
              <li><Link href="/advertise" className="text-muted-foreground hover:text-primary transition-colors">Publicité</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors">Conditions</Link></li>
              <li><Link href="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-xs text-muted-foreground">© 2025 Vrai Québec. Tous droits réservés.</p>
            <a href="mailto:hello@vraiquebec.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              hello@vraiquebec.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
