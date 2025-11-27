# Supabase Setup for Vraie-Quebec

This directory contains all database migrations and setup scripts for the Vraie-Quebec VIP booking system.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Supabase CLI** (optional but recommended): 
   ```bash
   npm install -g supabase
   ```

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these in your Supabase project settings under **API**.

## Running Migrations

### Option 1: Using Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order:
   - `001_create_places_table.sql`
   - `002_create_vip_bookings_table.sql`
   - `003_seed_places_data.sql`

### Option 2: Using Supabase CLI

```bash
# Initialize Supabase in your project (if not already done)
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Or run individual migrations
supabase db execute --file supabase/migrations/001_create_places_table.sql
supabase db execute --file supabase/migrations/002_create_vip_bookings_table.sql
supabase db execute --file supabase/migrations/003_seed_places_data.sql
```

## Database Schema

### Tables

#### `places`
Stores all venues (restaurants, nightlife, hotels)
- **Primary Key**: `id` (UUID)
- **Indexes**: type, city, has_vip, is_hot, exclusive, booking_type
- **RLS**: Public read, admin write

#### `vip_bookings`
Stores VIP reservations and guestlist entries
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `place_id` → `places(id)`
- **Indexes**: place_id, user_id, status, booking_date, confirmation_code
- **RLS**: Users can read/create their own bookings, admins can manage all

## Row Level Security (RLS)

### Places Table
- **Public Read**: Anyone can view places
- **Admin Write**: Only authenticated users with `role='admin'` can create/update/delete

### VIP Bookings Table
- **Read Own**: Users can read their own bookings
- **Create**: Anyone can create bookings (including guests)
- **Update Own**: Users can update their own pending bookings
- **Admin Manage**: Admins can manage all bookings

## Setting Up Admin Users

To make a user an admin, update their metadata in Supabase:

1. Go to **Authentication** → **Users**
2. Click on a user
3. Scroll to **User Metadata**
4. Add:
   ```json
   {
     "role": "admin"
   }
   ```

## Data Structure

### Place Fields
- Basic info: name, type, city, location
- Media: image URL
- Ratings: rating (0-5), rating_count
- Pricing: price, price_tier
- Content: description, tags
- Status: is_hot, exclusive
- Booking: booking_type
- Nightlife: vibe, event_lineup, music_genre, party_type, dress_code
- Sponsorship: is_sponsored, sponsor_name, ad_url
- VIP: has_vip, vip_min_spend, vip_contact_*

### VIP Booking Fields
- Relations: place_id, user_id, user_email, user_name
- Booking: booking_type, booking_date, booking_time, party_size
- Status: status (pending/confirmed/cancelled/completed)
- Additional: special_request, confirmation_code
- VIP: table_number, minimum_spend

## Testing the Integration

After running migrations:

1. **Verify Tables**: Check that `places` and `vip_bookings` tables exist
2. **Check Seed Data**: You should see ~10 venues in the `places` table
3. **Test RLS**: Try querying from the app - you should see places
4. **Test Booking**: Try creating a VIP booking through the app

## Troubleshooting

### "relation does not exist" Error
- Make sure migrations ran successfully
- Check that you're connected to the correct Supabase project

### "permission denied" Error
- Verify RLS policies are set up correctly
- Check that public read policy exists for `places`

### No Data Showing
- Confirm seed data migration (`003_seed_places_data.sql`) ran
- Check Supabase logs for any errors

### Booking Creation Fails
- Verify `vip_bookings` table exists
- Check that the `place_id` being used exists in `places` table
- Ensure RLS policies allow inserts

## Adding More Venues

You can add venues through:

1. **SQL Editor** (Direct):
   ```sql
   insert into public.places (name, type, city, location, image, description, rating, price_tier, booking_type)
   values ('New Venue', 'restaurant', 'Montreal', 'Downtown', 'https://...', 'Description', 4.5, '$$$', 'reservation');
   ```

2. **Admin Panel** (Coming Soon):
   A web-based admin interface for managing venues

3. **API** (Programmatic):
   Use the `createPlace()` function from `lib/data/places.ts`

## Backup & Recovery

### Export Data
```bash
supabase db dump --file backup.sql
```

### Import Data
```bash
supabase db execute --file backup.sql
```

## Next Steps

1. Set up admin authentication
2. Create admin dashboard for venue management
3. Add email notifications for booking confirmations
4. Implement booking calendar view
5. Add analytics tracking

## Support

For issues or questions:
- Check Supabase docs: https://supabase.com/docs
- Review migration files for schema details
- Check application logs for errors

