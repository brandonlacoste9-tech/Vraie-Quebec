import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VIPPass } from "./vip-pass"
import { Check, ChevronRight, Sparkles, Star, Users, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface RSVPModalProps {
  venueName: string
  eventName?: string
  imageUrl?: string
  children?: React.ReactNode
}

type Step = "select" | "details" | "confirm"

export function RSVPModal({ venueName, eventName, imageUrl, children }: RSVPModalProps) {
  const [step, setStep] = useState<Step>("select")
  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState("")
  const [selectedTier, setSelectedTier] = useState<"VIP" | "Guestlist" | "Table">("Guestlist")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setStep("confirm")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button className="w-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-black font-bold uppercase tracking-widest transition-all duration-500 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] border-none h-12 relative overflow-hidden group">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Secure VIP Access
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-950/95 border-zinc-800 backdrop-blur-xl p-0 overflow-hidden gap-0">
        
        {/* Header Image */}
        <div className="relative h-32 w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src={imageUrl || "/images/club-placeholder.jpg"} 
            alt={venueName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 z-20">
            <h2 className="text-2xl font-oswald text-white uppercase tracking-wide">{venueName}</h2>
            {eventName && <p className="text-gold-400 text-sm font-medium">{eventName}</p>}
          </div>
        </div>

        <div className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-oswald text-white uppercase mb-4 flex items-center gap-2">
                  <span className="bg-gold-500/20 text-gold-400 w-6 h-6 rounded-full flex items-center justify-center text-xs border border-gold-500/50">1</span>
                  Select Experience
                </h3>

                <div className="grid gap-3">
                  {[
                    { id: "Guestlist", label: "Guestlist Access", price: "Free", desc: "Entry before 11:30PM", icon: Users },
                    { id: "VIP", label: "VIP Fast Pass", price: "$40", desc: "Skip the line anytime", icon: Star },
                    { id: "Table", label: "Table Service", price: "$500+", desc: "Private booth & bottle service", icon: Sparkles },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id as any)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border transition-all duration-300 text-left group",
                        selectedTier === tier.id
                          ? "bg-gold-900/20 border-gold-500/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                          : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-full",
                          selectedTier === tier.id ? "bg-gold-500 text-black" : "bg-zinc-800 text-zinc-400"
                        )}>
                          <tier.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={cn("font-bold", selectedTier === tier.id ? "text-gold-400" : "text-white")}>{tier.label}</p>
                          <p className="text-xs text-zinc-500">{tier.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-zinc-400 group-hover:text-white transition-colors">{tier.price}</span>
                    </button>
                  ))}
                </div>

                <Button 
                  onClick={() => setStep("details")}
                  className="w-full mt-4 bg-white text-black hover:bg-zinc-200 font-bold"
                >
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-oswald text-white uppercase mb-4 flex items-center gap-2">
                  <span className="bg-gold-500/20 text-gold-400 w-6 h-6 rounded-full flex items-center justify-center text-xs border border-gold-500/50">2</span>
                  Guest Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <Input 
                        type="date" 
                        className="pl-10 bg-zinc-900 border-zinc-800 text-white focus:border-gold-500/50"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-400">Total Guests</Label>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="border-zinc-800 hover:bg-zinc-800 hover:text-white"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        -
                      </Button>
                      <span className="text-xl font-mono text-gold-400 w-8 text-center">{guests}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="border-zinc-800 hover:bg-zinc-800 hover:text-white"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep("select")}
                    className="text-zinc-500 hover:text-white"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleConfirm}
                    disabled={isSubmitting || !date}
                    className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold hover:opacity-90"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Securing Access...</span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6 pt-2"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400 mb-2">
                  <Check className="w-8 h-8" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-oswald text-white uppercase">Access Secured</h3>
                  <p className="text-zinc-400">Your VIP pass has been generated.</p>
                </div>

                <VIPPass 
                  userName="Current User" 
                  venueName={venueName}
                  eventName={eventName}
                  date={date}
                  guests={guests}
                  tier={selectedTier}
                  sponsorName="Grey Goose"
                  className="scale-90 shadow-2xl"
                />

                <Button className="w-full bg-white text-black font-bold hover:bg-zinc-200">
                  Download to Wallet
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

