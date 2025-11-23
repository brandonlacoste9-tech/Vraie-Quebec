"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-border bg-black pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 bg-primary rotate-3 flex items-center justify-center font-heading font-bold text-white text-xl">
                V
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
              {["Restos", "Bars", "Clubs", "Événements", "Sports", "Top 10"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors uppercase text-sm tracking-wide"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white uppercase text-lg mb-6">Infolettre</h4>
            <p className="text-sm text-gray-400 mb-4">Reçois les deals avant tout le monde.</p>
            {/* Wrapped input and button in a form for proper submission handling */}
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                placeholder="Ton email..."
                type="email"
                className="bg-secondary border-border text-white rounded-none focus-visible:ring-primary"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-none font-heading uppercase"
              >
                Go
              </Button>
            </form>
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
            <Link href="#" className="hover:text-white transition-colors">
              Termes
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
