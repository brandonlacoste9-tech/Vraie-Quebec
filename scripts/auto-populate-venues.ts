/**
 * Auto-Populate Venues Script
 * Generates realistic Montreal restaurants, bars, and hotels using AI
 * Run with: npx tsx scripts/auto-populate-venues.ts
 */

import { createClient } from '@supabase/supabase-js'
import type { CreatePlaceInput } from '@/lib/types/database'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Realistic Montreal venues data
const restaurants = [
  {
    name: "Joe Beef",
    type: "restaurant" as const,
    city: "Montreal" as const,
    location: "Little Burgundy",
    description: "Iconic Montreal steakhouse known for its decadent dishes and extensive wine list. A must-visit for food lovers.",
    rating: 4.8,
    price_tier: "$$$$" as const,
    is_hot: true,
    exclusive: true,
    has_vip: true,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    tags: ["steakhouse", "fine dining", "wine"],
    booking_type: "reservation" as const,
  },
  {
    name: "Schwartz's Deli",
    type: "restaurant" as const,
    city: "Montreal" as const,
    location: "Plateau Mont-Royal",
    description: "Legendary smoked meat sandwich spot. A Montreal institution since 1928.",
    rating: 4.6,
    price_tier: "$" as const,
    is_hot: true,
    exclusive: false,
    has_vip: false,
    image: "https://images.unsplash.com/photo-1552569975-49b0e8aa8b5e?w=800",
    tags: ["deli", "sandwiches", "casual"],
    booking_type: "none" as const,
  },
  {
    name: "Au Pied de Cochon",
    type: "restaurant" as const,
    city: "Montreal" as const,
    location: "Plateau Mont-Royal",
    description: "Québécois cuisine at its finest. Foie gras poutine and decadent French-Canadian dishes.",
    rating: 4.7,
    price_tier: "$$$" as const,
    is_hot: true,
    exclusive: true,
    has_vip: true,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    tags: ["quebecois", "fine dining", "foie gras"],
    booking_type: "reservation" as const,
  },
  {
    name: "L'Express",
    type: "restaurant" as const,
    city: "Montreal" as const,
    location: "Plateau Mont-Royal",
    description: "Classic French bistro serving authentic Parisian cuisine in the heart of Montreal.",
    rating: 4.5,
    price_tier: "$$" as const,
    is_hot: false,
    exclusive: false,
    has_vip: false,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    tags: ["french", "bistro", "brunch"],
    booking_type: "reservation" as const,
  },
  {
    name: "Kazu",
    type: "restaurant" as const,
    city: "Montreal" as const,
    location: "Shaughnessy Village",
    description: "Authentic Japanese izakaya with incredible ramen and small plates. Always packed.",
    rating: 4.6,
    price_tier: "$$" as const,
    is_hot: true,
    exclusive: false,
    has_vip: false,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
    tags: ["japanese", "ramen", "izakaya"],
    booking_type: "none" as const,
  },
]

const bars = [
  {
    name: "Bar Big in Japan",
    type: "nightlife" as const,
    city: "Montreal" as const,
    location: "Plateau Mont-Royal",
    description: "Tiny hidden bar with incredible cocktails and Japanese-inspired vibes. Hard to find, worth the search.",
    rating: 4.7,
    price_tier: "$$" as const,
    is_hot: true,
    exclusive: true,
    has_vip: true,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800",
    tags: ["cocktails", "hidden", "intimate"],
    booking_type: "none" as const,
    vibe: "Intimate & Cozy",
    music_genre: "Hip-Hop & R&B",
    party_type: "Cocktail Bar",
  },
  {
    name: "Le Belmont",
    type: "nightlife" as const,
    city: "Montreal" as const,
    location: "Mile End",
    description: "Legendary dive bar with cheap drinks, great music, and an authentic Montreal vibe.",
    rating: 4.4,
    price_tier: "$" as const,
    is_hot: true,
    exclusive: false,
    has_vip: false,
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800",
    tags: ["dive bar", "cheap drinks", "live music"],
    booking_type: "none" as const,
    vibe: "Casual & Lively",
    music_genre: "Rock & Indie",
    party_type: "Dive Bar",
  },
  {
    name: "New City Gas",
    type: "nightlife" as const,
    city: "Montreal" as const,
    location: "Griffintown",
    description: "Massive warehouse club hosting top DJs and electronic music events. The place to be on weekends.",
    rating: 4.5,
    price_tier: "$$$" as const,
    is_hot: true,
    exclusive: true,
    has_vip: true,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    tags: ["club", "electronic", "djs"],
    booking_type: "guestlist" as const,
    vibe: "High Energy",
    music_genre: "Electronic & EDM",
    party_type: "Nightclub",
    dress_code: "Upscale",
  },
  {
    name: "Baldwin Barmacie",
    type: "nightlife" as const,
    city: "Montreal" as const,
    location: "Plateau Mont-Royal",
    description: "Stylish cocktail bar with creative drinks and a sophisticated atmosphere.",
    rating: 4.6,
    price_tier: "$$" as const,
    is_hot: false,
    exclusive: false,
    has_vip: false,
    image: "https://images.unsplash.com/photo-1572116469699-efb0f11e6167?w=800",
    tags: ["cocktails", "sophisticated", "date night"],
    booking_type: "reservation" as const,
    vibe: "Sophisticated",
    music_genre: "Jazz & Lounge",
    party_type: "Cocktail Bar",
  },
  {
    name: "Stereo",
    type: "nightlife" as const,
    city: "Montreal" as const,
    location: "Gay Village",
    description: "Underground techno club with world-class sound system. A Montreal techno institution.",
    rating: 4.8,
    price_tier: "$$" as const,
    is_hot: true,
    exclusive: true,
    has_vip: true,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    tags: ["techno", "underground", "sound system"],
    booking_type: "ticket" as const,
    vibe: "Underground & Raw",
    music_genre: "Techno",
    party_type: "Nightclub",
  },
]

const hotels = [
  {
    name: "Ritz-Carlton Montreal",
    type: "hotel" as const,
    city: "Montreal" as const,
    location: "Golden Square Mile",
    description: "Luxury hotel in the heart of downtown. Iconic Montreal landmark with world-class service.",
    rating: 4.8,
    price_tier: "$$$$" as const,
    is_hot: true,
    exclusive: true,
    has_vip: true,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    tags: ["luxury", "downtown", "spa"],
    booking_type: "reservation" as const,
  },
  {
    name: "Hotel William Gray",
    type: "hotel" as const,
    city: "Montreal" as const,
    location: "Old Montreal",
    description: "Boutique hotel in Old Montreal with stunning views and modern amenities.",
    rating: 4.7,
    price_tier: "$$$" as const,
    is_hot: true,
    exclusive: false,
    has_vip: true,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    tags: ["boutique", "old montreal", "rooftop"],
    booking_type: "reservation" as const,
  },
  {
    name: "Auberge du Vieux-Port",
    type: "hotel" as const,
    city: "Montreal" as const,
    location: "Old Montreal",
    description: "Charming hotel in historic Old Montreal with exposed brick and French-Canadian charm.",
    rating: 4.6,
    price_tier: "$$$" as const,
    is_hot: false,
    exclusive: false,
    has_vip: false,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    tags: ["historic", "old montreal", "charming"],
    booking_type: "reservation" as const,
  },
]

async function populateVenues() {
  console.log('🚀 Starting venue population...')
  
  const allVenues = [...restaurants, ...bars, ...hotels]
  
  for (const venue of allVenues) {
    try {
      const { data, error } = await supabase
        .from('places')
        .insert({
          ...venue,
          rating_count: Math.floor(Math.random() * 500) + 50,
          price: venue.price_tier,
          address: `${Math.floor(Math.random() * 9999)} ${venue.location} St, Montreal, QC`,
          latitude: 45.5017 + (Math.random() - 0.5) * 0.1,
          longitude: -73.5673 + (Math.random() - 0.5) * 0.1,
        })
        .select()
        .single()

      if (error) {
        if (error.code === '23505') {
          console.log(`⏭️  ${venue.name} already exists, skipping...`)
        } else {
          console.error(`❌ Error inserting ${venue.name}:`, error.message)
        }
      } else {
        console.log(`✅ Added: ${venue.name}`)
      }
    } catch (error) {
      console.error(`❌ Error with ${venue.name}:`, error)
    }
  }
  
  console.log('✨ Venue population complete!')
}

populateVenues().catch(console.error)

