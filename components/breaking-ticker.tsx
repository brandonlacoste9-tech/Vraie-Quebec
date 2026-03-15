'use client'

import { useEffect, useState } from 'react'

interface BreakingTickerProps {
  items?: string[]
}

export function BreakingTicker({ items = [] }: BreakingTickerProps) {
  const defaultItems = [
    'Découvrez les meilleures tables de Montréal',
    'Événements à ne pas manquer cette semaine',
    'Guide complet des bars branchés du centre-ville',
  ]

  const tickerItems = items.length > 0 ? items : defaultItems

  return (
    <div className="border-y border-border bg-primary text-primary-foreground py-3 overflow-hidden">
      <div className="flex animate-scroll-x space-x-8">
        {/* Duplicate items for seamless loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 whitespace-nowrap text-sm md:text-base font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-primary-foreground flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
