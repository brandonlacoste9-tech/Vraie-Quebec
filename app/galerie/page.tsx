"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Heart, Share2, Download, X } from "lucide-react"
import Link from "next/link"

interface GalleryImage {
  id: string
  url: string
  prompt: string
  likes: number
  timestamp: number
}

export default function GaleriePage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("generations")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const gallery: GalleryImage[] = parsed
          .filter((g: any) => g.status === "complete" && g.imageUrl)
          .map((g: any) => ({
            id: g.id,
            url: g.imageUrl,
            prompt: g.prompt,
            likes: Math.floor(Math.random() * 50),
            timestamp: g.timestamp,
          }))
        setImages(gallery)
      } catch {}
    }
  }, [])

  const handleLike = (id: string) =>
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, likes: img.likes + 1 } : img)))

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      await navigator.share({ title: "Vrai Québec", text: image.prompt, url: window.location.href }).catch(() => {})
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleDownload = async (image: GalleryImage) => {
    try {
      const res = await fetch(image.url)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `vrai-quebec-${image.id}.png`
      a.click()
      URL.revokeObjectURL(url)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      <MainNav />

      <header className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#D6D0C6]">
        <p className="overline mb-4">Créations visuelles</p>
        <h1
          className="font-display font-light text-[#1C1916] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Galerie
        </h1>
        <p className="text-[#7D7468] text-lg max-w-2xl leading-relaxed">
          Les créations générées par notre communauté — visions du Québec réinventé par l'intelligence artificielle.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {images.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-16 h-16 mx-auto mb-8 border border-[#D6D0C6] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#B08D57]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
            </div>
            <p
              className="font-display font-light text-[#1C1916] text-3xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              La galerie est vide
            </p>
            <p className="text-[#7D7468] mb-8 max-w-sm mx-auto">
              Créez votre première vision du Québec avec notre outil de génération d'images.
            </p>
            <Link href="/creer" className="btn-luxury">
              Créer une image
            </Link>
          </div>
        ) : (
          <>
            <p className="overline mb-8">{images.length} création{images.length > 1 ? "s" : ""}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#D6D0C6]">
              {images.map((image) => (
                <article
                  key={image.id}
                  className="group bg-[#FAF8F5] hover:bg-white transition-colors duration-300 cursor-pointer"
                  onClick={() => setSelected(image)}
                >
                  <div className="aspect-square relative overflow-hidden bg-[#E8E4DC]">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[#7D7468] text-sm line-clamp-2 mb-4 leading-relaxed">
                      {image.prompt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E4DC]">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleLike(image.id) }}
                        className="flex items-center gap-1.5 text-xs text-[#7D7468] hover:text-[#B08D57] transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>{image.likes}</span>
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShare(image) }}
                          className="p-1.5 text-[#7D7468] hover:text-[#B08D57] transition-colors"
                          title="Partager"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownload(image) }}
                          className="p-1.5 text-[#7D7468] hover:text-[#B08D57] transition-colors"
                          title="Télécharger"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1916]/95 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-[#FAF8F5] hover:text-[#B08D57] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-[#FAF8F5]">
              <img
                src={selected.url}
                alt={selected.prompt}
                className="w-full h-auto max-h-[65vh] object-contain"
              />
              <div className="p-6 md:p-8">
                <p className="text-[#1C1916] leading-relaxed mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  {selected.prompt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#D6D0C6]">
                  <button
                    onClick={() => handleLike(selected.id)}
                    className="flex items-center gap-2 text-sm text-[#7D7468] hover:text-[#B08D57] transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{selected.likes}</span>
                  </button>
                  <div className="flex gap-3">
                    <button onClick={() => handleShare(selected)} className="btn-ghost-luxury text-[10px]">
                      Partager
                    </button>
                    <button onClick={() => handleDownload(selected)} className="btn-luxury text-[10px]">
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
