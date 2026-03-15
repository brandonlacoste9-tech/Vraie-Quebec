import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const features = {
  nowBuilding: [
    {
      name: "Comptes utilisateurs & profils",
      description: "Sauvegardez vos favoris, suivez votre historique et recevez des recommandations personnalisées.",
      impact: "Élevé",
      effort: "Moyen",
    },
    {
      name: "Système d'avis & évaluations",
      description: "Permettre aux membres de noter les établissements, ajouter des photos et laisser des avis.",
      impact: "Critique",
      effort: "Élevé",
    },
  ],
  next: [
    {
      name: "Réservations directes",
      description: "Réservez une table dans les restaurants directement via la plateforme, sans intermédiaire.",
      impact: "Critique",
      effort: "Élevé",
    },
    {
      name: "Cartes interactives",
      description: "Cartes immersives affichant les établissements, avec itinéraires piétons.",
      impact: "Élevé",
      effort: "Moyen",
    },
    {
      name: "Programme de fidélité",
      description: "Système de points, offres exclusives et accès VIP aux événements membres.",
      impact: "Élevé",
      effort: "Moyen",
    },
    {
      name: "Notifications intelligentes",
      description: "Alertes sur les nouvelles adresses, offres de dernière minute et tendances du moment.",
      impact: "Moyen",
      effort: "Faible",
    },
  ],
  future: [
    {
      name: "Partenariats avec les établissements",
      description: "Intégration directe avec les restaurants et bars pour la disponibilité en temps réel.",
      impact: "Critique",
      effort: "Très élevé",
    },
    {
      name: "Application mobile native",
      description: "Applications iOS et Android pour une expérience optimale et des notifications push.",
      impact: "Élevé",
      effort: "Très élevé",
    },
    {
      name: "Fonctionnalités sociales",
      description: "Suivez vos proches, partagez vos découvertes et planifiez des sorties en groupe.",
      impact: "Moyen",
      effort: "Élevé",
    },
    {
      name: "Tableau de bord créateurs",
      description: "Outils pour les créateurs de contenu souhaitant mettre en valeur les adresses du Québec.",
      impact: "Moyen",
      effort: "Moyen",
    },
    {
      name: "Offres exclusives membres",
      description: "Réductions réservées aux abonnés, accès anticipé aux événements, menus secrets.",
      impact: "Élevé",
      effort: "Moyen",
    },
  ],
}

const metrics = [
  { value: "10K+", label: "Utilisateurs actifs mensuels" },
  { value: "500+", label: "Établissements partenaires" },
  { value: "50K+", label: "Avis authentiques" },
  { value: "#1", label: "Plateforme de découverte au Québec" },
]

const phases = [
  {
    status: "building",
    label: "En construction",
    dot: "bg-primary animate-pulse",
    items: features.nowBuilding,
  },
  {
    status: "next",
    label: "Prochainement",
    dot: "bg-primary/60",
    items: features.next,
  },
  {
    status: "future",
    label: "Vision future",
    dot: "bg-muted-foreground",
    items: features.future,
  },
]

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-border">
        <p className="overline mb-4">Transparent par nature</p>
        <h1
          className="font-display font-light text-foreground mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Feuille de route
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Notre vision pour devenir la référence absolue de la découverte au Québec — construite en
          transparence avec notre communauté.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-20">

        {phases.map((phase) => (
          <section key={phase.status}>
            <div className="flex items-center gap-3 mb-10">
              <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${phase.dot}`} />
              <p className="overline">{phase.label}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {phase.items.map((feature) => (
                <div
                  key={feature.name}
                  className="bg-surface hover:bg-background transition-colors duration-300 p-8 flex flex-col"
                >
                  <div className="w-px h-6 bg-primary mb-5" />
                  <h3
                    className="font-display font-light text-foreground text-xl mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  <div className="flex gap-2 mt-6 pt-5 border-t border-border">
                    <span className="text-[9px] tracking-[0.18em] uppercase font-sans text-primary border border-primary/30 px-2 py-1">
                      Impact : {feature.impact}
                    </span>
                    <span className="text-[9px] tracking-[0.18em] uppercase font-sans text-muted-foreground border border-border px-2 py-1">
                      Effort : {feature.effort}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {phase.status !== "future" && <div className="rule mt-20" />}
          </section>
        ))}

        {/* Metrics */}
        <section className="full-bleed bg-foreground py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-sans mb-4">Objectifs</p>
            <h2
              className="font-display font-light text-primary-foreground mb-16"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Métriques clés
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {metrics.map((m) => (
                <div key={m.value} className="bg-foreground p-8 md:p-10 text-center">
                  <p
                    className="font-display font-light text-primary text-4xl md:text-5xl mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {m.value}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
