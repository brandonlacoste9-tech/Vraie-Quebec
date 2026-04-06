"use client"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { VIPPass } from "./VIPPass"
import { createVipBooking } from "@/lib/data/vipBookings"
import { useLanguage } from "@/components/language-provider"
import { Loader2, Check, CreditCard, Users, Calendar } from "lucide-react"

interface RSVPModalProps {
  venueName: string
  placeId?: string
  /** Reserved for future hero image in dialog; optional for API compatibility */
  imageUrl?: string
  children?: React.ReactNode
}

type Step = "select" | "details" | "confirm" | "success"

type BookingType = "guestlist" | "vip" | "event"

export function RSVPModal({ venueName, placeId, children }: RSVPModalProps) {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<Step>("select")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<{
    type: BookingType
    date: string
    guests: string
    name: string
    email: string
  }>({
    type: "guestlist",
    date: new Date().toISOString().split("T")[0],
    guests: "2",
    name: "",
    email: "",
  })

  const experienceOptions = useMemo(
    () =>
      [
        {
          id: "guestlist" as const,
          label: t.rsvp.expGuestlistLabel,
          price: t.rsvp.expGuestlistPrice,
          icon: Users,
          desc: t.rsvp.expGuestlistDesc,
        },
        {
          id: "vip" as const,
          label: t.rsvp.expVipLabel,
          price: t.rsvp.expVipPrice,
          icon: CreditCard,
          desc: t.rsvp.expVipDesc,
        },
        {
          id: "event" as const,
          label: t.rsvp.expEventLabel,
          price: t.rsvp.expEventPrice,
          icon: Calendar,
          desc: t.rsvp.expEventDesc,
        },
      ],
    [language, t]
  )

  const passTicketType = useMemo(() => {
    if (bookingData.type === "guestlist") return "Guestlist" as const
    if (bookingData.type === "vip") return "VIP" as const
    return "Reservation" as const
  }, [bookingData.type])

  const selectedExperienceLabel = useMemo(
    () => experienceOptions.find((o) => o.id === bookingData.type)?.label ?? "",
    [experienceOptions, bookingData.type]
  )

  const handleBook = async () => {
    if (!placeId) {
      setError(t.rsvp.placeIdRequired)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const booking = await createVipBooking({
        place_id: placeId,
        user_name: bookingData.name,
        user_email: bookingData.email,
        booking_type: bookingData.type,
        booking_date: bookingData.date,
        party_size: parseInt(bookingData.guests, 10),
      })

      if (booking) {
        setStep("success")
      }
    } catch (err) {
      console.error("Booking error:", err)
      setError(t.rsvp.bookingError)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setStep("select")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold hover:scale-105 transition-transform">
            {t.rsvp.defaultTrigger}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md border-gold-500/30 bg-black/90 backdrop-blur-xl p-0 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(20, 20, 20, 1) 0%, rgba(30, 30, 30, 1) 50%, rgba(20, 20, 20, 1) 100%)`,
            backgroundSize: "cover",
          }}
        />

        <DialogHeader className="p-6 pb-2 z-10 relative border-b border-gold-500/20">
          <DialogTitle className="text-gold-100 font-display uppercase tracking-widest text-center">
            {step === "success" ? t.rsvp.dialogTitleSuccess : t.rsvp.dialogTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 z-10 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{venueName}</h3>
                  <p className="text-gold-400 text-sm">{t.rsvp.selectExperience}</p>
                </div>

                <div className="grid gap-4">
                  {experienceOptions.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setBookingData((prev) => ({ ...prev, type: type.id }))
                        setStep("details")
                      }}
                      className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-gold-900/20 hover:border-gold-500/50 transition-all group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-white/5 group-hover:bg-gold-500/20 transition-colors">
                          <type.icon className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-gold-200">{type.label}</p>
                          <p className="text-xs text-white/50">{type.desc}</p>
                        </div>
                      </div>
                      <span className="text-gold-400 font-mono text-sm">{type.price}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{t.rsvp.guestDetails}</h3>
                  <p className="text-white/50 text-sm">
                    {selectedExperienceLabel} · {venueName}
                  </p>
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gold-500 uppercase tracking-wider">{t.rsvp.fullName}</label>
                    <Input
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white focus:border-gold-500/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gold-500 uppercase tracking-wider">{t.rsvp.date}</label>
                      <Input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        className="bg-white/5 border-white/10 text-white focus:border-gold-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gold-500 uppercase tracking-wider">{t.rsvp.guests}</label>
                      <Select value={bookingData.guests} onValueChange={(v) => setBookingData({ ...bookingData, guests: v })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-gold-500/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {t.rsvp.guestCount.replace("{n}", String(n))}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button variant="ghost" onClick={() => setStep("select")} className="flex-1 text-white/50 hover:text-white">
                    {t.rsvp.back}
                  </Button>
                  <Button onClick={handleBook} className="flex-[2] bg-gold-500 text-black hover:bg-gold-400 font-bold" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {t.rsvp.confirmBooking}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t.rsvp.successTitle}</h3>
                  <p className="text-white/50 text-sm mt-1">{t.rsvp.successSubtitle}</p>
                </div>

                <div className="mb-6 transform scale-90 origin-top">
                  <VIPPass
                    eventName={venueName}
                    venueName={venueName}
                    date={bookingData.date}
                    time="22:00"
                    guestName={bookingData.name}
                    ticketType={passTicketType}
                    sponsorName="Moët & Chandon"
                  />
                </div>

                <Button onClick={reset} className="w-full bg-white/10 hover:bg-white/20 text-white">
                  {t.rsvp.done}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
