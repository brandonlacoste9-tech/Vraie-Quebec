'use client'

import Link from 'next/link'

interface EditorialCard {
  id: string
  title: string
  description: string
  image?: string
  category?: string
  href: string
  size?: 'small' | 'medium' | 'large'
}

interface EditorialGridProps {
  items: EditorialCard[]
  title?: string
}

export function EditorialGrid({ items, title }: EditorialGridProps) {
  return (
    <section>
      {title && (
        <h2 className="text-4xl font-display font-bold mb-12">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-max gap-8">
        {items.map((item, idx) => {
          // Vary grid placement for editorial layout
          const isLarge = idx % 5 === 0 || idx % 7 === 2
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                card-editorial group overflow-hidden hover:shadow-xl transition-all duration-300
                ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
              `}
            >
              {item.image && (
                <div className={`bg-secondary overflow-hidden ${isLarge ? 'h-80' : 'h-48'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className={`p-6 ${isLarge ? 'p-8' : ''}`}>
                {item.category && (
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">
                    {item.category}
                  </p>
                )}
                <h3 className={`font-display font-bold mb-3 text-balance ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                  {item.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
