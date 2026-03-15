"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "FR" | "EN"

type Translations = {
  [key in Language]: {
    nav: {
      todo: string
      eat: string
      drink: string
      club: string
      sports: string
      shows: string
      create: string
      login: string
      search: string
    }
    hero: {
      badge: string
      headline_prefix: string
      headline_highlight: string
      description: string
      cta_primary: string
      cta_secondary: string
      ticker: string
      marquee: string[]
    }
    featured: {
      badge: string
      subtitle: string
      headline_prefix: string
      headline_highlight: string
      headline_suffix: string
      view_all: string
      reserve: string
      details: string
    }
    creer: {
      title: string
      subtitle: string
    }
    galerie: {
      title: string
      subtitle: string
      empty: string
      emptyDesc: string
      createBtn: string
      likes: string
      share: string
      download: string
      viewOriginal: string
    }
    floatingButton: {
      label: string
      tooltip: string
    }
    promo: {
      badge: string
      title: string
      description: string
      cta: string
      features: string[]
    }
    socialShare: {
      title: string
      subtitle: string
      copyLink: string
      copied: string
      shareOn: string
      download: string
    }
    agenda: {
      title: string
      subtitle: string
      filterAll: string
      filterMusic: string
      filterArts: string
      filterNightlife: string
      filterFood: string
      date: string
      location: string
      price: string
      buyTickets: string
      soldOut: string
      featured: string
    }
  }
}

const translations: Translations = {
  FR: {
    nav: {
      todo: "Agenda",
      eat: "Restaurants",
      drink: "Bars",
      club: "Nightlife",
      sports: "Sports",
      shows: "Spectacles",
      create: "Jeu",
      login: "Membres",
      search: "Rechercher un établissement...",
    },
    hero: {
      badge: "L'ART DE VIVRE QUÉBÉCOIS",
      headline_prefix: "BIENVENUE AU",
      headline_highlight: "VRAI QUÉBEC",
      description:
        "Le guide de référence pour découvrir l'essence authentique du Québec. Restaurants d'exception, bars sélects, et expériences inoubliables à Montréal et Québec.",
      cta_primary: "Explorer",
      cta_secondary: "Réserver",
      ticker:
        "• ÉLÉGANCE • RAFFINEMENT • DÉCOUVERTE • VRAI QUÉBEC • EXCLUSIVITÉ • LUXE • AUTHENTICITÉ •",
      marquee: ["ÉLÉGANCE", "RAFFINEMENT", "DÉCOUVERTE", "EXCLUSIVITÉ", "AUTHENTICITÉ"],
    },
    featured: {
      badge: "Sélection",
      subtitle: "Nos coups de cœur de la semaine",
      headline_prefix: "Nos",
      headline_highlight: "favoris",
      headline_suffix: "du moment",
      view_all: "Voir toute la sélection",
      reserve: "Réserver",
      details: "Détails",
    },
    creer: {
      title: "JEU MÉMOIRE",
      subtitle: "Teste ta mémoire avec les symboles du Québec",
    },
    galerie: {
      title: "GALERIE COLLECTIVE",
      subtitle: "Découvrez les créations de notre communauté",
      empty: "Aucune création pour le moment",
      emptyDesc: "Soyez le premier à partager votre vision avec notre générateur IA",
      createBtn: "Créer maintenant",
      likes: "J'aime",
      share: "Partager",
      download: "Télécharger",
      viewOriginal: "Voir l'original",
    },
    floatingButton: {
      label: "Créer",
      tooltip: "Générer des visuels avec l'IA",
    },
    promo: {
      badge: "NOUVEAU",
      title: "Création visuelle par IA",
      description: "Générez des images uniques pour vos événements et réseaux sociaux",
      cta: "Essayer maintenant",
      features: ["Génération rapide", "Qualité professionnelle", "Sans limite"],
    },
    socialShare: {
      title: "Partager votre création",
      subtitle: "Partagez votre œuvre avec votre entourage",
      copyLink: "Copier le lien",
      copied: "Copié!",
      shareOn: "Partager sur",
      download: "Télécharger l'image",
    },
    agenda: {
      title: "L'AGENDA",
      subtitle: "Les événements incontournables à Québec et Montréal. Festivals, spectacles et nightlife.",
      filterAll: "Tous",
      filterMusic: "Musique",
      filterArts: "Arts",
      filterNightlife: "Nightlife",
      filterFood: "Gastronomie",
      date: "Date",
      location: "Lieu",
      price: "Prix",
      buyTickets: "Billets",
      soldOut: "Complet",
      featured: "À ne pas manquer",
    },
  },
  EN: {
    nav: {
      todo: "Agenda",
      eat: "Dining",
      drink: "Bars",
      club: "Nightlife",
      sports: "Sports",
      shows: "Shows",
      create: "Game",
      login: "Members",
      search: "Search for a venue...",
    },
    hero: {
      badge: "THE ART OF QUEBEC LIVING",
      headline_prefix: "WELCOME TO",
      headline_highlight: "REAL QUEBEC",
      description: "The definitive guide to discovering the authentic essence of Quebec. Exceptional restaurants, select bars, and unforgettable experiences in Montreal and Quebec City.",
      cta_primary: "Explore",
      cta_secondary: "Reserve",
      ticker: "• ELEGANCE • REFINEMENT • DISCOVERY • REAL QUEBEC • EXCLUSIVITY • LUXURY • AUTHENTICITY •",
      marquee: ["ELEGANCE", "REFINEMENT", "DISCOVERY", "EXCLUSIVITY", "AUTHENTICITY"],
    },
    featured: {
      badge: "Selection",
      subtitle: "Our weekly favorites",
      headline_prefix: "Our",
      headline_highlight: "favorites",
      headline_suffix: "this week",
      view_all: "View full selection",
      reserve: "Reserve",
      details: "Details",
    },
    creer: {
      title: "MEMORY GAME",
      subtitle: "Test your memory with Quebec symbols",
    },
    galerie: {
      title: "COLLECTIVE GALLERY",
      subtitle: "Discover creations from our community",
      empty: "No creations yet",
      emptyDesc: "Be the first to share your vision with our AI generator",
      createBtn: "Create now",
      likes: "Likes",
      share: "Share",
      download: "Download",
      viewOriginal: "View original",
    },
    floatingButton: {
      label: "Create",
      tooltip: "Generate AI visuals",
    },
    promo: {
      badge: "NEW",
      title: "AI Visual Creation",
      description: "Generate unique images for your events and social profiles",
      cta: "Try now",
      features: ["Fast generation", "Professional quality", "Unlimited"],
    },
    socialShare: {
      title: "Share your creation",
      subtitle: "Share your artwork with your circle",
      copyLink: "Copy link",
      copied: "Copied!",
      shareOn: "Share on",
      download: "Download image",
    },
    agenda: {
      title: "THE AGENDA",
      subtitle: "Unmissable events in Quebec and Montreal. Festivals, shows, and nightlife.",
      filterAll: "All",
      filterMusic: "Music",
      filterArts: "Arts",
      filterNightlife: "Nightlife",
      filterFood: "Dining",
      date: "Date",
      location: "Location",
      price: "Price",
      buyTickets: "Get Tickets",
      soldOut: "Sold Out",
      featured: "Must See",
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations["FR"]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("FR")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && (savedLanguage === "FR" || savedLanguage === "EN")) {
      setLanguage(savedLanguage)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    // Save language to localStorage whenever it changes
    if (mounted) {
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return <LanguageContext.Provider value={{ language: "FR", setLanguage, t: translations["FR"] }}>{children}</LanguageContext.Provider>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
