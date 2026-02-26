"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, RotateCcw, Timer } from "lucide-react"

// Quebec-themed cards
const QUEBEC_ICONS = [
  { id: 1, icon: "🍁", name: "Érable" },
  { id: 2, icon: "🏒", name: "Hockey" },
  { id: 3, icon: "🥞", name: "Poutine" },
  { id: 4, icon: "⚜️", name: "Fleur-de-lis" },
  { id: 5, icon: "🎿", name: "Ski" },
  { id: 6, icon: "🍺", name: "Microbrasserie" },
  { id: 7, icon: "🎭", name: "Cirque" },
  { id: 8, icon: "⛪", name: "Basilique" },
]

interface GameCard {
  id: number
  icon: string
  name: string
  isFlipped: boolean
  isMatched: boolean
}

export function QuebecMemoryGame() {
  const [cards, setCards] = useState<GameCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)

  // Initialize game
  const initializeGame = useCallback(() => {
    const duplicatedCards = [...QUEBEC_ICONS, ...QUEBEC_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(duplicatedCards)
    setFlippedCards([])
    setMoves(0)
    setTime(0)
    setIsGameActive(true)
    setIsGameWon(false)
  }, [])

  // Start game on mount
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameActive && !isGameWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameActive, isGameWon])

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find((c) => c.id === first)
      const secondCard = cards.find((c) => c.id === second)

      if (firstCard?.name === secondCard?.name) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          )
          setFlippedCards([])
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameWon(true)
      setIsGameActive(false)
    }
  }, [cards])

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length >= 2 ||
      flippedCards.includes(id) ||
      cards.find((c) => c.id === id)?.isMatched ||
      cards.find((c) => c.id === id)?.isFlipped
    ) {
      return
    }

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    )
    setFlippedCards((prev) => [...prev, id])
    
    if (flippedCards.length === 0) {
      setMoves((prev) => prev + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gold-400">
            <Trophy className="w-5 h-5" />
            <span className="font-heading font-bold">{moves} coups</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Timer className="w-5 h-5" />
            <span className="font-heading font-bold">{formatTime(time)}</span>
          </div>
        </div>
        
        <Button
          onClick={initializeGame}
          variant="outline"
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Nouvelle partie
        </Button>
      </div>

      {/* Win Message */}
      {isGameWon && (
        <div className="mb-8 p-6 bg-gradient-to-r from-gold-500/20 to-primary/20 border border-gold-500/50 rounded-lg text-center">
          <h3 className="text-2xl font-heading font-bold text-gold-400 mb-2">
            🎉 Félicitations! 🎉
          </h3>
          <p className="text-gray-300">
            Tu as terminé en {moves} coups et {formatTime(time)}!
          </p>
        </div>
      )}

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              relative aspect-square cursor-pointer transition-all duration-300 transform
              ${card.isFlipped || card.isMatched ? "rotate-0" : "hover:scale-105"}
              ${card.isMatched ? "ring-2 ring-gold-500/50" : ""}
            `}
          >
            <div
              className={`
                absolute inset-0 flex items-center justify-center text-4xl md:text-5xl
                transition-opacity duration-300
                ${card.isFlipped || card.isMatched ? "opacity-100" : "opacity-0"}
              `}
            >
              {card.icon}
            </div>
            
            {/* Card Back */}
            <div
              className={`
                absolute inset-0 flex items-center justify-center
                bg-gradient-to-br from-primary/20 to-accent/20
                border-2 border-primary/30
                transition-opacity duration-300
                ${card.isFlipped || card.isMatched ? "opacity-0" : "opacity-100"}
              `}
            >
              <span className="text-2xl font-heading font-bold text-primary/50">VQ</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <p className="text-center text-gray-400 text-sm mt-8">
        Retourne les cartes pour trouver les paires d'icônes québécoises!
      </p>
    </div>
  )
}
