import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const sections = [
  {
    number: "01",
    title: "Acceptation des termes",
    body: "En accédant à Vrai Québec, vous acceptez d'être lié par ces termes et conditions. Si vous n'acceptez pas ces termes, veuillez ne pas utiliser notre plateforme.",
  },
  {
    number: "02",
    title: "Description du service",
    body: "Vrai Québec est une plateforme de découverte et de réservation pour restaurants, gastronomie, vie nocturne, événements, spectacles, activités sportives et hébergements au Québec.",
  },
  {
    number: "03",
    title: "Compte utilisateur",
    body: "Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos identifiants, de toutes les activités sur votre compte, et de fournir des informations exactes.",
  },
  {
    number: "04",
    title: "Réservations et paiements",
    items: [
      "Les prix affichés sont en dollars canadiens (CAD)",
      "Les taxes applicables (TPS/TVQ) sont incluses",
      "Les politiques d'annulation varient selon l'établissement",
      "Vrai Québec n'est pas responsable des modifications d'événements",
    ],
  },
  {
    number: "05",
    title: "Code vestimentaire et comportement",
    body: "Les établissements listés peuvent avoir des codes vestimentaires et des règles de comportement. Vrai Québec fournit ces informations à titre indicatif, mais l'admission finale est à la discrétion de l'établissement.",
  },
  {
    number: "06",
    title: "Propriété intellectuelle",
    body: "Tout le contenu de Vrai Québec (logos, textes, images, design) est protégé par les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées sans autorisation écrite.",
  },
  {
    number: "07",
    title: "Limitation de responsabilité",
    body: "Vrai Québec agit comme intermédiaire et ne peut être tenu responsable des services fournis par les établissements, des expériences utilisateur, des annulations d'événements, ou de tout dommage direct ou indirect.",
  },
  {
    number: "08",
    title: "Droit applicable",
    body: "Ces termes sont régis par les lois de la province de Québec et du Canada. Tout litige sera soumis aux tribunaux compétents de Montréal, Québec.",
  },
  {
    number: "09",
    title: "Contact",
    body: null,
    contact: "legal@vraiquebec.ca",
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <header className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-border">
        <p className="overline mb-4">Légal</p>
        <h1 className="font-display font-light text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Termes et conditions
        </h1>
        <p className="text-muted-foreground text-sm mt-4">Dernière mise à jour : 26 février 2026</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 space-y-px bg-border">
        {sections.map((s) => (
          <div key={s.number} className="bg-surface p-8 md:p-12 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12">
            <span className="text-[11px] tracking-[0.18em] uppercase text-primary font-sans pt-1">{s.number}</span>
            <div>
              <h2 className="font-display font-light text-foreground text-xl md:text-2xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {s.title}
              </h2>
              {s.body && <p className="text-muted-foreground leading-relaxed">{s.body}</p>}
              {s.items && (
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.contact && (
                <a href={`mailto:${s.contact}`} className="link-luxury">{s.contact}</a>
              )}
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}
