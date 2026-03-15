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
      id: 'rest-mtl-1',
      name: 'Joe Beef',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      category: 'Restaurant',
    },
    {
      id: 'rest-mtl-2',
      name: 'Toqué!',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      category: 'Restaurant',
    },
    {
      id: 'bar-mtl-1',
      name: 'Bar Big in Japan',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
      category: 'Bar',
    },
    {
      id: 'rest-qc-1',
      name: 'Le Saint-Amour',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
      category: 'Restaurant',
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
