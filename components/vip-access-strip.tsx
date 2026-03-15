'use client'

export interface VIPVenue {
  id: string
  name: string
  image: string
  category: string
}

interface VIPAccessStripProps {
  venues?: VIPVenue[]
}

export function VIPAccessStrip({ venues = [] }: VIPAccessStripProps) {
  const defaultVenues: VIPVenue[] = [
    {
      id: '1',
      name: 'Café Noir',
      image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=400',
      category: 'Bar',
    },
    {
      id: '2',
      name: 'Le Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4d71bcdd2d59?w=400',
      category: 'Restaurant',
    },
    {
      id: '3',
      name: 'Club Électrique',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400',
      category: 'Club',
    },
    {
      id: '4',
      name: 'Terrasse Vue',
      image: 'https://images.unsplash.com/photo-1551632786-de41ecde00f8?w=400',
      category: 'Venue',
    },
  ]

  const displayVenues = venues.length > 0 ? venues : defaultVenues

  return (
    <div className="py-16 md:py-20">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-4xl font-display font-bold">Accès VIP</h2>
        <p className="text-muted-foreground mt-2">Réservations prioritaires pour nos établissements partenaires</p>
      </div>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 pb-4">
            {displayVenues.map((venue) => (
              <a
                key={venue.id}
                href={`/venue/${venue.id}`}
                className="group flex-shrink-0 w-80 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden rounded bg-secondary mb-4">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase rounded">
                    VIP
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                  {venue.name}
                </h3>
                <p className="text-sm text-muted-foreground">{venue.category}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
