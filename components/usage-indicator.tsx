"use client"

import { useEffect, useState } from "react"
import { getSubscriptionStatus } from "@/app/actions/subscription"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Clock, MessageSquare, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useUserIdentity } from "@/hooks/use-user-identity" // Import hook

export function UsageIndicator({ type = "all" }: { type?: "message" | "image" | "all" }) {
  const userId = useUserIdentity() // Use hook
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return // Wait for userId

    async function fetchStatus() {
      try {
        const sub = await getSubscriptionStatus(userId) // Pass userId to action
        setSubscription(sub)
      } catch (error) {
        console.error("Failed to fetch subscription", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStatus()
  }, [userId]) // Add userId dependency

  if (loading) return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
  if (!subscription) return null

  const isTrial = subscription.subscription_status === "trial"
  if (!isTrial) return null // Don't show for paid users (unlimited)

  const daysLeft = Math.ceil(
    (new Date(subscription.trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  const MessageStats = () => (
    <div className="space-y-2">
      <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" /> Messages
        </span>
        <span>
          {subscription.messages_used} / {subscription.message_limit}
        </span>
      </div>
      <Progress value={(subscription.messages_used / subscription.message_limit) * 100} className="h-1.5" />
    </div>
  )

  const ImageStats = () => (
    <div className="space-y-2">
      <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span className="flex items-center gap-1">
          <ImageIcon className="h-3 w-3" /> Images
        </span>
        <span>
          {subscription.images_used} / {subscription.image_limit}
        </span>
      </div>
      <Progress value={(subscription.images_used / subscription.image_limit) * 100} className="h-1.5" />
    </div>
  )

  return (
    <Card className="bg-black/40 border-primary/20 backdrop-blur-sm w-full max-w-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="border-primary text-primary animate-pulse">
            Essai Gratuit
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{daysLeft} jours restants</span>
          </div>
        </div>

        {(type === "all" || type === "message") && <MessageStats />}
        {(type === "all" || type === "image") && <ImageStats />}

        <div className="pt-2 text-[10px] text-center text-muted-foreground">
          <Link
            href="https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00"
            target="_blank"
            className="hover:text-primary underline"
          >
            Upgrade for $6/month (Unlimited)
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
