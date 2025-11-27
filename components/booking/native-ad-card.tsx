import React from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RSVPModal } from "./rsvp-modal"

interface NativeAdCardProps {
  name: string
  image: string
  description: string
  ctaText?: string
  sponsorName: string
  className?: string
}

export function NativeAdCard({ 
  name, 
  image, 
  description, 
  ctaText = "Experience It", 
  sponsorName,
  className 
}: NativeAdCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800", className)}>
      {/* Image Background */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Sponsor Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Promoted by</span>
          <span className="text-[10px] font-bold text-white">{sponsorName}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5 z-10">
        <div className="flex items-start justify-between mb-2">
          <div>
             <h3 className="text-xl font-oswald text-white uppercase tracking-wide mb-1 group-hover:text-gold-400 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-gold-500 mb-2">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
          </div>
        </div>
        
        <p className="text-sm text-zinc-300 mb-4 line-clamp-2 font-light leading-relaxed">
          {description}
        </p>

        <RSVPModal venueName={name} imageUrl={image}>
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm font-bold uppercase tracking-widest transition-all duration-300 hover:border-gold-500/50 hover:text-gold-400">
            {ctaText}
          </Button>
        </RSVPModal>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
    </div>
  )
}

