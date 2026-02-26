import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white mb-8">
          Politique de confidentialité
        </h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">1. Introduction</h2>
            <p className="text-gray-300 mb-4">
              Vraie-Québec s'engage à protéger votre vie privée. Cette politique explique comment nous collectons, 
              utilisons et protégeons vos informations personnelles conformément à la Loi 25 du Québec.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">2. Informations collectées</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Informations de compte (nom, email, numéro de téléphone)</li>
              <li>Préférences de navigation et favoris</li>
              <li>Historique de réservations et RSVPs</li>
              <li>Données de localisation (avec votre consentement)</li>
              <li>Interactions avec l'IA Julien</li>
            </ul>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">3. Utilisation des données</h2>
            <p className="text-gray-300 mb-4">
              Nous utilisons vos informations pour:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Personnaliser vos recommandations</li>
              <li>Traiter vos réservations VIP</li>
              <li>Vous envoyer des notifications sur les événements</li>
              <li>Améliorer nos services</li>
            </ul>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">4. Vos droits (Loi 25)</h2>
            <p className="text-gray-300 mb-4">
              Conformément à la Loi 25, vous avez le droit de:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Accéder à vos données personnelles</li>
              <li>Demander la correction de vos informations</li>
              <li>Demander la suppression de votre compte</li>
              <li>Retirer votre consentement à tout moment</li>
              <li>Portabilité de vos données</li>
            </ul>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">5. Conservation des données</h2>
            <p className="text-gray-300">
              Nous conservons vos données pendant 3 ans après votre dernière activité, 
              ou jusqu'à ce que vous demandiez leur suppression. Les données sont stockées 
              au Canada (Supabase) et chiffrées en transit et au repos.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">6. Contact</h2>
            <p className="text-gray-300">
              Pour toute question concernant votre vie privée, contactez notre responsable de la protection des données:
              <a href="mailto:privacy@vraie-quebec.ca" className="text-primary hover:underline ml-2">
                privacy@vraie-quebec.ca
              </a>
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            Dernière mise à jour: 26 février 2026
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
