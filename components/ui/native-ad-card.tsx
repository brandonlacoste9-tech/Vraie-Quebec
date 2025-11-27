import { Star } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface NativeAdCardProps {
  sponsorName: string
  title: string
  description: string
  image: string
  ctaText?: string
  ctaLink?: string
  className?: string
}

export function NativeAdCard({
  sponsorName,
  title,
  description,
  image,
  ctaText = "Learn More",
  ctaLink = "#",
  className,
}: NativeAdCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-gold-500/20 bg-black/50 backdrop-blur-sm", className)}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        {/* Sponsored Label */}
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-gold-500/10 border border-gold-500/30 px-3 py-1 backdrop-blur-md">
          <Star className="h-3 w-3 text-gold-400 fill-gold-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">Sponsored by {sponsorName}</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white font-display leading-tight">{title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
          
          <Button 
            asChild 
            variant="outline" 
            className="w-full mt-2 border-gold-500/50 text-gold-400 hover:bg-gold-500 hover:text-black transition-all duration-300"
          >
            <a href={ctaLink} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </a>
          </Button>
        </div>
      </div>
      
      {/* Gold sheen effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none" />
    </div>
  )
}

