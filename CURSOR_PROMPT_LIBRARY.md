# 🎖️ Vraie Québec: Battle-Tested Cursor Prompt Library

**Stack-Specific Prompts for:**
- Next.js 15 (App Router)
- Tailwind + Radix UI
- Neon / Fire / Glass UI theme
- Supabase (restaurants, bars, hotels, events)
- Vercel AI SDK (Nano Banana Pro, text → image, image editing)
- Québec nightlife + booking + AI assistant

---

## 🎨 **1. UI / Styling Prompts**

Perfect for your dark-gold-neon nightlife theme.

### ✨ Polish a section

```
Refactor this component to match the Vraie Québec design system:
- dark gradient backgrounds (#000000 → #0A0A0A)
- neon accent (#FFEB9C)
- subtle blur glass cards
- 1px gold borders
- Montréal nightlife aesthetic

Ensure mobile responsiveness. Do not change functionality, only style.
```

### ✨ Upgrade a card (event, restaurant, bar)

```
Update this card to follow Vraie Québec standards:
- glass effect
- glowing hover state
- gold title stroke
- add subtle motion using Framer Motion
- support dark/light mode seamlessly
```

### ✨ Improve the hero section

```
Enhance the hero section with:
- dynamic gold glow
- atmospheric particles (CSS only)
- bolder Quebec typography
- better readability on dark background

Keep the existing structure; only improve visuals.
```

---

## 📊 **2. Data / Supabase / Live Content**

Core: **restaurants • bars • events • hotels • nightlife hotspots**

### 🔥 Add a new venue type

```
Add new venueType "Comedy Club" to the Vraie Québec schema:
- Supabase table definition
- API route (/api/venues/[id])
- Filtering UI component
- Update Featured Spots and Map Search
```

### 🔥 Convert mock data to live Supabase data

```
Replace all mock venue data in `lib/data.ts` with real Supabase reads.
Add caching using React's `unstable_cache`.
Ensure the venue page loads instantly with fallback skeletons.
```

### 🔥 Add a booking request button

```
Add a "Réserver" button to each venue card.
When clicked:
- open a modal collecting name, phone, date, group size
- submit to Supabase table "booking_requests"
- show toast confirmation
```

---

## 🍌 **3. Nano Banana Pro Prompts**

Your AI art feature deserves elite prompts.

### 🍌 Fix Nano Banana generation

```
Review the Nano Banana Pro generator.  
Debug why the generation request is not firing.  
Verify:
- AI_GATEWAY_API_KEY visibility in server actions
- /api/check-api-key route
- model invocation inside useImageGeneration hook

Add graceful error handling + loading UI.
```

### 🍌 Add image-to-image editing

```
Add an "Edit with Nano Banana" button to uploaded images.
When clicked:
- Open the editing panel
- Enable strength slider
- Send original image + prompt to Nano Banana model

Update preview live.
```

### 🍌 Add generation history (Supabase)

```
Store each generated image into Supabase table "ai_generations" with:
- image URL
- prompt
- time
- userId

Create a /creer/history UI to browse previous generations.
```

---

## 📍 **4. Navigation & Pages**

TripAdvisor + Booking + AI hybrid.

### 📍 Add venue detail layout

```
Refactor the venue detail page layout:
- add sticky booking sidebar
- add photo grid with lightbox
- add map embed
- add dynamic review section

Keep SEO metadata updated via generateMetadata().
```

### 📍 Add category pages

Restaurants, Bars, Events, Hotels, Clubs.

```
Create category pages under /[category]:
- dynamic filtering
- sorting by distance, rating, popularity
- infinite scroll
- server components for data fetch
```

### 📍 Add trending this weekend

```
Add a new section "À ne pas manquer ce weekend".
Query Supabase:
- events where date between now() and +3 days
- order by popularity desc

Display in a marquee-like horizontal scroll.
```

---

## 🔍 **5. SEO, Performance, Metadata**

Critical for restaurants + nightlife discovery.

### 🔍 Improve SEO

```
Optimize SEO across all Vraie Québec pages:
- add metadata description per category
- add OpenGraph for all venue pages
- add Loading Skeleton for LCP stability
- prefetch categories on hover
```

### 🔍 Add real-time search

```
Implement instant search using Supabase full text search:
- debounce input
- return results in under 100ms
- show categories: restaurant, bar, event, hotel
```

### 🔍 Speed boost

```
Boost performance:
- convert heavy images to next/image
- compress background assets
- remove unused client components
- apply streaming SSR on venue pages
```

---

## 🛠️ **6. Admin / Backoffice**

Eventually you'll need it.

```
Create /admin dashboard:
- add venues
- edit events
- upload pictures
- manage featured spots

Require password (simple admin auth for now).
```

---

## 📅 **7. Advanced Booking**

```
Add booking confirmation flow:
- generate QR code
- email confirmation via Supabase Edge Functions
- store booking in Supabase

Add a "Mes Réservations" page for users.
```

---

## 🤖 **8. Full AI Concierge (KILLER FEATURE)**

```
Create AI Concierge:
- Users ask: "Trouve-moi un bar jazz à Montréal ce soir"
- Query Supabase for matching venues
- Have AI summarize + suggest 3 choices
- Show map and booking buttons

Place feature at /concierge with chat UI
```

---

## 🎯 **Quick-Win Prompts (Do These First)**

### 1. Fix Image Generation
```
Debug and fix the Nano Banana Pro image generation:
- Verify API key is accessible
- Check model invocation
- Add error boundaries
- Test with simple prompt "Montreal nightlife neon"
```

### 2. Add Search Bar
```
Add instant search to header:
- Search venues by name/description
- Show results in dropdown
- Navigate to venue on click
- Mobile-friendly
```

### 3. Improve Mobile UX
```
Audit mobile experience:
- Fix header on small screens
- Ensure cards stack properly
- Test booking modal on mobile
- Add touch-friendly buttons
```

### 4. Add Loading States
```
Add proper loading states everywhere:
- Skeleton cards for featured spots
- Shimmer effect for images
- Loading spinner for bookings
- Prevent layout shift
```

### 5. Enhance Venue Page
```
Improve venue detail page:
- Add photo gallery
- Show opening hours
- Display contact info
- Add "Get Directions" button
- Show related venues
```

---

## 🚀 **Advanced Feature Prompts**

### Social Features
```
Add social features:
- Users can "favorite" venues
- Share venue to social media
- Add reviews and ratings
- Upload photos
```

### Event Calendar
```
Create event calendar:
- Monthly view
- Filter by venue type
- Show event details on click
- Add to Google Calendar
```

### Loyalty Program
```
Implement loyalty system:
- Track bookings
- Award points
- Show VIP status
- Unlock exclusive venues
```

### Multi-Language
```
Add French/English toggle:
- Use next-intl
- Translate all UI strings
- Keep URLs localized
- Preserve user preference
```

---

## 📱 **PWA & Native Features**

```
Convert to Progressive Web App:
- Add manifest.json
- Enable offline mode
- Add install prompt
- Enable push notifications for events
```

---

## 🎨 **Theme Customization**

```
Add theme variants:
- Montreal (gold/black)
- Quebec City (royal blue/gold)
- Summer (bright/warm)
- Winter (ice blue/white)

Store preference in localStorage.
```

---

## 🔐 **Authentication & User Profiles**

```
Add Supabase Auth:
- Email/password signup
- Social login (Google, Facebook)
- User profile page
- Booking history
- Saved venues
```

---

## 📊 **Analytics & Insights**

```
Add analytics dashboard:
- Track popular venues
- Monitor booking trends
- Show user engagement
- Export reports
```

---

## 🎭 **Julien AI Enhancements**

```
Upgrade Julien AI:
- Add voice input (Web Speech API)
- Show typing indicators
- Add personality responses
- Remember conversation context
- Suggest follow-up questions
```

---

## 🌟 **Premium Features**

```
Add premium tier:
- Priority booking
- Exclusive venues
- Concierge service
- Skip-the-line passes
- VIP events access
```

---

## 🎪 **Event Management**

```
Create event system:
- Recurring events
- Ticket sales
- Capacity management
- Check-in system
- Event analytics
```

---

## 🗺️ **Map Integration**

```
Add interactive map:
- Show all venues on map
- Filter by category
- Cluster markers
- Show user location
- Get directions
```

---

## 📧 **Email Marketing**

```
Implement email campaigns:
- Weekly newsletter
- Event reminders
- Booking confirmations
- Personalized recommendations
- Unsubscribe management
```

---

## 🎬 **Video Content**

```
Add video features:
- Venue video tours
- Event highlights
- User-generated content
- Video gallery
- Auto-play on hover
```

---

## 💳 **Payment Integration**

```
Add Stripe payments:
- Deposit for VIP tables
- Event tickets
- Subscription plans
- Refund handling
- Invoice generation
```

---

## 📱 **Mobile App Prep**

```
Prepare for React Native:
- Extract business logic
- Create API layer
- Design mobile-first components
- Test responsive layouts
```

---

## 🎯 **Priority Order (Recommended)**

1. **Fix Nano Banana** (image generation)
2. **Add Search Bar** (instant search)
3. **Improve Mobile UX** (responsive fixes)
4. **Enhance Venue Page** (photo gallery, info)
5. **Add Loading States** (better UX)
6. **Implement Auth** (user accounts)
7. **Add Reviews** (social proof)
8. **Create Event Calendar** (discovery)
9. **Build Admin Panel** (content management)
10. **Launch AI Concierge** (killer feature)

---

**Usage:** Copy any prompt above and paste directly into Cursor Chat, Composer, or Agent mode!

**Pro Tip:** Combine prompts for bigger tasks. Example:
```
[Prompt 1: Fix Nano Banana] + [Prompt 2: Add generation history]
```

**Stack Reference:**
- Next.js 15: App Router, Server Components, Server Actions
- Supabase: Database, Auth, Storage, Edge Functions
- Vercel AI SDK: Chat, Image Generation, Streaming
- Tailwind: Utility-first CSS
- Radix UI: Accessible components
- Framer Motion: Animations

