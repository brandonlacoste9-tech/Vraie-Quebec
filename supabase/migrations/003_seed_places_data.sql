-- Migration: Seed initial places data from mock data
-- This populates the places table with the curated Quebec venues

-- Insert Restaurants
insert into public.places (
  name, type, city, location, rating, price, price_tier, image, description,
  is_hot, exclusive, booking_type, created_at
) values
  (
    'Au Pied de Cochon',
    'restaurant',
    'Montreal',
    'Plateau-Mont-Royal',
    4.8,
    '$$',
    '$$',
    'https://images.unsplash.com/photo-1586190848861-99c8f3bd8e6e?q=80&w=2070',
    'The legendary spot for foie gras poutine and excess.',
    true,
    false,
    'reservation',
    now()
  ),
  (
    'Joe Beef',
    'restaurant',
    'Montreal',
    'Little Burgundy',
    4.9,
    '$$$$',
    '$$$$',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070',
    'Montreal''s most famous dining experience. Book months ahead.',
    true,
    true,
    'reservation',
    now()
  ),
  (
    'Le Clan',
    'restaurant',
    'Quebec City',
    'Old Quebec',
    4.9,
    '$$$$',
    '$$$$',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974',
    'Stéphane Modat''s masterpiece celebrating Quebec''s terroir.',
    true,
    true,
    'reservation',
    now()
  ),
  (
    'Toqué!',
    'restaurant',
    'Montreal',
    'Place Jean-Paul-Riopelle',
    4.9,
    '$$$$',
    'VIP',
    'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070',
    'The pioneer of modern Quebec cuisine. A true culinary temple.',
    false,
    true,
    'reservation',
    now()
  );

-- Insert Nightlife Venues
insert into public.places (
  name, type, city, location, rating, price, price_tier, image, description,
  is_hot, booking_type, vibe, music_genre, event_lineup, has_vip, created_at
) values
  (
    'Stereo',
    'nightlife',
    'Montreal',
    'The Village',
    4.9,
    '$$',
    '$$',
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070',
    'Best sound system in North America. Strictly for music lovers.',
    true,
    'ticket',
    'Techno Temple',
    'Techno / House',
    ARRAY['Hernan Cattaneo', 'Danny Tenaglia'],
    true,
    now()
  ),
  (
    'La Voûte',
    'nightlife',
    'Montreal',
    'Old Montreal',
    4.6,
    '$$$$',
    'VIP',
    'https://images.unsplash.com/photo-1574391884720-77c76b395572?q=80&w=1974',
    'Inside the vault of the old Royal Bank. The place to be seen.',
    true,
    'guestlist',
    'Sophisticated / High Energy',
    null,
    ARRAY['DJ Spade'],
    true,
    now()
  ),
  (
    'Dagobert',
    'nightlife',
    'Quebec City',
    'Grande Allée',
    4.5,
    '$$',
    '$$',
    'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070',
    'A multi-floor castle of nightlife on Grande Allée.',
    false,
    'guestlist',
    'Party Castle',
    'Top 40 / Dance',
    null,
    false,
    now()
  ),
  (
    'New City Gas',
    'nightlife',
    'Montreal',
    'Griffintown',
    4.7,
    '$$$',
    '$$$',
    'https://images.unsplash.com/photo-1574391884720-77c76b395572?q=80&w=1974',
    'Massive heritage building hosting top DJs.',
    true,
    'ticket',
    'High Energy',
    null,
    ARRAY['Tiësto', 'Martin Garrix'],
    true,
    now()
  );

-- Update La Voûte with additional nightlife details
update public.places
set 
  party_type = 'Theatrical Nightlife',
  dress_code = 'Strictly Chic',
  exclusive = true
where name = 'La Voûte';

-- Update New City Gas with sponsorship
update public.places
set 
  is_sponsored = true,
  sponsor_name = 'Videotron',
  ad_url = 'https://videotron.com'
where name = 'New City Gas';

-- Insert Hotels
insert into public.places (
  name, type, city, location, rating, price, price_tier, image, description,
  is_hot, exclusive, booking_type, has_vip, created_at
) values
  (
    'Fairmont Le Château Frontenac',
    'hotel',
    'Quebec City',
    'Old Quebec',
    4.9,
    '$$$$',
    'VIP',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    'The most photographed hotel in the world. Pure history.',
    true,
    true,
    'reservation',
    true,
    now()
  ),
  (
    'Hotel William Gray',
    'hotel',
    'Montreal',
    'Old Montreal',
    4.8,
    '$$$',
    '$$$',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
    'Modern luxury in historic buildings with a killer rooftop.',
    true,
    false,
    'reservation',
    true,
    now()
  ),
  (
    'Ritz-Carlton Montréal',
    'hotel',
    'Montreal',
    'Downtown',
    5.0,
    '$$$$',
    'VIP',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',
    'The Grand Dame of Sherbrooke Street. Ultimate luxury.',
    false,
    true,
    'reservation',
    true,
    now()
  );

-- Update Ritz-Carlton with sponsorship
update public.places
set 
  is_sponsored = true,
  sponsor_name = 'Holt Renfrew',
  ad_url = 'https://holtrenfrew.com'
where name = 'Ritz-Carlton Montréal';

-- Add some VIP contact info for select venues
update public.places
set 
  vip_contact_name = 'Marc Tremblay',
  vip_contact_email = 'vip@lavoute.com',
  vip_min_spend = 500,
  vip_notes = 'VIP table reservations include bottle service. Dress code strictly enforced.'
where name = 'La Voûte';

update public.places
set 
  vip_contact_name = 'Sophie Dubois',
  vip_contact_email = 'concierge@ritzmontreal.com',
  vip_min_spend = 1000,
  vip_notes = 'VIP suites available with private concierge service.'
where name = 'Ritz-Carlton Montréal';

update public.places
set 
  vip_contact_name = 'Jean-François Roy',
  vip_contact_email = 'reservations@toque.com',
  vip_min_spend = 300,
  vip_notes = 'Chef''s table available for VIP guests. Advanced booking required.'
where name = 'Toqué!';

