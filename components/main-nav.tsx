"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // import useRouter
import { Menu, X, Search, User, Globe, Sparkles, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/components/language-provider"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter() // use router
  const [searchQuery, setSearchQuery] = useState("") // search state

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rotate-3 flex items-center justify-center font-heading font-bold text-white shadow-[0_0_15px_rgba(var(--primary),0.5)]">
            V
          </div>
          <span className="text-xl font-heading font-bold tracking-tighter text-white">
            VRAI<span className="text-primary text-glow">QUÉBEC</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.todo}
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.eat}
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.drink}
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.club}
          </Link>
          <Link
            href="/creer"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors uppercase font-heading flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.nav.create}
          </Link>
          <Link
            href="/chat"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            AI Assistant
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.sports}
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.shows}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder={t.nav.search}
                className="h-9 w-full bg-secondary/50 pl-9 text-sm text-white border-none focus-visible:ring-1 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-2 mx-1">
            <ThemeToggle />
            <div className="flex items-center gap-1 border-l border-border/50 pl-3">
              <Globe className="h-4 w-4 text-muted-foreground mr-1" />
              <button
                onClick={() => setLanguage("FR")}
                className={`text-xs font-heading font-bold transition-colors ${
                  language === "FR" ? "text-primary" : "text-muted-foreground hover:text-white"
                }`}
              >
                FR
              </button>
              <span className="text-muted-foreground/30 text-[10px]">|</span>
              <button
                onClick={() => setLanguage("EN")}
                className={`text-xs font-heading font-bold transition-colors ${
                  language === "EN" ? "text-primary" : "text-muted-foreground hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <Button
            size="sm"
            className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-heading uppercase tracking-wider border-none shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            asChild // Use asChild to wrap Link
          >
            <Link href="/login">
              <User className="mr-2 h-4 w-4" />
              {t.nav.login}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-black">
          <div className="space-y-1 p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <button
                  onClick={() => setLanguage("FR")}
                  className={`text-sm font-heading font-bold ${language === "FR" ? "text-primary" : "text-muted-foreground"}`}
                >
                  FR
                </button>
                <span className="text-muted-foreground/50">|</span>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`text-sm font-heading font-bold ${language === "EN" ? "text-primary" : "text-muted-foreground"}`}
                >
                  EN
                </button>
              </div>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <form onSubmit={handleSearch}>
                <Input
                  type="search"
                  placeholder="Chercher..."
                  className="h-10 w-full bg-secondary/50 pl-9 text-sm text-white border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
            <Link
              href="#"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.todo}
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.eat}
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.drink}
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.club}
            </Link>
            <Link
              href="/creer"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-primary hover:bg-primary/10 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles className="w-5 h-5" />
              {t.nav.create}
            </Link>
            <Link
              href="/chat"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare className="w-5 h-5" />
              AI Assistant
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.sports}
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.shows}
            </Link>
            <div className="pt-4 mt-4 border-t border-border">
              <Button className="w-full bg-primary font-heading uppercase" asChild>
                <Link href="/login">{t.nav.login}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
