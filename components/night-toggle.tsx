'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function NightToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — render only after mount
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" aria-hidden />

  const isNight = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isNight ? 'light' : 'dark')}
      aria-label={isNight ? 'Passer en mode jour' : 'Passer en mode nuit'}
      title={isNight ? 'Mode jour' : 'Mode nuit'}
      className="relative flex items-center justify-center w-8 h-8 transition-colors duration-300 text-[#7D7468] hover:text-[#B08D57] dark:text-[#9E9080] dark:hover:text-[#C9A35E]"
    >
      {/* Sun — visible in day mode */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={`absolute transition-all duration-500 ${
          isNight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
        }`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon — visible in night mode */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={`absolute transition-all duration-500 ${
          isNight ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
        }`}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}
