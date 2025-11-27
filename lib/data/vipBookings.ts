// Data access layer for VIP bookings
// Handles reservations, guestlist, and VIP table bookings

import { createClient } from '@/lib/supabase'
import type { VipBooking, CreateVipBookingInput } from '@/lib/types/database'

/**
 * Create a new VIP booking
 */
export async function createVipBooking(input: CreateVipBookingInput): Promise<VipBooking | null> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[VIP Bookings] Supabase client not available')
    throw new Error('Database connection not available')
  }

  const { data, error } = await supabase
    .from('vip_bookings')
    .insert({
      place_id: input.place_id,
      user_id: input.user_id || null,
      user_email: input.user_email || null,
      user_name: input.user_name,
      booking_type: input.booking_type,
      booking_date: input.booking_date,
      booking_time: input.booking_time || null,
      party_size: input.party_size,
      special_request: input.special_request || null,
      sponsor_name: input.sponsor_name || null,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('[VIP Bookings] Error creating booking:', error)
    throw error
  }

  return data as VipBooking
}

/**
 * Get booking by confirmation code
 */
export async function getBookingByConfirmationCode(code: string): Promise<VipBooking | null> {
  const supabase = createClient()
  
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('vip_bookings')
    .select('*')
    .eq('confirmation_code', code)
    .single()

  if (error) {
    console.error('[VIP Bookings] Error fetching booking:', error)
    return null
  }

  return data as VipBooking
}

/**
 * Get user's bookings
 */
export async function getUserBookings(userId: string): Promise<VipBooking[]> {
  const supabase = createClient()
  
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('vip_bookings')
    .select('*')
    .eq('user_id', userId)
    .order('booking_date', { ascending: false })

  if (error) {
    console.error('[VIP Bookings] Error fetching user bookings:', error)
    return []
  }

  return (data as VipBooking[]) || []
}

/**
 * Get bookings for a specific place
 */
export async function getPlaceBookings(placeId: string): Promise<VipBooking[]> {
  const supabase = createClient()
  
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('vip_bookings')
    .select('*')
    .eq('place_id', placeId)
    .order('booking_date', { ascending: true })

  if (error) {
    console.error('[VIP Bookings] Error fetching place bookings:', error)
    return []
  }

  return (data as VipBooking[]) || []
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  id: string,
  status: 'confirmed' | 'cancelled' | 'completed'
): Promise<VipBooking | null> {
  const supabase = createClient()
  
  if (!supabase) {
    return null
  }

  const updates: any = { status }
  
  if (status === 'confirmed') {
    updates.confirmed_at = new Date().toISOString()
  } else if (status === 'cancelled') {
    updates.cancelled_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('vip_bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('[VIP Bookings] Error updating booking status:', error)
    throw error
  }

  return data as VipBooking
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string): Promise<boolean> {
  try {
    await updateBookingStatus(id, 'cancelled')
    return true
  } catch (error) {
    console.error('[VIP Bookings] Error cancelling booking:', error)
    return false
  }
}

/**
 * Get upcoming bookings (for admin dashboard)
 */
export async function getUpcomingBookings(limit: number = 50): Promise<VipBooking[]> {
  const supabase = createClient()
  
  if (!supabase) {
    return []
  }

  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('vip_bookings')
    .select('*')
    .gte('booking_date', today)
    .in('status', ['pending', 'confirmed'])
    .order('booking_date', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('[VIP Bookings] Error fetching upcoming bookings:', error)
    return []
  }

  return (data as VipBooking[]) || []
}

/**
 * Get booking statistics for a place
 */
export async function getPlaceBookingStats(placeId: string) {
  const supabase = createClient()
  
  if (!supabase) {
    return { total: 0, pending: 0, confirmed: 0, cancelled: 0 }
  }

  const { data, error } = await supabase
    .from('vip_bookings')
    .select('status')
    .eq('place_id', placeId)

  if (error) {
    console.error('[VIP Bookings] Error fetching booking stats:', error)
    return { total: 0, pending: 0, confirmed: 0, cancelled: 0 }
  }

  const stats = {
    total: data.length,
    pending: data.filter(b => b.status === 'pending').length,
    confirmed: data.filter(b => b.status === 'confirmed').length,
    cancelled: data.filter(b => b.status === 'cancelled').length,
  }

  return stats
}

