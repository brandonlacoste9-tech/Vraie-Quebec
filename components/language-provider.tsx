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
    home: {
      tagline: string
      headline: string
      headlineHighlight: string
      description: string
      ctaPrimary: string
      ctaSecondary: string
      featuredOverline: string
      featuredTitle: string
      viewAll: string
      pillarsRestaurantsOverline: string
      pillarsRestaurantsTitle: string
      pillarsRestaurantsBody: string
      pillarsRestaurantsCta: string
      pillarsBarsOverline: string
      pillarsBarsTitle: string
      pillarsBarsBody: string
      pillarsBarsCta: string
      pillarsAgendaOverline: string
      pillarsAgendaTitle: string
      pillarsAgendaBody: string
      pillarsAgendaCta: string
      membershipOverline: string
      membershipTitle: string
      membershipHighlight: string
      membershipDescription: string
      membershipCta: string
      editorialOverline: string
      editorialTitle: string
      editorialRead: string
      newsletterOverline: string
      newsletterTitle: string
      newsletterDescription: string
    }
    footer: {
      tagline: string
      discover: string
      restaurants: string
      bars: string
      agenda: string
      sports: string
      travel: string
      house: string
      membership: string
      advertise: string
      contact: string
      terms: string
      privacy: string
      newsletter: string
      newsletterDesc: string
      copyright: string
    }
    restaurants: {
      overline: string
      title: string
      description: string
      editorsPick: string
      allVenues: string
      discover: string
      view: string
      noResults: string
      noResultsDesc: string
    }
    bars: {
      overline: string
      title: string
      description: string
      featured: string
      allVenues: string
      discover: string
      view: string
      noResults: string
      noResultsDesc: string
    }
    venue: {
      loading: string
      notFound: string
      backHome: string
      back: string
      vipAccess: string
      trending: string
      about: string
      experience: string
      ambiance: string
      music: string
      dressCode: string
      artists: string
      booking: string
      bookingType: string
      priceRange: string
      reserve: string
      instantConfirm: string
      info: string
      location: string
      rating: string
      status: string
      exclusive: string
    }
    filters: {
      filter: string
      budget: string
      moderate: string
      premium: string
      topRated: string
      trending: string
      vipAccess: string
      clear: string
    }
    members: {
      overline: string
      title: string
      highlight: string
      description: string
      benefits: string
      benefitsTitle: string
      priority: string
      priorityTitle: string
      priorityBody: string
      curation: string
      curationTitle: string
      curationBody: string
      circle: string
      circleTitle: string
      circleBody: string
      service: string
      serviceTitle: string
      serviceBody: string
      pricing: string
      pricingTitle: string
      mostPopular: string
      explorer: string
      explorerPrice: string
      explorerDesc: string
      insiders: string
      insidersPrice: string
      insidersPeriod: string
      insidersDesc: string
      elite: string
      elitePrice: string
      elitePeriod: string
      eliteDesc: string
      featureAccess: string
      featureSearch: string
      featureFavorites: string
      featurePriority: string
      featurePrivate: string
      start: string
      join: string
      faq: string
      faqTitle: string
      faqCancel: string
      faqCancelAnswer: string
      faqTaxes: string
      faqTaxesAnswer: string
      faqChange: string
      faqChangeAnswer: string
      faqTrial: string
      faqTrialAnswer: string
    }
    common: {
      reserve: string
      seeMore: string
      viewAll: string
      back: string
      loading: string
      error: string
      free: string
      perMonth: string
    }
    newsletter: {
      placeholder: string
      subscribe: string
      thanks: string
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
    home: {
      tagline: "Montréal · Québec · 2025",
      headline: "L'art de vivre",
      headlineHighlight: "bien",
      description: "Restaurants d'exception, bars de caractère, événements exclusifs — le guide de référence pour ceux qui exigent le meilleur.",
      ctaPrimary: "Découvrir",
      ctaSecondary: "Accès Membre",
      featuredOverline: "Sélection de la rédaction",
      featuredTitle: "En vedette",
      viewAll: "Tout voir",
      pillarsRestaurantsOverline: "Table",
      pillarsRestaurantsTitle: "Restaurants",
      pillarsRestaurantsBody: "Des tables d'exception sélectionnées par nos experts culinaires pour leur cuisine, leur service et leur atmosphère.",
      pillarsRestaurantsCta: "Explorer les adresses",
      pillarsBarsOverline: "Nuit",
      pillarsBarsTitle: "Bars & Clubs",
      pillarsBarsBody: "Les meilleures adresses de la vie nocturne montréalaise — cocktails de précision, terrasses et ambiances soignées.",
      pillarsBarsCta: "Voir les bars",
      pillarsAgendaOverline: "Agenda",
      pillarsAgendaTitle: "Événements",
      pillarsAgendaBody: "Festivals, galas, vernissages et soirées privées — votre agenda culturel curatif pour ne rien manquer.",
      pillarsAgendaCta: "Consulter l'agenda",
      membershipOverline: "Membership",
      membershipTitle: "Le cercle des",
      membershipHighlight: "initiés",
      membershipDescription: "Réservations prioritaires, invitations privées, accès aux meilleures tables avant tout le monde — devenez membre et découvrez le Québec autrement.",
      membershipCta: "Rejoindre la maison",
      editorialOverline: "Chroniques",
      editorialTitle: "À lire",
      editorialRead: "Lire",
      newsletterOverline: "La Lettre Hebdomadaire",
      newsletterTitle: "Ne manquez rien",
      newsletterDescription: "Nos sélections exclusives, événements privés et recommandations de la semaine, directement dans votre boîte.",
    },
    footer: {
      tagline: "Le guide de référence pour les adresses d'exception à Montréal et au Québec.",
      discover: "Découvrir",
      restaurants: "Restaurants",
      bars: "Bars",
      agenda: "Agenda",
      sports: "Sports",
      travel: "Voyage",
      house: "Maison",
      membership: "Adhésion",
      advertise: "Publicité",
      contact: "Contact",
      terms: "Conditions",
      privacy: "Confidentialité",
      newsletter: "La Lettre",
      newsletterDesc: "Recevez nos sélections exclusives chaque semaine.",
      copyright: "© 2025 Vrai Québec. Tous droits réservés.",
    },
    restaurants: {
      overline: "Gastronomie",
      title: "Restaurants",
      description: "Des tables d'exception sélectionnées pour leur cuisine, leur service et l'art de recevoir qui les distingue.",
      editorsPick: "Sélection de la rédaction",
      allVenues: "Toutes les adresses",
      discover: "Découvrir",
      view: "Voir",
      noResults: "Aucun résultat",
      noResultsDesc: "Essayez de modifier vos filtres.",
    },
    bars: {
      overline: "Vie nocturne",
      title: "Bars & Clubs",
      description: "Cocktails de précision, ambiances soignées et scènes musicales — la vie nocturne montréalaise dans toute son élégance.",
      featured: "En vedette",
      allVenues: "Toutes les adresses",
      discover: "Découvrir",
      view: "Voir",
      noResults: "Aucun résultat",
      noResultsDesc: "Essayez de modifier vos filtres.",
    },
    venue: {
      loading: "Chargement",
      notFound: "Établissement introuvable",
      backHome: "Retour à l'accueil",
      back: "Retour",
      vipAccess: "Accès VIP",
      trending: "Tendance",
      about: "À propos",
      experience: "Expérience",
      ambiance: "Ambiance",
      music: "Musique",
      dressCode: "Code vestimentaire",
      artists: "Artistes",
      booking: "Réservation",
      bookingType: "Type",
      priceRange: "Gamme",
      reserve: "Réserver",
      instantConfirm: "Confirmation instantanée · Sans frais",
      info: "Informations",
      location: "Localisation",
      rating: "Note",
      status: "Statut",
      exclusive: "Accès Exclusif",
    },
    filters: {
      filter: "Filtrer",
      budget: "Budget",
      moderate: "Modéré",
      premium: "Haut de gamme",
      topRated: "Très bien classé",
      trending: "Tendance",
      vipAccess: "Accès VIP",
      clear: "Effacer",
    },
    members: {
      overline: "Membership",
      title: "Le cercle des",
      highlight: "initiés",
      description: "Accédez aux meilleures tables de Montréal, aux événements privés et à une expérience culinaire hors du commun — réservé à nos membres.",
      benefits: "Avantages",
      benefitsTitle: "Ce que vous obtenez",
      priority: "Priorité",
      priorityTitle: "Tables garanties",
      priorityBody: "Réservations assurées dans les établissements les plus en demande, avec accès en avant-première.",
      curation: "Curation",
      curationTitle: "Sélections hebdomadaires",
      curationBody: "Découvrez nos adresses du moment, validées par nos experts culinaires et culturels, livrées chaque lundi.",
      circle: "Cercle",
      circleTitle: "Événements privés",
      circleBody: "Participez à nos soirées exclusives — dégustations, rencontres avec les chefs, vernissages.",
      service: "Service",
      serviceTitle: "Concierge dédié",
      serviceBody: "Une équipe à votre disposition pour toutes vos questions, suggestions et demandes spéciales.",
      pricing: "Tarifs",
      pricingTitle: "Choisissez votre accès",
      mostPopular: "Le plus choisi",
      explorer: "Explorateur",
      explorerPrice: "Gratuit",
      explorerDesc: "Pour découvrir l'essence de Vrai Québec",
      insiders: "Initiés",
      insidersPrice: "9,99 $",
      insidersPeriod: "/ mois",
      insidersDesc: "Pour les connaisseurs qui veulent le meilleur",
      elite: "Élite",
      elitePrice: "24,99 $",
      elitePeriod: "/ mois",
      eliteDesc: "L'expérience ultime, sans compromis",
      featureAccess: "Accès aux fiches restaurants & bars",
      featureSearch: "Recherche avancée",
      featureFavorites: "Sauvegarde de favoris",
      featurePriority: "Réservations prioritaires",
      featurePrivate: "Invitations privées exclusives",
      start: "Commencer",
      join: "Rejoindre",
      faq: "FAQ",
      faqTitle: "Questions fréquentes",
      faqCancel: "Comment annuler mon abonnement?",
      faqCancelAnswer: "Vous pouvez annuler à tout moment depuis votre profil, sans frais de résiliation.",
      faqTaxes: "Les prix incluent-ils les taxes?",
      faqTaxesAnswer: "Non — les taxes applicables seront calculées lors du paiement.",
      faqChange: "Puis-je changer de forfait?",
      faqChangeAnswer: "Oui. Tout changement est effectif immédiatement, avec ajustement au prorata.",
      faqTrial: "Y a-t-il une période d'essai?",
      faqTrialAnswer: "Le plan Explorateur est toujours gratuit. Pour les plans payants, contactez-nous.",
    },
    common: {
      reserve: "Réserver",
      seeMore: "Voir plus",
      viewAll: "Tout voir",
      back: "Retour",
      loading: "Chargement",
      error: "Erreur",
      free: "Gratuit",
      perMonth: "/ mois",
    },
    newsletter: {
      placeholder: "Votre adresse courriel",
      subscribe: "S'inscrire",
      thanks: "Merci — vous êtes inscrit.",
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
    home: {
      tagline: "Montreal · Quebec · 2025",
      headline: "The art of living",
      headlineHighlight: "well",
      description: "Exceptional restaurants, distinctive bars, exclusive events — the definitive guide for those who demand the best.",
      ctaPrimary: "Explore",
      ctaSecondary: "Member Access",
      featuredOverline: "Editor's Selection",
      featuredTitle: "Featured",
      viewAll: "View All",
      pillarsRestaurantsOverline: "Dining",
      pillarsRestaurantsTitle: "Restaurants",
      pillarsRestaurantsBody: "Exceptional tables selected by our culinary experts for their cuisine, service, and atmosphere.",
      pillarsRestaurantsCta: "Explore venues",
      pillarsBarsOverline: "Nightlife",
      pillarsBarsTitle: "Bars & Clubs",
      pillarsBarsBody: "The best addresses for Montreal nightlife — precision cocktails, terraces, and refined ambiances.",
      pillarsBarsCta: "See the bars",
      pillarsAgendaOverline: "Agenda",
      pillarsAgendaTitle: "Events",
      pillarsAgendaBody: "Festivals, galas, vernissages, and private parties — your curated cultural agenda so you never miss a moment.",
      pillarsAgendaCta: "See the agenda",
      membershipOverline: "Membership",
      membershipTitle: "The circle of",
      membershipHighlight: "insiders",
      membershipDescription: "Priority reservations, private invitations, access to the best tables before anyone else — become a member and discover Quebec differently.",
      membershipCta: "Join the house",
      editorialOverline: "Stories",
      editorialTitle: "Read",
      editorialRead: "Read",
      newsletterOverline: "The Weekly Letter",
      newsletterTitle: "Never miss a thing",
      newsletterDescription: "Our exclusive selections, private events, and recommendations of the week, delivered directly to your inbox.",
    },
    footer: {
      tagline: "The definitive guide to exceptional venues in Montreal and Quebec.",
      discover: "Discover",
      restaurants: "Restaurants",
      bars: "Bars",
      agenda: "Agenda",
      sports: "Sports",
      travel: "Travel",
      house: "House",
      membership: "Membership",
      advertise: "Advertise",
      contact: "Contact",
      terms: "Terms",
      privacy: "Privacy",
      newsletter: "The Letter",
      newsletterDesc: "Receive our exclusive selections weekly.",
      copyright: "© 2025 Vrai Quebec. All rights reserved.",
    },
    restaurants: {
      overline: "Gastronomy",
      title: "Restaurants",
      description: "Exceptional tables selected for their cuisine, service, and the art of hospitality that sets them apart.",
      editorsPick: "Editor's Pick",
      allVenues: "All Venues",
      discover: "Discover",
      view: "View",
      noResults: "No Results",
      noResultsDesc: "Try adjusting your filters.",
    },
    bars: {
      overline: "Nightlife",
      title: "Bars & Clubs",
      description: "Precision cocktails, refined atmospheres, and music scenes — Montreal nightlife at its finest.",
      featured: "Featured",
      allVenues: "All Venues",
      discover: "Discover",
      view: "View",
      noResults: "No Results",
      noResultsDesc: "Try adjusting your filters.",
    },
    venue: {
      loading: "Loading",
      notFound: "Venue not found",
      backHome: "Back to home",
      back: "Back",
      vipAccess: "VIP Access",
      trending: "Trending",
      about: "About",
      experience: "Experience",
      ambiance: "Ambiance",
      music: "Music",
      dressCode: "Dress Code",
      artists: "Artists",
      booking: "Booking",
      bookingType: "Type",
      priceRange: "Range",
      reserve: "Reserve",
      instantConfirm: "Instant confirmation · No fees",
      info: "Information",
      location: "Location",
      rating: "Rating",
      status: "Status",
      exclusive: "Exclusive Access",
    },
    filters: {
      filter: "Filter",
      budget: "Budget",
      moderate: "Moderate",
      premium: "Premium",
      topRated: "Top Rated",
      trending: "Trending",
      vipAccess: "VIP Access",
      clear: "Clear",
    },
    members: {
      overline: "Membership",
      title: "The circle of",
      highlight: "insiders",
      description: "Access Montreal's best tables, private events, and an extraordinary culinary experience — reserved for our members.",
      benefits: "Benefits",
      benefitsTitle: "What you get",
      priority: "Priority",
      priorityTitle: "Guaranteed tables",
      priorityBody: "Assured reservations at the most sought-after venues, with early access.",
      curation: "Curation",
      curationTitle: "Weekly selections",
      curationBody: "Discover our current favorites, validated by our culinary and cultural experts, delivered every Monday.",
      circle: "Circle",
      circleTitle: "Private events",
      circleBody: "Join our exclusive evenings — tastings, chef meet-and-greets, vernissages.",
      service: "Service",
      serviceTitle: "Dedicated concierge",
      serviceBody: "A team at your disposal for all your questions, suggestions, and special requests.",
      pricing: "Pricing",
      pricingTitle: "Choose your access",
      mostPopular: "Most popular",
      explorer: "Explorer",
      explorerPrice: "Free",
      explorerDesc: "To discover the essence of Vrai Quebec",
      insiders: "Insiders",
      insidersPrice: "$9.99",
      insidersPeriod: "/ month",
      insidersDesc: "For connoisseurs who want the best",
      elite: "Elite",
      elitePrice: "$24.99",
      elitePeriod: "/ month",
      eliteDesc: "The ultimate experience, without compromise",
      featureAccess: "Access to restaurant & bar listings",
      featureSearch: "Advanced search",
      featureFavorites: "Save favorites",
      featurePriority: "Priority reservations",
      featurePrivate: "Exclusive private invitations",
      start: "Get Started",
      join: "Join",
      faq: "FAQ",
      faqTitle: "Frequently Asked Questions",
      faqCancel: "How do I cancel my subscription?",
      faqCancelAnswer: "You can cancel anytime from your profile, with no cancellation fees.",
      faqTaxes: "Do prices include taxes?",
      faqTaxesAnswer: "No — applicable taxes will be calculated at checkout.",
      faqChange: "Can I change my plan?",
      faqChangeAnswer: "Yes. Any change takes effect immediately, with prorated adjustment.",
      faqTrial: "Is there a trial period?",
      faqTrialAnswer: "The Explorer plan is always free. For paid plans, contact us.",
    },
    common: {
      reserve: "Reserve",
      seeMore: "See More",
      viewAll: "View All",
      back: "Back",
      loading: "Loading",
      error: "Error",
      free: "Free",
      perMonth: "/ month",
    },
    newsletter: {
      placeholder: "Your email address",
      subscribe: "Subscribe",
      thanks: "Thank you — you're subscribed.",
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
