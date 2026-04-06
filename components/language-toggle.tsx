"use client"

import { useLanguage } from "@/components/language-provider"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type LanguageToggleProps = {
  /** Light controls on dark hero photography */
  onDarkOverlay?: boolean
  /** Compact icon+code style (legacy); default is explicit FR | EN control */
  variant?: "segmented" | "compact"
}

export function LanguageToggle({ onDarkOverlay, variant = "segmented" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={() => setLanguage(language === "FR" ? "EN" : "FR")}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          onDarkOverlay
            ? "text-white/75 hover:bg-white/10 hover:text-white"
            : "text-foreground hover:bg-surface",
        )}
        aria-label="Toggle language / Changer la langue"
        title={language === "FR" ? "Switch to English" : "Passer au français"}
      >
        <Globe className="w-4 h-4 shrink-0" aria-hidden />
        <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium">{language}</span>
      </button>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[var(--radius)] p-0.5 border",
        onDarkOverlay
          ? "border-white/25 bg-white/10"
          : "border-border bg-surface",
      )}
      role="group"
      aria-label="Language / Langue"
    >
      <button
        type="button"
        onClick={() => setLanguage("FR")}
        className={cn(
          "px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-sans font-medium transition-colors rounded-sm",
          language === "FR"
            ? "bg-primary text-primary-foreground"
            : onDarkOverlay
              ? "text-white/80 hover:text-white hover:bg-white/10"
              : "text-muted-foreground hover:text-foreground hover:bg-background",
        )}
        aria-pressed={language === "FR"}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLanguage("EN")}
        className={cn(
          "px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-sans font-medium transition-colors rounded-sm",
          language === "EN"
            ? "bg-primary text-primary-foreground"
            : onDarkOverlay
              ? "text-white/80 hover:text-white hover:bg-white/10"
              : "text-muted-foreground hover:text-foreground hover:bg-background",
        )}
        aria-pressed={language === "EN"}
      >
        EN
      </button>
    </div>
  )
}
