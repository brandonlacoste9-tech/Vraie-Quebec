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
            <Link href="/" className="flex items-center gap-2 mb-6">
              {/* Replaced the footer logo with the same orange-reddish tilted Fleur-de-lis */}
              <div className="h-10 w-10 flex items-center justify-center rotate-12">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full text-[#FF4500] drop-shadow-[0_0_8px_rgba(255,69,0,0.5)]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C12 2 8 6 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 6 12 2 12 2ZM12 16C9 16 7 18 7 22H17C17 18 15 16 12 16ZM4 12C4 12 5 13 7 13C7 10 9 9 9 9C6 7 4 12 4 12ZM20 12C20 12 19 13 17 13C17 10 15 9 15 9C18 7 20 12 20 12Z" />
                </svg>
              </div>
              <span className="text-3xl font-heading font-bold tracking-tighter text-white">
                VRAI<span className="text-primary">QUÉBEC</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md mb-8 font-light">
              Le guide urbain non-censuré pour ceux qui veulent vivre le vrai Montréal. Pas de tourist traps, juste les
              vrais spots.
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
            <h4 className="font-heading font-bold text-white uppercase text-lg mb-6">Explorer</h4>
            <ul className="space-y-4">
              {[
                { label: "Restos", href: "/restaurants" },
                { label: "Bars", href: "/bars" },
                { label: "Clubs", href: "/bars" },
                { label: "Événements", href: "/agenda" },
                { label: "Sports", href: "/sports" },
                { label: "Top 10", href: "/search?q=trending" },
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
            <h4 className="font-heading font-bold text-white uppercase text-lg mb-6">Infolettre</h4>
            <p className="text-sm text-gray-400 mb-4">Reçois les deals avant tout le monde.</p>
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
