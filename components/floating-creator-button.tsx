"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Sparkles } from "lucide-react"

export function FloatingCreatorButton() {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/creer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="relative flex items-center gap-3 bg-primary px-6 py-4 shadow-2xl transition-transform hover:scale-105">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary-foreground font-medium">
            {t.floatingButton?.label ?? "Créer"}
          </span>
        </div>
      </div>

      <div
        className={`absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-foreground border border-border text-[11px] text-background whitespace-nowrap transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {t.floatingButton?.tooltip ?? "Générer une image"}
      </div>
    </Link>
  )
}
