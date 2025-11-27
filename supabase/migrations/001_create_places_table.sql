-- Migration: Create places table for Vraie-Quebec VIP system
-- Matches the Place interface from lib/data.ts

-- Create places table
create table if not exists public.places (
  id                uuid primary key default gen_random_uuid(),
  
  -- Basic Info
  name              text not null,
  type              text not null check (type in ('restaurant', 'nightlife', 'hotel', 'event')),
  city              text not null check (city in ('Montreal', 'Quebec City', 'Other')),
  location          text not null, -- neighborhood/area
  region            text,
  
  -- Contact & Location
  address           text,
  latitude          double precision,
  longitude         double precision,
  phone             text,
  website           text,
  google_maps_url   text,
  
  -- Media
  image             text not null, -- image URL
  
  -- Ratings & Pricing
  rating            real check (rating between 0 and 5) default 0,
  rating_count      integer default 0 check (rating_count >= 0),
  price             text, -- e.g. "$$", "$$$"
  price_tier        text check (price_tier in ('Free', '$', '$$', '$$$', '$$$$', 'VIP')),
  
  -- Content
  description       text not null,
  tags              text[] default '{}',
  
  -- Status
  is_hot            boolean default false,
  exclusive         boolean default false,
  
  -- Booking
  booking_type      text check (booking_type in ('reservation', 'ticket', 'guestlist', 'none')) default 'none',
  
  -- Nightlife Specific
  vibe              text,
  event_lineup      text[], -- Array of DJ/artist names
  music_genre       text,
  party_type        text,
  dress_code        text,
  
  -- Sponsorship
  is_sponsored      boolean default false,
  sponsor_name      text,
  ad_url            text,
  
  -- Opening hours (JSON structure for flexibility)
  opening_hours_json jsonb,
  
  -- VIP System
  has_vip           boolean default false,
  vip_min_spend     integer,
  vip_contact_name  text,
  vip_contact_phone text,
  vip_contact_email text,
  vip_notes         text,
  
  -- Audit
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Create indexes for performance
create index places_type_idx on public.places (type);
create index places_city_idx on public.places (city);
create index places_has_vip_idx on public.places (has_vip);
create index places_is_hot_idx on public.places (is_hot);
create index places_exclusive_idx on public.places (exclusive);
create index places_booking_type_idx on public.places (booking_type);
create index places_location_idx on public.places (latitude, longitude);

-- Enable Row Level Security
alter table public.places enable row level security;

-- Public read access (everyone can view places)
create policy "Public read places"
on public.places
for select
using (true);

-- Only authenticated users with admin role can insert/update/delete
-- (You can adjust this based on your auth setup)
create policy "Admin manage places"
on public.places
for all
using (
  auth.role() = 'authenticated' 
  and exists (
    select 1 from auth.users 
    where auth.users.id = auth.uid() 
    and auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_places_updated_at
before update on public.places
for each row execute function public.handle_updated_at();

