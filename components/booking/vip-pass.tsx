import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { cn } from "@/lib/utils"
import { RGBBorder } from "@/components/rgb-border"

interface VIPPassProps {
  userName: string
  venueName: string
  eventName?: string
  date: string
  guests: number
  tier: "VIP" | "Guestlist" | "Table"
  sponsorName?: string
  sponsorLogo?: string
  className?: string
}

export function VIPPass({
  userName,
  venueName,
  eventName,
  date,
  guests,
  tier,
  sponsorName,
  sponsorLogo,
  className,
}: VIPPassProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={cn("perspective-1000 w-full max-w-md mx-auto cursor-pointer", className)} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full aspect-[1.586] preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-black border border-gold-500/30 shadow-2xl">
            {/* Leather Texture Background */}
            <div className="absolute inset-0 opacity-80" style={{ 
              backgroundImage: "url('https://img.freepik.com/free-photo/black-leather-texture-background_1373-262.jpg?w=1380&t=st=1709320000~exp=1709320600~hmac=abcdef')",
              backgroundSize: "cover"
            }} />
            
            {/* Gold Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-500/10 to-transparent opacity-50" />
            
            {/* Content */}
            <div className="relative h-full p-6 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xs font-oswald tracking-[0.2em] text-gold-400 uppercase">Vraie Québec</h3>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-gold-400 to-transparent" />
                </div>
                {tier === "VIP" && (
                  <div className="px-2 py-1 rounded border border-gold-400/50 bg-black/50 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-gold-400 tracking-widest">VIP ACCESS</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-oswald font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-200 to-gold-600 uppercase tracking-wide drop-shadow-sm">
                  {venueName}
                </h2>
                {eventName && <p className="text-sm text-gold-100/80 font-light tracking-widest uppercase">{eventName}</p>}
              </div>

              <div className="flex justify-between items-end">
                <div className="text-left">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Member</p>
                  <p className="text-sm font-medium text-gold-100 font-mono">{userName}</p>
                </div>
                {sponsorName && (
                  <div className="text-right">
                     <p className="text-[8px] text-zinc-600 uppercase tracking-wider mb-0.5">Presented By</p>
                     <p className="text-xs font-bold text-white/90">{sponsorName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Animated Holographic Shine */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            <RGBBorder />
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 backface-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col items-center justify-center text-center shadow-xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="bg-white p-2 rounded-lg mb-4 shadow-inner">
            <QRCodeSVG value={`vq-booking-${venueName}-${date}`} size={120} />
          </div>
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">{date}</p>
          <p className="text-[10px] text-zinc-500">Admit {guests} • {tier}</p>
          <p className="mt-4 text-[10px] text-zinc-600 max-w-[200px]">
            Present this digital pass at the door for expedited entry. 
            Screen brightness must be at 100%.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

