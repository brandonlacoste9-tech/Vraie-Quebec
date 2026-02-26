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
      id: 'r5',
      name: 'L\'Express',
      type: 'Bistro Parisien',
      location: 'Plateau-Mont-Royal',
      city: 'Montreal',
      rating: 4.7,
      price: '$$',
      priceTier: '$$',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070',
      description: 'Le bistro parisien le plus authentique de Montréal. Steak-frites incomparable.',
      is_hot: true,
      bookingType: 'reservation'
    },
    {
      id: 'r6',
      name: 'Damas',
      type: 'Syrian',
      location: 'Outremont',
      city: 'Montreal',
      rating: 4.8,
      price: '$$$',
      priceTier: '$$$',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974',
      description: 'Meilleur restaurant syrien au Canada. Expérience inoubliable.',
      is_hot: true,
      bookingType: 'reservation'
    },
    {
      id: 'r7',
      name: 'Chez Boulay',
      type: 'Boréal',
      location: 'Old Quebec',
      city: 'Quebec City',
      rating: 4.6,
      price: '$$$',
      priceTier: '$$$',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
      description: 'Cuisine boréale créative au cœur du Vieux-Québec.',
      is_hot: true,
      bookingType: 'reservation'
    },
    {
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
    },
    {
      id: 'n5',
      name: 'Foufounes Électriques',
      type: 'Club Alternatif',
      location: 'Downtown',
      city: 'Montreal',
      vibe: 'Punk / Rock / Alternative',
      rating: 4.4,
      price: '$',
      priceTier: '$',
      image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076',
      description: 'Institution montréalaise depuis 1983. Musique live et DJ sets alternatifs.',
      is_hot: false,
      bookingType: 'guestlist',
      musicGenre: 'Punk / Rock / Metal'
    },
    {
      id: 'n6',
      name: 'Tokyo Bar',
      type: 'Nightclub',
      location: 'Downtown',
      city: 'Montreal',
      vibe: 'Hip-Hop / R&B',
      rating: 4.5,
      price: '$$',
      priceTier: '$$',
      image: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=2070',
      description: 'Club branché avec ambiance Tokyo au cœur du centre-ville.',
      is_hot: true,
      bookingType: 'guestlist',
      musicGenre: 'Hip-Hop / R&B / Top 40'
    },
    {
      id: 'n7',
      name: 'Le Cercle',
      type: 'Club Underground',
      location: 'Saint-Roch',
      city: 'Quebec City',
      vibe: 'Underground / Electronic',
      rating: 4.6,
      price: '$$',
      priceTier: '$$',
      image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=2070',
      description: 'Meilleur club underground de Québec. Scène électronique locale.',
      is_hot: false,
      bookingType: 'ticket',
      musicGenre: 'Techno / House / Electronic'
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
    },
    {
      id: 'h4',
      name: 'Auberge Saint-Antoine',
      location: 'Old Quebec',
      city: 'Quebec City',
      type: 'Boutique Hotel',
      rating: 4.9,
      price: '$$$$',
      priceTier: 'VIP',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070',
      description: 'Boutique de luxe avec artefacts archéologiques exposés. Romance absolue.',
      is_hot: true,
      exclusive: true,
      bookingType: 'reservation'
    },
    {
      id: 'h5',
      name: 'Hotel Nelligan',
      location: 'Old Montreal',
      city: 'Montreal',
      type: 'Boutique Hotel',
      rating: 4.7,
      price: '$$$',
      priceTier: '$$$',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932',
      description: 'Charme historique avec une terrasse sur le toit spectaculaire.',
      is_hot: true,
      bookingType: 'reservation'
    },
    {
      id: 'h6',
      name: 'Hôtel 71',
      location: 'Old Quebec',
      city: 'Quebec City',
      type: 'Design Hotel',
      rating: 4.6,
      price: '$$$',
      priceTier: '$$$',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
      description: 'Hôtel design dans une ancienne banque avec vue imprenable.',
      is_hot: false,
      bookingType: 'reservation'
    }
  ]
};
