"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { FeaturedSpots } from "@/components/featured-spots"
import { RSVPModal } from "@/components/booking/RSVPModal"

const SPORTS_VENUES = [
  {
    id: 's1',
    name: 'Centre Bell',
    type: 'Arena',
    category: 'hockey',
    location: 'Centre-ville',
    city: 'Montreal' as const,
    rating: 4.7,
    price: '$$$',
    priceTier: '$$$' as const,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2070',
    description: 'Temple du hockey. Canadiens de Montréal et concerts majeurs.',
    is_hot: true,
    bookingType: 'ticket' as const,
    vibe: 'Électrique',
    eventLineup: ['Canadiens vs Leafs', 'Concert Taylor Swift'],
    isSponsored: true,
    sponsorName: 'Bell Canada',
    adUrl: 'https://www.bell.ca'
  },
  {
    id: 's2',
    name: 'Stade Saputo',
    type: 'Stadium',
    category: 'soccer',
    location: 'Parc Olympique',
    city: 'Montreal' as const,
    rating: 4.5,
    price: '$$',
    priceTier: '$$' as const,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070',
    description: 'CF Montréal. Ambiance festive et passionnée.',
    is_hot: true,
    bookingType: 'ticket' as const,
    vibe: 'Festive',
    eventLineup: ['CFM vs Toronto FC', 'Derby canadien']
  },
  {
    id: 's3',
    name: 'Circuit Gilles-Villeneuve',
    type: 'Circuit F1',
    category: 'racing',
    location: 'Île Notre-Dame',
    city: 'Montreal' as const,
    rating: 4.9,
    price: '$$$$',
    priceTier: 'VIP' as const,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070',
    description: 'Grand Prix du Canada. L\'événement sportif de l\'année.',
    is_hot: true,
    exclusive: true,
    bookingType: 'ticket' as const,
    vibe: 'Prestigieux',
    eventLineup: ['GP du Canada 2026', 'F1 Sprint'],
    isSponsored: true,
    sponsorName: 'Casino de Montréal',
    adUrl: 'https://casinos.lotoquebec.com'
  },
  {
    id: 's4',
    name: 'Stade Uniprix',
    type: 'Tennis',
    category: 'tennis',
    location: 'Outremont',
    city: 'Montreal' as const,
    rating: 4.3,
    price: '$',
    priceTier: '$' as const,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070',
    description: 'Tournoi de tennis Challenger. Intime et accessible.',
    is_hot: false,
    bookingType: 'ticket' as const,
    vibe: 'Intimiste',
    eventLineup: ['Challenger ATP 100']
  },
  {
    id: 's5',
    name: 'Videotron Centre',
    type: 'Arena',
    category: 'hockey',
    location: 'Centre-ville Québec',
    city: 'Quebec City' as const,
    rating: 4.6,
    price: '$$',
    priceTier: '$$' as const,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2070',
    description: 'Remparts de Québec. Hockey junior et spectacles.',
    is_hot: true,
    bookingType: 'ticket' as const,
    vibe: 'Passionnée',
    eventLineup: ['Remparts vs Sea Dogs', 'Cirque du Soleil']
  },
  {
    id: 's6',
    name: 'Club de golf Royal Montréal',
    type: 'Golf',
    category: 'golf',
    location: 'Île Bizard',
    city: 'Montreal' as const,
    rating: 4.8,
    price: '$$$$',
    priceTier: 'VIP' as const,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070',
    description: 'Championnat Presidents Cup 2026. Le plus ancien club d\'Amérique.',
    is_hot: true,
    exclusive: true,
    bookingType: 'ticket' as const,
    vibe: 'Prestigieux',
    eventLineup: ['Presidents Cup 2026'],
    isSponsored: true,
    sponsorName: 'RBC',
    adUrl: 'https://www.rbc.com'
  }
]

export default function SportsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h1 className="text-4xl md:text-7xl font-heading font-bold uppercase text-white mb-4">
            SPORTS <span className="text-primary text-glow">QUÉBEC</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Des arénas mythiques aux circuits prestigieux.
            Vivez l'adrénaline du sport québécois.
          </p>
        </div>
      </div>

      {/* Featured Sports Venues */}
      <div className="container mx-auto px-4 py-12">
        <FeaturedSpots
          title="Arénas & Stades"
          spots={SPORTS_VENUES}
          showFilter={true}
          filterOptions={[
            { value: 'all', label: 'Tous les sports' },
            { value: 'hockey', label: 'Hockey' },
            { value: 'soccer', label: 'Soccer' },
            { value: 'racing', label: 'Course' },
            { value: 'tennis', label: 'Tennis' },
            { value: 'golf', label: 'Golf' }
          ]}
        />
      </div>

      {/* Upcoming Events Section */}
      <div className="container mx-auto px-4 py-12 border-t border-primary/20">
        <h2 className="text-3xl font-heading font-bold text-white mb-8">
          ÉVÉNEMENTS À VENIR
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="leather-card p-6 stitched hover:border-primary transition-colors cursor-pointer flex flex-col">
            <a href="https://www.google.com/search?q=Grand+Prix+du+Canada+Montreal" target="_blank" rel="noopener noreferrer" className="flex-1 mb-4 block">
              <div className="text-primary text-sm font-bold mb-2">JUIN 2026</div>
              <h3 className="text-xl font-bold text-white mb-2">Grand Prix du Canada</h3>
              <p className="text-gray-400 text-sm">Circuit Gilles-Villeneuve, Montréal</p>
            </a>
            <RSVPModal venueName="Grand Prix du Canada" placeId="s3" imageUrl="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070">
              <button className="btn-primary w-full">Réserver</button>
            </RSVPModal>
          </div>

          <div className="leather-card p-6 stitched hover:border-primary transition-colors cursor-pointer flex flex-col">
            <a href="https://www.google.com/search?q=Presidents+Cup+Royal+Montreal" target="_blank" rel="noopener noreferrer" className="flex-1 mb-4 block">
              <div className="text-primary text-sm font-bold mb-2">SEPTEMBRE 2026</div>
              <h3 className="text-xl font-bold text-white mb-2">Presidents Cup</h3>
              <p className="text-gray-400 text-sm">Royal Montréal Golf Club</p>
            </a>
            <RSVPModal venueName="Presidents Cup" placeId="s6" imageUrl="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070">
              <button className="btn-primary w-full">Réserver</button>
            </RSVPModal>
          </div>

          <div className="leather-card p-6 stitched hover:border-primary transition-colors cursor-pointer flex flex-col">
            <a href="https://www.google.com/search?q=Remparts+de+Quebec+Tickets" target="_blank" rel="noopener noreferrer" className="flex-1 mb-4 block">
              <div className="text-primary text-sm font-bold mb-2">FÉVRIER 2026</div>
              <h3 className="text-xl font-bold text-white mb-2">Remparts de Québec vs Océanic</h3>
              <p className="text-gray-400 text-sm">Centre Vidéotron, Québec</p>
            </a>
            <RSVPModal venueName="Remparts vs Océanic" placeId="s5" imageUrl="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2070">
              <button className="btn-primary w-full">Billets</button>
            </RSVPModal>
          </div>

          <div className="leather-card p-6 stitched hover:border-primary transition-colors cursor-pointer flex flex-col">
            <a href="https://www.google.com/search?q=Canadiens+de+Montreal+Tickets" target="_blank" rel="noopener noreferrer" className="flex-1 mb-4 block">
              <div className="text-primary text-sm font-bold mb-2">SAISON 2025-26</div>
              <h3 className="text-xl font-bold text-white mb-2">Canadiens de Montréal</h3>
              <p className="text-gray-400 text-sm">Centre Bell, Montréal</p>
            </a>
            <RSVPModal venueName="Canadiens de Montréal" placeId="s1" imageUrl="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2070">
              <button className="btn-primary w-full">Billets</button>
            </RSVPModal>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
