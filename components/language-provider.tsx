"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

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
  }
}

const translations: Translations = {
  FR: {
    nav: {
      todo: "Quoi faire",
      eat: "Manger",
      drink: "Boire",
      club: "Sortir",
      sports: "Sports",
      shows: "Spectacles",
      create: "Créer",
      login: "Connexion",
      search: "Trouver un spot malade...",
    },
    hero: {
      badge: "C'EST MALADE • LE PARIS DU NORD",
      headline_prefix: "ICI C'EST",
      headline_highlight: "VRAI QUÉBEC",
      description:
        "Le seul guide qui te dit les vraies affaires. Restos, bars, clubs, tout ce qui est HOT en ce moment à Montréal.",
      cta_primary: "Trouver un spot",
      cta_secondary: "Réserver",
      ticker:
        "• LA GROSSE CLASSE • C'EST CHAUD À SOIR • RÉSERVE TA PLACE • VRAI QUÉBEC • T'ES DOWN? • GROS LUXE • LA SHOT •",
      marquee: [
        "LA GROSSE CLASSE",
        "C'EST CHAUD À SOIR",
        "RÉSERVE TA PLACE",
        "VRAI QUÉBEC",
        "T'ES DOWN?",
        "GROS LUXE",
        "LA SHOT",
      ],
    },
    featured: {
      badge: "Trending",
      subtitle: "Top Picks de la semaine",
      headline_prefix: "C'est",
      headline_highlight: "chaud",
      headline_suffix: "en ce moment",
      view_all: "Voir tout le classement",
      reserve: "Réserver",
      details: "Détails",
    },
    creer: {
      title: "CRÉER DES VISUELS",
      subtitle: "Génère des images avec l'IA pour tes soirées, événements et profils",
    },
    galerie: {
      title: "GALERIE COMMUNAUTAIRE",
      subtitle: "Découvre les créations de la communauté Vrai Québec",
      empty: "Aucune création pour le moment",
      emptyDesc: "Sois le premier à créer des visuels avec notre générateur IA",
      createBtn: "Créer maintenant",
      likes: "J'aime",
      share: "Partager",
      download: "Télécharger",
      viewOriginal: "Voir l'original",
    },
    floatingButton: {
      label: "Créer",
      tooltip: "Génère des visuels avec l'IA",
    },
    promo: {
      badge: "NOUVEAU",
      title: "Crée des visuels avec l'IA",
      description: "Génère des images uniques pour tes événements, soirées et profils sociaux",
      cta: "Essayer maintenant",
      features: ["Génération rapide", "Qualité pro", "Illimité"],
    },
    socialShare: {
      title: "Partager ta création",
      subtitle: "Montre ton artwork à tes amis",
      copyLink: "Copier le lien",
      copied: "Copié!",
      shareOn: "Partager sur",
      download: "Télécharger l'image",
    },
  },
  EN: {
    nav: {
      todo: "To Do",
      eat: "Eat",
      drink: "Drink",
      club: "Clubbing",
      sports: "Sports",
      shows: "Shows",
      create: "Create",
      login: "Login",
      search: "Find epic spots...",
    },
    hero: {
      badge: "THAT'S SICK • PARIS OF THE NORTH",
      headline_prefix: "THIS IS",
      headline_highlight: "REAL QUEBEC",
      description:
        "The only guide giving you the real deal. Restaurants, bars, clubs, everything that's HOT right now in Montreal.",
      cta_primary: "Find a spot",
      cta_secondary: "Book now",
      ticker: "• HIGH CLASS • IT'S HOT TONIGHT • BOOK YOUR SPOT • REAL QUEBEC • YOU DOWN? • PURE LUXURY • THE SHOT •",
      marquee: ["BIG CLASS", "IT'S HOT TONIGHT", "SAVE YOUR SEAT", "TRUE QUÉBEC", "YOU DOWN?", "BIG LUXE", "THE SHOT"],
    },
    featured: {
      badge: "Trending",
      subtitle: "Top Picks of the week",
      headline_prefix: "It's",
      headline_highlight: "hot",
      headline_suffix: "right now",
      view_all: "View full ranking",
      reserve: "Book",
      details: "Details",
    },
    creer: {
      title: "CREATE VISUALS",
      subtitle: "Generate AI images for your parties, events and profiles",
    },
    galerie: {
      title: "COMMUNITY GALLERY",
      subtitle: "Discover creations from the Vrai Quebec community",
      empty: "No creations yet",
      emptyDesc: "Be the first to create visuals with our AI generator",
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
      title: "Create visuals with AI",
      description: "Generate unique images for your events, parties and social profiles",
      cta: "Try now",
      features: ["Fast generation", "Pro quality", "Unlimited"],
    },
    socialShare: {
      title: "Share your creation",
      subtitle: "Show your artwork to friends",
      copyLink: "Copy link",
      copied: "Copied!",
      shareOn: "Share on",
      download: "Download image",
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
