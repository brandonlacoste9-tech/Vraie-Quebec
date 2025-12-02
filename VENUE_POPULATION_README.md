# Auto-Populate Venues Script

## Overview
This script automatically populates the database with realistic Montreal restaurants, bars, and hotels.

## Usage

### Prerequisites
1. Set up Supabase environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### Run the Script
```bash
npx tsx scripts/auto-populate-venues.ts
```

Or with ts-node:
```bash
npx ts-node scripts/auto-populate-venues.ts
```

## What It Does
- Adds 5 realistic Montreal restaurants (Joe Beef, Schwartz's, Au Pied de Cochon, etc.)
- Adds 5 bars/clubs (Bar Big in Japan, Le Belmont, New City Gas, etc.)
- Adds 3 hotels (Ritz-Carlton, Hotel William Gray, Auberge du Vieux-Port)
- Includes proper metadata: ratings, descriptions, locations, VIP status
- Skips duplicates (won't re-add existing venues)

## Data Included
- Names, descriptions, locations
- Ratings and price tiers
- VIP status and booking types
- Music genres and vibes (for bars)
- Images (using Unsplash placeholders)

## Next Steps
After running, venues will appear in:
- `/restaurants` page
- `/bars` page
- Featured spots section
- Search results

