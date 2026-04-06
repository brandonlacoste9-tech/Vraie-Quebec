import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { EditorialPageHeader } from "@/components/editorial-page-header"
import { ContactForm } from "@/components/contact-form"
import { Mail, Instagram } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-border">
        <p className="overline mb-4">Maison</p>
        <h1 className="font-display font-light text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>Nous contacter</h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Une question, un partenariat, un événement à suggérer — nous sommes à votre écoute.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: channels */}
          <div className="space-y-12 md:space-y-16">
            {[
              {
                overline: 'Partenariats & Publicité',
                title: 'Vous êtes un établissement?',
                body: "Rejoignez notre réseau d'adresses d'exception et atteignez une audience de connaisseurs.",
                href: 'mailto:partners@vraiquebec.com',
                linkLabel: 'partners@vraiquebec.com',
              },
              {
                overline: 'Support',
                title: 'Questions & Réservations',
                body: "Besoin d'aide avec une réservation ou renseignement sur nos services?",
                href: 'mailto:support@vraiquebec.com',
                linkLabel: 'support@vraiquebec.com',
              },
              {
                overline: 'Rédaction',
                title: 'Suggestions & Presse',
                body: "Suggérez un événement, partagez votre retour, ou prenez contact avec notre équipe éditoriale.",
                href: 'mailto:hello@vraiquebec.com',
                linkLabel: 'hello@vraiquebec.com',
              },
            ].map((channel) => (
              <div key={channel.overline} className="flex gap-6">
                <div className="w-px bg-primary self-stretch flex-shrink-0" />
                <div>
                  <p className="overline mb-2">{channel.overline}</p>
                  <h3 className="font-display font-light text-foreground text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>{channel.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{channel.body}</p>
                  <a href={channel.href} className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{channel.linkLabel}</span>
                  </a>
                </div>
              </div>
            ))}

            {/* Social */}
            <div>
              <p className="overline mb-4">Nous suivre</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/vraiquebec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @vraiquebec
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
