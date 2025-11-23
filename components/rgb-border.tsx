"use client"

import type React from "react"

import { useRGB } from "@/components/rgb-provider"
import { cn } from "@/lib/utils"

export function RGBBorder() {
  const { mode, speed } = useRGB()

  if (mode === "off") return null

  return (
    <div
      className={cn(
        "rgb-border-container",
        mode === "cycle" && "rgb-mode-cycle",
        mode === "breathing" && "rgb-mode-breathing",
      )}
      style={
        {
          // Dynamic speed variable for animations
          "--animation-duration": `${speed}s`,
        } as React.CSSProperties
      }
    />
  )
}
