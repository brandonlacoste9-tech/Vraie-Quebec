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
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl transition-opacity duration-300 ${
            isHovered ? "opacity-75" : "opacity-0"
          }`}
        />

        <div className="relative flex items-center gap-3 bg-gradient-to-r from-primary to-accent px-6 py-4 rounded-full shadow-2xl transition-transform hover:scale-105">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
          <span className="font-bold text-white text-sm">{t.floatingButton.label.toUpperCase()}</span>
        </div>
      </div>

      <div
        className={`absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black/90 border border-primary/30 rounded text-xs text-white whitespace-nowrap transition-opacity shadow-sm ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {t.floatingButton.tooltip}
      </div>
    </Link>
  )
}
