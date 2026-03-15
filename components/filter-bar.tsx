'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'

export interface FilterOption {
  id: string
  label: string
}

interface FilterBarProps {
  onFilterChange?: (selectedFilters: string[]) => void
  options?: FilterOption[]
}

export function FilterBar({ onFilterChange, options = [] }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const defaultOptions: FilterOption[] = [
    { id: 'price-low', label: 'Budget' },
    { id: 'price-mid', label: 'Modéré' },
    { id: 'price-high', label: 'Haut de gamme' },
    { id: 'rating-high', label: 'Très bien classé' },
    { id: 'trending', label: 'Tendance' },
    { id: 'vip', label: 'Accès VIP' },
  ]

  const filterOptions = options.length > 0 ? options : defaultOptions

  const handleToggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId]
    
    setSelectedFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleClearFilters = () => {
    setSelectedFilters([])
    onFilterChange?.([])
  }

  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtres
          </button>

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap gap-2 items-center flex-1">
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleToggleFilter(option.id)}
                className={`px-3 py-1 text-sm border transition-colors ${
                  selectedFilters.includes(option.id)
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Clear Button */}
          {selectedFilters.length > 0 && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="w-3 h-3" />
              Réinitialiser
            </button>
          )}
        </div>

        {/* Mobile Filters */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border space-y-2">
            {filterOptions.map(option => (
              <label
                key={option.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(option.id)}
                  onChange={() => handleToggleFilter(option.id)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
