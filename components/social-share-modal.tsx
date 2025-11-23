"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { X, Facebook, Twitter, Instagram, Link2, Check } from "lucide-react"
import { Button } from "./ui/button"

interface SocialShareModalProps {
  imageUrl: string
  prompt: string
  isOpen: boolean
  onClose: () => void
}

export function SocialShareModal({ imageUrl, prompt, isOpen, onClose }: SocialShareModalProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(`Check out my AI creation on Vrai Québec! "${prompt}"`)

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      instagram: shareUrl,
    }

    if (platform === "instagram") {
      alert("Save the image and share it on Instagram!")
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div
        className="relative bg-secondary/90 border-2 border-primary/30 rounded-lg max-w-md w-full p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(var(--primary),0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.socialShare.title}
            </h3>
            <p className="text-gray-400 text-sm">{t.socialShare.subtitle}</p>
          </div>

          <div className="aspect-square rounded-lg overflow-hidden border border-primary/20">
            <img src={imageUrl || "/placeholder.svg"} alt={prompt} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-300">{t.socialShare.shareOn}</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialShare("facebook")}
                className="flex flex-col items-center gap-2 p-4 bg-black/50 hover:bg-primary/20 border border-primary/20 rounded-lg transition-all hover:border-primary/50"
              >
                <Facebook className="w-6 h-6 text-[#1877F2]" />
                <span className="text-xs text-gray-400">Facebook</span>
              </button>

              <button
                onClick={() => handleSocialShare("twitter")}
                className="flex flex-col items-center gap-2 p-4 bg-black/50 hover:bg-primary/20 border border-primary/20 rounded-lg transition-all hover:border-primary/50"
              >
                <Twitter className="w-6 h-6 text-[#1DA1F2]" />
                <span className="text-xs text-gray-400">Twitter</span>
              </button>

              <button
                onClick={() => handleSocialShare("instagram")}
                className="flex flex-col items-center gap-2 p-4 bg-black/50 hover:bg-primary/20 border border-primary/20 rounded-lg transition-all hover:border-primary/50"
              >
                <Instagram className="w-6 h-6 text-[#E1306C]" />
                <span className="text-xs text-gray-400">Instagram</span>
              </button>
            </div>
          </div>

          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full border-primary/30 hover:bg-primary/10 transition-colors bg-transparent"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                {t.socialShare.copied}
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-2" />
                {t.socialShare.copyLink}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
