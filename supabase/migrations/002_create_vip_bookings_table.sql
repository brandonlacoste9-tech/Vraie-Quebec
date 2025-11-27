-- Migration: Create VIP bookings table
-- Handles actual VIP reservations and guestlist entries

create table if not exists public.vip_bookings (
  id                uuid primary key default gen_random_uuid(),
  
  -- Relations
  place_id          uuid not null references public.places(id) on delete cascade,
  user_id           uuid, -- Can be null for guest bookings
  user_email        text, -- Store email for guest bookings
  user_name         text not null,
  
  -- Booking Details
  booking_type      text not null check (booking_type in ('guestlist', 'vip', 'event')),
  booking_date      date not null,
  booking_time      time,
  party_size        integer not null check (party_size > 0 and party_size <= 20),
  
  -- Status
  status            text not null check (status in ('pending', 'confirmed', 'cancelled', 'completed')) default 'pending',
  
  -- Additional Info
  special_request   text,
  confirmation_code text unique,
  
  -- VIP Specific
  table_number      text,
  minimum_spend     integer,
  
  -- Sponsor Info (if applicable)
  sponsor_name      text,
  
  -- Audit
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  confirmed_at      timestamptz,
  cancelled_at      timestamptz
);

-- Indexes
create index vip_bookings_place_idx on public.vip_bookings(place_id);
create index vip_bookings_user_idx on public.vip_bookings(user_id);
create index vip_bookings_status_idx on public.vip_bookings(status);
create index vip_bookings_date_idx on public.vip_bookings(booking_date);
create index vip_bookings_confirmation_idx on public.vip_bookings(confirmation_code);

-- Enable RLS
alter table public.vip_bookings enable row level security;

-- Users can read their own bookings
create policy "Read own vip bookings"
on public.vip_bookings
for select
using (
  auth.uid() is null 
  or user_id = auth.uid()
  or user_email = auth.jwt()->>'email'
);

-- Authenticated users can create bookings
create policy "Create vip bookings"
on public.vip_bookings
for insert
with check (true); -- Allow anyone to create bookings (including guests)

-- Users can update their own pending bookings
create policy "Update own pending bookings"
on public.vip_bookings
for update
using (
  status = 'pending'
  and (
    auth.uid() is null 
    or user_id = auth.uid()
    or user_email = auth.jwt()->>'email'
  )
);

-- Admins can manage all bookings
create policy "Admin manage all bookings"
on public.vip_bookings
for all
using (
  exists (
    select 1 from auth.users 
    where auth.users.id = auth.uid() 
    and auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Trigger for updated_at
create trigger set_vip_bookings_updated_at
before update on public.vip_bookings
for each row execute function public.handle_updated_at();

-- Function to generate confirmation code
create or replace function generate_confirmation_code()
returns text as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Removed ambiguous chars
  result text := '';
  i integer;
begin
  for i in 1..8 loop
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  end loop;
  return result;
end;
$$ language plpgsql;

-- Trigger to auto-generate confirmation code
create or replace function set_confirmation_code()
returns trigger as $$
begin
  if new.confirmation_code is null then
    new.confirmation_code := generate_confirmation_code();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger set_booking_confirmation_code
before insert on public.vip_bookings
for each row execute function set_confirmation_code();

