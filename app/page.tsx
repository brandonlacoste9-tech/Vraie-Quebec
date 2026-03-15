import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MainNav />
      
      {/* Editorial Hero Section */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-6">
              Découvrez le Québec
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Votre guide éditorial des meilleures adresses pour restaurants, bars, événements et sorties à Montréal et partout au Québec.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20 space-y-20">
        {/* Featured Restaurants Grid */}
        <section>
          <h2 className="text-4xl font-display font-bold mb-12">En vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article key={i} className="card-editorial overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-secondary" />
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold mb-3">Restaurant {i}</h3>
                  <p className="text-muted-foreground mb-4">Découvrez cette adresse emblématique du Québec.</p>
                  <a href="#" className="text-primary font-semibold hover:underline">Lire →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Events Section */}
        <section>
          <h2 className="text-4xl font-display font-bold mb-12">À l'affiche</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <article key={i} className="flex gap-6 pb-6 border-b border-border last:border-b-0">
                <div className="w-24 h-24 bg-secondary flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold mb-2">Événement {i}</h3>
                  <p className="text-muted-foreground mb-3">Rejoignez-nous pour une expérience inoubliable.</p>
                  <p className="text-sm text-muted-foreground">Lundi 24 mars | 19h00</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
