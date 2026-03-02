// Data access layer for places
// Replaces mock data with live Supabase queries

import { createClient } from '@/lib/supabase'
import type { Place, PlaceFilters, CreatePlaceInput } from '@/lib/types/database'

// Hardcoded fallback data to populate placeholders based on user request
const FALLBACK_PLACES: Place[] = [
  // Restaurants (Montreal)
  {
    id: 'rest-mtl-1', name: 'Joe Beef', type: 'restaurant', city: 'Montreal', location: 'Little Burgundy', region: null,
    address: '2491 Notre-Dame St W', latitude: 45.48318, longitude: -73.57683, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', rating: 4.8, rating_count: 1200,
    price: null, price_tier: '$$$$', description: 'Iconic Montreal steakhouse known for its decadent dishes and wine.', tags: ['steakhouse', 'fine dining'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Restaurants (Quebec)
  {
    id: 'rest-qc-1', name: 'Le Saint-Amour', type: 'restaurant', city: 'Quebec City', location: 'Vieux-Québec', region: null,
    address: '48 Rue Sainte-Ursule', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', rating: 4.9, rating_count: 850,
    price: null, price_tier: '$$$$', description: 'Romantic fine-dining restaurant with typical French gastronomy.', tags: ['french', 'romantic'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Bars / Nightlife (Montreal)
  {
    id: 'bar-mtl-1', name: 'Bar Big in Japan', type: 'nightlife', city: 'Montreal', location: 'Plateau Mont-Royal', region: null,
    address: '4175 Blvd Saint-Laurent', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800', rating: 4.7, rating_count: 600,
    price: null, price_tier: '$$', description: 'Hidden speakeasy with Japanese whiskey and sophisticated decor.', tags: ['speakeasy', 'cocktails'],
    is_hot: true, exclusive: true, booking_type: 'none', vibe: 'Intimate & Cozy', event_lineup: null, music_genre: 'Jazz & Lounge', party_type: 'Cocktail Bar',
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Bars / Nightlife (Quebec)
  {
    id: 'bar-qc-1', name: 'Maurice Nightclub', type: 'nightlife', city: 'Quebec City', location: 'Grande Allée', region: null,
    address: '575 Grande Allée E', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', rating: 4.5, rating_count: 450,
    price: null, price_tier: '$$$', description: 'The absolute legendary nightlife spot in the heart of Quebec City.', tags: ['club', 'electronic'],
    is_hot: true, exclusive: true, booking_type: 'guestlist', vibe: 'High Energy', event_lineup: null, music_genre: 'Electronic & EDM', party_type: 'Nightclub',
    dress_code: 'Upscale', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Hotels (Montreal)
  {
    id: 'hotel-mtl-1', name: 'Ritz-Carlton Montreal', type: 'hotel', city: 'Montreal', location: 'Golden Square Mile', region: null,
    address: '1228 Sherbrooke St W', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', rating: 4.9, rating_count: 2310,
    price: null, price_tier: '$$$$', description: 'Luxury hotel in the heart of downtown. Old-world charm meets modern prestige.', tags: ['luxury', 'downtown'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Hotels (Quebec)
  {
    id: 'hotel-qc-1', name: 'Fairmont Le Château Frontenac', type: 'hotel', city: 'Quebec City', location: 'Vieux-Québec', region: null,
    address: '1 Rue des Carrières', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', rating: 4.9, rating_count: 5500,
    price: null, price_tier: '$$$$', description: 'World-famous iconic castle hotel overlooking the majestic St. Lawrence River.', tags: ['historic', 'luxury'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  }
];

function applyFilters(places: Place[], filters?: PlaceFilters): Place[] {
  let filtered = [...places];
  if (filters?.type) filtered = filtered.filter(p => p.type === filters.type);
  if (filters?.city) filtered = filtered.filter(p => p.city === filters.city);
  if (filters?.has_vip !== undefined) filtered = filtered.filter(p => p.has_vip === filters.has_vip);
  if (filters?.is_hot !== undefined) filtered = filtered.filter(p => p.is_hot === filters.is_hot);
  if (filters?.exclusive !== undefined) filtered = filtered.filter(p => p.exclusive === filters.exclusive);
  if (filters?.booking_type) filtered = filtered.filter(p => p.booking_type === filters.booking_type);
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
  }
  return filtered;
}

/**
 * Get all places with optional filters
 */
export async function getPlaces(filters?: PlaceFilters): Promise<Place[]> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[Places] Supabase client not available, returning fallback data')
    return applyFilters(FALLBACK_PLACES, filters)
  }

  try {
    let query = supabase
      .from('places')
      .select('*')

    // Apply filters
    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    
    if (filters?.city) {
      query = query.eq('city', filters.city)
    }
    
    if (filters?.has_vip !== undefined) {
      query = query.eq('has_vip', filters.has_vip)
    }
    
    if (filters?.is_hot !== undefined) {
      query = query.eq('is_hot', filters.is_hot)
    }
    
    if (filters?.exclusive !== undefined) {
      query = query.eq('exclusive', filters.exclusive)
    }
    
    if (filters?.booking_type) {
      query = query.eq('booking_type', filters.booking_type)
    }
    
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    // Order by rating (hot spots first, then by rating)
    query = query.order('is_hot', { ascending: false })
    query = query.order('rating', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('[Places] Error fetching places:', error)
      return applyFilters(FALLBACK_PLACES, filters)
    }

    if (!data || data.length === 0) {
      return applyFilters(FALLBACK_PLACES, filters)
    }

    return (data as Place[])
  } catch (error) {
    console.error('[Places] Exception:', error)
    return applyFilters(FALLBACK_PLACES, filters)
  }
}

/**
 * Get a single place by ID
 */
export async function getPlaceById(id: string): Promise<Place | null> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[Places] Supabase client not available')
    return null
  }

  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[Places] Error fetching place:', error)
    return null
  }

  return data as Place
}

/**
 * Get places by category (restaurants, nightlife, hotels)
 */
export async function getPlacesByCategory(category: 'restaurant' | 'nightlife' | 'hotel'): Promise<Place[]> {
  return getPlaces({ type: category })
}

/**
 * Get featured/hot spots
 */
export async function getFeaturedPlaces(limit: number = 8): Promise<Place[]> {
  const supabase = createClient()
  
  if (!supabase) {
    return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
  }

  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .or('is_hot.eq.true,exclusive.eq.true')
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[Places] Error fetching featured places:', error)
      return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
    }

    if (!data || data.length === 0) {
      return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
    }

    return (data as Place[])
  } catch (error) {
    return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
  }
}

/**
 * Get VIP venues
 */
export async function getVipPlaces(): Promise<Place[]> {
  return getPlaces({ has_vip: true })
}

/**
 * Search places by name or description
 */
export async function searchPlaces(searchTerm: string): Promise<Place[]> {
  return getPlaces({ search: searchTerm })
}

/**
 * Create a new place (admin only)
 */
export async function createPlace(input: CreatePlaceInput): Promise<Place | null> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[Places] Supabase client not available')
    return null
  }

  const { data, error } = await supabase
    .from('places')
    .insert(input)
    .select()
    .single()

  if (error) {
    console.error('[Places] Error creating place:', error)
    throw error
  }

  return data as Place
}

/**
 * Update a place (admin only)
 */
export async function updatePlace(id: string, updates: Partial<CreatePlaceInput>): Promise<Place | null> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[Places] Supabase client not available')
    return null
  }

  const { data, error } = await supabase
    .from('places')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('[Places] Error updating place:', error)
    throw error
  }

  return data as Place
}

/**
 * Delete a place (admin only)
 */
export async function deletePlace(id: string): Promise<boolean> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[Places] Supabase client not available')
    return false
  }

  const { error } = await supabase
    .from('places')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[Places] Error deleting place:', error)
    return false
  }

  return true
}

