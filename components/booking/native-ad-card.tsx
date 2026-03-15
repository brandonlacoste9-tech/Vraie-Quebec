import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { RSVPModal } from "./RSVPModal"

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
  ctaText = "Réserver",
  sponsorName,
  className,
}: NativeAdCardProps) {
  return (
    <div className={cn("group relative overflow-hidden bg-foreground", className)}>
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
      </div>

      {/* Sponsor badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-1.5 bg-foreground/60 backdrop-blur-md border border-background/10 px-2.5 py-1">
          <span className="text-[9px] text-background/50 uppercase tracking-[0.15em] font-sans">Partenaire</span>
          <span className="text-[9px] font-medium text-background/80 font-sans">{sponsorName}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5 z-10">
        <div className="mb-2">
          <h3 className="font-display font-light text-background text-xl mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            {name}
          </h3>
          <div className="flex items-center gap-0.5 text-primary mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
        </div>
        <p className="text-sm text-background/60 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <RSVPModal venueName={name} imageUrl={image}>
          <button className="btn-luxury w-full">{ctaText}</button>
        </RSVPModal>
      </div>
    </div>
  )
}
