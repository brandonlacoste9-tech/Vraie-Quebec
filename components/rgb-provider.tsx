"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type RGBMode = "rainbow" | "cycle" | "breathing" | "off"
export type TextMode = "normal" | "rainbow" | "cycle"

interface RGBContextType {
  mode: RGBMode
  setMode: (mode: RGBMode) => void
  textMode: TextMode
  setTextMode: (mode: TextMode) => void
  speed: number
  setSpeed: (speed: number) => void
}

const RGBContext = createContext<RGBContextType | undefined>(undefined)

export function RGBProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<RGBMode>("rainbow")
  const [textMode, setTextMode] = useState<TextMode>("normal")
  const [speed, setSpeed] = useState(4)

  useEffect(() => {
    document.body.classList.remove("rgb-text-rainbow", "rgb-text-cycle")

    if (textMode !== "normal") {
      document.body.classList.add(`rgb-text-${textMode}`)
    }
  }, [textMode])

  return (
    <RGBContext.Provider value={{ mode, setMode, textMode, setTextMode, speed, setSpeed }}>
      {children}
    </RGBContext.Provider>
  )
}

export function useRGB() {
  const context = useContext(RGBContext)
  if (context === undefined) {
    throw new Error("useRGB must be used within a RGBProvider")
  }
  return context
}
