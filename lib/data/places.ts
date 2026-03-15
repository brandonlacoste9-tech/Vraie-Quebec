// Data access layer for places
// Replaces mock data with live Supabase queries

import { createClient } from '@/lib/supabase'
import type { Place, PlaceFilters, CreatePlaceInput } from '@/lib/types/database'

// Hardcoded fallback data to populate placeholders based on user request
const FALLBACK_PLACES: Place[] = [
  // ─── RESTAURANTS ──────────────────────────────────────────────────────────────

  // Haut de gamme + Très bien classé + VIP
  {
    id: 'rest-mtl-1', name: 'Joe Beef', type: 'restaurant', city: 'Montreal', location: 'Little Burgundy', region: null,
    address: '2491 Notre-Dame St W', latitude: 45.48318, longitude: -73.57683, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', rating: 4.8, rating_count: 1200,
    price: null, price_tier: '$$$$', description: 'Établissement iconique de Little Burgundy, Joe Beef célèbre les produits du Québec dans des plats généreux et audacieux, avec une cave à vin exceptionnelle.', tags: ['steakhouse', 'fine dining'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: 200,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Haut de gamme + Très bien classé + VIP
  {
    id: 'rest-mtl-2', name: 'Toqué!', type: 'restaurant', city: 'Montreal', location: 'Vieux-Montréal', region: null,
    address: '900 Place Jean-Paul-Riopelle', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', rating: 4.9, rating_count: 1850,
    price: null, price_tier: '$$$$', description: "Table de référence de la gastronomie québécoise depuis 1993. Normand Laprise transforme les produits locaux en œuvres d'art culinaires dans un cadre contemporain lumineux.", tags: ['gastronomique', 'québécois', 'fine dining'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: 250,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Tendance + Modéré
  {
    id: 'rest-mtl-3', name: 'Damas', type: 'restaurant', city: 'Montreal', location: 'Outremont', region: null,
    address: '1201 Ave Van Horne', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', rating: 4.7, rating_count: 960,
    price: null, price_tier: '$$$', description: "Cuisine syrienne raffinée dans un décor d'inspiration orientale. Les mezzes et les grillades au charbon font de Damas l'une des adresses les plus prisées d'Outremont.", tags: ['syrien', 'mezze', 'tendance'],
    is_hot: true, exclusive: false, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Budget Modéré
  {
    id: 'rest-mtl-4', name: 'Schwartz\'s', type: 'restaurant', city: 'Montreal', location: 'Plateau Mont-Royal', region: null,
    address: '3895 Blvd Saint-Laurent', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', rating: 4.6, rating_count: 4200,
    price: null, price_tier: '$', description: "Institution montréalaise fondée en 1928, Schwartz's est la deli la plus célèbre du Canada. La viande fumée maison est une expérience culturelle incontournable.", tags: ['deli', 'viande fumée', 'institution'],
    is_hot: false, exclusive: false, booking_type: 'none', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Budget Modéré + Très bien classé
  {
    id: 'rest-mtl-5', name: 'Maison Boulud', type: 'restaurant', city: 'Montreal', location: 'Golden Square Mile', region: null,
    address: '1228 Sherbrooke St W', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800', rating: 4.7, rating_count: 780,
    price: null, price_tier: '$$$', description: "La signature montréalaise de Daniel Boulud, installée dans le Ritz-Carlton. Une cuisine franco-américaine élégante avec des produits du marché Jean-Talon.", tags: ['français', 'américain', 'luxe'],
    is_hot: false, exclusive: false, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Business Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Tendance + Modéré + Très bien classé
  {
    id: 'rest-mtl-6', name: 'Nora Gray', type: 'restaurant', city: 'Montreal', location: 'Little Burgundy', region: null,
    address: '1391 Rue Saint-Jacques', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', rating: 4.8, rating_count: 1100,
    price: null, price_tier: '$$$', description: "Cuisine italienne contemporaine dans un espace intime au design soigné. Pâtes fraîches, produits locaux et vins naturels composent l'une des cartes les plus séduisantes de Montréal.", tags: ['italien', 'contemporain', 'tendance'],
    is_hot: true, exclusive: false, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // VIP + Haut de gamme
  {
    id: 'rest-mtl-7', name: 'Monarque', type: 'restaurant', city: 'Montreal', location: 'Vieux-Montréal', region: null,
    address: '406 Rue Saint-Jacques', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800', rating: 4.6, rating_count: 520,
    price: null, price_tier: '$$$$', description: "Au cœur du Vieux-Montréal, Monarque propose une cuisine de marché audacieuse dans un cadre grandiose. Menu dégustation acclamé et service exemplaire.", tags: ['gastronomique', 'vieux-montréal', 'dégustation'],
    is_hot: false, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: 300,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Budget Modéré
  {
    id: 'rest-mtl-8', name: 'L\'Express', type: 'restaurant', city: 'Montreal', location: 'Plateau Mont-Royal', region: null,
    address: '3927 Rue Saint-Denis', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800', rating: 4.5, rating_count: 2100,
    price: null, price_tier: '$$', description: "Bistrot parisien par excellence ouvert depuis 1980. Steak frites, tartare et crème brûlée dans une ambiance brasserie chaleureuse qui ne se démode jamais.", tags: ['bistrot', 'français', 'classique'],
    is_hot: false, exclusive: false, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Tendance + Budget
  {
    id: 'rest-mtl-9', name: 'Agrikol', type: 'restaurant', city: 'Montreal', location: 'Village', region: null,
    address: '1844 Rue Amherst', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800', rating: 4.5, rating_count: 890,
    price: null, price_tier: '$', description: "Haïtien chaleureux co-fondé par Régine Chassagne d'Arcade Fire. Rhums rares, griot et accras dans une cour extérieure festive unique à Montréal.", tags: ['haïtien', 'cocktails', 'terrasse'],
    is_hot: true, exclusive: false, booking_type: 'none', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Très bien classé + Haut de gamme
  {
    id: 'rest-mtl-10', name: 'Le Mousso', type: 'restaurant', city: 'Montreal', location: 'Sainte-Marie', region: null,
    address: '1023 Rue Ontario E', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', rating: 4.9, rating_count: 670,
    price: null, price_tier: '$$$$', description: "Le chef Antonin Mousseau-Rivard signe ici l'une des expériences gastronomiques les plus avant-gardistes du Canada. Menu dégustation surprenant, vingt services.",  tags: ['avant-garde', 'dégustation', 'québécois'],
    is_hot: false, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: 350,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Tendance + Modéré
  {
    id: 'rest-mtl-11', name: 'Pastel', type: 'restaurant', city: 'Montreal', location: 'Rosemont', region: null,
    address: '310 Rue Beaubien E', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', rating: 4.6, rating_count: 440,
    price: null, price_tier: '$$', description: "Cuisine fusion asiatique-méditerranéenne lumineuse dans Rosemont. Partage de petites assiettes colorées, vins naturels et service décontracté font de Pastel la table branchée du moment.", tags: ['fusion', 'partage', 'tendance'],
    is_hot: true, exclusive: false, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Haut de gamme + VIP + Très bien classé
  {
    id: 'rest-mtl-12', name: 'Pasión', type: 'restaurant', city: 'Montreal', location: 'Westmount', region: null,
    address: '4810 Boul De Maisonneuve O', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800', rating: 4.7, rating_count: 350,
    price: null, price_tier: '$$$', description: "Cuisine latino-méditerranéenne dans le cadre luxueux de Westmount. Chef Juan Lopez propose ceviche, churrasco et tapas dans une ambiance élégante et festive.", tags: ['latino', 'méditerranéen', 'westmount'],
    is_hot: false, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: 150,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },

  // ─── RESTAURANTS QUÉBEC CITY ───────────────────────────────────────────────────

  // Très bien classé + Haut de gamme + VIP
  {
    id: 'rest-qc-1', name: 'Le Saint-Amour', type: 'restaurant', city: 'Quebec City', location: 'Vieux-Québec', region: null,
    address: '48 Rue Sainte-Ursule', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', rating: 4.9, rating_count: 850,
    price: null, price_tier: '$$$$', description: "Véritable institution du Vieux-Québec, Le Saint-Amour enchante depuis 1978 avec une cuisine française raffinée servie dans une verrière romantique hors du temps.", tags: ['français', 'romantique', 'institution'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: 200,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Tendance + Modéré
  {
    id: 'rest-qc-2', name: 'Chez Boulay', type: 'restaurant', city: 'Quebec City', location: 'Saint-Jean', region: null,
    address: '1110 Rue Saint-Jean', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3960a5f?w=800', rating: 4.7, rating_count: 620,
    price: null, price_tier: '$$$', description: "Bistro boréal signé Jean-Luc Boulay et Arnaud Marchand. La cuisine des terroirs nordiques du Québec — champignons sauvages, bleuets, fiddleheads — sublimée avec talent.", tags: ['boréal', 'terroir', 'québécois'],
    is_hot: true, exclusive: false, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  // Budget Modéré
  {
    id: 'rest-qc-3', name: 'Le Lapin Sauté', type: 'restaurant', city: 'Quebec City', location: 'Vieux-Québec', region: null,
    address: '52 Rue du Petit-Champlain', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', rating: 4.5, rating_count: 1400,
    price: null, price_tier: '$$', description: "Bienvenue dans la rue la plus pittoresque du Québec. Cuisine québécoise bistro avec lapin à toutes les sauces, soupe à la bière locale et desserts maison irrésistibles.", tags: ['québécois', 'bistro', 'touristique'],
    is_hot: false, exclusive: false, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },

  // ─── BARS / NIGHTLIFE ─────────────────────────────────────────────────────────

  {
    id: 'bar-mtl-1', name: 'Bar Big in Japan', type: 'nightlife', city: 'Montreal', location: 'Plateau Mont-Royal', region: null,
    address: '4175 Blvd Saint-Laurent', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800', rating: 4.7, rating_count: 600,
    price: null, price_tier: '$$', description: "Speakeasy caché au fond d'un couloir, Big in Japan élève le cocktail au rang d'art. Whiskeys japonais rarissimes et ambiance tamisée pour connaisseurs.", tags: ['speakeasy', 'cocktails', 'japonais'],
    is_hot: true, exclusive: true, booking_type: 'none', vibe: 'Intimate & Cozy', event_lineup: null, music_genre: 'Jazz & Lounge', party_type: 'Cocktail Bar',
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: 'bar-mtl-2', name: 'Coldroom', type: 'nightlife', city: 'Montreal', location: 'Vieux-Montréal', region: null,
    address: '1 Rue King', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800', rating: 4.8, rating_count: 820,
    price: null, price_tier: '$$$', description: "Bar à cocktails caché derrière une porte dissimulée dans le Vieux-Montréal. Ambiance feutrée, mixologistes de talent et carte de spiritueux d'exception.", tags: ['speakeasy', 'cocktails', 'exclusif'],
    is_hot: true, exclusive: true, booking_type: 'none', vibe: 'Dark & Moody', event_lineup: null, music_genre: 'Jazz & Soul', party_type: 'Cocktail Bar',
    dress_code: 'Smart Casual', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: 'bar-mtl-3', name: 'Bar Le Mal Nécessaire', type: 'nightlife', city: 'Montreal', location: 'Chinatown', region: null,
    address: '1106 Boul Saint-Laurent', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1572116469699-efb0f11e6167?w=800', rating: 4.6, rating_count: 950,
    price: null, price_tier: '$$', description: "Tiki bar audacieux niché au dernier étage du Chinatown. Cocktails au rhum et aux fruits exotiques servis sous des néons roses dans une ambiance tropical-luxe unique.", tags: ['tiki', 'cocktails', 'tendance'],
    is_hot: true, exclusive: false, booking_type: 'none', vibe: 'Fun & Festive', event_lineup: null, music_genre: 'Latin & World', party_type: 'Tiki Bar',
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: 'bar-mtl-4', name: 'Apt. 200', type: 'nightlife', city: 'Montreal', location: 'Plateau Mont-Royal', region: null,
    address: '3456 Boul Saint-Laurent', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800', rating: 4.5, rating_count: 710,
    price: null, price_tier: '$$', description: "Club électronique intimiste au cœur de la Main. DJs underground de renommée internationale et sound system de niveau professionnel dans un cadre minimaliste.", tags: ['electronic', 'underground', 'dj'],
    is_hot: false, exclusive: false, booking_type: 'guestlist', vibe: 'Underground', event_lineup: null, music_genre: 'Electronic & Techno', party_type: 'Club',
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: 'bar-mtl-5', name: 'Beaugrand Cocktail Bar', type: 'nightlife', city: 'Montreal', location: 'Hochelaga', region: null,
    address: '3827 Rue Ontario E', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800', rating: 4.6, rating_count: 380,
    price: null, price_tier: '$', description: "Cocktail bar de quartier à l'ambiance chaleureuse dans Hochelaga. Carte de saison créative, prix accessibles et terrasse animée l'été.", tags: ['cocktails', 'quartier', 'terrasse'],
    is_hot: false, exclusive: false, booking_type: 'none', vibe: 'Chill & Local', event_lineup: null, music_genre: 'Indie & Alternative', party_type: 'Bar',
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: 'bar-qc-1', name: 'Maurice Nightclub', type: 'nightlife', city: 'Quebec City', location: 'Grande Allée', region: null,
    address: '575 Grande Allée E', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', rating: 4.5, rating_count: 450,
    price: null, price_tier: '$$$', description: "Le nightclub légendaire de la Grande Allée, incontournable depuis 30 ans. Trois salles, DJs internationaux et table VIP pour vivre la nuit québécoise à son apogée.", tags: ['club', 'electronic', 'vip'],
    is_hot: true, exclusive: true, booking_type: 'guestlist', vibe: 'High Energy', event_lineup: null, music_genre: 'Electronic & EDM', party_type: 'Nightclub',
    dress_code: 'Upscale', is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: 'bar-qc-2', name: 'Bar Sainte-Angèle', type: 'nightlife', city: 'Quebec City', location: 'Vieux-Québec', region: null,
    address: '26 Rue Sainte-Angèle', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800', rating: 4.7, rating_count: 530,
    price: null, price_tier: '$$', description: "Institution du Vieux-Québec depuis 1982. Ambiance jazzy, whiskies de collection et clientèle locale fidèle dans un décor de bois chaleureux.", tags: ['jazz', 'whisky', 'institution'],
    is_hot: false, exclusive: false, booking_type: 'none', vibe: 'Jazz & Classic', event_lineup: null, music_genre: 'Jazz & Blues', party_type: 'Bar',
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: false, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },

  // ─── HÔTELS ───────────────────────────────────────────────────────────────────

  {
    id: 'hotel-mtl-1', name: 'Ritz-Carlton Montreal', type: 'hotel', city: 'Montreal', location: 'Golden Square Mile', region: null,
    address: '1228 Sherbrooke St W', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', rating: 4.9, rating_count: 2310,
    price: null, price_tier: '$$$$', description: "Hôtel de légende rouvert en 2012 après une restauration magistrale. Suites somptueuses, piscine intérieure, jardin secret et Bar Ritz — l'adresse absolue du prestige montréalais.", tags: ['luxe', 'centre-ville', 'historique'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: 'hotel-qc-1', name: 'Fairmont Le Château Frontenac', type: 'hotel', city: 'Quebec City', location: 'Vieux-Québec', region: null,
    address: '1 Rue des Carrières', latitude: null, longitude: null, phone: null, website: null, google_maps_url: null,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', rating: 4.9, rating_count: 5500,
    price: null, price_tier: '$$$$', description: "Le château le plus photographié au monde domine Québec depuis 1893. Chambres restaurées avec goût, spa Le Château et restaurant 1608 pour une expérience hors du commun.", tags: ['historique', 'luxe', 'château'],
    is_hot: true, exclusive: true, booking_type: 'reservation', vibe: null, event_lineup: null, music_genre: null, party_type: null,
    dress_code: null, is_sponsored: false, sponsor_name: null, ad_url: null, opening_hours_json: null, has_vip: true, vip_min_spend: null,
    vip_contact_name: null, vip_contact_phone: null, vip_contact_email: null, vip_notes: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  }
];

function applyFilters(places: Place[], filters?: PlaceFilters): Place[] {
  let filtered = [...places];
  if (filters?.type) filtered = filtered.filter(p => p.type === filters.type);
  if (filters?.city) filtered = filtered.filter(p => p.city === filters.city);
  if (filters?.has_vip !== undefined) filtered = filtered.filter(p => p.has_vip === filters.has_vip);
  if (filters?.is_hot !== undefined) filtered = filtered.filter(p => p.is_hot === filters.is_hot);
  if (filters?.exclusive !== undefined) filtered = filtered.filter(p => p.exclusive === filters.exclusive);
  if (filters?.booking_type) filtered = filtered.filter(p => p.booking_type === filters.booking_type);
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
  }
  return filtered;
}

/**
 * Get all places with optional filters
 */
export async function getPlaces(filters?: PlaceFilters): Promise<Place[]> {
  const supabase = createClient()
  
  if (!supabase) {
    // Supabase not configured — using fallback data
    return applyFilters(FALLBACK_PLACES, filters)
  }

  try {
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
      return applyFilters(FALLBACK_PLACES, filters)
    }

    if (!data || data.length === 0) {
      return applyFilters(FALLBACK_PLACES, filters)
    }

    return (data as Place[])
  } catch (error) {
    console.error('[Places] Exception:', error)
    return applyFilters(FALLBACK_PLACES, filters)
  }
}

/**
 * Get a single place by ID
 */
export async function getPlaceById(id: string): Promise<Place | null> {
  const supabase = createClient()
  
  if (!supabase) {
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
    return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
  }

  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .or('is_hot.eq.true,exclusive.eq.true')
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[Places] Error fetching featured places:', error)
      return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
    }

    if (!data || data.length === 0) {
      return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
    }

    return (data as Place[])
  } catch (error) {
    return applyFilters(FALLBACK_PLACES, { is_hot: true }).slice(0, limit)
  }
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

