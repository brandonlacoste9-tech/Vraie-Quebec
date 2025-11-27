// Data access layer for places
// Replaces mock data with live Supabase queries

import { createClient } from '@/lib/supabase'
import type { Place, PlaceFilters, CreatePlaceInput } from '@/lib/types/database'

/**
 * Get all places with optional filters
 */
export async function getPlaces(filters?: PlaceFilters): Promise<Place[]> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[Places] Supabase client not available, returning empty array')
    return []
  }

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
    return []
  }

  return (data as Place[]) || []
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
    return []
  }

  const { data, error } = await supabase
    .from('places')
    .select('*')
    .or('is_hot.eq.true,exclusive.eq.true')
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[Places] Error fetching featured places:', error)
    return []
  }

  return (data as Place[]) || []
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

