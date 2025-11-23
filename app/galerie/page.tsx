"use client"

import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Heart, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GalleryImage {
  id: string
  url: string
  prompt: string
  likes: number
  timestamp: number
  user?: string
}

export default function GaleriePage() {
  const { t } = useLanguage()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Load images from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("generations")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const galleryImages: GalleryImage[] = parsed
          .filter((g: any) => g.status === "complete" && g.imageUrl)
          .map((g: any) => ({
            id: g.id,
            url: g.imageUrl,
            prompt: g.prompt,
            likes: Math.floor(Math.random() * 50),
            timestamp: g.timestamp,
          }))
        setImages(galleryImages)
      } catch (e) {
        console.error("Error loading gallery:", e)
      }
    }
  }, [])

  const handleLike = (id: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, likes: img.likes + 1 } : img)))
  }

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vrai Québec - AI Creation",
          text: image.prompt,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleDownload = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `vrai-quebec-${image.id}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Download error:", err)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNav />

      {/* Header */}
      <div className="relative overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent mb-2">
            {t.galerie.title}
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto">{t.galerie.subtitle}</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        {images.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 border-2 border-primary/30 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">{t.galerie.empty}</h2>
            <p className="text-gray-400 mb-6">{t.galerie.emptyDesc}</p>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Link href="/creer">{t.galerie.createBtn}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative bg-secondary/20 border border-primary/10 rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.prompt}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-300 line-clamp-2">{image.prompt}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(image.id)
                      }}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{image.likes}</span>
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShare(image)
                        }}
                        className="p-2 hover:bg-primary/10 rounded transition-colors"
                        title={t.galerie.share}
                      >
                        <Share2 className="w-4 h-4 text-gray-400 hover:text-primary" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(image)
                        }}
                        className="p-2 hover:bg-primary/10 rounded transition-colors"
                        title={t.galerie.download}
                      >
                        <Download className="w-4 h-4 text-gray-400 hover:text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="bg-secondary/50 border border-primary/20 rounded-lg overflow-hidden backdrop-blur-xl">
              <img
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.prompt}
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              <div className="p-6 space-y-4">
                <p className="text-lg text-white">{selectedImage.prompt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(selectedImage.id)}
                      className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{selectedImage.likes}</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleShare(selectedImage)}
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/10"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {t.galerie.share}
                    </Button>
                    <Button
                      onClick={() => handleDownload(selectedImage)}
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t.galerie.download}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
