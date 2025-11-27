"use client"

import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

interface VIPPassProps {
  eventName: string
  venueName: string
  date: string
  time: string
  guestName: string
  ticketType: "VIP" | "Guestlist" | "Reservation"
  sponsorName?: string
  sponsorLogo?: string
  className?: string
}

export function VIPPass({
  eventName,
  venueName,
  date,
  time,
  guestName,
  ticketType,
  sponsorName,
  sponsorLogo,
  className,
}: VIPPassProps) {
  return (
    <div className={cn("perspective-1000 relative w-full max-w-md mx-auto", className)}>
      <motion.div
        initial={{ rotateX: 0, rotateY: 0 }}
        whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-xl border border-gold-500/50 shadow-2xl bg-black"
        style={{
          backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/leather-texture-black.jpg")`, // Fallback/Placeholder for texture
          backgroundSize: "cover",
        }}
      >
        {/* Holographic Shine Overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 animate-shimmer" />

        {/* Gold Border / Stitching Effect */}
        <div className="absolute inset-2 border border-dashed border-gold-500/30 rounded-lg pointer-events-none" />

        <div className="relative p-6 flex flex-col h-full justify-between text-gold-100">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] text-gold-400 uppercase mb-1">
                Vrai Québec Access
              </h3>
              <div className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gold-200 to-gold-600 font-display uppercase">
                {ticketType}
              </div>
            </div>
            {/* VQ Logo Placeholder */}
             <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <span className="text-xs font-bold text-gold-400">VQ</span>
             </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4 mb-8">
            <div>
              <p className="text-xs text-gold-500 uppercase tracking-widest mb-1">Event</p>
              <h2 className="text-xl font-bold text-white leading-tight">{eventName}</h2>
            </div>
            <div>
              <p className="text-xs text-gold-500 uppercase tracking-widest mb-1">Venue</p>
              <p className="text-lg text-gold-100">{venueName}</p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-gold-500 uppercase tracking-widest mb-1">Date</p>
                <p className="font-medium">{date}</p>
              </div>
              <div>
                <p className="text-xs text-gold-500 uppercase tracking-widest mb-1">Time</p>
                <p className="font-medium">{time}</p>
              </div>
            </div>
          </div>

          {/* Footer / QR */}
          <div className="flex items-end justify-between pt-6 border-t border-gold-500/20">
            <div>
               <p className="text-[10px] text-gold-500 uppercase tracking-widest mb-2">Guest</p>
               <p className="font-bold text-gold-200">{guestName}</p>
               
               {/* Sponsor Slot */}
               {sponsorName && (
                 <div className="mt-4 flex items-center gap-2 opacity-80">
                    <p className="text-[8px] text-gold-600 uppercase">Presented by</p>
                    {sponsorLogo ? (
                      <img src={sponsorLogo} alt={sponsorName} className="h-4 w-auto invert opacity-70" />
                    ) : (
                      <span className="text-[10px] font-bold text-gold-400">{sponsorName}</span>
                    )}
                 </div>
               )}
            </div>

            <div className="p-2 bg-white rounded-lg shadow-inner">
               <QRCodeSVG value={`VQ-${ticketType}-${eventName}-${guestName}`} size={64} fgColor="#000" />
            </div>
          </div>
        </div>
        
        {/* Bottom Security Strip */}
         <div className="h-2 w-full bg-gradient-to-r from-gold-900 via-gold-400 to-gold-900 opacity-50" />
      </motion.div>
    </div>
  )
}

