'use client'

import { useLanguage } from '@/components/language-provider'
import { Globe } from 'lucide-react'

type LanguageToggleProps = {
  /** Light controls on dark hero photography */
  onDarkOverlay?: boolean
}

export function LanguageToggle({ onDarkOverlay }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        onDarkOverlay
          ? 'text-white/75 hover:bg-white/10 hover:text-white'
          : 'text-foreground hover:bg-surface'
      }`}
      aria-label="Toggle language / Changer la langue"
      title={language === 'FR' ? 'Switch to English' : 'Passer au français'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium">
        {language}
      </span>
    </button>
  )
}
