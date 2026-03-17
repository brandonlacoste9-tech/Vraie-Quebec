'use client'

import { useLanguage } from '@/components/language-provider'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-foreground hover:bg-surface transition-colors"
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
