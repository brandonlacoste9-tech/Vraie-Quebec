"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Train, 
  Car, 
  Bus, 
  Plane, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  ArrowRight,
  Calendar,
  Check
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const transportOptions = [
  {
    id: "train",
    icon: Train,
    name: { fr: "Train (Via Rail)", en: "Train (Via Rail)" },
    time: "3h30",
    price: { fr: "50$ - 150$", en: "$50 - $150" },
    comfort: 5,
    scenic: 5,
    description: {
      fr: "L'expérience la plus agréable avec vue sur le fleuve Saint-Laurent",
      en: "The most pleasant experience with views of the St. Lawrence River",
    },
    features: [
      { fr: "WiFi gratuit", en: "Free WiFi" },
      { fr: "Sièges spacieux", en: "Spacious seats" },
      { fr: "Bar/Resto", en: "Bar/Restaurant" },
      { fr: "Prise électrique", en: "Power outlets" },
    ],
    bookUrl: "https://www.viarail.ca",
    recommended: true,
  },
  {
    id: "car",
    icon: Car,
    name: { fr: "Voiture", en: "Car" },
    time: "2h45",
    price: { fr: "30$ - 60$", en: "$30 - $60" },
    comfort: 4,
    scenic: 3,
    description: {
      fr: "Flexibilité totale avec arrêts possibles en cours de route",
      en: "Total flexibility with possible stops along the way",
    },
    features: [
      { fr: "Autonomie complète", en: "Complete autonomy" },
      { fr: "Arrêts au choix", en: "Stops of your choice" },
      { fr: "Autoroute 20 ou 40", en: "Highway 20 or 40" },
      { fr: "Parking disponible", en: "Parking available" },
    ],
    bookUrl: "https://www.rentalcars.com",
    recommended: false,
  },
  {
    id: "bus",
    icon: Bus,
    name: { fr: "Autobus (Orléans)", en: "Bus (Orléans)" },
    time: "3h45",
    price: { fr: "40$ - 80$", en: "$40 - $80" },
    comfort: 3,
    scenic: 3,
    description: {
      fr: "Option économique avec plusieurs départs par jour",
      en: "Budget option with multiple departures per day",
    },
    features: [
      { fr: "Prix abordable", en: "Affordable price" },
      { fr: "WiFi à bord", en: "WiFi on board" },
      { fr: "Sièges inclinables", en: "Reclining seats" },
      { fr: "Départs fréquents", en: "Frequent departures" },
    ],
    bookUrl: "https://www.orleansexpress.com",
    recommended: false,
  },
  {
    id: "plane",
    icon: Plane,
    name: { fr: "Avion", en: "Plane" },
    time: "45 min",
    price: { fr: "200$+", en: "$200+" },
    comfort: 3,
    scenic: 1,
    description: {
      fr: "Trop court pour le prix - déconseillé pour ce trajet",
      en: "Too short for the price - not recommended for this route",
    },
    features: [
      { fr: "Vol rapide", en: "Quick flight" },
      { fr: "Aéroport → centre", en: "Airport → downtown" },
      { fr: "Sécurité + attente", en: "Security + waiting" },
      { fr: "Coût élevé", en: "High cost" },
    ],
    bookUrl: "https://www.aircanada.com",
    recommended: false,
  },
]

const stops = [
  {
    name: "Trois-Rivières",
    description: {
      fr: "Ville historique à mi-chemin. Parfait pour une pause déjeuner.",
      en: "Historic city halfway. Perfect for a lunch break.",
    },
    highlights: ["Cathédrale", "Vieux-Trois-Rivières", "Bord du fleuve"],
    duration: "1-2h",
  },
  {
    name: "Cap-Santé",
    description: {
      fr: "Village pittoresque avec une église du XVIIIe siècle.",
      en: "Picturesque village with an 18th century church.",
    },
    highlights: ["Église de Cap-Santé", "Vues panoramiques", "Atmosphère tranquille"],
    duration: "30min",
  },
  {
    name: "Chutes Montmorency",
    description: {
      fr: "Arrêt incontournable juste avant Québec! Plus hautes que Niagara.",
      en: "Must-stop just before Quebec City! Taller than Niagara.",
    },
    highlights: ["Pont suspendu", "Tyrolienne", "Cascade"],
    duration: "1-2h",
  },
]

const itineraries = [
  {
    name: { fr: "Week-end Express", en: "Weekend Express" },
    duration: "2 jours",
    price: { fr: "À partir de 300$", en: "From $300" },
    description: {
      fr: "Idéal pour une première découverte rapide",
      en: "Perfect for a first quick discovery",
    },
    days: [
      { fr: "Jour 1: Trajet + Vieux-Québec", en: "Day 1: Travel + Old Quebec" },
      { fr: "Jour 2: Château Frontenac + Retour", en: "Day 2: Chateau Frontenac + Return" },
    ],
    includes: [
      { fr: "Transport A/R", en: "Round-trip transport" },
      { fr: "1 nuit d'hôtel", en: "1 hotel night" },
      { fr: "Visite guidée", en: "Guided tour" },
    ],
  },
  {
    name: { fr: "Escapade Romantique", en: "Romantic Getaway" },
    duration: "3 jours",
    price: { fr: "À partir de 650$", en: "From $650" },
    description: {
      fr: "Pour les couples - luxe et intimité",
      en: "For couples - luxury and intimacy",
    },
    days: [
      { fr: "Jour 1: Train + Château Frontenac", en: "Day 1: Train + Chateau Frontenac" },
      { fr: "Jour 2: Spa + Restaurant gastronomique", en: "Day 2: Spa + Fine dining" },
      { fr: "Jour 3: Ile d'Orléans + Retour", en: "Day 3: Orleans Island + Return" },
    ],
    includes: [
      { fr: "Train première classe", en: "First class train" },
      { fr: "Hôtel 4 étoiles", en: "4-star hotel" },
      { fr: "Diner au D'Orsay", en: "Dinner at D'Orsay" },
      { fr: "Spa Nordique", en: "Nordic spa" },
    ],
  },
  {
    name: { fr: "Aventure Culturelle", en: "Cultural Adventure" },
    duration: "4 jours",
    price: { fr: "À partir de 450$", en: "From $450" },
    description: {
      fr: "Musées, histoire et gastronomie",
      en: "Museums, history and gastronomy",
    },
    days: [
      { fr: "Jour 1: Arrivée + Musée de la Civilisation", en: "Day 1: Arrival + Civilization Museum" },
      { fr: "Jour 2: Vieux-Québec + Citadelle", en: "Day 2: Old Quebec + Citadel" },
      { fr: "Jour 3: Ile d'Orléans + Dégustations", en: "Day 3: Orleans Island + Tastings" },
      { fr: "Jour 4: Musée des Beaux-Arts + Retour", en: "Day 4: Fine Arts Museum + Return" },
    ],
    includes: [
      { fr: "Transport en voiture", en: "Car transport" },
      { fr: "3 nuits Airbnb", en: "3 nights Airbnb" },
      { fr: "Pass musées", en: "Museum pass" },
      { fr: "Tour gastronomique", en: "Food tour" },
    ],
  },
  {
    name: { fr: "Road Trip Découverte", en: "Discovery Road Trip" },
    duration: "5 jours",
    price: { fr: "À partir de 550$", en: "From $550" },
    description: {
      fr: "En voiture avec tous les arrêts intéressants",
      en: "By car with all interesting stops",
    },
    days: [
      { fr: "Jour 1: Montréal → Trois-Rivières", en: "Day 1: Montreal → Trois-Rivières" },
      { fr: "Jour 2: Cap-Santé + Arrivée Québec", en: "Day 2: Cap-Sante + Arrival Quebec" },
      { fr: "Jour 3: Chutes Montmorency + Ville", en: "Day 3: Montmorency Falls + City" },
      { fr: "Jour 4: Ile d'Orléans + Charlevoix", en: "Day 4: Orleans Island + Charlevoix" },
      { fr: "Jour 5: Retour via Chemin du Roy", en: "Day 5: Return via Chemin du Roy" },
    ],
    includes: [
      { fr: "Location voiture", en: "Car rental" },
      { fr: "4 nuits hôtels/B&B", en: "4 nights hotels/B&B" },
      { fr: "Carte des arrêts", en: "Stops map" },
      { fr: "Guide audio", en: "Audio guide" },
    ],
  },
]

export default function VoyagePage() {
  const { t, locale } = useLanguage()
  const isFr = locale === "fr"

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />
      
      {/* Hero */}
      <div className="relative overflow-hidden py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-gold-500/20 text-gold-400 border-gold-500/50">
              {isFr ? "Planifiez votre voyage" : "Plan your trip"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {isFr ? "Montréal → Québec" : "Montreal → Quebec City"}
            </h1>
            <p className="text-xl text-gray-400">
              {isFr 
                ? "270 km de découvertes entre deux villes emblématiques"
                : "270 km of discoveries between two iconic cities"
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        
        {/* Transport Options */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Train className="w-8 h-8 text-gold-500" />
            {isFr ? "Comment s'y rendre" : "How to get there"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {transportOptions.map((option) => {
              const Icon = option.icon
              return (
                <Card 
                  key={option.id}
                  className={`p-6 bg-white/5 border-white/10 hover:border-gold-500/50 transition-colors ${
                    option.recommended ? "ring-2 ring-gold-500/30" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{option.name[locale]}</h3>
                        {option.recommended && (
                          <Badge className="bg-gold-500 text-black text-xs">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {isFr ? "Recommandé" : "Recommended"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{option.description[locale]}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-500" />
                      <span>{option.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gold-500" />
                      <span>{option.price[locale]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gold-500" />
                      <span>{isFr ? "Confort" : "Comfort"}: {option.comfort}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {option.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {feature[locale]}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-gold-500 text-black hover:bg-gold-400"
                    onClick={() => window.open(option.bookUrl, "_blank")}
                  >
                    {isFr ? "Réserver" : "Book"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Scenic Stops */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-gold-500" />
            {isFr ? "Arrêts incontournables en route" : "Must-see stops along the way"}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stops.map((stop, i) => (
              <Card key={i} className="p-6 bg-white/5 border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold">{stop.name}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{stop.description[locale]}</p>
                <div className="space-y-2">
                  <p className="text-xs text-gold-500">{isFr ? "À voir:" : "Highlights:"}</p>
                  <div className="flex flex-wrap gap-2">
                    {stop.highlights.map((h, j) => (
                      <span key={j} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{isFr ? "Arrêt suggéré:" : "Suggested stop:"} {stop.duration}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Itineraries */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-gold-500" />
            {isFr ? "Forfaits combinés" : "Combined packages"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {itineraries.map((itinerary, i) => (
              <Card key={i} className="p-6 bg-white/5 border-white/10 hover:border-gold-500/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{itinerary.name[locale]}</h3>
                  <Badge className="bg-gold-500/20 text-gold-400">
                    {itinerary.duration}
                  </Badge>
                </div>
                
                <p className="text-gray-400 mb-4">{itinerary.description[locale]}</p>
                
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gold-500">{isFr ? "Programme:" : "Schedule:"}</p>
                  {itinerary.days.map((day, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-gold-500" />
                      <span>{day[locale]}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gold-500 mb-2">{isFr ? "Inclus:" : "Includes:"}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {itinerary.includes.map((inc, j) => (
                      <span key={j} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {inc[locale]}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gold-500">{itinerary.price[locale]}</span>
                    <Button className="bg-gold-500 text-black hover:bg-gold-400">
                      {isFr ? "Réserver ce forfait" : "Book this package"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Info */}
        <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6">
            {isFr ? "Conseils de voyage" : "Travel tips"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gold-500 mb-2">
                {isFr ? "Meilleure saison" : "Best season"}
              </h3>
              <p className="text-sm text-gray-400">
                {isFr 
                  ? "Juin à octobre pour le beau temps. Décembre à février pour le charme hivernal."
                  : "June to October for good weather. December to February for winter charm."
                }
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gold-500 mb-2">
                {isFr ? "Réserver à l'avance" : "Book in advance"}
              </h3>
              <p className="text-sm text-gray-400">
                {isFr 
                  ? "Le train et les hôtels se remplissent vite, surtout en été et pendant les festivals."
                  : "Trains and hotels fill up fast, especially in summer and during festivals."
                }
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gold-500 mb-2">
                {isFr ? "Combinez les deux" : "Combine both"}
              </h3>
              <p className="text-sm text-gray-400">
                {isFr 
                  ? "Montréal pour la diversité culturelle, Québec pour l'histoire. Les deux sont essentiels!"
                  : "Montreal for cultural diversity, Quebec for history. Both are essential!"
                }
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">
            {isFr ? "Prêt à partir?" : "Ready to go?"}
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            {isFr 
              ? "Réservez votre transport et découvrez les meilleures adresses dans les deux villes avec Vrai Québec."
              : "Book your transport and discover the best spots in both cities with Vrai Quebec."
            }
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 text-black hover:bg-gold-400">
              <Train className="w-5 h-5 mr-2" />
              {isFr ? "Réserver le train" : "Book train"}
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:border-gold-500">
              <Car className="w-5 h-5 mr-2" />
              {isFr ? "Louer une voiture" : "Rent a car"}
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
