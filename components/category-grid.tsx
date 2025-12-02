import { Utensils, Wine, Music, Ticket, Trophy, Flame } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Restos",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    color: "from-orange-600 to-red-600",
    count: "420+ spots",
  },
  {
    name: "Bars & Clubs",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop",
    color: "from-purple-600 to-blue-600",
    count: "180+ spots",
  },
  {
    name: "Shows",
    icon: Music,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    color: "from-pink-600 to-rose-600",
    count: "55 events",
  },
  {
    name: "Sports",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop",
    color: "from-green-600 to-emerald-600",
    count: "12 matchs",
  },
  {
    name: "Trending",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop",
    color: "from-yellow-600 to-orange-600",
    count: "Top 10",
  },
  {
    name: "Billets",
    icon: Ticket,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop",
    color: "from-blue-600 to-cyan-600",
    count: "Acheter mtn",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white mb-2">
            Qu'est-ce qu'on fait <span className="text-primary">à soir?</span>
          </h2>
          <p className="text-muted-foreground">Choisis ton vibe, on s'occupe du reste.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const href = category.name === "Restos" ? "/restaurants" :
                       category.name === "Bars & Clubs" ? "/bars" :
                       category.name === "Shows" ? "/agenda" :
                       category.name === "Sports" ? "/sports" :
                       category.name === "Trending" ? "/search?q=trending" :
                       category.name === "Billets" ? "/agenda" : "#"
          
          return (
          <Link
            key={category.name}
            href={href}
            className="group relative h-48 overflow-hidden rounded-none border border-border bg-secondary transition-all hover:border-primary"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              style={{ backgroundImage: `url('${category.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-4 w-full">
              <div className={`mb-2 inline-flex rounded-full bg-gradient-to-r ${category.color} p-2 shadow-lg`}>
                <category.icon className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase text-white">{category.name}</h3>
              <p className="text-xs text-gray-300 font-medium">{category.count}</p>
            </div>
          </Link>
          )
        })}
      </div>
    </section>
  )
}
