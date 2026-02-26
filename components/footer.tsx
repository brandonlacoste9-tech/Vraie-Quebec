"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter-signup"

export function Footer() {
  return (
    <footer className="border-t border-border bg-black pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              {/* Enhanced Logo Icon - Elegant Fleur-de-lis Crown */}
              <div className="relative h-12 w-12 flex items-center justify-center">
                {/* Glow backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-500/20 to-amber-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-full h-full relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer ring */}
                  <circle cx="16" cy="16" r="15" stroke="url(#goldGradientFooter)" strokeWidth="1" fill="none" className="opacity-60" />
                  
                  {/* Crown/Fleur-de-lis hybrid */}
                  <path 
                    d="M16 4C16 4 11 9 11 14C11 16.5 13 19 16 19C19 19 21 16.5 21 14C21 9 16 4 16 4Z" 
                    fill="url(#goldGradientFooter)"
                    className="drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]"
                  />
                  <path 
                    d="M16 21C12 21 9 24 9 28H23C23 24 20 21 16 21Z" 
                    fill="url(#goldGradientFooter)"
                    className="drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]"
                  />
                  {/* Side petals */}
                  <path 
                    d="M8 14C8 14 9 15 11 15C11 12 13 11 13 11C10 9 8 14 8 14Z" 
                    fill="url(#goldGradientFooter)"
                    opacity="0.9"
                  />
                  <path 
                    d="M24 14C24 14 23 15 21 15C21 12 19 11 19 11C22 9 24 14 24 14Z" 
                    fill="url(#goldGradientFooter)"
                    opacity="0.9"
                  />
                  
                  {/* Gold gradient definition */}
                  <defs>
                    <linearGradient id="goldGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="25%" stopColor="#FFA500" />
                      <stop offset="50%" stopColor="#FFD700" />
                      <stop offset="75%" stopColor="#DAA520" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Enhanced Logo Text */}
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline">
                  <span className="text-3xl font-heading font-bold tracking-[0.15em] text-white uppercase">
                    Vrai
                  </span>
                  <span className="text-3xl font-heading font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                    Québec
                  </span>
                </div>
                {/* Decorative underline */}
                <div className="h-[2px] w-full mt-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
            <p className="text-gray-400 max-w-md mb-8 font-light">
              Le guide de référence pour découvrir l'essence authentique du Québec. Une sélection rigoureuse des 
              meilleures adresses à Montréal et Québec.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-none border-border text-white hover:bg-primary hover:border-primary hover:text-white transition-colors bg-transparent"
              >
                {/* Wrapped in Link to make it a valid anchor tag */}
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-none border-border text-white hover:bg-primary hover:border-primary hover:text-white transition-colors bg-transparent"
              >
                {/* Wrapped in Link to make it a valid anchor tag */}
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-none border-border text-white hover:bg-primary hover:border-primary hover:text-white transition-colors bg-transparent"
              >
                {/* Wrapped in Link to make it a valid anchor tag */}
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white uppercase text-lg mb-6">Découvrir</h4>
            <ul className="space-y-4">
              {[
                { label: "Restaurants", href: "/restaurants" },
                { label: "Bars", href: "/bars" },
                { label: "Nightlife", href: "/bars" },
                { label: "Agenda", href: "/agenda" },
                { label: "Sports", href: "/sports" },
                { label: "Sélection", href: "/search?q=trending" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors uppercase text-sm tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white uppercase text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Recevez nos recommandations exclusives en avant-première.</p>
            <NewsletterSignup compact />
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-wider">
          <div className="flex flex-col gap-2 md:items-start items-center">
            <p>© 2025 VRAI QUÉBEC. Tous droits réservés.</p>
            <p>
              Publicité :{" "}
              <a href="mailto:northern-ventures@outlook.com" className="hover:text-white transition-colors">
                northern-ventures@outlook.com
              </a>
            </p>
            <p className="mt-1 text-white/50 font-serif italic capitalize tracking-normal">Marie‑Elaine ❤️</p>
          </div>
          <div className="flex gap-8">
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              Termes
            </Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
