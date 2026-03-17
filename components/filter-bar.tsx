'use client'

import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export interface FilterOption {
  id: string
  label: string
}

interface FilterBarProps {
  onFilterChange?: (selectedFilters: string[]) => void
  options?: FilterOption[]
}

export function FilterBar({ onFilterChange, options = [] }: FilterBarProps) {
  const { t } = useLanguage()
  
  const defaultOptions: FilterOption[] = [
    { id: 'price-low', label: t.filters.budget },
    { id: 'price-mid', label: t.filters.moderate },
    { id: 'price-high', label: t.filters.premium },
    { id: 'rating-high', label: t.filters.topRated },
    { id: 'trending', label: t.filters.trending },
    { id: 'vip', label: t.filters.vipAccess },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const filterOptions = options.length > 0 ? options : defaultOptions

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((f) => f !== id) : [...selected, id]
    setSelected(next)
    onFilterChange?.(next)
  }

  const clear = () => {
    setSelected([])
    onFilterChange?.([])
  }

  return (
    <div className="sticky top-[105px] z-40 bg-background border-b border-border py-3">
      <div className="flex items-center gap-6 px-0">
        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-sans text-muted-foreground hover:text-primary transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {t.filters.filter}
        </button>

        {/* Desktop filters */}
        <div className="hidden md:flex flex-wrap gap-2 items-center flex-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-sans border transition-colors duration-200 ${
                selected.includes(opt.id)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Clear */}
        {selected.length > 0 && (
          <button
            onClick={clear}
            className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground hover:text-primary transition-colors ml-auto"
          >
            <X className="w-3 h-3" />
            {t.filters.clear}
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden pt-4 mt-2 border-t border-border flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-sans border transition-colors ${
                selected.includes(opt.id)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
