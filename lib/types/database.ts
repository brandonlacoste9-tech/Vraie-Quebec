// Database types for Supabase integration
// Generated to match the places and vip_bookings tables

export type PlaceType = 'restaurant' | 'nightlife' | 'hotel' | 'event'
export type CityType = 'Montreal' | 'Quebec City' | 'Other'
export type PriceTier = 'Free' | '$' | '$$' | '$$$' | '$$$$' | 'VIP'
export type BookingType = 'reservation' | 'ticket' | 'guestlist' | 'none'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type VipBookingType = 'guestlist' | 'vip' | 'event'

export interface Place {
  id: string
  
  // Basic Info
  name: string
  type: PlaceType
  city: CityType
  location: string // neighborhood/area
  region: string | null
  
  // Contact & Location
  address: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  website: string | null
  google_maps_url: string | null
  
  // Media
  image: string
  
  // Ratings & Pricing
  rating: number
  rating_count: number
  price: string | null
  price_tier: PriceTier | null
  
  // Content
  description: string
  tags: string[]
  
  // Status
  is_hot: boolean
  exclusive: boolean
  
  // Booking
  booking_type: BookingType
  
  // Nightlife Specific
  vibe: string | null
  event_lineup: string[] | null
  music_genre: string | null
  party_type: string | null
  dress_code: string | null
  
  // Sponsorship
  is_sponsored: boolean
  sponsor_name: string | null
  ad_url: string | null
  
  // Opening hours
  opening_hours_json: Record<string, { open: string; close: string } | null> | null
  
  // VIP System
  has_vip: boolean
  vip_min_spend: number | null
  vip_contact_name: string | null
  vip_contact_phone: string | null
  vip_contact_email: string | null
  vip_notes: string | null
  
  // Audit
  created_at: string
  updated_at: string
}

export interface VipBooking {
  id: string
  
  // Relations
  place_id: string
  user_id: string | null
  user_email: string | null
  user_name: string
  
  // Booking Details
  booking_type: VipBookingType
  booking_date: string // ISO date
  booking_time: string | null // HH:mm
  party_size: number
  
  // Status
  status: BookingStatus
  
  // Additional Info
  special_request: string | null
  confirmation_code: string | null
  
  // VIP Specific
  table_number: string | null
  minimum_spend: number | null
  
  // Sponsor Info
  sponsor_name: string | null
  
  // Audit
  created_at: string
  updated_at: string
  confirmed_at: string | null
  cancelled_at: string | null
}

// Input types for creating/updating
export interface CreatePlaceInput {
  name: string
  type: PlaceType
  city: CityType
  location: string
  image: string
  description: string
  rating?: number
  price?: string
  price_tier?: PriceTier
  booking_type?: BookingType
  is_hot?: boolean
  exclusive?: boolean
  vibe?: string
  music_genre?: string
  event_lineup?: string[]
  party_type?: string
  dress_code?: string
  is_sponsored?: boolean
  sponsor_name?: string
  ad_url?: string
  has_vip?: boolean
  vip_min_spend?: number
  vip_contact_name?: string
  vip_contact_email?: string
  vip_notes?: string
}

export interface CreateVipBookingInput {
  place_id: string
  user_id?: string | null
  user_email?: string | null
  user_name: string
  booking_type: VipBookingType
  booking_date: string // YYYY-MM-DD
  booking_time?: string // HH:mm
  party_size: number
  special_request?: string
  sponsor_name?: string
}

// Filter types for queries
export interface PlaceFilters {
  type?: PlaceType
  city?: CityType
  has_vip?: boolean
  is_hot?: boolean
  exclusive?: boolean
  booking_type?: BookingType
  search?: string // For name/description search
}

