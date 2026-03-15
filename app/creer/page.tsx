"use client"

import { MainNav } from "@/components/main-nav"
import { QuebecMemoryGame } from "@/components/quebec-memory-game"

export default function CreerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MainNav />

      <div className="relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1
            className="text-4xl md:text-6xl font-display font-light text-center text-foreground mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Jeu Mémoire
          </h1>
          <p className="text-center text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-6">
            Teste ta mémoire avec les symboles du Québec! Retrouve toutes les paires le plus rapidement possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <QuebecMemoryGame />
      </div>
    </main>
  )
}
