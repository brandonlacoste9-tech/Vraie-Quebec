"use client"

import * as React from "react"
import { Palette, Sliders } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [primaryHue, setPrimaryHue] = React.useState([268])
  const [accentHue, setAccentHue] = React.useState([188])

  // Update CSS variables when sliders change
  const updateColors = (p: number[], a: number[]) => {
    document.documentElement.style.setProperty("--primary-hue", p[0].toString())
    document.documentElement.style.setProperty("--accent-hue", a[0].toString())
  }

  const handlePrimaryChange = (value: number[]) => {
    setPrimaryHue(value)
    updateColors(value, accentHue)
  }

  const handleAccentChange = (value: number[]) => {
    setAccentHue(value)
    updateColors(primaryHue, value)
  }

  const cycleTheme = () => {
    if (theme === "nightlife") setTheme("terrasse")
    else if (theme === "terrasse") setTheme("festival")
    else setTheme("nightlife")
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={cycleTheme} className="text-white hover:bg-white/10">
        <Palette className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Cycle Theme</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Sliders className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Customize Colors</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-4">
          <DropdownMenuLabel>RGB Controls</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="primary">Primary Hue ({primaryHue})</Label>
              <Slider
                id="primary"
                min={0}
                max={360}
                step={1}
                value={primaryHue}
                onValueChange={handlePrimaryChange}
                className="cursor-pointer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accent">Accent Hue ({accentHue})</Label>
              <Slider
                id="accent"
                min={0}
                max={360}
                step={1}
                value={accentHue}
                onValueChange={handleAccentChange}
                className="cursor-pointer"
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
