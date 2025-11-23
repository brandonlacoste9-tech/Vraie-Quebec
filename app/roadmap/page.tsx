export default function RoadmapPage() {
  const features = {
    nowBuilding: [
      {
        name: "User Accounts & Profiles",
        description: "Save favorites, track history, personalized recommendations",
        impact: "High",
        effort: "Medium",
      },
      {
        name: "Review & Rating System",
        description: "Let users rate venues, add photos, write reviews",
        impact: "Critical",
        effort: "High",
      },
    ],
    next: [
      {
        name: "Réservations Directes",
        description: "Book tables at restaurants directly through the app",
        impact: "Critical",
        effort: "High",
      },
      {
        name: "Cartes Interactives",
        description: "Interactive maps showing venue locations, walking routes",
        impact: "High",
        effort: "Medium",
      },
      {
        name: "Programme de Fidélité",
        description: "Points system, exclusive deals, VIP access to events",
        impact: "High",
        effort: "Medium",
      },
      {
        name: "Notifications Push",
        description: "Alert users about new events, last-minute deals, trending spots",
        impact: "Medium",
        effort: "Low",
      },
    ],
    future: [
      {
        name: "Partenariats avec Venues",
        description: "Direct integration with restaurants/bars for real-time availability",
        impact: "Critical",
        effort: "Very High",
      },
      {
        name: "Application Mobile Native",
        description: "iOS and Android apps for better performance and notifications",
        impact: "High",
        effort: "Very High",
      },
      {
        name: "Social Features",
        description: "Follow friends, share discoveries, create group plans",
        impact: "Medium",
        effort: "High",
      },
      {
        name: "Influencer Dashboard",
        description: "Tools for content creators to showcase Quebec spots",
        impact: "Medium",
        effort: "Medium",
      },
      {
        name: "Offres Exclusives",
        description: "Members-only discounts, early event access, secret menus",
        impact: "High",
        effort: "Medium",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">Roadmap Vrai Québec</h1>
        <p className="text-muted-foreground mb-12">Notre vision pour devenir la #1 plateforme au Québec</p>

        <div className="space-y-12">
          {/* Now Building */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-3 w-3 rounded-full bg-orange-500 animate-pulse shadow-sm" />
              <h2 className="text-2xl font-bold">En Construction</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {features.nowBuilding.map((feature, i) => (
                <div key={i} className="border rounded-lg p-6 bg-card shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-500">
                      Impact: {feature.impact}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-muted">Effort: {feature.effort}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Next Up */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-3 w-3 rounded-full bg-amber-500 shadow-sm" />
              <h2 className="text-2xl font-bold">Prochainement</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.next.map((feature, i) => (
                <div key={i} className="border rounded-lg p-6 bg-card shadow-sm">
                  <h3 className="font-bold mb-2">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-500">
                      Impact: {feature.impact}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-muted">Effort: {feature.effort}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Future Vision */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-3 w-3 rounded-full bg-blue-500 shadow-sm" />
              <h2 className="text-2xl font-bold">Vision Future</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.future.map((feature, i) => (
                <div key={i} className="border rounded-lg p-6 bg-card shadow-sm">
                  <h3 className="font-bold mb-2">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-500">
                      Impact: {feature.impact}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-muted">Effort: {feature.effort}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Key Metrics to Track */}
        <div className="mt-16 p-8 border rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Métriques Clés pour Dominer le Québec</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-3xl font-bold text-orange-500">10K+</p>
              <p className="text-sm text-muted-foreground">Utilisateurs actifs mensuels</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">500+</p>
              <p className="text-sm text-muted-foreground">Venues partenaires</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">50K+</p>
              <p className="text-sm text-muted-foreground">Reviews authentiques</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-500">#1</p>
              <p className="text-sm text-muted-foreground">App de découverte au Québec</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
