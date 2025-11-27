export type PlaceType = 'restaurant' | 'nightlife' | 'hotel' | 'event';

export interface Place {
  id: string;
  name: string;
  type: string;
  location: string;
  city: 'Montreal' | 'Quebec City' | 'Other';
  region?: string;
  rating: number;
  price: string;
  priceTier?: 'Free' | '$' | '$$' | '$$$' | '$$$$' | 'VIP';
  image: string;
  description: string;
  is_hot: boolean;
  exclusive?: boolean;
  bookingType?: 'reservation' | 'ticket' | 'guestlist' | 'none';
  
  // Nightlife specific
  vibe?: string;
  eventLineup?: string[];
  musicGenre?: string;
  partyType?: string;
  dressCode?: string;

  // Ads
  isSponsored?: boolean;
  sponsorName?: string;
  adUrl?: string;
}

export const REAL_QUEBEC_DATA: { [key: string]: Place[] } = {
  restaurants: [
    {
      id: 'r1',
      name: 'Au Pied de Cochon',
      type: 'Classic Poutine',
      location: 'Plateau-Mont-Royal',
      city: 'Montreal',
      rating: 4.8,
      price: '$$',
      priceTier: '$$',
      image: 'https://images.unsplash.com/photo-1586190848861-99c8f3bd8e6e?q=80&w=2070',
      description: 'The legendary spot for foie gras poutine and excess.',
      is_hot: true,
      bookingType: 'reservation'
    },
    {
      id: 'r2',
      name: 'Joe Beef',
      type: 'Gastronomy',
      location: 'Little Burgundy',
      city: 'Montreal',
      rating: 4.9,
      price: '$$$$',
      priceTier: '$$$$',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070',
      description: 'Montreal\'s most famous dining experience. Book months ahead.',
      is_hot: true,
      exclusive: true,
      bookingType: 'reservation'
    },
    {
      id: 'r3',
      name: 'Le Clan',
      type: 'Boreal Cuisine',
      location: 'Old Quebec',
      city: 'Quebec City',
      rating: 4.9,
      price: '$$$$',
      priceTier: '$$$$',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974',
      description: 'Stéphane Modat\'s masterpiece celebrating Quebec\'s terroir.',
      is_hot: true,
      exclusive: true,
      bookingType: 'reservation'
    },
     {
      id: 'r4',
      name: 'Toqué!',
      type: 'Fine Dining',
      location: 'Place Jean-Paul-Riopelle',
      city: 'Montreal',
      rating: 4.9,
      price: '$$$$',
      priceTier: 'VIP',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070',
      description: 'The pioneer of modern Quebec cuisine. A true culinary temple.',
      is_hot: false,
      bookingType: 'reservation',
      exclusive: true
    }
  ],
  nightlife: [
    {
      id: 'n1',
      name: 'Stereo',
      type: 'Afterhours Club',
      location: 'The Village',
      city: 'Montreal',
      vibe: 'Techno Temple',
      rating: 4.9,
      price: '$$',
      priceTier: '$$',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070',
      description: 'Best sound system in North America. Strictly for music lovers.',
      is_hot: true,
      bookingType: 'ticket',
      musicGenre: 'Techno / House',
      eventLineup: ['Hernan Cattaneo', 'Danny Tenaglia']
    },
    {
      id: 'n2',
      name: 'La Voûte',
      type: 'Nightclub',
      location: 'Old Montreal',
      city: 'Montreal',
      vibe: 'Sophisticated / High Energy',
      rating: 4.6,
      price: '$$$$',
      priceTier: 'VIP',
      image: 'https://images.unsplash.com/photo-1574391884720-77c76b395572?q=80&w=1974',
      description: 'Inside the vault of the old Royal Bank. The place to be seen.',
      is_hot: true,
      exclusive: true,
      bookingType: 'guestlist',
      partyType: 'Theatrical Nightlife',
      dressCode: 'Strictly Chic',
      eventLineup: ['DJ Spade']
    },
    {
      id: 'n3',
      name: 'Dagobert',
      type: 'Nightclub',
      location: 'Grande Allée',
      city: 'Quebec City',
      vibe: 'Party Castle',
      rating: 4.5,
      price: '$$',
      priceTier: '$$',
      image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070',
      description: 'A multi-floor castle of nightlife on Grande Allée.',
      is_hot: false,
      bookingType: 'guestlist',
      musicGenre: 'Top 40 / Dance'
    },
    {
      id: 'n4',
      name: 'New City Gas',
      type: 'Live Venue',
      location: 'Griffintown',
      city: 'Montreal',
      vibe: 'High Energy',
      rating: 4.7,
      price: '$$$',
      priceTier: '$$$',
      image: 'https://images.unsplash.com/photo-1574391884720-77c76b395572?q=80&w=1974',
      description: 'Massive heritage building hosting top DJs.',
      is_hot: true,
      bookingType: 'ticket',
      eventLineup: ['Tiësto', 'Martin Garrix'],
      isSponsored: true,
      sponsorName: 'Videotron',
      adUrl: 'https://videotron.com'
    }
  ],
  hotels: [
    {
      id: 'h1',
      name: 'Fairmont Le Château Frontenac',
      location: 'Québec City',
      city: 'Quebec City',
      type: 'Hotel',
      rating: 4.9,
      price: '$$$$',
      priceTier: 'VIP',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
      description: 'The most photographed hotel in the world. Pure history.',
      is_hot: true,
      exclusive: true,
      bookingType: 'reservation'
    },
    {
      id: 'h2',
      name: 'Hotel William Gray',
      location: 'Old Montreal',
      city: 'Montreal',
      type: 'Hotel',
      rating: 4.8,
      price: '$$$',
      priceTier: '$$$',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
      description: 'Modern luxury in historic buildings with a killer rooftop.',
      is_hot: true,
      bookingType: 'reservation'
    },
     {
      id: 'h3',
      name: 'Ritz-Carlton Montréal',
      location: 'Downtown',
      city: 'Montreal',
      type: 'Hotel',
      rating: 5.0,
      price: '$$$$',
      priceTier: 'VIP',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',
      description: 'The Grand Dame of Sherbrooke Street. Ultimate luxury.',
      is_hot: false,
      exclusive: true,
      bookingType: 'reservation',
      isSponsored: true,
      sponsorName: 'Holt Renfrew',
      adUrl: 'https://holtrenfrew.com'
    }
  ]
};
