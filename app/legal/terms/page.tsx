import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white mb-8">
          Termes et conditions
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Les termes et conditions seront disponibles bientôt.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}

