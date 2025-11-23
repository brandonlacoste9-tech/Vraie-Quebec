-- Create the venues table
create table if not exists venues (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text,
  rating numeric,
  image_url text,
  price text,
  location text,
  status text,
  tags text[],
  review_count integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table venues enable row level security;

-- Create a policy to allow public read access
create policy "Allow public read access" on venues
  for select using (true);

-- Insert seed data
insert into venues (name, description, category, rating, image_url, price, location, status, tags, review_count)
values
  (
    'LE SAINT-SULPICE',
    'Luxury hotel in Old Montreal',
    'HOTEL',
    4.8,
    '/luxury-hotel-montreal.jpg',
    '$$$',
    'Old Montreal',
    'Open Now',
    ARRAY['LUXURY', 'HISTORIC'],
    120
  ),
  (
    'LA BANQUISE',
    'Famous poutine spot',
    'RESTAURANT',
    4.5,
    '/poutine-restaurant.jpg',
    '$',
    'Plateau',
    'Open 24/7',
    ARRAY['CASUAL', 'ICONIC'],
    5000
  ),
  (
    'NOTRE-DAME BASILICA',
    'Historic basilica',
    'ATTRACTION',
    4.9,
    '/notre-dame-basilica-montreal.jpg',
    '$$',
    'Old Montreal',
    'Open Now',
    ARRAY['CULTURE', 'MUST-SEE'],
    3500
  ),
  (
    'MOUNT ROYAL',
    'Large park with city views',
    'PARK',
    4.9,
    '/mount-royal-park-montreal.jpg',
    'Free',
    'Montreal',
    'Open Now',
    ARRAY['NATURE', 'VIEWS'],
    4200
  );
