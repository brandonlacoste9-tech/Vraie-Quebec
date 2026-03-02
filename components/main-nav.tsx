"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation" // import useRouter
import { Menu, X, Search, User, Globe, Sparkles, MessageSquare, Settings2, Train } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // imports
import { useRGB } from "@/components/rgb-provider" // import hook

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter() // use router
  const [searchQuery, setSearchQuery] = useState("") // search state
  const { mode, setMode, textMode, setTextMode } = useRGB() // destructured textMode controls

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
        <Link href="/" className="flex items-center gap-3 group">
          {/* Enhanced Logo Icon - Elegant Fleur-de-lis Crown */}
          <div className="relative h-10 w-10 flex items-center justify-center">
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-500/20 to-amber-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-full h-full relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer ring */}
              <circle cx="16" cy="16" r="15" stroke="url(#goldGradient)" strokeWidth="1" fill="none" className="opacity-60" />

              {/* Crown/Fleur-de-lis hybrid */}
              <path
                d="M16 4C16 4 11 9 11 14C11 16.5 13 19 16 19C19 19 21 16.5 21 14C21 9 16 4 16 4Z"
                fill="url(#goldGradient)"
                className="drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]"
              />
              <path
                d="M16 21C12 21 9 24 9 28H23C23 24 20 21 16 21Z"
                fill="url(#goldGradient)"
                className="drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]"
              />
              {/* Side petals */}
              <path
                d="M8 14C8 14 9 15 11 15C11 12 13 11 13 11C10 9 8 14 8 14Z"
                fill="url(#goldGradient)"
                opacity="0.9"
              />
              <path
                d="M24 14C24 14 23 15 21 15C21 12 19 11 19 11C22 9 24 14 24 14Z"
                fill="url(#goldGradient)"
                opacity="0.9"
              />

              {/* Gold gradient definition */}
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="25%" stopColor="#FFA500" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="75%" stopColor="#DAA520" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Elegant Serif Logo Text */}
          <div className="flex flex-col leading-none pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-logo tracking-[0.15em] text-white/90">
                VRAI
              </span>
              <span className="text-2xl font-logo italic tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                QUÉBEC
              </span>
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/agenda"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.todo}
          </Link>
          <Link
            href="/restaurants"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.eat}
          </Link>
          <Link
            href="/bars"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.drink}
          </Link>
          <Link
            href="/bars"
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
            href="/voyage"
            className="text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors uppercase font-heading flex items-center gap-1"
          >
            <Train className="w-3.5 h-3.5" />
            Voyage
          </Link>
          <Link
            href="/sports"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
          >
            {t.nav.sports}
          </Link>
          <Link
            href="/agenda"
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
                aria-label={t.nav.search}
                className="h-9 w-full bg-secondary/50 pl-9 text-sm text-white border-none focus-visible:ring-1 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-2 mx-1">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                  <Settings2 className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">RGB Controls</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>RGB Effect (Border)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setMode("rainbow")} className="flex justify-between">
                  Rainbow Spin {mode === "rainbow" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMode("cycle")} className="flex justify-between">
                  Color Cycle {mode === "cycle" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMode("breathing")} className="flex justify-between">
                  Breathing {mode === "breathing" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setMode("off")} className="text-red-500">
                  Border Off
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Text Effect (Headings)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTextMode("normal")} className="flex justify-between">
                  Normal {textMode === "normal" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextMode("rainbow")} className="flex justify-between">
                  Rainbow Gradient {textMode === "rainbow" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextMode("cycle")} className="flex justify-between">
                  Color Cycle {textMode === "cycle" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-1 border-l border-border/50 pl-3">
              <Globe className="h-4 w-4 text-muted-foreground mr-1" />
              <button
                onClick={() => setLanguage("FR")}
                aria-label="Switch to French"
                className={`text-xs font-heading font-bold transition-colors ${language === "FR" ? "text-primary" : "text-muted-foreground hover:text-white"
                  }`}
              >
                FR
              </button>
              <span className="text-muted-foreground/30 text-[10px]">|</span>
              <button
                onClick={() => setLanguage("EN")}
                aria-label="Switch to English"
                className={`text-xs font-heading font-bold transition-colors ${language === "EN" ? "text-primary" : "text-muted-foreground hover:text-white"
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                      <Settings2 className="h-[1.2rem] w-[1.2rem]" />
                      <span className="sr-only">RGB Controls</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>RGB Effect (Border)</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setMode("rainbow")} className="flex justify-between">
                      Rainbow Spin {mode === "rainbow" && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMode("cycle")} className="flex justify-between">
                      Color Cycle {mode === "cycle" && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMode("breathing")} className="flex justify-between">
                      Breathing {mode === "breathing" && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setMode("off")} className="text-red-500">
                      Border Off
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Text Effect (Headings)</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTextMode("normal")} className="flex justify-between">
                      Normal {textMode === "normal" && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTextMode("rainbow")} className="flex justify-between">
                      Rainbow Gradient {textMode === "rainbow" && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTextMode("cycle")} className="flex justify-between">
                      Color Cycle {textMode === "cycle" && "✓"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <button
                  onClick={() => setLanguage("FR")}
                  aria-label="Switch to French"
                  className={`text-sm font-heading font-bold ${language === "FR" ? "text-primary" : "text-muted-foreground"}`}
                >
                  FR
                </button>
                <span className="text-muted-foreground/50">|</span>
                <button
                  onClick={() => setLanguage("EN")}
                  aria-label="Switch to English"
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
              href="/agenda"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.todo}
            </Link>
            <Link
              href="/restaurants"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.eat}
            </Link>
            <Link
              href="/bars"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.drink}
            </Link>
            <Link
              href="/bars"
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
              href="/voyage"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-gold-500 hover:bg-gold-500/10 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Train className="w-5 h-5" />
              Voyage
            </Link>
            <Link
              href="/sports"
              className="block rounded-md px-3 py-3 text-lg font-heading uppercase text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.sports}
            </Link>
            <Link
              href="/agenda"
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
