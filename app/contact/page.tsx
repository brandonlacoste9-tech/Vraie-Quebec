import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white mb-8">
          Contact
        </h1>
        <div className="leather-card p-8 stitched">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Publicité</h2>
              <a 
                href="mailto:northern-ventures@outlook.com" 
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>northern-ventures@outlook.com</span>
              </a>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Support</h2>
              <p className="text-gray-300">
                Pour toute question ou support, contacte-nous par email.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

