import { Utensils, Wine, Music, Ticket, Trophy, Flame } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Restaurants",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    count: "420+ établissements",
    href: "/restaurants",
  },
  {
    name: "Bars & Clubs",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop",
    count: "180+ adresses",
    href: "/bars",
  },
  {
    name: "Spectacles",
    icon: Music,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    count: "55 événements",
    href: "/agenda",
  },
  {
    name: "Sports",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop",
    count: "12 matchs",
    href: "/sports",
  },
  {
    name: "Tendance",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop",
    count: "Notre Top 10",
    href: "/search?q=trending",
  },
  {
    name: "Billetterie",
    icon: Ticket,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop",
    count: "Réserver",
    href: "/agenda",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="overline mb-3">Catégories</p>
          <h2 className="font-display font-light text-foreground text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Que souhaitez-vous découvrir?
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative h-52 overflow-hidden bg-surface"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 transition-filter duration-700"
              style={{ backgroundImage: `url('${category.image}')` }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-foreground/60 group-hover:bg-foreground/40 transition-colors duration-500" />

            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <category.icon className="w-5 h-5 text-primary mb-2" />
              <h3 className="font-display font-light text-background text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {category.name}
              </h3>
              <p className="text-[10px] text-background/60 tracking-[0.1em] uppercase font-sans mt-0.5">{category.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
