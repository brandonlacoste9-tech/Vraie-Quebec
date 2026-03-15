"use client"

import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MapPin, Clock, Train, Car, Bus } from "lucide-react"

const destinations = [
  {
    id: "v1",
    label: "Escapade hivernale",
    name: "Vieux-Québec",
    subtitle: "La ville fortifiée, patrimoine de l'UNESCO",
    location: "Québec City, QC",
    duration: "Week-end",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&auto=format&fit=crop",
    description: "Rues pavées, Château Frontenac et gastronomie d'exception — Vieux-Québec est l'une des plus belles villes d'Amérique du Nord, particulièrement en hiver.",
    featured: true,
  },
  {
    id: "v2",
    label: "Gastronomie & Nature",
    name: "Charlevoix",
    subtitle: "Réserve mondiale de la biosphère",
    location: "Charlevoix, QC",
    duration: "3–4 jours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop",
    description: "Terroir exceptionnel, auberges de luxe et panoramas sur le Saint-Laurent. Charlevoix est la destination gastronomique par excellence du Québec.",
    featured: true,
  },
  {
    id: "v3",
    label: "Vignobles",
    name: "Estrie",
    subtitle: "Cantons-de-l'Est — vignobles et auberges",
    location: "Estrie, QC",
    duration: "Week-end",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85&auto=format&fit=crop",
    description: "Routes des vins, auberges champêtres et table farm-to-table. L'Estrie offre une retraite gastronomique à deux heures de Montréal.",
  },
  {
    id: "v4",
    label: "Chute spectaculaire",
    name: "Chutes Montmorency",
    subtitle: "Plus hautes que les chutes Niagara",
    location: "Beauport, QC",
    duration: "Journée",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop",
    description: "À seulement quelques minutes de Québec, les chutes Montmorency offrent un spectacle naturel saisissant en toutes saisons.",
  },
  {
    id: "v5",
    label: "Île & terroir",
    name: "Île d'Orléans",
    subtitle: "Le jardin de Québec",
    location: "Île d'Orléans, QC",
    duration: "Journée",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85&auto=format&fit=crop",
    description: "Vergers, cidreries, fromageries artisanales et maisons ancestrales. L'Île d'Orléans est un voyage dans le terroir québécois authentique.",
  },
  {
    id: "v6",
    label: "Grand Nord",
    name: "Laurentides",
    subtitle: "Ski, randonnée et chalet de luxe",
    location: "Laurentides, QC",
    duration: "3–5 jours",
    image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=900&q=85&auto=format&fit=crop",
    description: "Mont-Tremblant et les stations voisines offrent des chalets d'exception, des spas nordiques et une nature grandiose en toutes saisons.",
  },
]

const transport = [
  {
    icon: Train,
    name: "Train — Via Rail",
    route: "Montréal → Québec",
    time: "3h30",
    price: "50$ – 150$",
    note: "Recommandé — Vue sur le Saint-Laurent",
    href: "https://www.viarail.ca",
  },
  {
    icon: Car,
    name: "Voiture",
    route: "Autoroute 20 ou 40",
    time: "2h45",
    price: "30$ – 60$",
    note: "Flexibilité maximale avec arrêts",
    href: "https://www.rentalcars.com",
  },
  {
    icon: Bus,
    name: "Autobus — Orléans Express",
    route: "Montréal → Québec",
    time: "3h45",
    price: "40$ – 80$",
    note: "Option économique, WiFi à bord",
    href: "https://www.orleansexpress.com",
  },
]

export default function VoyagePage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#D6D0C6]">
        <p className="overline mb-4">Art de voyager</p>
        <h1
          className="font-display font-light text-[#1C1916] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Voyage
        </h1>
        <p className="text-[#7D7468] text-lg max-w-2xl leading-relaxed">
          Destinations d'exception, auberges de caractère et itinéraires gastronomiques — le meilleur du Québec, à portée de route.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-20">

        {/* ── Featured destinations ─────────────────────────────────── */}
        <section>
          <p className="overline mb-8">Destinations coups de cœur</p>
          <div className="space-y-px bg-[#D6D0C6]">
            {destinations.filter((d) => d.featured).map((dest, i) => (
              <article
                key={dest.id}
                className={`group grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D6D0C6] ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[400px] overflow-hidden bg-[#E8E4DC]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="bg-[#FAF8F5] p-10 md:p-14 flex flex-col justify-center">
                  <p className="overline mb-4">{dest.label}</p>
                  <h2
                    className="font-display font-light text-[#1C1916] text-3xl md:text-4xl mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {dest.name}
                  </h2>
                  <p className="text-[#B08D57] text-sm mb-4 italic" style={{ fontFamily: "var(--font-display)" }}>
                    {dest.subtitle}
                  </p>
                  <div className="h-px bg-[#D6D0C6] mb-6" />
                  <p className="text-[#7D7468] leading-relaxed mb-8">{dest.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[#7D7468]">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
                        {dest.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
                        {dest.duration}
                      </span>
                    </div>
                    <span className="link-luxury">Découvrir</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="rule" />

        {/* ── Destinations grid ─────────────────────────────────────── */}
        <section>
          <p className="overline mb-8">À explorer</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D6D0C6]">
            {destinations.filter((d) => !d.featured).map((dest) => (
              <article key={dest.id} className="group bg-[#FAF8F5] hover:bg-white transition-colors duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="overline mb-2">{dest.label}</p>
                  <h3
                    className="font-display font-light text-[#1C1916] text-xl md:text-2xl mb-1 leading-snug group-hover:text-[#B08D57] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {dest.name}
                  </h3>
                  <p className="text-[#B08D57] text-xs italic mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    {dest.subtitle}
                  </p>
                  <p className="text-[#7D7468] text-sm leading-relaxed line-clamp-2 mb-5">
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DC]">
                    <div className="flex items-center gap-1.5 text-xs text-[#7D7468]">
                      <Clock className="w-3 h-3 text-[#B08D57]" />
                      <span>{dest.duration}</span>
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#B08D57] font-sans group-hover:text-[#8C6D3F] transition-colors">
                      Explorer →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="rule" />

        {/* ── Transport ─────────────────────────────────────────────── */}
        <section>
          <p className="overline mb-4">Montréal → Québec</p>
          <h2
            className="font-display font-light text-[#1C1916] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Comment s'y rendre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D6D0C6]">
            {transport.map((t) => {
              const Icon = t.icon
              return (
                <a
                  key={t.name}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#FAF8F5] hover:bg-white transition-colors duration-300 p-8 flex flex-col"
                >
                  <Icon className="w-5 h-5 text-[#B08D57] mb-5" />
                  <p className="overline mb-2">{t.name}</p>
                  <h3
                    className="font-display font-light text-[#1C1916] text-xl mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.route}
                  </h3>
                  <div className="h-px bg-[#D6D0C6] mb-4" />
                  <div className="flex items-center justify-between text-sm text-[#7D7468] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B08D57]" /> {t.time}
                    </span>
                    <span className="text-[#1C1916] font-medium">{t.price}</span>
                  </div>
                  <p className="text-[#7D7468] text-xs leading-relaxed flex-1">{t.note}</p>
                  <div className="mt-6 link-luxury inline-block group-hover:text-[#B08D57]">
                    Réserver →
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* ── Dark CTA ──────────────────────────────────────────────── */}
        <section className="full-bleed bg-[#1C1916] py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#B08D57] font-sans mb-6">
              Membership
            </p>
            <h2
              className="font-display font-light text-[#FAF8F5] text-3xl md:text-4xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Accédez aux itinéraires<br />
              <em className="italic text-[#B08D57]">exclusifs de la maison</em>
            </h2>
            <p className="text-[#9E9388] leading-relaxed mb-10 max-w-xl mx-auto">
              Réservations dans les auberges de charme, tables gastronomiques et expériences privées — réservées à nos membres Initiés et Élite.
            </p>
            <Link href="/members" className="btn-luxury">
              Rejoindre la maison
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
