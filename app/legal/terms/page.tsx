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
        <div className="prose prose-invert max-w-none space-y-6">
          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">1. Acceptation des termes</h2>
            <p className="text-gray-300">
              En accédant à Vraie-Québec, vous acceptez d'être lié par ces termes et conditions. 
              Si vous n'acceptez pas ces termes, veuillez ne pas utiliser notre plateforme.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">2. Description du service</h2>
            <p className="text-gray-300 mb-4">
              Vraie-Québec est une plateforme de découverte et de réservation pour:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Restaurants et gastronomie</li>
              <li>Vie nocturne et clubs</li>
              <li>Événements et spectacles</li>
              <li>Activités sportives</li>
              <li>Hôtels et hébergements</li>
            </ul>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">3. Compte utilisateur</h2>
            <p className="text-gray-300 mb-4">
              Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Maintenir la confidentialité de vos identifiants</li>
              <li>Toutes les activités sur votre compte</li>
              <li>Fournir des informations exactes et à jour</li>
              <li>Avoir 18 ans ou plus (ou consentement parental)</li>
            </ul>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">4. Réservations et paiements</h2>
            <p className="text-gray-300 mb-4">
              Les réservations VIP et les billets sont soumis aux politiques des établissements:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Les prix affichés sont en dollars canadiens (CAD)</li>
              <li>Les taxes applicables (TPS/TVQ) sont incluses</li>
              <li>Les politiques d'annulation varient selon l'établissement</li>
              <li>Vraie-Québec n'est pas responsable des modifications d'événements</li>
            </ul>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">5. Code vestimentaire et comportement</h2>
            <p className="text-gray-300">
              Les établissements listés peuvent avoir des codes vestimentaires et des règles de comportement. 
              Vraie-Québec fournit ces informations à titre indicatif, mais l'admission finale 
              est à la discrétion de l'établissement.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">6. Propriété intellectuelle</h2>
            <p className="text-gray-300">
              Tout le contenu de Vraie-Québec (logos, textes, images, design) est protégé par 
              les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer 
              ou créer des œuvres dérivées sans autorisation écrite.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">7. Limitation de responsabilité</h2>
            <p className="text-gray-300">
              Vraie-Québec agit comme intermédiaire et ne peut être tenu responsable des:
              services fournis par les établissements, expériences utilisateur, annulations 
              d'événements, ou tout dommage direct ou indirect.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">8. Modifications</h2>
            <p className="text-gray-300">
              Nous nous réservons le droit de modifier ces termes à tout moment. 
              Les changements entrent en vigueur immédiatement après publication. 
              Votre utilisation continue constitue acceptation des nouveaux termes.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">9. Droit applicable</h2>
            <p className="text-gray-300">
              Ces termes sont régis par les lois de la province de Québec et du Canada. 
              Tout litige sera soumis aux tribunaux compétents de Montréal, Québec.
            </p>
          </section>

          <section className="leather-card p-6 stitched">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">10. Contact</h2>
            <p className="text-gray-300">
              Pour toute question concernant ces termes:
              <a href="mailto:legal@vraie-quebec.ca" className="text-primary hover:underline ml-2">
                legal@vraie-quebec.ca
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
