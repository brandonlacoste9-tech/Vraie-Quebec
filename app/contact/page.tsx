import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MainNav />
      
      {/* Hero */}
      <section className="full-bleed bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-balance mb-6">
            Nous contacter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Une question? Un partenariat? Un événement à suggérer? Contactez-nous directement.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div className="card-editorial p-8">
              <h2 className="text-2xl font-display font-bold text-primary mb-4">Publicité & Partenariats</h2>
              <p className="text-muted-foreground mb-4">
                Vous représentez un établissement? Vous voulez rejoindre notre réseau VIP?
              </p>
              <a 
                href="mailto:partners@vraiquebec.ca" 
                className="flex items-center gap-3 text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>partners@vraiquebec.ca</span>
              </a>
            </div>

            <div className="card-editorial p-8">
              <h2 className="text-2xl font-display font-bold text-primary mb-4">Support & Questions</h2>
              <p className="text-muted-foreground mb-4">
                Vous avez une question sur votre réservation ou notre service?
              </p>
              <a 
                href="mailto:support@vraiquebec.ca" 
                className="flex items-center gap-3 text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>support@vraiquebec.ca</span>
              </a>
            </div>

            <div className="card-editorial p-8">
              <h2 className="text-2xl font-display font-bold text-primary mb-4">Communications</h2>
              <p className="text-muted-foreground mb-4">
                Suggestions, feedback, ou histoire à nous partager?
              </p>
              <a 
                href="mailto:hello@vraiquebec.ca" 
                className="flex items-center gap-3 text-primary hover:text-primary/80 font-semibold transition-colors mb-4"
              >
                <Mail className="h-5 w-5" />
                <span>hello@vraiquebec.ca</span>
              </a>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-editorial p-8">
            <h2 className="text-2xl font-display font-bold mb-6">Formulaire de contact</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Courriel</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Type de demande</label>
                <select className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Sélectionner...</option>
                  <option>Publicité</option>
                  <option>Partenariat</option>
                  <option>Support</option>
                  <option>Suggestion</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary/90 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
      <MainNav />
      
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h1 className="text-4xl md:text-7xl font-heading font-bold uppercase text-white mb-4">
            CONTACTE-<span className="text-primary text-glow">NOUS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Une question? Un partenariat? Un événement à suggérer? 
            On est là pour toi, tabarnak!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            {/* Advertising */}
            <div className="leather-card p-6 stitched">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Publicité & Partenariats</h2>
              <p className="text-gray-300 mb-4">
                Vous représentez un établissement? Vous voulez rejoindre notre réseau VIP?
              </p>
              <a 
                href="mailto:partners@vraie-quebec.ca" 
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>partners@vraie-quebec.ca</span>
              </a>
            </div>

            {/* Support */}
            <div className="leather-card p-6 stitched">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Support Client</h2>
              <p className="text-gray-300 mb-4">
                Problème avec une réservation? Question sur votre compte?
              </p>
              <div className="space-y-3">
                <a 
                  href="mailto:support@vraie-quebec.ca" 
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>support@vraie-quebec.ca</span>
                </a>
                <a 
                  href="tel:+15145551234" 
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>+1 (514) 555-1234</span>
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Disponible 7j/7, 10h à 22h
              </p>
            </div>

            {/* Social */}
            <div className="leather-card p-6 stitched">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Réseaux Sociaux</h2>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://instagram.com/vraiequebec" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>@vraiequebec</span>
                </a>
                <a 
                  href="https://tiktok.com/@vraiequebec" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>@vraiequebec</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="leather-card p-8 stitched">
            <h2 className="text-2xl font-heading font-bold text-white mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sujet</label>
                <select className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                  <option>Question générale</option>
                  <option>Partenariat</option>
                  <option>Problème technique</option>
                  <option>Suggestion d'événement</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Votre message..."
                />
              </div>
              <button type="submit" className="btn-primary w-full py-3">
                Envoyer
              </button>
            </form>
          </div>
        </div>

        {/* Office Location */}
        <div className="mt-12 leather-card p-6 stitched">
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Notre Bureau</h3>
              <p className="text-gray-300">
                1230 Rue Sainte-Catherine Ouest, Suite 500<br />
                Montréal, QC H3B 1K1<br />
                <span className="text-sm text-gray-500">(Visites sur rendez-vous uniquement)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
