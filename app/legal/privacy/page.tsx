import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const sections = [
  {
    number: "01",
    title: "Introduction",
    body: "Vrai Québec s'engage à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles conformément à la Loi 25 du Québec.",
  },
  {
    number: "02",
    title: "Informations collectées",
    items: [
      "Informations de compte (nom, courriel, numéro de téléphone)",
      "Préférences de navigation et favoris",
      "Historique de réservations",
      "Données de localisation (avec votre consentement)",
    ],
  },
  {
    number: "03",
    title: "Utilisation des données",
    body: "Nous utilisons vos informations pour personnaliser vos recommandations, traiter vos réservations, vous envoyer des notifications sur les événements et améliorer nos services.",
  },
  {
    number: "04",
    title: "Vos droits (Loi 25)",
    items: [
      "Accéder à vos données personnelles",
      "Demander la correction de vos informations",
      "Demander la suppression de votre compte",
      "Retirer votre consentement à tout moment",
      "Portabilité de vos données",
    ],
  },
  {
    number: "05",
    title: "Conservation des données",
    body: "Nous conservons vos données pendant 3 ans après votre dernière activité, ou jusqu'à ce que vous demandiez leur suppression. Les données sont stockées au Canada et chiffrées en transit et au repos.",
  },
  {
    number: "06",
    title: "Contact",
    body: null,
    contact: "privacy@vraiquebec.ca",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      <header className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#D6D0C6]">
        <p className="overline mb-4">Légal</p>
        <h1
          className="font-display font-light text-[#1C1916]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Politique de confidentialité
        </h1>
        <p className="text-[#7D7468] text-sm mt-4">Dernière mise à jour : 26 février 2026</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 space-y-px bg-[#D6D0C6]">
        {sections.map((s) => (
          <div key={s.number} className="bg-[#FAF8F5] p-8 md:p-12 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12">
            <span className="text-[11px] tracking-[0.18em] uppercase text-[#B08D57] font-sans pt-1">{s.number}</span>
            <div>
              <h2
                className="font-display font-light text-[#1C1916] text-xl md:text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </h2>
              {s.body && <p className="text-[#7D7468] leading-relaxed">{s.body}</p>}
              {s.items && (
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#7D7468]">
                      <span className="mt-2 w-1 h-1 bg-[#B08D57] rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.contact && (
                <a href={`mailto:${s.contact}`} className="link-luxury">
                  {s.contact}
                </a>
              )}
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}
